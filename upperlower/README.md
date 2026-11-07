# UL 2 · 上 / 下二分化

面向 26 岁女性（163 cm / 53 kg）的上肢 / 下肢二分化训练页。目标是增肌、减脂和功能性训练并行，默认每周 4 个力量日，每次约 60 分钟。

## 结构

- 上肢 A：水平推 / 拉 + 肩 + 手臂
- 下肢 A：深蹲 / 臀推 + 单边 + 核心
- 上肢 B：上斜推 / 垂直拉 + 后束 + 抗旋转
- 下肢 B：髋铰链 / 单腿 + 髋外展 + 提箱

每周安排：上肢 A → 下肢 A → Zone 2 → 上肢 B → 下肢 B → Zone 2 → 休息。刚开始训练可先每周 3 练。

## 文件

- `index.html`：页面结构、训练日容器
- `assets/styles.css`：视觉与响应式布局
- `assets/app.js`：动作库、替代动作、肌群热图
- `assets/gifs/`：真实动作 GIF
- `assets/cover.png`：分享封面（1200 × 630）

## 本地预览

```bash
cd training-2day
python3 -m http.server 8800
# 打开 http://127.0.0.1:8800/
```

## 动作图来源

动作 GIF 由 [Free Exercise DB](https://github.com/yuhonas/free-exercise-db) 的 Public Domain（Unlicense）动作照片制作，每张 GIF 为 2 帧循环，仅用于动作示意。

## 微信访问

- 页面无外链字体、无 CDN；GIF 使用 `loading="lazy"`。
- 如果 `github.io` 在国内网络下较慢，可把整个 `upperlower/` 目录原样上传到腾讯云 COS、阿里云 OSS 或 Cloudflare Pages，不需要改代码。
- 页面已脱敏，不包含姓名、联系方式或医疗信息。
