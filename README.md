# Paseo Solarized 主题插件

[English](README.en.md) | 中文

为 [Paseo](https://github.com/getpaseo/paseo) 移植的 **Solarized** 明暗双主题，低对比度、柔和护眼，适合长期盯着屏幕的编程场景。同一个插件同时提供 **Solarized Light** 与 **Solarized Dark**，在 **Settings → Appearance → Theme** 里切换。

本插件通过 Paseo 官方的插件主题贡献点（`client.addTheme`；主题能力自 v0.5.0 引入，v0.8.0 起插件改用 client/server 分离入口）实现，**无需修改 Paseo 任何文件**，升级不丢失。

https://github.com/user-attachments/assets/d5a20398-b03c-4917-ac1c-a6994813662b

## 色板

基于 Ethan Schoonover 的 [Solarized](https://ethanschoonover.com/solarized) 配色（MIT License，见 `NOTICE`），两套主题分别取浅色端 / 深色端：

| 插件字段 | Solarized Light | Solarized Dark |
|---|---|---|
| `background` | `#fdf6e3` base3 | `#002b36` base03 |
| `foreground` | `#657b83` base00 | `#839496` base0 |
| `raised` / `control` | `#eee8d5` base2 | `#073642` base02 |
| `border`（用户气泡背景） | `#e6e0cd` | `#073642` base02 |
| `accent` | `#cb4b16` orange | `#2aa198` cyan |
| `mutedForeground` | `#839496` base0 | `#586e75` base01 |
| `ring` | `#586e75` base01 | `#93a1a1` base1 |

两处有意的偏离：深色端正文改用 base0（base00 在 `#002b36` 上对比度仅 3.4:1，不达正文标准）；深色端 `accent` 改用 cyan（orange 作为强调底色时与深色文字对比度仅 3.3:1）。用户气泡背景绑定在 `border` 字段，深色端取 base02，气泡文字对比度 4.1:1。

## 环境要求

- Paseo **0.8.0** 或更高版本（`paseo-plugin.json` 声明 `requirements.paseo >=0.8.0`，插件不再兼容 0.8 以下 host）
- Node.js 22+（仅源码目录安装需要）

## 安装

### 方式1️⃣：从 npm 安装（Paseo 0.9+）

```bash
paseo plugin add npm:@mousebomb/paseo-solarized@0.1.0
```

### 方式2️⃣：从 Git 仓库安装（Paseo 0.8.0+）

```bash
paseo plugin add mousebomb/paseo-solarized
paseo plugin update solarized   # 更新到最新
paseo plugin status solarized   # 查看版本状态
```

如果 `paseo` 命令不在 PATH，用完整路径：

```bash
/Applications/Paseo.app/Contents/Resources/bin/paseo plugin install mousebomb/paseo-solarized
/Applications/Paseo.app/Contents/Resources/bin/paseo reload
```

### 方式3️⃣：源码目录安装（开发迭代用，Paseo 0.8.0+）

```bash
git clone https://github.com/mousebomb/paseo-solarized.git
cd paseo-solarized
npm install
npm run typecheck

# 安装到 Paseo daemon
paseo plugin install /path/to/paseo-solarized
paseo reload
```

如果 `paseo` 命令不在 PATH，用完整路径：

```bash
/Applications/Paseo.app/Contents/Resources/bin/paseo plugin install /path/to/paseo-solarized
/Applications/Paseo.app/Contents/Resources/bin/paseo reload
```

### 启用

1. 打开 Paseo → **Settings → Plugins** → 打开 **Enable plugins**（全局开关）
2. **Settings → Appearance** → Theme 选择 **Solarized Light** 或 **Solarized Dark**

![image-20260902062537168](README.assets/image-20260902062537168.png)

![image-20260902062342515](README.assets/image-20260902062342515.png)

## 使用

- 改代码后热重载：`paseo plugin reload solarized`
- 查看状态：`paseo plugin ls`
- 查看日志：`paseo plugin logs solarized`
- 停用/启用：`paseo plugin disable solarized` / `paseo plugin enable solarized`
- 移除（只删配置，不删源码目录）：`paseo plugin remove solarized`



## License

- 插件代码：MIT
- Solarized 配色：MIT，Copyright (c) 2011 Ethan Schoonover，完整许可见 [`NOTICE`](./NOTICE)
