# Gemini Watermark Remove Skill

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/gemini-watermark-remove.svg)](https://www.npmjs.com/package/gemini-watermark-remove)

[English](README.md)

移除 Google Gemini AI 生成圖片中的浮水印 (Nano Banana)。

## ✨ 功能

- 🚫 自動移除 Gemini 浮水印
- 🔒 完全本地處理，保護隱私
- ⚡ 支援批次處理
- 🎯 自動偵測圖片尺寸並選擇適當遮罩

## 📦 安裝方式

### Antigravity Skill

使用以下指令將此 Skill 加入 Antigravity：

```
/add-skill https://github.com/kevintsai1202/GeminiWatermarkRemoveSkill
```

> 安裝完成後，透過 AI 對話即可調用移除浮水印功能。

## 🚀 使用方式

安裝此 Skill 後，透過 AI 對話即可調用：

### 單張圖片
> "幫我移除這張圖片的浮水印：D:\images\photo.png"

### 批次處理
> "批次移除 D:\images 資料夾內所有圖片的浮水印"

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
