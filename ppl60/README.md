# PPL 60 · 推 / 拉 / 蹲

一个无构建步骤的静态训练计划页。动作演示使用真实动作 GIF，所有资源本地托管，不依赖 CDN、外链字体或自动播放视频，适合在微信内置浏览器打开。

## 本地预览

```bash
cd ppl60
python3 -m http.server 8788
# 打开 http://127.0.0.1:8788/
```

## 文件

- `index.html`：页面结构、文案、训练日容器
- `assets/styles.css`：视觉与响应式布局
- `assets/app.js`：动作库、替代动作、肌群热图
- `assets/gifs/`：真实动作 GIF（31 个）
- `assets/cover.png`：分享封面（1200 × 630）

## 动作图来源

动作 GIF 由 [Free Exercise DB](https://github.com/yuhonas/free-exercise-db) 的 Public Domain（Unlicense）动作照片制作，每张 GIF 为 2 帧循环，仅用于动作示意。当前共 33 个。

## 更新方式

直接改 `index.html` / `assets/app.js` / `assets/styles.css`，提交到 `gh-pages` 分支即可。没有打包步骤。

## 微信访问注意

- 页面无外链资源，HTTPS 下即可打开；`github.io` 在中国大陆的访问速度和稳定性因网络而异。
- 如果微信里加载慢或打不开，把整个 `ppl60/` 目录原样上传到腾讯云 COS、阿里云 OSS、Cloudflare Pages 或自己的服务器；不需要改代码。
- GIF 总大小约 6 MB，图片使用 `loading="lazy"`，只会加载接近视口的动作；首屏不会一次拉完。
- 微信分享预览图使用 `assets/cover.png`；部分客户端需要部署后重新分享才会刷新缓存。

## 隐私与边界

- 页面已脱敏：不包含姓名、联系方式、化验值或诊断。
- 不建议把个人医疗报告、体重照片或训练日志直接放进公开仓库。
- 训练计划不替代医疗建议；有未闭环的检查或疼痛，先咨询医生 / 康复师。
