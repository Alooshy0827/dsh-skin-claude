# v0.2.0 字体实现

本机 Claude 应用提供 Anthropic Sans 和 Anthropic Serif，分别有正常、斜体两份可变 TrueType 文件。字体 `name` 与 `fvar` 表显示家族名称、300–800 字重和 16–48 光学字号范围。本插件保留原文件字节，以 CSS 别名 `DSH Claude Sans`、`DSH Claude Serif` 使用。

| 角色 | 字体 |
| --- | --- |
| 界面、按钮、输入框 | Anthropic Sans |
| 欢迎标题、Markdown 回答正文与标题 | Anthropic Serif |
| 代码与终端 | DSH 现有等宽字体 |
| 原字体缺少的字符 | 系统字体回退，中文不会凭空变成 Anthropic 字形 |

普通构建只生成 `local()` 字体引用，不包含字体文件。`npm run build:local` 才读取本机 Claude 的 `Contents/Resources/fonts`，检查 TrueType 头部并把四个字体作为 data URL 放入独立本地安装包。没有远程字体请求，不安装系统字体，不修改 Claude。

本地目录 `local-installations/` 已加入 Git 忽略列表。脚本写入 `local-build.json`，记录每个原文件与生成客户端的 SHA-256。它拒绝覆盖内容不同的同版本客户端，以免已安装的包在开发中被悄悄替换。

本机核对的原字体摘要：

| 原文件 | SHA-256 |
| --- | --- |
| `AnthropicSans-Romans-Variable-25x258.ttf` | `4eda2c42031a090a3d01cd58ada3de00f467e3e359efad36572f26e43ecba65f` |
| `AnthropicSans-Italics-Variable-25x258.ttf` | `ad5af382e340115276eb38e1230844d2705773acf2fec61738fa43500e30d515` |
| `AnthropicSerif-Romans-Variable-25x258.ttf` | `cb2c65e0d0d326181f2a2525ad344cacc850a41c24aeaea51cc70df8c88a3231` |
| `AnthropicSerif-Italics-Variable-25x258.ttf` | `1682880b4495f1e2fa5c40d5274f48e076562b3bfb14f8f80830a0ddb912daae` |

四份嵌入数据解码后与以上摘要一致。实际 DSH CSS 中存在四份字体声明，界面和回答分别解析到 Sans / Serif 字体栈；浏览器未报告字体解码警告或错误。实际加载样式的摘要记录在本版 `qa/v0.2.0/runtime.json`。未把仅声明字体栈当作操作系统对每个字符最终选字的证明，中文回退和字体度量可能与纯拉丁文不同。

本版改变了 v0.1.0 的字体策略：界面和回答使用所选 Claude 字体，字号设置保持原有行为；停用插件会移除字体声明和变量覆盖，恢复宿主设置。
