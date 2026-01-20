# Gemini Watermark Remove Skill

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/gemini-watermark-remove.svg)](https://www.npmjs.com/package/gemini-watermark-remove)

移除 Google Gemini AI 生成圖片中的浮水印。使用逆向 Alpha 混合演算法精確還原被覆蓋的像素。

## ✨ 功能

- 🚫 自動移除 Gemini 浮水印
- 🔒 完全本地處理，保護隱私
- ⚡ 支援批次處理
- 🎯 自動偵測圖片尺寸並選擇適當遮罩

## 📦 安裝與使用

### 方法一：npx（推薦，無需安裝）

```powershell
npx gemini-watermark-remove <圖片路徑>
```

### 方法二：全域安裝

```powershell
npm install -g gemini-watermark-remove
gemini-watermark-remove <圖片路徑>
```

### 方法三：從原始碼

```powershell
git clone https://github.com/kevintsai1202/GeminiWatermarkRemoveSkill.git
cd GeminiWatermarkRemoveSkill
npm install
node scripts/remove-watermark.js <圖片路徑>
```

## 🚀 使用範例

```powershell
# 基本用法
npx gemini-watermark-remove image.png

# 指定輸出路徑
npx gemini-watermark-remove image.png --output clean.png

# 強制使用大尺寸遮罩
npx gemini-watermark-remove image.png --mode large

# 調整 Alpha 增益值
npx gemini-watermark-remove image.png --gain 1.5
```

### 參數說明

| 參數 | 說明 | 預設值 |
|------|------|--------|
| `-o, --output` | 輸出檔案路徑 | `{輸入檔名}_clean.{副檔名}` |
| `-m, --mode` | 遮罩模式: `auto`, `small`, `large` | `auto` |
| `-g, --gain` | Alpha 增益值 (1.0-3.0) | `1.0` |

## 📁 批次處理

使用 PowerShell 批次處理多張圖片：

```powershell
# 處理當前目錄所有 PNG 檔案
Get-ChildItem "*.png" | ForEach-Object { npx gemini-watermark-remove $_.FullName }

# 處理指定資料夾內的所有圖片
Get-ChildItem "D:\Images\*.png" | ForEach-Object { npx gemini-watermark-remove $_.FullName }

# 遞迴處理子目錄
Get-ChildItem "*.png" -Recurse | ForEach-Object { npx gemini-watermark-remove $_.FullName }
```

## 🛠️ 技術原理

使用逆向 Alpha 混合演算法：

```
原始像素 = (當前像素 - α × 浮水印顏色) / (1 - α)
```

根據圖片尺寸自動選擇：
- **≤1024px**: 使用 48×48 遮罩
- **>1024px**: 使用 96×96 遮罩

## 🙏 致謝

基於 [GeminiWatermarkRemove](https://github.com/kevintsai1202/GeminiWatermarkRemove) 專案。

## 📄 授權

MIT License
