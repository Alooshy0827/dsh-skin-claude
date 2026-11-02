# Claude 风格皮肤 v0.2.0

适配 DSH 版本：0.2.1-rc.5。

1. 解压 ZIP，将 `dsh-skin-claude-0.2.0` 文件夹放在一个长期保留的位置。
2. 在 DSH「插件 → 添加插件」填写该文件夹的绝对路径。
3. 安装后启用「dsh-skin-claude」。有其他皮肤时，请先停用其他皮肤。
4. 在「设置 → 外观」选择浅色、深色或跟随系统。

无需安装依赖或运行构建。安装目录需要保留。升级后完整退出并重新打开 DSH，以刷新客户端缓存。

发行 ZIP 使用已安装的 Anthropic Sans / Serif 字体；未安装这些字体时自动回退。要从本机 Claude 应用加载完整原字体，在源码目录运行 `npm run build:local`，再安装输出的 `local-installations/dsh-skin-claude-0.2.0` 目录。该本地包嵌入字体供本机使用，不应上传或作为仓库发行包分发。

关闭本插件的开关即可恢复原生外观。

源码、预览和完整验证记录：
[Alooshy0827/dsh-skin-claude](https://github.com/Alooshy0827/dsh-skin-claude)

这是 Claude 风格的第三方主题，与 Anthropic、Claude 或 DeepSeek 官方无隶属关系。MIT License。
