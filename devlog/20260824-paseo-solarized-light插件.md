# 20260824 - Paseo Solarized Light 主题插件

## 用户原始需求

在 `/Users/rhett/MyWork/2026/paseo-solarized-light` 创建 Paseo 插件项目，提供 Solarized Light 应用主题（低对比度、柔和护眼），写好 README 并附上安装方法。起因是 Paseo 自带 6 个主题对比度过高，此前通过改 bundle 注入 Solarized 的方案在官方插件主题功能上线后应退役。

## 背景结论（前期调研）

- 官方插件主题贡献点 `plugin.addTheme` 随 PR #3602 于 2026-08-21 合并、v0.5.0/0.5.1 发布，官方明确声明取代 #2088（Solarized Teal 内置）和 #2449（自定义 JSON 主题）两个一直未合并的 PR。
- Paseo 插件系统定位为本地使用，无分发机制；分享 = 分发源码目录。
- Solarized 配色为 MIT License（Copyright 2011 Ethan Schoonover），分发需在 NOTICE 中保留版权与许可声明。
- 本机 Paseo.app 已升级至 0.5.1，`paseo` CLI 位于 `/Applications/Paseo.app/Contents/Resources/bin/paseo`（不在 PATH）。

## 完成内容

- `paseo plugin init` 生成官方骨架，重写 `index.ts` 为纯 `addTheme` 调用（8 个色值，Solarized Light 映射 base3/base00/base2/base1/blue）。
- 删除无需的 `main.client.tsx`；`paseo-plugin.json` 插件 id 设为 `solarized-light`。
- 新增 `NOTICE`（Solarized MIT 完整许可）与 `README.md`（中文，含安装/启用/热重载/分享方法）。
- `npm install` + `npm run typecheck` 通过。
- 用户手动安装插件至 daemon 成功（`paseo plugin install` + Settings → Appearance 选择主题）。

## 配色细化（对照 Obsidian Solarized 主题）

用户反馈主题细节不如 Obsidian 的 Solarized 皮肤，参照其 `.obsidian/themes/Solarized/theme.css`（作者 harmtemolder）逐项对齐，两处偏差修正：

| Token | 旧 | 新 | 对齐 Obsidian 变量 |
|---|---|---|---|
| `accent` | `#268bd2` 蓝 | `#cb4b16` 橙 | `--interactive-accent`（按钮/选择/焦点/checkbox） |
| `mutedForeground` | `#93a1a1` | `#839496` | `--text-muted`（= base0；base1 是 faint 层级，原用浅了） |
| `ring` | `#93a1a1` | `#586e75` | base01，焦点环/滚动条更清晰 |

background/foreground/raised 本就与 Obsidian（`--background-primary`=base3、`--text-normal`=base00、`--background-primary-alt`=base2）一致。

## 已知限制

Paseo 插件主题 API（`addTheme`）仅暴露 8 个色值，其余语义 token 由 Paseo 自动派生，无法复刻 Obsidian 的全部细节（标题 cyan `#2aa198`、链接 blue `#268bd2`、代码 token 色、高亮背景等）。上游 issue #3746（feat(plugin): expose semantic surface, border, and status tokens to PluginTheme，2026-08-23 提出）若合并可扩展 token 位，届时才能复刻这些细节。已 `paseo plugin reload solarized-light` 热重载验证 running。

## 待办

- 已由用户手动安装启用（Settings → Appearance 选择 Solarized Light）。
- 待观察实际观感：如 accent 想换蓝（`#268bd2`）或 teal（`#2aa198`）改 `index.ts` 后 reload 即可。
- 关注上游 #3746：若合并，扩展 token 后可进一步对齐 Obsidian 细节。