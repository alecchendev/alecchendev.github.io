---
date: 2026-03-12 00:00:00-00:00
title: How to set up google chrome with ublock origin on mac
---

- Download chrome
- Open Automator -> choose application -> Run Shell Script -> Shell: /bin/zsh -> Pass input: as arguments -> paste `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-features=ExtensionManifestV2Unsupported,ExtensionManifestV2Disabled` -> save as "Chrome Launcher" to Applications -> launch (it will show a little gear icon in the top right bar, you can click and cancel it after like 10 seconds)
- Download latest ublock from GitHub, [example](https://github.com/gorhill/uBlock/releases/tag/1.70.0) -> uBlock0_1.70.0.chromium.zip -> double click to unzip -> move somewhere permanent, maybe in Documents/uBlockOrigin
- Visit chrome://extensions -> toggle developer mode -> click Load Unpacked -> select unzipped ublock folder
