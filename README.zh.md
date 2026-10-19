# Paseo Solarized 主题插件

[English](README.md) | 中文

为 [Paseo](https://github.com/getpaseo/paseo) 提供的 **Solarized** 明暗双主题。同一个插件同时包含 Solarized Light 与 Solarized Dark，在 **Settings → Appearance → Theme** 里切换。

![Solarized Dark](https://raw.githubusercontent.com/mousebomb/paseo-solarized/main/README.assets/image-20260902062342515.png)

## 安装

需要 Paseo 0.11 或更高版本。以下三种方式**任选其一**：

### 官方插件中心

```bash
paseo plugin add mousebomb/solarized
```

### npm

```bash
paseo plugin add npm:@mousebomb/paseo-solarized
```

### Git

```bash
paseo plugin add github:mousebomb/paseo-solarized
```

安装后启用插件并选择主题：

1. **Settings → Plugins** → 打开 **Enable plugins**
2. **Settings → Appearance → Theme** → 选择 **Solarized Light** 或 **Solarized Dark**

以后更新：

```bash
paseo plugin update solarized
```

如果 `paseo` 命令不在 PATH：

```bash
/Applications/Paseo.app/Contents/Resources/bin/paseo plugin add mousebomb/solarized
```

## 源码安装（开发用）

需要 Node.js 22 或更高版本。

```bash
git clone https://github.com/mousebomb/paseo-solarized.git
cd paseo-solarized
npm install
npm run typecheck

paseo plugin add .
```

修改代码后热重载：

```bash
paseo plugin reload solarized
```

## License

- 插件代码：MIT
- Solarized 配色：MIT，Copyright (c) 2011 Ethan Schoonover，详见 [`NOTICE`](./NOTICE)
