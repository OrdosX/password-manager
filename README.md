# 密码生成器

## 开发背景

日益猖獗的黑客攻击与内鬼倒卖，使中小型网站成为密码泄露的重灾区。当因为种种原因不得不在这类网站上注册账号时，如何设置密码才能确保平时不易被猜出、泄露时遭受的损失最小？本软件试图通过以“生成密码”代替“管理密码”，提供一种安全、易用、高效的解决方案。

## 软件亮点

- 基于MD5算法生成密码，借助其特性：
  - 当输入（『用途』与『主密码』）相同时，输出的『子密码』相同
  - 即使输入只有细微差别，输出也将完全不同且无规律
- 包含两种生成模式
  - 默认模式：生成大写字母、小写字母、数字、符号数目大致相等的安全密码
  - 兼容模式：生成字母与数字数目大致相等的密码，适用于不支持符号的网站

## 与现有解决方案对比

| 现有方案                                           | 痛点                                                         | 本程序的优势                                                 |
| -------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 按一定规则，将根密码与网站名拼接，如`taobao#3$4%5` | ❌若被别有用心之人从社工库查出并精准攻击，很容易被猜出拼接模式 | ✔️子密码完全无规律                                            |
| 浏览器提供随机密码并记住密码                       | ❌在其他电脑上若浏览器不同则不可用                            | ✔️在任何浏览器上都能使用，可以借助但不必依赖记住密码功能      |
| 密码管理服务                                       | ❌主密码被攻破则所有密码失守                                  | ✔️只需将『用途』稍作变形，如`淘宝a`，即使知道主密码也很难猜出 |

## 一分钟上手

1. 访问[示例页面](https://p.ordosx.tech)
2. 在『用途』框中输入自己能记住的当前网站信息，例如名称/域名/简称等，注意稍作变形；
3. 在『主密码』框中输入一个本身不易被猜到的密码；
4. 在『长度』框中输入所需长度，或点击右侧按钮选择常用长度；
5. 点击『生成』按钮；
6. 生成的密码会出现在『子密码』框中，点击其右侧按钮复制到剪贴板；
7. 粘贴到密码框内完成注册；
8. 下次登录时，输入相同的信息即可生成同样的密码。也可配合浏览器记住密码功能使用。

## 自己部署

1. 克隆本仓库
2. 安装依赖`yarn install`
3. 编译`yarn run build`
4. 编译的结果出现在`dist/`文件夹，部署到目标位置即可