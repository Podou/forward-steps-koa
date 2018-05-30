
## User System

* `/auth/register`
* `/auth/login`
* `/auth/logout`
* `/auth/verifyemail`
* `/auth/verifycode`
* `/auth/changepassword`
* `/upload`
* `/auth/changepic`
* `/auth/changenickname`


### `/auth/register`
[ ] 是否需要登陆token

用户名为邮箱，密码长度大于6，存储在数据库中为MD5 + SHA1加密。注册成功返回User信息，其中user的密码信息用******代替。

```json
POST /auth/register
Payload:
{
  "username": "zrwuxian3@126.com",
  "password": "123456"
}
Result:
{
    "msg": "注册成功",
    "user": {
        "_id": "5b0b9355db81bf21a04e54e5",
        "username": "zrwuxian3@126.com",
        "password": "******",
        "createTime": 1527485269111,
        "updateTime": 1527485269111,
        "__v": 0
    }
}
```

### `/auth/login`
[ ] 是否需要登陆token

在返回的结果中，包含user信息以及token信息，其中user的密码信息用******代替

```json
POST /auth/login
Payload:
{
    "username": "zrwuxian2@126.com",
    "password": "123456"
}
Result:
{
    "msg": "Login successful.",
    "user": {
        "_id": "5b0b8f9e0ae42020f0dbdcd9",
        "username": "zrwuxian2@126.com",
        "password": "******",
        "createTime": 1527484318640,
        "updateTime": 1527484318640,
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjViMGI4ZjllMGFlNDIwMjBmMGRiZGNkOSIsInVzZXJuYW1lIjoienJ3dXhpYW4yQDEyNi5jb20iLCJwYXNzd29yZCI6IioqKioqKiIsImNyZWF0ZVRpbWUiOjE1Mjc0ODQzMTg2NDAsInVwZGF0ZVRpbWUiOjE1Mjc0ODQzMTg2NDAsIl9fdiI6MH0sImlhdCI6MTUyNzQ4NDQ3OCwiZXhwIjoxNTI3NDg4MDc4fQ.014lnppgSCB4GEQyBl6dT1q1uLjjx6DkEnUA-pFWuW4"
}
```

### `/auth/logout`
[x] 是否需要登陆token


Revoke Token(需要再研究)

### `/auth/verifyemail`
[ ] 是否需要登陆token

验证邮箱，当忘记密码时候，通过邮箱找回密码。向用户邮箱发送验证码。通过验证码认证。

```json
POST /auth/verifyemail
Payload:
{ "email": "zrwuxian@126.com"}
Result:
{ "msg": "Has send you a email." }
```

### `/auth/verifycode`
[ ] 是否需要登陆token

验证验证码。验证成功，则返回验证的token。此token仅仅用在修改密码。

```json
POST /auth/verifycode
Payload:
{ "email": "zrwuxian@126.com", "code": "123456X"}
Result:
{ "msg": "Verify success.", "token":  "xxxxxxxxxxxxxxxxxx"}
```

### `/auth/changepassword`
[ ] 是否需要登陆token

修改密码，请求中需要包含修改密码token。

```json
POST /auth/changepassword
Payload:
{ "newPassword": "123456X"}
Result:
{ "msg": "Update success"}
```

### `/upload`
[x] 是否需要登陆token

修改图片第一步，上传图片。通过/upload上传图片，在请求中加入type选项
```json
{ "type": "change-user-pic"}
```
在上传成功之后，返回type以及图片在static中的路径


### `/auth/changepic`
[x] 是否需要登陆token

包含上传的图片路径

```json
{
  "img": "Upload img path."
}
```

### `/auth/changenickname`
[x] 是否需要登陆token

修改用户名的nickname

