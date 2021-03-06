# OAuth协议为用户资源的授权提供了一个安全的的，开放而又简易的标注
# OAuth授权不会是第三方触及到用户的账号信息，即第三方无需使用
# 用户的用户名和密码就可以申请获取该用户资源的授权

# 应用场景
'''
qq用户授权慕课网使用其qq账号相关的信息
'''

# 操作流程
'''
OAuth登录页(腾讯授权登录页)
1，request token url 未授权的令牌请求服务地址
(慕课网请求qq页面登录时使用的带有特定参数的URL)
2, 网站接入流程(https://wiki.open.qq.com/wiki/website/%E7%BD%91%E7%AB%99%E6%8E%A5%E5%85%A5%E6%B5%81%E7%A8%8B)
{
    1. 开发者注册
    2. 网站接入申请
        2.1 添加网站
        2.2 网站信息完善
    3. 网站开发
        3.1 开发流程概述
            3.1.1 网站上设置QQ登录入口
            3.1.2 用户登录验证和授权
            3.1.3 登录和授权完成后，跳转回网站
            3.1.4 获取并存储access token以及openid
            3.1.5 在网站上显示用户登录昵称与QQ头像
        3.2 开发说明
    4. 使用QQ互联提供的OpenAPI
    5. WAP网站接入
}
2，
'''