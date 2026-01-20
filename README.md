# Gemini Watermark Remove Skill

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/gemini-watermark-remove.svg)](https://www.npmjs.com/package/gemini-watermark-remove)

移除 Google Gemini AI 生成圖片中的浮水印。

## ✨ 功能

- 🚫 自動移除 Gemini 浮水印
- 🔒 完全本地處理，保護隱私
- ⚡ 支援批次處理
- 🎯 自動偵測圖片尺寸並選擇適當遮罩

## 🛠️ 技術原理

使用逆向 Alpha 混合演算法精確還原被浮水印覆蓋的像素：

```
原始像素 = (當前像素 - α × 浮水印顏色) / (1 - α)
```

根據圖片尺寸自動選擇遮罩：
- **≤1024px**: 使用 48×48 遮罩
- **>1024px**: 使用 96×96 遮罩

## 📄 授權

MIT License
