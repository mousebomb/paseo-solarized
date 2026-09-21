# Paseo Solarized 主题插件

本文件沉淀 Paseo 主题插件机制的关键技术资料，避免以后重复上网/查源码。

## 项目背景

为 Paseo 贡献的 Solarized 明暗双主题插件（Solarized Light + Solarized Dark），基于 Paseo 官方插件主题贡献点 `client.addTheme`（v0.5.0 引入，v0.8.0 起从 `plugin.addTheme` 改为 client 入口注册）。

- Paseo 源码：`https://github.com/getpaseo/paseo`（AGPLv3，monorepo）
- 前端在 `packages/app`（Expo + React Native + Unistyles）
- 插件当前适配版本：**0.8.0**
- 插件 id：`solarized`（与旧仓库 `paseo-solarized-light` 的 id `solarized-light` 错开，两个插件可共存）；主题贡献 id 为 `light` / `dark`，Paseo 自动加前缀成 `solarized/theme/light`、`solarized/theme/dark`

## 双主题注册

同一个插件可多次调用 `client.addTheme`（`plugin.themes` 是数组，`packages/app/src/plugins/themes/index.ts`），各自声明 `appearance: "light" | "dark"`，分别走 `buildLightPluginTheme` / `buildDarkPluginTheme`。贡献 id 用 `"light"` / `"dark"` 即可，不要写成 `"solarized-light"`，否则最终 id 冗余。

⚠️ 插件 id 由 **daemon 配置键**决定（`packages/server/src/server/plugins/runtime.ts` 的 `loadDirectoryPlugin` 里 `id: pluginId`），`paseo-plugin.json` 的 `id` 仅在安装时用于生成配置键。改了 manifest 的 `id` 必须 `paseo plugin remove <旧键>` 后重装，否则主题前缀仍是旧键。

## v0.8 插件结构规范（2026-09-11 迁移）

v0.8 起插件拆分 client/server 运行时入口，废弃混合根入口 `index.ts`。

- 入口文件改为 `index.client.ts`（UI/主题/回调类注册）与 `index.server.ts`（RPC/Node API）的组合，至少其一；代码模块须位于 `client/`、`server/`、`shared/` 目录。
- 自 `client` 入口导出 `contribute(client: PluginClientContext)`，context 类型从 `@getpaseo/plugin/client` 导入；注册方式为 `client.addTheme(...)`。
- `paseo-plugin.json` 必须声明 `"requirements": {"paseo": ">=0.8.0"}`，缺省视为 `<0.8.0` 会被 0.8 host 拒绝（报 `This plugin has no requirements.paseo`）。
- 类型来源用真实 SDK `@getpaseo/plugin@^0.8.0`（`@getpaseo/client` 同步 0.8.0），不再手写 `paseo-plugin.d.ts`。
- 迁移文档：`https://paseo.sh/docs/plugins/v0.8/migration`；`addTheme` 字段契约在 v0.8 未变（仍 8 字段）。纯数据主题无需 `index.server.ts`。

## 插件主题字段与 Unistyles 色板映射

插件只贡献 8 个字段（0.5.1 时点源码 `src/plugins/themes/index.ts:63-71`），Paseo 内部映射到完整色板：

| 插件字段 | 映射 | 主要用途 |
|---|---|---|
| `background` | `surface0` | 页面背景 |
| `raised` | `surface1` | 次要凸起层 |
| `control` | `surface2` | 控件背景 |
| **`border`** | **`surface3`** | **用户消息气泡背景** + 卡片/控件背景 + 边框线 |
| `mutedForeground` | `foregroundMuted` | 次要文字（时间戳、辅助说明） |
| `accent` | `accent` | 强调色 |
| `foreground` | `foreground` | 正文文字 |
| `ring` | - | 焦点环 |

