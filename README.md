
# Essayist

Essayist 是一个基于 Node.js 的应用，旨在将视频字幕文件转换成精炼的文章。该过程完全由 AI 驱动，确保从视频字幕中提取出最具信息性和相关性的内容。

## 功能

- **字幕解析**: 自动解析各种格式的视频字幕文件。
- **内容生成**: 利用 GPT-4 模型，将字幕中的信息转换成连贯的文章形式。
- **AI 筛选**: 通过 AI 技术筛选并优化生成的文章内容，确保文章的质量和相关性。

## 开始使用

以下指南将帮助你在本地环境中部署和运行 Essayist。

### 先决条件

确保你的机器已经安装了 Node.js。你可以从 [Node.js官网](https://nodejs.org/) 下载和安装。

### 安装

首先，克隆仓库到你的本地机器：

```bash
git clone https://github.com/Glomzzz/Essayist.git
cd Essayist
```

安装必要的依赖：

```bash
npm install
```

### 使用

将视频字幕文本写在 `subtitles.txt` 中，然后运行以下命令：

运行程序：

```bash
node app.js
```

你可以在 `output` 目录下找到生成的文章文件。

### 配置

有两组可以自定义的提示词
- promot_essayist 用于总结字幕,生成文章
- promot_judger 用于评价文章质量, 并挑选出最优文章

## 许可证

该项目采用 MIT 许可证。详情请查阅 `LICENSE` 文件。

## 致谢

感谢所有为项目贡献的开发者以及使用本项目的用户。

项目所有内容均由GPT-4生成

## 这段是我写的

nodejs打包出来的大小太离谱了...

bun打包出来的还不能在win下完美运行...