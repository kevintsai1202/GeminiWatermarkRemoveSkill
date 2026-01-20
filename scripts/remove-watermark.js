#!/usr/bin/env node

/**
 * Gemini 浮水印移除腳本
 * 使用逆向 Alpha 混合演算法移除 Google Gemini 生成圖片中的浮水印
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 常數定義
const CONSTANTS = {
    LARGE_THRESHOLD: 1024,  // 大圖片閾值
    MARGIN_LARGE: 64,       // 大圖片邊距
    MARGIN_SMALL: 32,       // 小圖片邊距
    LOGO_VALUE: 255.0,      // 浮水印顏色值（白色）
    ALPHA_THRESHOLD: 0.002, // Alpha 門檻值
    MAX_ALPHA: 0.99         // 最大 Alpha 值
};

// 載入遮罩圖片並提取 Alpha 通道
async function loadMask(maskPath) {
    const maskBuffer = await sharp(maskPath)
        .raw()
        .toBuffer({ resolveWithObject: true });

    const { data, info } = maskBuffer;
    const { width, height, channels } = info;

    // 計算 Alpha 值（使用最大 RGB 值）
    const alphas = new Float32Array(width * height);
    for (let i = 0; i < width * height; i++) {
        const pixelOffset = i * channels;
        const r = data[pixelOffset];
        const g = data[pixelOffset + 1];
        const b = data[pixelOffset + 2];
        const maxVal = Math.max(r, Math.max(g, b));
        alphas[i] = maxVal / 255.0;
    }

    return { width, height, alphas };
}

// 移除浮水印核心演算法
function removeWatermark(imageData, width, height, mask, config) {
    const { forceMode, alphaGain } = config;

    // 1. 決定使用的遮罩模式
    let mode = forceMode;
    if (mode === 'auto') {
        mode = (width > CONSTANTS.LARGE_THRESHOLD && height > CONSTANTS.LARGE_THRESHOLD)
            ? 'large' : 'small';
    }

    // 2. 取得對應的遮罩與邊距
    const currentMask = mask[mode];
    if (!currentMask) {
        throw new Error(`遮罩 ${mode} 未載入`);
    }

    const margin = mode === 'large' ? CONSTANTS.MARGIN_LARGE : CONSTANTS.MARGIN_SMALL;

    // 3. 計算浮水印位置（右下角）
    const posX = width - margin - currentMask.width;
    const posY = height - margin - currentMask.height;

    if (posX < 0 || posY < 0) {
        console.log('圖片尺寸過小，跳過處理');
        return imageData;
    }

    console.log(`使用 ${mode} 模式，浮水印位置: (${posX}, ${posY})`);

    // 4. 處理每個像素
    const data = imageData;
    const channels = 3; // RGB

    for (let my = 0; my < currentMask.height; my++) {
        for (let mx = 0; mx < currentMask.width; mx++) {
            const iy = posY + my;
            const ix = posX + mx;

            if (ix >= width || iy >= height) continue;

            const mIdx = my * currentMask.width + mx;
            let alpha = currentMask.alphas[mIdx] * alphaGain;

            if (alpha < CONSTANTS.ALPHA_THRESHOLD) continue;
            if (alpha > CONSTANTS.MAX_ALPHA) alpha = CONSTANTS.MAX_ALPHA;

            const oneMinusAlpha = 1.0 - alpha;
            const idx = (iy * width + ix) * channels;

            // 逆向 Alpha 混合還原每個顏色通道
            for (let c = 0; c < 3; c++) {
                const currentVal = data[idx + c];
                let original = (currentVal - alpha * CONSTANTS.LOGO_VALUE) / oneMinusAlpha;
                if (original < 0) original = 0;
                if (original > 255) original = 255;
                data[idx + c] = Math.round(original);
            }
        }
    }

    return data;
}

// 解析命令列參數
function parseArgs(args) {
    const result = {
        input: null,
        output: null,
        mode: 'auto',
        gain: 1.0
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg === '--output' || arg === '-o') {
            result.output = args[++i];
        } else if (arg === '--mode' || arg === '-m') {
            result.mode = args[++i];
        } else if (arg === '--gain' || arg === '-g') {
            result.gain = parseFloat(args[++i]);
        } else if (!arg.startsWith('-') && !result.input) {
            result.input = arg;
        }
    }

    return result;
}

// 主函式
async function main() {
    const args = process.argv.slice(2);

    if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
        console.log(`
Gemini 浮水印移除工具

使用方式:
  node remove-watermark.js <輸入圖片> [選項]

選項:
  -o, --output <路徑>   輸出檔案路徑 (預設: 輸入檔名_clean)
  -m, --mode <模式>     遮罩模式: auto, small, large (預設: auto)
  -g, --gain <數值>     Alpha 增益值 1.0-3.0 (預設: 1.0)
  -h, --help            顯示此說明

範例:
  node remove-watermark.js image.png
  node remove-watermark.js image.png -o clean.png -m large
        `);
        process.exit(0);
    }

    // 解析參數
    const config = parseArgs(args);

    if (!config.input) {
        console.error('錯誤: 請指定輸入圖片路徑');
        process.exit(1);
    }

    if (!fs.existsSync(config.input)) {
        console.error(`錯誤: 找不到檔案 ${config.input}`);
        process.exit(1);
    }

    // 設定輸出路徑
    if (!config.output) {
        const ext = path.extname(config.input);
        const base = path.basename(config.input, ext);
        const dir = path.dirname(config.input);
        config.output = path.join(dir, `${base}_clean${ext}`);
    }

    console.log(`處理圖片: ${config.input}`);
    console.log(`輸出路徑: ${config.output}`);

    try {
        // 載入遮罩
        const skillDir = path.dirname(__dirname);
        const mask = {
            small: await loadMask(path.join(skillDir, 'assets', 'mask_48.png')),
            large: await loadMask(path.join(skillDir, 'assets', 'mask_96.png'))
        };

        console.log('遮罩載入完成');

        // 載入並處理圖片
        const image = sharp(config.input);
        const metadata = await image.metadata();
        const { width, height } = metadata;

        console.log(`圖片尺寸: ${width} x ${height}`);

        // 取得 RGB 像素資料
        const rawBuffer = await image.removeAlpha().raw().toBuffer();
        const imageData = new Uint8Array(rawBuffer);

        // 移除浮水印
        const processedData = removeWatermark(imageData, width, height, mask, {
            forceMode: config.mode,
            alphaGain: config.gain
        });

        // 儲存處理後的圖片
        await sharp(Buffer.from(processedData), {
            raw: {
                width,
                height,
                channels: 3
            }
        }).toFile(config.output);

        console.log(`✅ 處理完成: ${config.output}`);

    } catch (error) {
        console.error(`錯誤: ${error.message}`);
        process.exit(1);
    }
}

main();