⚠️ 关键约束：**用户消息气泡背景被绑死在 `border` 字段**（0.5.1 时点源码 `src/components/message.tsx:347` 的 `backgroundColor: theme.colors.surface3`），气泡内文字是 `foreground`（`message.tsx:356`）。无法单独改气泡颜色，只能调 `border`。

## 配色规则经验

- `surface3`（border）同时承担「用户气泡背景」，应选「比背景略深/略亮的相邻色」；若设成中间亮度段的中灰（Light 下 base1 `#93a1a1`）会与正文撞亮度，对比度掉到 ~1.7:1，可读性差
- 对比度经验：文字与背景都落在中间亮度段必糊，背景应走极端（很浅或很深）；深色端向正文方向调亮 `border` 会同时降低气泡对比度，所以深色 `border` 只能贴背景（base02），不能上 base01
- 实测对比度（WCAG，正文基准 4.5:1）：
  - Light：正文 base00/背景 base3 = 4.13:1；气泡 base00/border `#e6e0cd` = 3.37:1；次要 base0/背景 = 2.93:1
  - Dark：正文 base0/背景 base03 = 4.75:1；气泡 base0/border base02 = 4.11:1；次要 base01/背景 = 2.79:1
- 深色端 `foreground` 必须用 base0 `#839496`（base00 在 base03 上仅 3.4:1，不达正文标准）；`mutedForeground` 用 base01 `#586e75`
- `accent` 在两端的约束是「与 `background` 的对比度」（源码 `accentForeground: colors.background`，强调底色上的文字取背景色）：Light 用 orange `#cb4b16`（4.25:1），Dark 必须换成 cyan `#2aa198`（4.75:1），orange 在深底上只有 3.28:1

## 常用命令

```bash
# Paseo CLI 不在 PATH 时用完整路径
export PATH="/Applications/Paseo.app/Contents/Resources/bin:$PATH"

paseo plugin reload solarized   # 改代码后热重载
paseo plugin ls                 # 查看状态
paseo plugin logs solarized     # 查看日志
paseo plugin disable/enable solarized
paseo plugin remove solarized   # 只删配置不删源码目录
```

## 验证

```bash
npm run typecheck   # 必须通过
paseo plugin reload solarized && paseo plugin ls
```

⚠️ 改了 `paseo-plugin.json` 的 `id` 后 `reload` 不会换前缀：daemon 用配置键当插件 id（`loadDirectoryPlugin` 的 `id: pluginId`），必须 `paseo plugin remove <旧键>` 再 `paseo plugin install <目录>` 才会以新 id 注册。

## paseo.cafe 收录

- 收录入口：PR 新增 `registry/<id>.json`（文件名必须等于插件 `paseo-plugin.json` 的 `id`），或在官方 issue 表单提交（自动建 PR，npm package 字段必填）。
- ⚠️ **新条目强制要求声明公开 npm 包**：`scripts/plugin-security/targets.ts` 对 `!previous && !baseIds.has(id) && !entry.package` 直接抛 `new registry entry "<id>" must declare a public npm package`。git-only 仅对规则生效前已存在的历史条目（`gruvbox`、`catppuccin-theme`）有效，新插件走不通。
- `package.json` 的 `version` 不能是 `0.0.0`（`scripts/scan.ts` 判定为占位符并写入 scanErrors），且仓库 version、npm 已发布 version、registry 声明必须三者一致。
- 发布包内必须带 `paseo-plugin.json` + `index.client.ts`（纯数据主题无需 build），参考 `@omercnet/paseo-dracula` 的 `files` 字段。
- 本机 `~/.npmrc` 指向 npmmirror（只读镜像，不支持发布），发布必须显式指定 `--registry=https://registry.npmjs.org`，否则 paseo.cafe 的校验在 npmjs 上查不到包。
- 本插件发布步骤：`npm publish --registry=https://registry.npmjs.org --access public`，包名 `@mousebomb/paseo-solarized`。

## 开发日志

每次修改后更新 `devlog/`（格式：`YYYYMMDD-<简述>.md`），记录用户需求、问题定位、最终方案。