# Paseo Solarized Light 主题插件

本文件沉淀 Paseo 主题插件机制的关键技术资料，避免以后重复上网/查源码。

## 项目背景

为 Paseo 贡献的 Solarized Light 应用主题插件，基于 Paseo 官方插件主题贡献点 `client.addTheme`（v0.5.0 引入，v0.8.0 起从 `plugin.addTheme` 改为 client 入口注册）。

- Paseo 源码：`https://github.com/getpaseo/paseo`（AGPLv3，monorepo）
- 前端在 `packages/app`（Expo + React Native + Unistyles）
- 插件当前适配版本：**0.8.0**

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

- Light 主题下 `surface3`（border）应为「比背景略深的浅色」，若设成中灰（如 base1 `#93a1a1`）会与深色正文 `foreground` 撞亮度，对比度仅 ~1.7:1，可读性差
- Solarized Light 当前最终值：`border: #e6e0cd`（介于 base2/base3），气泡文字 `#657b83` 对比度 ~3.7:1
- 对比度经验：文字与背景都落在中间亮度段必糊，背景应走极端（很浅或很深）

## 常用命令

```bash
# Paseo CLI 不在 PATH 时用完整路径
export PATH="/Applications/Paseo.app/Contents/Resources/bin:$PATH"

paseo plugin reload solarized-light   # 改代码后热重载
paseo plugin ls                       # 查看状态
paseo plugin logs solarized-light     # 查看日志
paseo plugin disable/enable solarized-light
paseo plugin remove solarized-light   # 只删配置不删源码目录
```

## 验证

```bash
npm run typecheck   # 必须通过
paseo plugin reload solarized-light && paseo plugin ls
```

## 开发日志

每次修改后更新 `devlog/`（格式：`YYYYMMDD-<简述>.md`），记录用户需求、问题定位、最终方案。