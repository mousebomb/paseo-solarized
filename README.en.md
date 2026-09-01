# Paseo Solarized Light Theme Plugin

[中文](README.md) | English

A **Solarized Light** application theme for [Paseo](https://github.com/getpaseo/paseo). Low-contrast and easy on the eyes, ideal for long coding sessions.

Implemented through Paseo's official plugin theme contribution point (`plugin.addTheme`, introduced in v0.5.0). **No modification of Paseo's own files required** — safe across upgrades.

## Palette

Based on [Solarized](https://ethanschoonover.com/solarized) by Ethan Schoonover (MIT License, see `NOTICE`).

## Requirements

- Paseo **0.5.0** or later (Git install requires **0.7.0**; `addTheme` introduced in 0.5.0)
- Node.js 22+ (only needed for the source-directory install)

## Install

### Option 1: Install from Git repository (recommended, Paseo 0.7.0+)

```bash
paseo plugin add mousebomb/paseo-solarized-light
paseo plugin update solarized-light   # update to the latest
paseo plugin status solarized-light   # check version status
```

### Option 2: Source-directory install (for development, Paseo 0.5.0+)

```bash
git clone https://github.com/mousebomb/paseo-solarized-light.git
cd paseo-solarized-light
npm install
npm run typecheck

# install into the Paseo daemon
paseo plugin install /path/to/paseo-solarized-light
paseo reload
```

If `paseo` is not on your PATH, use the full path:

```bash
/Applications/Paseo.app/Contents/Resources/bin/paseo plugin install /path/to/paseo-solarized-light
/Applications/Paseo.app/Contents/Resources/bin/paseo reload
```

### Enable

1. Open Paseo → **Settings → Plugins** → turn on **Enable plugins** (global switch)
2. **Settings → Appearance** → select **Solarized Light** as the Theme

![image-20260902063641347](README.en.assets/image-20260902063641347.png)

![SCR-20260902-gdiw](README.en.assets/SCR-20260902-gdiw.png)

## Usage

- Hot-reload after code changes: `paseo plugin reload solarized-light`
- Check status: `paseo plugin ls`
- View logs: `paseo plugin logs solarized-light`
- Disable/Enable: `paseo plugin disable solarized-light` / `paseo plugin enable solarized-light`
- Remove (removes config only, keeps the source directory): `paseo plugin remove solarized-light`

## License

- Plugin code: MIT
- Solarized palette: MIT, Copyright (c) 2011 Ethan Schoonover — full license in [`NOTICE`](./NOTICE)
