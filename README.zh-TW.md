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

### 方式一：透過 npx add-skill 安裝（推薦）

使用 [add-skill](https://github.com/vercel-labs/add-skill) 工具可以快速安裝到各種 AI 代理程式。

#### 自動偵測已安裝的代理程式

```bash
npx add-skill kevintsai1202/GeminiWatermarkRemoveSkill
```

#### 安裝到特定代理程式

```bash
# 安裝到 Antigravity
npx add-skill kevintsai1202/GeminiWatermarkRemoveSkill -a antigravity -g -y

# 安裝到 Claude Code
npx add-skill kevintsai1202/GeminiWatermarkRemoveSkill -a claude-code -g -y

# 安裝到 Cursor
npx add-skill kevintsai1202/GeminiWatermarkRemoveSkill -a cursor -g -y

# 安裝到 Roo Code
npx add-skill kevintsai1202/GeminiWatermarkRemoveSkill -a roo -g -y

# 安裝到 Gemini CLI
npx add-skill kevintsai1202/GeminiWatermarkRemoveSkill -a gemini-cli -g -y
```

**參數說明：**
- `-a, --agent <agents...>`：指定要安裝的代理程式
- `-g, --global`：安裝到全域目錄
- `-y, --yes`：跳過確認提示

### 方式二：透過 Git 複製

```bash
# 複製到 Antigravity 的 skills 目錄
git clone https://github.com/kevintsai1202/GeminiWatermarkRemoveSkill.git ~/.gemini/antigravity/skills/gemini-watermark-remove

# 複製到 Claude Code 的 skills 目錄
git clone https://github.com/kevintsai1202/GeminiWatermarkRemoveSkill.git ~/.claude/skills/gemini-watermark-remove
```

### 方式三：手動安裝

1. 下載本專案的 ZIP 檔案或複製到本機
2. 將資料夾複製到對應工具的技能目錄：
   - **Antigravity**: `~/.gemini/antigravity/skills/`
   - **Claude Code**: `~/.claude/skills/`

### 驗證安裝

重新啟動 AI 代理程式或重新載入 skills，然後透過 AI 對話調用即可。

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
