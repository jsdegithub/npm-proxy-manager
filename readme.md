# npm-proxy-manager

`npm-proxy-manager` 是一个用于管理 npm 代理的命令行工具，它提供快捷的 **开启**、**关闭**、**切换** 代理等功能。

`npm-proxy-manager` 以如下方式存储您的自定义代理：

```sh
[proxy1]
proxy=http://test/proxy1
https-proxy=http://test/https-proxy1

[proxy2]
proxy=http://test/proxy2
https-proxy=http://test/https-proxy2
```

通过 **np open** 和 **np close** 命令，你可以方便地开启与关闭代理；

通过 **np use** 命令（如：np use proxy1），你可以方便地切换代理。

## 安装

请确保你已经安装了 [Node.js](https://nodejs.org/) 和 [npm](https://www.npmjs.com/)，然后运行以下命令来安装依赖：

```sh
npm install -g npm-proxy-manager
```

## Example

添加自定义代理 proxy1

```sh
np add proxy1 http://test/proxy1
```

列出所有已添加的代理

```sh
np ls
```

使用（切换）代理 proxy1

```sh
np use proxy1
```

禁用代理

```sh
np close
```

启用代理（继续使用 proxy1）

```sh
np open
```

## 使用方法

<span style="color: lightblue;">注意：下述命令中，np 是 npm-proxy 的简写，你也可以书写全称。</span>

### 添加自定义代理

```sh
np add <name> <url>
```

默认情况下，np add \<name> \<url> 会将 \<name> 下的 http proxy 与 https proxy 同时设置为 \<url>，你可以使用 -p 和 -hp 命令仅设置 http proxy 或 https proxy，如下：

**仅设置 http proxy**

```sh
np add <name> -p <url>
```

**仅设置 https proxy**

```sh
np add <name> -hp <url>
```

### 列出所有代理

```sh
np ls
or
np list
```

输出示例：

```sh
proxy1 ---- [proxy] http://test/proxy ---- [https-proxy] https://test/https-proxy
proxy2 ---- [proxy] http://test/proxy ---- [https-proxy] https://test/https-proxy
```

默认情况下，np ls 会把 http proxy 与 https proxy 都列举出来，你可以使用 -p 和 -hp 命令单独列举 http proxy 和 https proxy，如下：

**仅列举 http proxy**

```sh
np ls -p
```

输出示例：

```sh
proxy1 ---- http://test/proxy
proxy2 ---- http://test/proxy
```

**仅列举 https proxy**

```sh
np ls -hp
```

输出示例：

```sh
proxy1 ---- https://test/https-proxy
proxy2 ---- https://test/https-proxy
```

### 使用（切换）代理

通过 np use \<name> 命令，你可以在事先配置好的代理间方便地切换。

```sh
np use <name>
```

默认情况下，np use \<name> 会同时应用 \<name> 下的 http proxy 与 https proxy，你可以使用 -p 和 -hp 命令仅应用 \<name> 下的 http proxy 或 https proxy，如下：

**仅应用 \<name> 下的 http proxy**

```sh
np use <name> -p
```

**仅应用 \<name> 下的 https proxy**

```sh
np use <name> -hp
```

### 关闭代理

```sh
np close
```

默认情况下，np close 会同时关闭 http proxy 与 https proxy，你可以使用 -p 和 -hp 命令仅关闭 http proxy 或 https proxy，如下：

**仅关闭 http proxy**

```sh
np close -p
```

**仅关闭 https proxy**

```sh
np close -hp
```

### 开启代理

```sh
np open
```

默认情况下，np open 会同时开启 http proxy 与 https proxy，你可以使用 -p 和 -hp 命令仅开启 http proxy 或 https proxy，如下：

**仅开启 http proxy**

```sh
np open -p
```

**仅开启 https proxy**

```sh
np open -hp
```

### 删除代理

```sh
np del <name>
or
np delete <name>
```

### 重命名代理

```sh
np rename <name> <newName>
```

### 设置代理的 URL

```sh
np set <name> <url>
```

默认情况下，np set \<name> \<url> 会将 \<name> 下的 http proxy 与 https proxy 同时设置为 url，你可以使用 -p 和 -hp 命令仅设置 http proxy 或 https proxy，如下：

**仅设置 http proxy**

```sh
np set <name> -p <url>
```

**仅设置 https proxy**

```sh
np set <name> -hp <url>
```

### 列出当前正在使用的代理

```sh
np cur
or
np current
```

默认情况下，np cur 会同时列举当前正在使用的 http proxy 与 https proxy，你可以使用 -p 和 -hp 命令仅列举 http proxy 或 https proxy，如下：

**仅列举当前正在使用的 http proxy**

```sh
np cur -p
```

**仅列举当前正在使用的 https proxy**

```sh
np cur -hp
```

## 贡献

欢迎对本项目进行贡献！如果你有任何建议、问题或发现了 bug，请随时提交 issue 或者创建 pull request。

### 提交 Issue

如果你发现了 bug 或者有新的功能建议，请在 [GitHub Issues](https://github.com/jsdegithub/npm-proxy-manager/issues) 页面提交一个 issue。

### 创建 Pull Request

1. Fork 本仓库。
2. 创建一个新的分支 (`git checkout -b feature-branch`)。
3. 提交你的更改 (`git commit -am 'Add some feature'`)。
4. 推送到分支 (`git push origin feature-branch`)。
5. 创建一个新的 Pull Request。

感谢你的贡献！

## 许可证

MIT
