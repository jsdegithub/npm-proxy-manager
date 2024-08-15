# npm-proxy

`npm-proxy` 是一个用于管理 npm 代理的命令行工具，它提供快捷开启、关闭代理等功能。

## 安装

请确保你已经安装了 [Node.js](https://nodejs.org/) 和 [npm](https://www.npmjs.com/)，然后运行以下命令来安装依赖：

```sh
npm install
```

## 使用方法

### 列出所有代理

```sh
npm-proxy list
或
npm-proxy ls
```

### 使用代理

```sh
npm-proxy use <name>
```

### 列出当前正在使用的代理

```sh
npm-proxy current
或
npm-proxy cur
```

### 添加代理

```sh
npm-proxy add <name> <url>
```

### 删除代理

```sh
npm-proxy delete <name>
```

### 设置代理的 URL

```sh
npm-proxy set <name> <url>
```

### 重命名代理

```sh
npm-proxy rename <name> <newName>
```

### 测试当前代理的连通性

```sh
npm-proxy ping
```

### 开启代理

```sh
npm-proxy open
```

### 关闭代理

```sh
npm-proxy close
```

## 贡献

欢迎对本项目进行贡献！如果你有任何建议、问题或发现了 bug，请随时提交 issue 或者创建 pull request。

### 提交 Issue

如果你发现了 bug 或者有新的功能建议，请在 [GitHub Issues](https://github.com/jsdegithub/npm-proxy/issues) 页面提交一个 issue。

### 创建 Pull Request

1. Fork 本仓库。
2. 创建一个新的分支 (`git checkout -b feature-branch`)。
3. 提交你的更改 (`git commit -am 'Add some feature'`)。
4. 推送到分支 (`git push origin feature-branch`)。
5. 创建一个新的 Pull Request。

感谢你的贡献！

## 许可证

MIT
