# Paseo Solarized

[中文](README.zh.md) | English

Solarized Light and Solarized Dark themes for [Paseo](https://github.com/getpaseo/paseo). One plugin provides both themes; switch between them under **Settings → Appearance → Theme**.

![Solarized Dark](https://raw.githubusercontent.com/mousebomb/paseo-solarized/main/README.en.assets/image-20260902063641347.png)

## Install

Requires Paseo 0.11 or later. Pick **one** of the following:

### Official registry

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

Then enable the plugin and pick a theme:

1. **Settings → Plugins** → turn on **Enable plugins**
2. **Settings → Appearance → Theme** → select **Solarized Light** or **Solarized Dark**

To update later:

```bash
paseo plugin update solarized
```

If `paseo` is not on your PATH:

```bash
/Applications/Paseo.app/Contents/Resources/bin/paseo plugin add mousebomb/solarized
```

## Source install (for development)

Requires Node.js 22 or later.

```bash
git clone https://github.com/mousebomb/paseo-solarized.git
cd paseo-solarized
npm install
npm run typecheck

paseo plugin add .
```

After changing the code, hot-reload the plugin:

```bash
paseo plugin reload solarized
```

## License

- Plugin code: MIT
- Solarized palette: MIT, Copyright (c) 2011 Ethan Schoonover — see [`NOTICE`](./NOTICE)
