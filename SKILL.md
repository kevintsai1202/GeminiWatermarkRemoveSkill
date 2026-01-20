---
name: gemini-watermark-remove
description: 移除 Google Gemini 生成圖片中的浮水印，使用逆向 Alpha 混合演算法精確還原被覆蓋的像素
---

# Gemini 浮水印移除工具

此 Skill 可移除由 Google Gemini AI 生成圖片中的浮水印。完全在本地執行，無需上傳圖片至任何伺服器。

## 技術原理

使用**逆向 Alpha 混合演算法 (Reverse Alpha Blending)**：

```
原始像素 = (當前像素 - alpha × 浮水印顏色) / (1 - alpha)
```

浮水印位置固定於圖片右下角，根據圖片尺寸自動選擇適當的遮罩大小：
- **小圖** (≤1024px)：使用 48×48 遮罩，邊距 32px
- **大圖** (>1024px)：使用 96×96 遮罩，邊距 64px

## 使用方式

### 執行腳本

```powershell
# 安裝依賴（首次使用）
cd <skill-directory>
npm install sharp

# 移除單張圖片浮水印
node scripts/remove-watermark.js <輸入圖片路徑> --output <輸出圖片路徑>

# 範例
node scripts/remove-watermark.js "C:\images\gemini_image.png" --output "C:\images\clean.png"
```

### 參數說明

| 參數 | 說明 | 預設值 |
|------|------|--------|
| `--output`, `-o` | 輸出檔案路徑 | 輸入檔名加上 `_clean` 後綴 |
| `--mode`, `-m` | 遮罩模式：`auto`、`small`、`large` | `auto` |
| `--gain`, `-g` | Alpha 增益值 (1.0-3.0) | `1.0` |

### 批次處理

```powershell
# 處理資料夾中所有圖片
Get-ChildItem "C:\images\*.png" | ForEach-Object {
    node scripts/remove-watermark.js $_.FullName
}
```

## 資源檔案

- `assets/mask_48.png` - 小尺寸浮水印遮罩
- `assets/mask_96.png` - 大尺寸浮水印遮罩

## 致謝

基於 [GeminiWatermarkRemove](https://github.com/kevintsai1202/GeminiWatermarkRemove) 專案。

## 授權

MIT License
