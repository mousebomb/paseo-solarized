# 2026-09-21 提交 paseo.cafe 收录

## 用户原始需求

把插件提交到 paseo.cafe 官方插件目录（`registry/<id>.json`），期望照抄 `gruvbox.json`（git-only、省略 `path`）。

## 问题定位

首次按 git-only 提 PR（#195）后 CI `Registry admission` 直接失败：

```
error: new registry entry "solarized" must declare a public npm package
  at selectPullRequestTargets (scripts/plugin-security/targets.ts:100)
```

关键规则：`targets.ts` 对 `!previous && !baseIds.has(id) && !entry.package` 抛错。`gruvbox`、`catppuccin-theme` 能无 npm 收录，仅因为它们早于该规则；新条目必须声明公开 npm 包（`README` 虽写 `package` 可选，但 admission 工作流强制）。

另发现仓库 `package.json` 的 `version` 是 `0.0.0`，`scripts/scan.ts:747` 会把它当占位符写入 scanErrors，目录会显示 unavailable。

## 解决方案

1. **改造成可发布 npm 包**：`package.json` 去掉 `"private": true`，包名 `@mousebomb/paseo-solarized`，version `0.1.0`，补 `files`（`index.client.ts` + `paseo-plugin.json` + README + LICENSE）、`publishConfig.access: public`、repository/keywords；新增 MIT `LICENSE`。
2. **发布到 npmjs**：本机 `~/.npmrc` 指向 npmmirror（只读镜像），必须显式 `npm publish --registry=https://registry.npmjs.org --access public`。发布后 npm packument 有约 2.5 分钟复制延迟（`/<pkg>/0.1.0` 已 200 但 packument 仍 404），期间 CI 会误报 404。
3. **registry 条目**：新增 `registry/solarized.json`（文件名 = 插件 id，故不是 `solarized-light.json`），声明 `"package": "@mousebomb/paseo-solarized"`。
4. **AGENTS.md** 沉淀全部规则（新条目强制 npm、id 必须匹配文件名、version 非 0.0.0、npmmirror 不能发布）。

## 验证

- 发布包 tarball 内容：`package/{paseo-plugin.json, index.client.ts, package.json, LICENSE, README*.md}`。
- PR #195：`Registry admission` + CodeRabbit 全绿，`MERGEABLE`，等待维护者合并。

## 备注

- 提交入口文件必须是 `paseo-plugin.json.id` 对应的名字（`solarized.json`）；旧仓库 `paseo-solarized-light` 若日后要单独收录，需要另发一个 npm 包。
- 发布后每次更新插件代码都要在 `package.json` 提升 version，否则 catalog 不更新（scanner 以 version 为更新标识）。
