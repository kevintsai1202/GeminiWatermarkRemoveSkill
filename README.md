# Gemini Watermark Remove Skill

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

移除 Google Gemini AI 生成圖片中的浮水印。使用逆向 Alpha 混合演算法精確還原被覆蓋的像素。

## ✨ 功能

- 🚫 自動移除 Gemini 浮水印
- 🔒 完全本地處理，保護隱私
- ⚡ 支援批次處理
- 🎯 自動偵測圖片尺寸並選擇適當遮罩

## 📦 安裝

```powershell
# 1. 複製專案
git clone https://github.com/kevintsai1202/GeminiWatermarkRemoveSkill.git

# 2. 安裝依賴
cd GeminiWatermarkRemoveSkill
npm install sharp
```

## 🚀 使用方式

```powershell
# 基本用法
node scripts/remove-watermark.js <輸入圖片>

# 指定輸出路徑
node scripts/remove-watermark.js image.png --output clean.png

# 強制使用大尺寸遮罩
node scripts/remove-watermark.js image.png --mode large

# 調整 Alpha 增益值
node scripts/remove-watermark.js image.png --gain 1.5
```

### 參數說明

| 參數 | 說明 | 預設值 |
|------|------|--------|
| `-o, --output` | 輸出檔案路徑 | `{輸入檔名}_clean.{副檔名}` |
| `-m, --mode` | 遮罩模式: `auto`, `small`, `large` | `auto` |
| `-g, --gain` | Alpha 增益值 (1.0-3.0) | `1.0` |

## 🛠️ 技術原理

使用逆向 Alpha 混合演算法：

```
原始像素 = (當前像素 - α × 浮水印顏色) / (1 - α)
```

根據圖片尺寸自動選擇：
- **≤1024px**: 使用 48×48 遮罩
- **>1024px**: 使用 96×96 遮罩

## 📁 目錄結構

```
GeminiWatermarkRemoveSkill/
├── SKILL.md                      # Skill 說明
├── README.md                     # 本文件
├── assets/
│   ├── mask_48.png               # 小尺寸遮罩
│   └── mask_96.png               # 大尺寸遮罩
└── scripts/
    └── remove-watermark.js       # 主腳本
```

## 🙏 致謝

基於 [GeminiWatermarkRemove](https://github.com/kevintsai1202/GeminiWatermarkRemove) 專案。

## 📄 授權

MIT License
