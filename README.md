# Gemini Watermark Remove Skill

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/gemini-watermark-remove.svg)](https://www.npmjs.com/package/gemini-watermark-remove)

[繁體中文](README.zh-TW.md)

Remove watermarks from Google Gemini AI generated images.

## ✨ Features

- 🚫 Automatically remove Gemini watermarks
- 🔒 Fully local processing, protecting privacy
- ⚡ Batch processing support
- 🎯 Auto-detect image size and select appropriate mask

## 🚀 Usage

After installing this Skill, invoke it through AI conversation:

### Single Image
> "Remove the watermark from this image: D:\images\photo.png"

### Batch Processing
> "Batch remove watermarks from all images in D:\images folder"

## 🛠️ Technical Principle

Uses reverse Alpha blending algorithm to precisely restore pixels covered by watermarks:

```
Original Pixel = (Current Pixel - α × Watermark Color) / (1 - α)
```

Auto-select mask based on image size:
- **≤1024px**: Use 48×48 mask
- **>1024px**: Use 96×96 mask

## 📄 License

MIT License
