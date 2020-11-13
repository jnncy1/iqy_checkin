## 项目概述

> 本项目仅作学习之用，如有侵权，请联系作者删除。谢谢。
> 请注意本项目使用GPL协议

该项目用于爱奇艺每日签到和会员三次抽奖。

项目本意只想方便自己，后来发现需求的人比较多，因此开源。

有些人反映cookie时效问题。自行手机或平板抓app的authcookie(访问个人中心那一块可以抓到 另外抓包app是苹果thor或stream 安卓小黄鸟)，自用ipad抓的authcookie目前3个月还未失效

觉得好用给个Star吧~

## 项目使用

> 代码已经修改为云函数格式

+ 建议使用腾讯/阿里云中的云函数服务做每日定时任务
+ 代码已经修改为云函数的格式(目前是腾讯云的格式，阿里或其他云函数请自行修改main_handler格式)
+ 使用云函数把整个文件夹上传上去，使用在线安装依赖即可。

## 云函数搭建流程

> 以腾讯云为例，其他和参考自行修改

+ 首先下载好项目完整代码，有git环境更方便`git clone https://github.com/chengquanomg/iqy_checkin`

+ 腾讯云函数服务里，新建函数，配置如图

  ![newfunction](https://github.com/chengquanomg/iqy_checkin/blob/master/images/newfunction.png)

+ 将整个代码文件夹上传至云函数，提交方法修改为本地上传文件夹，上传方式修改为在线安装依赖。

  ![upload](https://github.com/chengquanomg/iqy_checkin/blob/master/images/upload.png)

+ 上传完成后，修改`config.json`文件里的cookies数组，测试是否可用即可。

  ![update](https://github.com/chengquanomg/iqy_checkin/blob/master/images/update.png)

+ 测试可用后，创建触发器，我使用的是cron表达式定时触发，图上的是指每天6点触发一次

  ![cron](https://github.com/chengquanomg/iqy_checkin/blob/master/images/cron.png)

### 交流群号：1091479780

