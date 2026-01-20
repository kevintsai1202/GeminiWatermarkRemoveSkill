# Gemini Watermark Remove Skill

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/gemini-watermark-remove.svg)](https://www.npmjs.com/package/gemini-watermark-remove)

[繁體中文](README.zh-TW.md)

Remove watermarks from Google Gemini AI generated images (Nano Banana).

## ✨ Features

- 🚫 Automatically remove Gemini watermarks
- 🔒 Fully local processing, protecting privacy
- ⚡ Batch processing support
- 🎯 Auto-detect image size and select appropriate mask

## 📦 Installation

### Method 1: npx add-skill (Recommended)

Use [add-skill](https://github.com/vercel-labs/add-skill) for quick installation to various AI agents.

#### Auto-detect installed agents

```bash
npx add-skill kevintsai1202/GeminiWatermarkRemoveSkill
```

#### Install to specific agent

```bash
# Install to Antigravity
npx add-skill kevintsai1202/GeminiWatermarkRemoveSkill -a antigravity -g -y

# Install to Claude Code
npx add-skill kevintsai1202/GeminiWatermarkRemoveSkill -a claude-code -g -y

# Install to Cursor
npx add-skill kevintsai1202/GeminiWatermarkRemoveSkill -a cursor -g -y

# Install to Roo Code
npx add-skill kevintsai1202/GeminiWatermarkRemoveSkill -a roo -g -y

# Install to Gemini CLI
npx add-skill kevintsai1202/GeminiWatermarkRemoveSkill -a gemini-cli -g -y
```

**Parameters:**
- `-a, --agent <agents...>`: Specify target agent
- `-g, --global`: Install to global directory
- `-y, --yes`: Skip confirmation prompt

### Method 2: Git Clone

```bash
# Clone to Antigravity skills directory
git clone https://github.com/kevintsai1202/GeminiWatermarkRemoveSkill.git ~/.gemini/antigravity/skills/gemini-watermark-remove

# Clone to Claude Code skills directory
git clone https://github.com/kevintsai1202/GeminiWatermarkRemoveSkill.git ~/.claude/skills/gemini-watermark-remove
```

### Method 3: Manual Installation

1. Download ZIP or clone this repository
2. Copy the folder to the corresponding skills directory:
   - **Antigravity**: `~/.gemini/antigravity/skills/`
   - **Claude Code**: `~/.claude/skills/`

### Verify Installation

Restart your AI agent or reload skills, then invoke through AI conversation.

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
