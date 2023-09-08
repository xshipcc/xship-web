# login

```json
/api/currentUser
{
      code: '000000',
      message: '获取个人信息成功',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      name: 'admin',
      menuTree: [
        {
          id: 1,
          path: '/welcome',
          name: '无人机巡检大屏',
          parentId: 0,
          icon: 'SmileOutlined',
        },
        {
          id: 30,
          path: '/AIalert/list',
          name: '智能告警',
          parentId: 0,
          icon: 'SmileOutlined',
        },
        {
          id: 2,
          path: '/system',
          name: '系统管理',
          parentId: 0,
          icon: 'SettingOutlined',
        },
        {
          id: 3,
          path: '/system/admin/list',
          name: '管理员列表',
          parentId: 2,
          icon: '1',
        },
        {
          id: 4,
          path: '/system/operator/list',
          name: '操作员列表',
          parentId: 2,
          icon: '',
        },
        {
          id: 7,
          path: '/system/visitor/list',
          name: '访客列表',
          parentId: 2,
          icon: '',
        },
        {
          id: 8,
          path: '/log',
          name: '日志管理',
          parentId: 0,
          icon: 'DeleteOutlined',
        },
        {
          id: 9,
          path: '/log/loginLog/list',
          name: '登录日志',
          parentId: 8,
          icon: '',
        },
        {
          id: 10,
          path: '/log/sysLog/list',
          name: '操作日志',
          parentId: 8,
          icon: '',
        },
        {
          id: 16,
          path: '/drone',
          name: '无人机管理',
          parentId: 0,
          icon: 'GiftOutlined',
        },
        {
          id: 18,
          path: '/drone/device/list',
          name: '设备管理',
          parentId: 16,
          icon: '',
        },
        {
          id: 18,
          path: '/drone/task/list',
          name: '任务管理',
          parentId: 16,
          icon: '',
        },
        {
          id: 18,
          path: '/drone/taskInfo/list',
          name: '信息库管理',
          parentId: 16,
          icon: '',
        },
      ],
    }
```

# 查询字典

```
AIalert/list
system/visitor/list

{
    "code": "000000",
    "message": "查询字典成功",
    "current": 1,
    "data": [
        {
            "id": 2,
            "value": "female",
            "label": "女",
            "type": "sex",
            "description": "性别",
            "sort": 0,
            "createBy": "admin",
            "createTime": "2018-09-23 19:53:17",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2020-11-19 18:22:00",
            "remarks": "性别",
            "delFlag": 0
        },
        {
            "id": 9,
            "value": "123",
            "label": "1",
            "type": "1",
            "description": "12222222222222",
            "sort": 0,
            "createBy": "",
            "createTime": "2020-11-26 15:10:42",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2020-11-26 15:26:59",
            "remarks": "12222222222222",
            "delFlag": 0
        },
        {
            "id": 11,
            "value": "1",
            "label": "1",
            "type": "1",
            "description": "1",
            "sort": 0,
            "createBy": "admin",
            "createTime": "2020-11-26 15:27:08",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2020-11-26 15:27:09",
            "remarks": "1",
            "delFlag": 0
        },
        {
            "id": 12,
            "value": "12",
            "label": "12",
            "type": "12",
            "description": "",
            "sort": 0,
            "createBy": "admin",
            "createTime": "2023-08-16 09:27:05",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2023-08-16 09:27:39",
            "remarks": "",
            "delFlag": 0
        },
        {
            "id": 13,
            "value": "12",
            "label": "12",
            "type": "12",
            "description": "",
            "sort": 0,
            "createBy": "admin",
            "createTime": "2023-08-16 09:27:16",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2023-08-16 09:27:28",
            "remarks": "",
            "delFlag": 0
        }
    ],
    "pageSize": 10,
    "success": true,
    "total": 5
}

system/admin/list
{
    "code": "000000",
    "message": "查询用户列表成功",
    "current": 1,
    "data": [
        {
            "id": 31,
            "name": "luxun",
            "nickName": "陆逊",
            "avatar": "",
            "email": "test@qq.com",
            "mobile": "13889700023",
            "status": 1,
            "deptId": 11,
            "createBy": "admin",
            "createTime": "2018-09-23 19:47:44",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2023-08-16 23:20:28",
            "delFlag": 0,
            "jobId": 3,
            "roleId": 4,
            "roleName": "test",
            "jobName": "测试",
            "deptName": "市场部"
        },
        {
            "id": 30,
            "name": "zhouyu",
            "nickName": "周瑜",
            "avatar": "",
            "email": "test@qq.com",
            "mobile": "13889700023",
            "status": 1,
            "deptId": 11,
            "createBy": "admin",
            "createTime": "2018-09-23 19:47:28",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2018-09-23 19:48:04",
            "delFlag": 0,
            "jobId": 1,
            "roleId": 0,
            "roleName": "",
            "jobName": "董事长",
            "deptName": "市场部"
        },
        {
            "id": 28,
            "name": "xunyu",
            "nickName": "荀彧",
            "avatar": "",
            "email": "test@qq.com",
            "mobile": "13889700023",
            "status": 1,
            "deptId": 10,
            "createBy": "admin",
            "createTime": "2018-09-23 19:46:38",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2018-11-04 15:33:17",
            "delFlag": 0,
            "jobId": 1,
            "roleId": 0,
            "roleName": "",
            "jobName": "董事长",
            "deptName": "市场部"
        },
        {
            "id": 27,
            "name": "xiahoudun",
            "nickName": "夏侯惇",
            "avatar": "",
            "email": "test@qq.com",
            "mobile": "13889700023",
            "status": 1,
            "deptId": 8,
            "createBy": "admin",
            "createTime": "2018-09-23 19:46:09",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2018-09-23 19:46:17",
            "delFlag": 0,
            "jobId": 1,
            "roleId": 0,
            "roleName": "",
            "jobName": "董事长",
            "deptName": "技术部"
        },
        {
            "id": 26,
            "name": "dianwei",
            "nickName": "典韦",
            "avatar": "",
            "email": "test@qq.com",
            "mobile": "13889700023",
            "status": 1,
            "deptId": 10,
            "createBy": "admin",
            "createTime": "2018-09-23 19:45:48",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2018-09-23 19:45:57",
            "delFlag": 0,
            "jobId": 1,
            "roleId": 0,
            "roleName": "",
            "jobName": "董事长",
            "deptName": "市场部"
        },
        {
            "id": 25,
            "name": "caocao",
            "nickName": "曹操",
            "avatar": "",
            "email": "test@qq.com",
            "mobile": "13889700023",
            "status": 1,
            "deptId": 8,
            "createBy": "admin",
            "createTime": "2018-09-23 19:45:32",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2019-01-10 17:59:14",
            "delFlag": 0,
            "jobId": 1,
            "roleId": 0,
            "roleName": "",
            "jobName": "董事长",
            "deptName": "技术部"
        },
        {
            "id": 23,
            "name": "zhaoyun",
            "nickName": "赵云",
            "avatar": "",
            "email": "test@qq.com",
            "mobile": "13889700023",
            "status": 1,
            "deptId": 7,
            "createBy": "admin",
            "createTime": "2018-09-23 19:43:44",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2018-09-23 19:43:52",
            "delFlag": 0,
            "jobId": 1,
            "roleId": 0,
            "roleName": "",
            "jobName": "董事长",
            "deptName": "技术部"
        },
        {
            "id": 22,
            "name": "liubei",
            "nickName": "刘备",
            "avatar": "",
            "email": "test@qq.com",
            "mobile": "13889700023",
            "status": 1,
            "deptId": 13,
            "createBy": "admin",
            "createTime": "2018-09-23 19:43:00",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2023-07-25 10:35:08",
            "delFlag": 0,
            "jobId": 3,
            "roleId": 1,
            "roleName": "admin",
            "jobName": "测试",
            "deptName": "蜀国"
        },
        {
            "id": 1,
            "name": "admin",
            "nickName": "超管",
            "avatar": "",
            "email": "admin@qq.com",
            "mobile": "13612345678",
            "status": 1,
            "deptId": 4,
            "createBy": "admin",
            "createTime": "2018-08-14 11:11:11",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2018-08-14 11:11:11",
            "delFlag": 0,
            "jobId": 1,
            "roleId": 0,
            "roleName": "",
            "jobName": "董事长",
            "deptName": "上海分公司"
        }
    ],
    "pageSize": 10,
    "success": true,
    "total": 9
}

system/operator/list
{
    "code": "000000",
    "message": "查询岗位成功",
    "current": 1,
    "data": [
        {
            "id": 1,
            "jobName": "董事长",
            "orderNum": 1,
            "createBy": "admin",
            "createTime": "2021-04-26 15:50:45",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2021-04-26 16:17:07",
            "delFlag": 0,
            "remarks": "测试1"
        },
        {
            "id": 2,
            "jobName": "经理",
            "orderNum": 2,
            "createBy": "admin",
            "createTime": "2021-04-26 16:05:11",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2021-04-26 16:16:36",
            "delFlag": 0,
            "remarks": "管理人员1"
        },
        {
            "id": 3,
            "jobName": "测试",
            "orderNum": 0,
            "createBy": "admin",
            "createTime": "2023-07-25 10:34:31",
            "lastUpdateBy": "",
            "lastUpdateTime": "2023-07-25 10:34:31",
            "delFlag": 1,
            "remarks": "测试版"
        }
    ],
    "pageSize": 10,
    "success": true,
    "total": 3
}

{
    "code": "000000",
    "message": "查询字典成功",
    "current": 1,
    "data": [
        {
            "id": 2,
            "value": "female",
            "label": "女",
            "type": "sex",
            "description": "性别",
            "sort": 0,
            "createBy": "admin",
            "createTime": "2018-09-23 19:53:17",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2020-11-19 18:22:00",
            "remarks": "性别",
            "delFlag": 0
        },
        {
            "id": 9,
            "value": "123",
            "label": "1",
            "type": "1",
            "description": "12222222222222",
            "sort": 0,
            "createBy": "",
            "createTime": "2020-11-26 15:10:42",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2020-11-26 15:26:59",
            "remarks": "12222222222222",
            "delFlag": 0
        },
        {
            "id": 11,
            "value": "1",
            "label": "1",
            "type": "1",
            "description": "1",
            "sort": 0,
            "createBy": "admin",
            "createTime": "2020-11-26 15:27:08",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2020-11-26 15:27:09",
            "remarks": "1",
            "delFlag": 0
        },
        {
            "id": 12,
            "value": "12",
            "label": "12",
            "type": "12",
            "description": "",
            "sort": 0,
            "createBy": "admin",
            "createTime": "2023-08-16 09:27:05",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2023-08-16 09:27:39",
            "remarks": "",
            "delFlag": 0
        },
        {
            "id": 13,
            "value": "12",
            "label": "12",
            "type": "12",
            "description": "",
            "sort": 0,
            "createBy": "admin",
            "createTime": "2023-08-16 09:27:16",
            "lastUpdateBy": "admin",
            "lastUpdateTime": "2023-08-16 09:27:28",
            "remarks": "",
            "delFlag": 0
        }
    ],
    "pageSize": 10,
    "success": true,
    "total": 5
}
log/loginLog/list
{
    "code": "000000",
    "message": "查询登录日志成功",
    "current": 1,
    "data": [
        {
            "id": 1064,
            "userName": "admin",
            "status": "login",
            "ip": "123.185.180.109",
            "createBy": "admin",
            "createTime": "2023-09-08 11:12:28",
            "lastUpdateBy": "",
            "lastUpdateTime": ""
        },
        {
            "id": 1063,
            "userName": "admin",
            "status": "login",
            "ip": "121.29.76.250",
            "createBy": "admin",
            "createTime": "2023-09-08 09:20:01",
            "lastUpdateBy": "",
            "lastUpdateTime": ""
        },
        {
            "id": 1062,
            "userName": "admin",
            "status": "login",
            "ip": "106.6.75.89",
            "createBy": "admin",
            "createTime": "2023-09-08 08:46:58",
            "lastUpdateBy": "",
            "lastUpdateTime": ""
        },
        {
            "id": 1061,
            "userName": "admin",
            "status": "login",
            "ip": "113.90.116.59",
            "createBy": "admin",
            "createTime": "2023-09-08 07:27:37",
            "lastUpdateBy": "",
            "lastUpdateTime": ""
        },
        {
            "id": 1060,
            "userName": "admin",
            "status": "login",
            "ip": "1.198.23.248",
            "createBy": "admin",
            "createTime": "2023-09-08 02:44:45",
            "lastUpdateBy": "",
            "lastUpdateTime": ""
        },
        {
            "id": 1059,
            "userName": "admin",
            "status": "login",
            "ip": "27.46.84.216",
            "createBy": "admin",
            "createTime": "2023-09-08 02:05:04",
            "lastUpdateBy": "",
            "lastUpdateTime": ""
        },
        {
            "id": 1058,
            "userName": "admin",
            "status": "login",
            "ip": "8.222.213.174",
            "createBy": "admin",
            "createTime": "2023-09-07 19:12:33",
            "lastUpdateBy": "",
            "lastUpdateTime": ""
        },
        {
            "id": 1057,
            "userName": "admin",
            "status": "login",
            "ip": "112.97.86.210",
            "createBy": "admin",
            "createTime": "2023-09-07 19:07:34",
            "lastUpdateBy": "",
            "lastUpdateTime": ""
        },
        {
            "id": 1056,
            "userName": "admin",
            "status": "login",
            "ip": "180.164.98.114",
            "createBy": "admin",
            "createTime": "2023-09-07 18:39:02",
            "lastUpdateBy": "",
            "lastUpdateTime": ""
        },
        {
            "id": 1055,
            "userName": "admin",
            "status": "login",
            "ip": "211.67.18.175",
            "createBy": "admin",
            "createTime": "2023-09-07 17:59:00",
            "lastUpdateBy": "",
            "lastUpdateTime": ""
        }
    ],
    "pageSize": 10,
    "success": true,
    "total": 1000
}

log/sysLog/list


{
    "code": "000000",
    "message": "",
    "current": 1,
    "data": [
        {
            "id": 27903,
            "userName": "admin",
            "operation": "POST",
            "method": "/api/sys/loginLog/list",
            "requestParams": "{\"current\":1,\"pageSize\":10}",
            "responseParams": "{\"code\":\"000000\",\"message\":\"查询登录日志成功\",\"current\":1,\"data\":[{\"id\":1064,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"123.185.180.109\",\"createBy\":\"admin\",\"createTime\":\"2023-09-08 11:12:28\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1063,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"121.29.76.250\",\"createBy\":\"admin\",\"createTime\":\"2023-09-08 09:20:01\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1062,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"106.6.75.89\",\"createBy\":\"admin\",\"createTime\":\"2023-09-08 08:46:58\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1061,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"113.90.116.59\",\"createBy\":\"admin\",\"createTime\":\"2023-09-08 07:27:37\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1060,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"1.198.23.248\",\"createBy\":\"admin\",\"createTime\":\"2023-09-08 02:44:45\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1059,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"27.46.84.216\",\"createBy\":\"admin\",\"createTime\":\"2023-09-08 02:05:04\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1058,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"8.222.213.174\",\"createBy\":\"admin\",\"createTime\":\"2023-09-07 19:12:33\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1057,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"112.97.86.210\",\"createBy\":\"admin\",\"createTime\":\"2023-09-07 19:07:34\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1056,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"180.164.98.114\",\"createBy\":\"admin\",\"createTime\":\"2023-09-07 18:39:02\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1055,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"211.67.18.175\",\"createBy\":\"admin\",\"createTime\":\"2023-09-07 17:59:00\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"}],\"pageSize\":10,\"success\":true,\"total\":1000}",
            "time": 8,
            "ip": "182.204.43.131",
            "operationTime": "2023-09-08 11:16:31"
        },
        {
            "id": 27902,
            "userName": "admin",
            "operation": "GET",
            "method": "/api/sys/user/currentUser",
            "requestParams": "",
            "responseParams": "{\"code\":\"000000\",\"message\":\"获取个人信息成功\",\"avatar\":\"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png\",\"name\":\"admin\",\"menuTree\":[{\"id\":1,\"path\":\"/welcome\",\"name\":\"欢迎\",\"parentId\":0,\"icon\":\"SmileOutlined\"},{\"id\":2,\"path\":\"/system\",\"name\":\"系统管理\",\"parentId\":0,\"icon\":\"SettingOutlined\"},{\"id\":3,\"path\":\"/system/user/list\",\"name\":\"用户列表\",\"parentId\":2,\"icon\":\"1\"},{\"id\":4,\"path\":\"/system/role/list\",\"name\":\"角色列表\",\"parentId\":2,\"icon\":\"\"},{\"id\":5,\"path\":\"/system/menu/list\",\"name\":\"菜单列表\",\"parentId\":2,\"icon\":\"\"},{\"id\":6,\"path\":\"/system/dept/list\",\"name\":\"机构列表\",\"parentId\":2,\"icon\":\"\"},{\"id\":7,\"path\":\"/system/dict/list\",\"name\":\"字典列表\",\"parentId\":2,\"icon\":\"\"},{\"id\":8,\"path\":\"/log\",\"name\":\"日志管理\",\"parentId\":0,\"icon\":\"DeleteOutlined\"},{\"id\":9,\"path\":\"/log/loginLog/list\",\"name\":\"登录日志\",\"parentId\":8,\"icon\":\"\"},{\"id\":10,\"path\":\"/log/sysLog/list\",\"name\":\"操作日志\",\"parentId\":8,\"icon\":\"\"},{\"id\":11,\"path\":\"/ums\",\"name\":\"会员管理\",\"parentId\":0,\"icon\":\"FrownOutlined\"},{\"id\":12,\"path\":\"/ums/member/list\",\"name\":\"会员列表\",\"parentId\":11,\"icon\":\"\"},{\"id\":13,\"path\":\"/ums/memberLevel/list\",\"name\":\"会员等级\",\"parentId\":11,\"icon\":\"\"},{\"id\":16,\"path\":\"/pms\",\"name\":\"商品管理\",\"parentId\":0,\"icon\":\"GiftOutlined\"},{\"id\":17,\"path\":\"/pms/productCategory/list\",\"name\":\"商品分类\",\"parentId\":16,\"icon\":\"\"},{\"id\":18,\"path\":\"/pms/productBrand/list\",\"name\":\"商品品牌\",\"parentId\":16,\"icon\":\"\"},{\"id\":19,\"path\":\"/pms/product/list\",\"name\":\"商品列表\",\"parentId\":16,\"icon\":\"\"},{\"id\":20,\"path\":\"/oms\",\"name\":\"订单管理\",\"parentId\":0,\"icon\":\"DollarCircleOutlined\"},{\"id\":21,\"path\":\"/oms/orderSetting/list\",\"name\":\"订单设置\",\"parentId\":20,\"icon\":\"\"},{\"id\":22,\"path\":\"/oms/orderReturnApply/list\",\"name\":\"退货列表\",\"parentId\":20,\"icon\":\"\"},{\"id\":23,\"path\":\"/oms/orderReturnReason/list\",\"name\":\"退货原因\",\"parentId\":20,\"icon\":\"\"},{\"id\":24,\"path\":\"/oms/order/list\",\"name\":\"订单列表\",\"parentId\":20,\"icon\":\"\"},{\"id\":25,\"path\":\"/sms\",\"name\":\"营销管理\",\"parentId\":0,\"icon\":\"AlertOutlined\"},{\"id\":26,\"path\":\"/sms/flashPromotion/list\",\"name\":\"秒杀活动\",\"parentId\":25,\"icon\":\"\"},{\"id\":27,\"path\":\"/sms/homeBrand/list\",\"name\":\"品牌推荐\",\"parentId\":25,\"icon\":\"\"},{\"id\":28,\"path\":\"/sms/homeNewProduct/list\",\"name\":\"新品推荐\",\"parentId\":25,\"icon\":\"\"},{\"id\":29,\"path\":\"/sms/homeRecommendProduct/list\",\"name\":\"人气推荐\",\"parentId\":25,\"icon\":\"\"},{\"id\":30,\"path\":\"/sms/homeRecommendSubject/list\",\"name\":\"专题推荐\",\"parentId\":25,\"icon\":\"\"},{\"id\":31,\"path\":\"/sms/homeAdvertise/list\",\"name\":\"广告列表\",\"parentId\":25,\"icon\":\"\"},{\"id\":32,\"path\":\"/sms/coupon/list\",\"name\":\"优惠券\",\"parentId\":25,\"icon\":\"\"},{\"id\":33,\"path\":\"/system/job/list\",\"name\":\"职位列表\",\"parentId\":2,\"icon\":\"\"},{\"id\":109,\"path\":\"/pms/attribute/list\",\"name\":\"属性选项\",\"parentId\":16,\"icon\":\"\"},{\"id\":113,\"path\":\"/pms/attributecategory/list\",\"name\":\"属性分类\",\"parentId\":16,\"icon\":\"\"},{\"id\":121,\"path\":\"/lottery\",\"name\":\"一番赏管理\",\"parentId\":0,\"icon\":\"TrademarkOutlined\"},{\"id\":122,\"path\":\"/lottery/commodity\",\"name\":\"一番赏商品\",\"parentId\":121,\"icon\":\"1\"},{\"id\":125,\"path\":\"/lottery/classification\",\"name\":\"一番赏分类\",\"parentId\":121,\"icon\":\"-\"},{\"id\":126,\"path\":\"/lottery/ipSeries\",\"name\":\"IP\\u0026系列\",\"parentId\":121,\"icon\":\"-\"},{\"id\":130,\"path\":\"/lottery/config\",\"name\":\"一番赏配置\",\"parentId\":121,\"icon\":\"-\"},{\"id\":131,\"path\":\"/lottery/global\",\"name\":\"一番赏全局配置\",\"parentId\":121,\"icon\":\"-\"},{\"id\":132,\"path\":\"/lottery/rewardCoupon\",\"name\":\"赏券配置\",\"parentId\":121,\"icon\":\"-\"},{\"id\":140,\"path\":\"/oms/lottery\",\"name\":\"一番赏提取订单\",\"parentId\":20,\"icon\":\"-\"},{\"id\":141,\"path\":\"/oms/payRefund\",\"name\":\"支付\\u0026退款订单\",\"parentId\":20,\"icon\":\"-\"},{\"id\":142,\"path\":\"/oms/postage\",\"name\":\"邮费管理\",\"parentId\":20,\"icon\":\"-\"},{\"id\":143,\"path\":\"/activity\",\"name\":\"活动管理\",\"parentId\":0,\"icon\":\"BugOutlined\"},{\"id\":144,\"path\":\"/activity/lottery\",\"name\":\"一番赏商品活动\",\"parentId\":143,\"icon\":\"-\"},{\"id\":145,\"path\":\"/test\",\"name\":\"测试目录\",\"parentId\":0,\"icon\":\"Setting\"},{\"id\":146,\"path\":\"/test/111\",\"name\":\"123\",\"parentId\":145,\"icon\":\"Setting\"},{\"id\":147,\"path\":\"/xxx\",\"name\":\"xxx\",\"parentId\":0,\"icon\":\"Setting\"},{\"id\":148,\"path\":\"/yyy\",\"name\":\"yyy\",\"parentId\":147,\"icon\":\"Setting\"}],\"menuTreeVue\":[{\"id\":4,\"parentId\":2,\"title\":\"角色列表\",\"path\":\"roleList\",\"name\":\"角色列表\",\"icon\":\"el-icon-female\",\"redirect\":\"\",\"component\":\"system/role/index\",\"meta\":{\"title\":\"角色列表\",\"icon\":\"el-icon-female\"}},{\"id\":5,\"parentId\":2,\"title\":\"菜单列表\",\"path\":\"resourcesList\",\"name\":\"菜单列表\",\"icon\":\"el-icon-postcard\",\"redirect\":\"\",\"component\":\"system/resource/index\",\"meta\":{\"title\":\"菜单列表\",\"icon\":\"el-icon-postcard\"}},{\"id\":6,\"parentId\":2,\"title\":\"机构列表\",\"path\":\"deptList\",\"name\":\"机构列表\",\"icon\":\"el-icon-bangzhu\",\"redirect\":\"\",\"component\":\"system/dept/index\",\"meta\":{\"title\":\"机构列表\",\"icon\":\"el-icon-bangzhu\"}},{\"id\":7,\"parentId\":2,\"title\":\"字典列表\",\"path\":\"dictList\",\"name\":\"字典列表\",\"icon\":\"el-icon-delete-location\",\"redirect\":\"\",\"component\":\"system/dict/index\",\"meta\":{\"title\":\"字典列表\",\"icon\":\"el-icon-delete-location\"}},{\"id\":8,\"parentId\":0,\"title\":\"日志管理\",\"path\":\"/log\",\"name\":\"日志管理\",\"icon\":\"el-icon-delete\",\"redirect\":\"/log/loginLogList\",\"component\":\"Layout\",\"meta\":{\"title\":\"日志管理\",\"icon\":\"el-icon-delete\"}},{\"id\":9,\"parentId\":8,\"title\":\"登录日志\",\"path\":\"loginLogList\",\"name\":\"登录日志\",\"icon\":\"el-icon-remove-outline\",\"redirect\":\"\",\"component\":\"log/loginlog/index\",\"meta\":{\"title\":\"登录日志\",\"icon\":\"el-icon-remove-outline\"}},{\"id\":10,\"parentId\":8,\"title\":\"操作日志\",\"path\":\"sysLogList\",\"name\":\"操作日志\",\"icon\":\"el-icon-camera\",\"redirect\":\"\",\"component\":\"log/syslog/index\",\"meta\":{\"title\":\"操作日志\",\"icon\":\"el-icon-camera\"}},{\"id\":11,\"parentId\":0,\"title\":\"会员管理\",\"path\":\"/ums\",\"name\":\"会员管理\",\"icon\":\"el-icon-headset\",\"redirect\":\"/ums/memberList\",\"component\":\"Layout\",\"meta\":{\"title\":\"会员管理\",\"icon\":\"el-icon-headset\"}},{\"id\":12,\"parentId\":11,\"title\":\"会员列表\",\"path\":\"memberList\",\"name\":\"会员列表\",\"icon\":\"el-icon-camera\",\"redirect\":\"\",\"component\":\"ums/member/index\",\"meta\":{\"title\":\"会员列表\",\"icon\":\"el-icon-camera\"}},{\"id\":13,\"parentId\":11,\"title\":\"会员等级\",\"path\":\"memberLevelList\",\"name\":\"会员等级\",\"icon\":\"el-icon-remove-outline\",\"redirect\":\"\",\"component\":\"ums/member_level/index\",\"meta\":{\"title\":\"会员等级\",\"icon\":\"el-icon-remove-outline\"}},{\"id\":16,\"parentId\":0,\"title\":\"商品管理\",\"path\":\"/pms\",\"name\":\"商品管理\",\"icon\":\"el-icon-coffee\",\"redirect\":\"/pms/productList\",\"component\":\"Layout\",\"meta\":{\"title\":\"商品管理\",\"icon\":\"el-icon-coffee\"}},{\"id\":17,\"parentId\":16,\"title\":\"商品分类\",\"path\":\"productCategoryList\",\"name\":\"商品分类\",\"icon\":\"el-icon-remove-outline\",\"redirect\":\"\",\"component\":\"pms/product_category/index\",\"meta\":{\"title\":\"商品分类\",\"icon\":\"el-icon-remove-outline\"}},{\"id\":18,\"parentId\":16,\"title\":\"商品品牌\",\"path\":\"productBrandList\",\"name\":\"商品品牌\",\"icon\":\"el-icon-remove-outline\",\"redirect\":\"\",\"component\":\"pms/product_brand/index\",\"meta\":{\"title\":\"商品品牌\",\"icon\":\"el-icon-remove-outline\"}},{\"id\":19,\"parentId\":16,\"title\":\"商品列表\",\"path\":\"productList\",\"name\":\"商品列表\",\"icon\":\"el-icon-camera\",\"redirect\":\"\",\"component\":\"pms/product/index\",\"meta\":{\"title\":\"商品列表\",\"icon\":\"el-icon-camera\"}},{\"id\":20,\"parentId\":0,\"title\":\"订单管理\",\"path\":\"/oms\",\"name\":\"订单管理\",\"icon\":\"el-icon-shopping-cart-full\",\"redirect\":\"/oms/orderList\",\"component\":\"Layout\",\"meta\":{\"title\":\"订单管理\",\"icon\":\"el-icon-shopping-cart-full\"}},{\"id\":21,\"parentId\":20,\"title\":\"订单设置\",\"path\":\"orderSetting\",\"name\":\"订单设置\",\"icon\":\"el-icon-remove-outline\",\"redirect\":\"\",\"component\":\"oms/order_setting/index\",\"meta\":{\"title\":\"订单设置\",\"icon\":\"el-icon-remove-outline\"}},{\"id\":22,\"parentId\":20,\"title\":\"退货列表\",\"path\":\"orderReturnApplyList\",\"name\":\"退货列表\",\"icon\":\"el-icon-remove-outline\",\"redirect\":\"\",\"component\":\"oms/order_return_apply/index\",\"meta\":{\"title\":\"退货列表\",\"icon\":\"el-icon-remove-outline\"}},{\"id\":23,\"parentId\":20,\"title\":\"退货原因\",\"path\":\"orderReturnReasonList\",\"name\":\"退货原因\",\"icon\":\"el-icon-remove-outline\",\"redirect\":\"\",\"component\":\"oms/order_return_reason/index\",\"meta\":{\"title\":\"退货原因\",\"icon\":\"el-icon-remove-outline\"}},{\"id\":24,\"parentId\":20,\"title\":\"订单列表\",\"path\":\"orderList\",\"name\":\"订单列表\",\"icon\":\"el-icon-camera\",\"redirect\":\"\",\"component\":\"oms/order/index\",\"meta\":{\"title\":\"订单列表\",\"icon\":\"el-icon-camera\"}},{\"id\":25,\"parentId\":0,\"title\":\"营销管理\",\"path\":\"/sms\",\"name\":\"营销管理\",\"icon\":\"el-icon-cold-drink\",\"redirect\":\"/sms/flashPromotionList\",\"component\":\"Layout\",\"meta\":{\"title\":\"营销管理\",\"icon\":\"el-icon-cold-drink\"}},{\"id\":26,\"parentId\":25,\"title\":\"秒杀活动\",\"path\":\"flashPromotionList\",\"name\":\"秒杀活动\",\"icon\":\"el-icon-camera\",\"redirect\":\"\",\"component\":\"sms/flash_promotion/index\",\"meta\":{\"title\":\"秒杀活动\",\"icon\":\"el-icon-camera\"}},{\"id\":27,\"parentId\":25,\"title\":\"品牌推荐\",\"path\":\"homeBrandList\",\"name\":\"品牌推荐\",\"icon\":\"el-icon-remove-outline\",\"redirect\":\"\",\"component\":\"sms/home_brand/index\",\"meta\":{\"title\":\"品牌推荐\",\"icon\":\"el-icon-remove-outline\"}},{\"id\":28,\"parentId\":25,\"title\":\"新品推荐\",\"path\":\"homeNewProductList\",\"name\":\"新品推荐\",\"icon\":\"el-icon-remove-outline\",\"redirect\":\"\",\"component\":\"sms/home_new_product/index\",\"meta\":{\"title\":\"新品推荐\",\"icon\":\"el-icon-remove-outline\"}},{\"id\":29,\"parentId\":25,\"title\":\"人气推荐\",\"path\":\"homeRecommendProductList\",\"name\":\"人气推荐\",\"icon\":\"el-icon-remove-outline\",\"redirect\":\"\",\"component\":\"sms/home_recommend_product/index\",\"meta\":{\"title\":\"人气推荐\",\"icon\":\"el-icon-remove-outline\"}},{\"id\":30,\"parentId\":25,\"title\":\"专题推荐\",\"path\":\"homeRecommendSubjectList\",\"name\":\"专题推荐\",\"icon\":\"el-icon-remove-outline\",\"redirect\":\"\",\"component\":\"sms/home_recommend_subject/index\",\"meta\":{\"title\":\"专题推荐\",\"icon\":\"el-icon-remove-outline\"}},{\"id\":31,\"parentId\":25,\"title\":\"广告列表\",\"path\":\"homeAdvertiseList\",\"name\":\"广告列表\",\"icon\":\"el-icon-remove-outline\",\"redirect\":\"\",\"component\":\"sms/home_advertise/index\",\"meta\":{\"title\":\"广告列表\",\"icon\":\"el-icon-remove-outline\"}},{\"id\":32,\"parentId\":25,\"title\":\"优惠券\",\"path\":\"couponList\",\"name\":\"优惠券\",\"icon\":\"el-icon-remove-outline\",\"redirect\":\"\",\"component\":\"sms/coupon/index\",\"meta\":{\"title\":\"优惠券\",\"icon\":\"el-icon-remove-outline\"}},{\"id\":33,\"parentId\":2,\"title\":\"职位列表\",\"path\":\"jobList\",\"name\":\"职位列表\",\"icon\":\"el-icon-delete-location\",\"redirect\":\"\",\"component\":\"system/job/index\",\"meta\":{\"title\":\"职位列表\",\"icon\":\"el-icon-delete-location\"}}]}",
            "time": 11,
            "ip": "182.204.43.131",
            "operationTime": "2023-09-08 11:16:30"
        },
        {
            "id": 27901,
            "userName": "admin",
            "operation": "POST",
            "method": "/api/sys/loginLog/list",
            "requestParams": "{\"current\":1,\"pageSize\":10}",
            "responseParams": "{\"code\":\"000000\",\"message\":\"查询登录日志成功\",\"current\":1,\"data\":[{\"id\":1064,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"123.185.180.109\",\"createBy\":\"admin\",\"createTime\":\"2023-09-08 11:12:28\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1063,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"121.29.76.250\",\"createBy\":\"admin\",\"createTime\":\"2023-09-08 09:20:01\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1062,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"106.6.75.89\",\"createBy\":\"admin\",\"createTime\":\"2023-09-08 08:46:58\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1061,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"113.90.116.59\",\"createBy\":\"admin\",\"createTime\":\"2023-09-08 07:27:37\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1060,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"1.198.23.248\",\"createBy\":\"admin\",\"createTime\":\"2023-09-08 02:44:45\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1059,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"27.46.84.216\",\"createBy\":\"admin\",\"createTime\":\"2023-09-08 02:05:04\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1058,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"8.222.213.174\",\"createBy\":\"admin\",\"createTime\":\"2023-09-07 19:12:33\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1057,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"112.97.86.210\",\"createBy\":\"admin\",\"createTime\":\"2023-09-07 19:07:34\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1056,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"180.164.98.114\",\"createBy\":\"admin\",\"createTime\":\"2023-09-07 18:39:02\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"},{\"id\":1055,\"userName\":\"admin\",\"status\":\"login\",\"ip\":\"211.67.18.175\",\"createBy\":\"admin\",\"createTime\":\"2023-09-07 17:59:00\",\"lastUpdateBy\":\"\",\"lastUpdateTime\":\"\"}],\"pageSize\":10,\"success\":true,\"total\":1000}",
            "time": 14,
            "ip": "182.204.43.131",
            "operationTime": "2023-09-08 11:16:14"
        },
        {
            "id": 27900,
            "userName": "admin",
            "operation": "POST",
            "method": "/api/order/order/list",
            "requestParams": "{\"current\":1,\"pageSize\":10}",
            "responseParams": "{\"code\":\"000000\",\"message\":\"查询订单信息成功\",\"current\":1,\"data\":[{\"id\":12,\"memberId\":1,\"couponId\":2,\"orderSn\":\"201809150101000001\",\"createTime\":\"2018-09-15 12:24:27\",\"memberUserName\":\"test\",\"totalAmount\":18732,\"payAmount\":16377.75,\"freightAmount\":20,\"promotionAmount\":2344.25,\"integrationAmount\":0,\"couponAmount\":10,\"discountAmount\":10,\"payType\":0,\"sourceType\":1,\"status\":4,\"orderType\":0,\"deliveryCompany\":\"\",\"deliverySn\":\"\",\"autoConfirmDay\":15,\"integration\":13284,\"growth\":13284,\"promotionInfo\":\"单品促销,打折优惠：满3件，打7.50折,满减优惠：满1000.00元，减120.00元,满减优惠：满1000.00元，减120.00元,无优惠\",\"billType\":1,\"billHeader\":\"1111\",\"billContent\":\"1111\",\"billReceiverPhone\":\"18613030352\",\"billReceiverEmail\":\"1002219331@qq.com\",\"receiverName\":\"大梨\",\"receiverPhone\":\"18033441849\",\"receiverPostCode\":\"518000\",\"receiverProvince\":\"江苏省\",\"receiverCity\":\"常州市\",\"receiverRegion\":\"天宁区\",\"receiverDetailAddress\":\"东晓街道\",\"note\":\"\",\"confirmStatus\":0,\"deleteStatus\":0,\"useIntegration\":1000,\"paymentTime\":\"2021-03-16 20:58:57\",\"deliveryTime\":\"2023-08-19 01:29:24\",\"receiveTime\":\"2021-03-16 20:58:57\",\"commentTime\":\"2021-03-16 20:58:57\",\"modifyTime\":\"2021-03-16 20:58:57\",\"listOperateHistoryData\":[{\"id\":5,\"orderId\":12,\"operateMan\":\"后台管理员\",\"createTime\":\"2018-10-12 14:01:29\",\"orderStatus\":2,\"note\":\"完成发货\"},{\"id\":7,\"orderId\":12,\"operateMan\":\"后台管理员\",\"createTime\":\"2018-10-12 14:13:10\",\"orderStatus\":4,\"note\":\"订单关闭:买家退货\"},{\"id\":23,\"orderId\":12,\"operateMan\":\"后台管理员\",\"createTime\":\"2019-11-09 16:50:28\",\"orderStatus\":4,\"note\":\"修改备注信息：111\"}],\"listOrderItemData\":[{\"id\":21,\"orderId\":12,\"orderSn\":\"201809150101000001\",\"productId\":26,\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg\",\"productName\":\"华为 HUAWEI P20\",\"productBrand\":\"华为\",\"productSn\":\"6946605\",\"productPrice\":3788,\"productQuantity\":1,\"productSkuId\":90,\"productSkuCode\":\"201806070026001\",\"productCategoryId\":19,\"promotionName\":\"单品促销\",\"promotionAmount\":200,\"couponAmount\":2.02,\"integrationAmount\":0,\"realAmount\":3585.98,\"giftIntegration\":3788,\"gift_growth\":3788,\"productAttr\":\"[{\\\"key\\\":\\\"颜色\\\",\\\"value\\\":\\\"金色\\\"},{\\\"key\\\":\\\"容量\\\",\\\"value\\\":\\\"16G\\\"}]\"},{\"id\":22,\"orderId\":12,\"orderSn\":\"201809150101000001\",\"productId\":27,\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/xiaomi.jpg\",\"productName\":\"小米8\",\"productBrand\":\"小米\",\"productSn\":\"7437788\",\"productPrice\":2699,\"productQuantity\":3,\"productSkuId\":98,\"productSkuCode\":\"201808270027001\",\"productCategoryId\":19,\"promotionName\":\"打折优惠：满3件，打7.50折\",\"promotionAmount\":674.75,\"couponAmount\":1.44,\"integrationAmount\":0,\"realAmount\":2022.81,\"giftIntegration\":2699,\"gift_growth\":2699,\"productAttr\":\"[{\\\"key\\\":\\\"颜色\\\",\\\"value\\\":\\\"黑色\\\"},{\\\"key\\\":\\\"容量\\\",\\\"value\\\":\\\"32G\\\"}]\"},{\"id\":23,\"orderId\":12,\"orderSn\":\"201809150101000001\",\"productId\":28,\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg\",\"productName\":\"红米5A\",\"productBrand\":\"小米\",\"productSn\":\"7437789\",\"productPrice\":649,\"productQuantity\":1,\"productSkuId\":102,\"productSkuCode\":\"201808270028001\",\"productCategoryId\":19,\"promotionName\":\"满减优惠：满1000.00元，减120.00元\",\"promotionAmount\":57.6,\"couponAmount\":0.35,\"integrationAmount\":0,\"realAmount\":591.05,\"giftIntegration\":649,\"gift_growth\":649,\"productAttr\":\"[{\\\"key\\\":\\\"颜色\\\",\\\"value\\\":\\\"金色\\\"},{\\\"key\\\":\\\"容量\\\",\\\"value\\\":\\\"16G\\\"}]\"},{\"id\":24,\"orderId\":12,\"orderSn\":\"201809150101000001\",\"productId\":28,\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg\",\"productName\":\"红米5A\",\"productBrand\":\"小米\",\"productSn\":\"7437789\",\"productPrice\":699,\"productQuantity\":1,\"productSkuId\":103,\"productSkuCode\":\"201808270028001\",\"productCategoryId\":19,\"promotionName\":\"满减优惠：满1000.00元，减120.00元\",\"promotionAmount\":62.4,\"couponAmount\":0.37,\"integrationAmount\":0,\"realAmount\":636.23,\"giftIntegration\":649,\"gift_growth\":649,\"productAttr\":\"[{\\\"key\\\":\\\"颜色\\\",\\\"value\\\":\\\"金色\\\"},{\\\"key\\\":\\\"容量\\\",\\\"value\\\":\\\"32G\\\"}]\"},{\"id\":25,\"orderId\":12,\"orderSn\":\"201809150101000001\",\"productId\":29,\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5acc5248N6a5f81cd.jpg\",\"productName\":\"Apple iPhone 8 Plus\",\"productBrand\":\"苹果\",\"productSn\":\"7437799\",\"productPrice\":5499,\"productQuantity\":1,\"productSkuId\":106,\"productSkuCode\":\"201808270029001\",\"productCategoryId\":19,\"promotionName\":\"无优惠\",\"promotionAmount\":0,\"couponAmount\":2.94,\"integrationAmount\":0,\"realAmount\":5496.06,\"giftIntegration\":5499,\"gift_growth\":5499,\"productAttr\":\"[{\\\"key\\\":\\\"颜色\\\",\\\"value\\\":\\\"金色\\\"},{\\\"key\\\":\\\"容量\\\",\\\"value\\\":\\\"32G\\\"}]\"}]},{\"id\":13,\"memberId\":1,\"couponId\":2,\"orderSn\":\"201809150102000002\",\"createTime\":\"2018-09-15 14:24:29\",\"memberUserName\":\"test\",\"totalAmount\":18732,\"payAmount\":16377.75,\"freightAmount\":0,\"promotionAmount\":2344.25,\"integrationAmount\":0,\"couponAmount\":10,\"discountAmount\":0,\"payType\":1,\"sourceType\":1,\"status\":0,\"orderType\":0,\"deliveryCompany\":\"\",\"deliverySn\":\"\",\"autoConfirmDay\":15,\"integration\":13284,\"growth\":13284,\"promotionInfo\":\"单品促销,打折优惠：满3件，打7.50折,满减优惠：满1000.00元，减120.00元,满减优惠：满1000.00元，减120.00元,无优惠\",\"billType\":1,\"billHeader\":\"1111\",\"billContent\":\"1111\",\"billReceiverPhone\":\"18613030352\",\"billReceiverEmail\":\"1002219331@qq.com\",\"receiverName\":\"大梨\",\"receiverPhone\":\"18033441849\",\"receiverPostCode\":\"518000\",\"receiverProvince\":\"广东省\",\"receiverCity\":\"深圳市\",\"receiverRegion\":\"福田区\",\"receiverDetailAddress\":\"东晓街道\",\"note\":\"\",\"confirmStatus\":0,\"deleteStatus\":0,\"useIntegration\":1000,\"paymentTime\":\"2021-03-16 20:58:57\",\"deliveryTime\":\"2023-07-18 10:34:52\",\"receiveTime\":\"2021-03-16 20:58:57\",\"commentTime\":\"2021-03-16 20:58:57\",\"modifyTime\":\"2021-03-16 20:58:57\",\"listOperateHistoryData\":[{\"id\":6,\"orderId\":13,\"operateMan\":\"后台管理员\",\"createTime\":\"2018-10-12 14:01:29\",\"orderStatus\":2,\"note\":\"完成发货\"},{\"id\":8,\"orderId\":13,\"operateMan\":\"后台管理员\",\"createTime\":\"2018-10-12 14:13:10\",\"orderStatus\":4,\"note\":\"订单关闭:买家退货\"},{\"id\":16,\"orderId\":13,\"operateMan\":\"后台管理员\",\"createTime\":\"2018-10-16 14:42:17\",\"orderStatus\":2,\"note\":\"完成发货\"}],\"listOrderItemData\":[{\"id\":26,\"orderId\":13,\"orderSn\":\"201809150102000002\",\"productId\":26,\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg\",\"productName\":\"华为 HUAWEI P20\",\"productBrand\":\"华为\",\"productSn\":\"6946605\",\"productPrice\":3788,\"productQuantity\":1,\"productSkuId\":90,\"productSkuCode\":\"201806070026001\",\"productCategoryId\":19,\"promotionName\":\"单品促销\",\"promotionAmount\":200,\"couponAmount\":2.02,\"integrationAmount\":0,\"realAmount\":3585.98,\"giftIntegration\":3788,\"gift_growth\":3788,\"productAttr\":\"[{\\\"key\\\":\\\"颜色\\\",\\\"value\\\":\\\"金色\\\"},{\\\"key\\\":\\\"容量\\\",\\\"value\\\":\\\"16G\\\"}]\"},{\"id\":27,\"orderId\":13,\"orderSn\":\"201809150102000002\",\"productId\":27,\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/xiaomi.jpg\",\"productName\":\"小米8\",\"productBrand\":\"小米\",\"productSn\":\"7437788\",\"productPrice\":2699,\"productQuantity\":3,\"productSkuId\":98,\"productSkuCode\":\"201808270027001\",\"productCategoryId\":19,\"promotionName\":\"打折优惠：满3件，打7.50折\",\"promotionAmount\":674.75,\"couponAmount\":1.44,\"integrationAmount\":0,\"realAmount\":2022.81,\"giftIntegration\":2699,\"gift_growth\":2699,\"productAttr\":\"[{\\\"key\\\":\\\"颜色\\\",\\\"value\\\":\\\"黑色\\\"},{\\\"key\\\":\\\"容量\\\",\\\"value\\\":\\\"32G\\\"}]\"},{\"id\":28,\"orderId\":13,\"orderSn\":\"201809150102000002\",\"productId\":28,\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg\",\"productName\":\"红米5A\",\"productBrand\":\"小米\",\"productSn\":\"7437789\",\"productPrice\":649,\"productQuantity\":1,\"productSkuId\":102,\"productSkuCode\":\"201808270028001\",\"productCategoryId\":19,\"promotionName\":\"满减优惠：满1000.00元，减120.00元\",\"promotionAmount\":57.6,\"couponAmount\":0.35,\"integrationAmount\":0,\"realAmount\":591.05,\"giftIntegration\":649,\"gift_growth\":649,\"productAttr\":\"[{\\\"key\\\":\\\"颜色\\\",\\\"value\\\":\\\"金色\\\"},{\\\"key\\\":\\\"容量\\\",\\\"value\\\":\\\"16G\\\"}]\"},{\"id\":29,\"orderId\":13,\"orderSn\":\"201809150102000002\",\"productId\":28,\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg\",\"productName\":\"红米5A\",\"productBrand\":\"小米\",\"productSn\":\"7437789\",\"productPrice\":699,\"productQuantity\":1,\"productSkuId\":103,\"productSkuCode\":\"201808270028001\",\"productCategoryId\":19,\"promotionName\":\"满减优惠：满1000.00元，减120.00元\",\"promotionAmount\":62.4,\"couponAmount\":0.37,\"integrationAmount\":0,\"realAmount\":636.23,\"giftIntegration\":649,\"gift_growth\":649,\"productAttr\":\"[{\\\"key\\\":\\\"颜色\\\",\\\"value\\\":\\\"金色\\\"},{\\\"key\\\":\\\"容量\\\",\\\"value\\\":\\\"32G\\\"}]\"},{\"id\":30,\"orderId\":13,\"orderSn\":\"201809150102000002\",\"productId\":29,\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5acc5248N6a5f81cd.jpg\",\"productName\":\"Apple iPhone 8 Plus\",\"productBrand\":\"苹果\",\"productSn\":\"7437799\",\"productPrice\":5499,\"productQuantity\":1,\"productSkuId\":106,\"productSkuCode\":\"201808270029001\",\"productCategoryId\":19,\"promotionName\":\"无优惠\",\"promotionAmount\":0,\"couponAmount\":2.94,\"integrationAmount\":0,\"realAmount\":5496.06,\"giftIntegration\":5499,\"gift_growth\":5499,\"productAttr\":\"[{\\\"key\\\":\\\"颜色\\\",\\\"value\\\":\\\"金色\\\"},{\\\"key\\\":\\\"容量\\\",\\\"value\\\":\\\"32G\\\"}]\"}]},{\"id\":15,\"memberId\":1,\"couponId\":2,\"orderSn\":\"201809130102000002\",\"createTime\":\"2018-09-13 17:03:00\",\"memberUserName\":\"test\",\"totalAmount\":18732,\"payAmount\":16377.75,\"freightAmount\":0,\"promotionAmount\":2344.25,\"integrationAmount\":0,\"couponAmount\":10,\"discountAmount\":0,\"payType\":1,\"sourceType\":1,\"status\":3,\"orderType\":0,\"deliveryCompany\":\"顺丰快递\",\"deliverySn\":\"201707196398345\",\"autoConfirmDay\":15,\"integration\":13284,\"growth\":13284,\"promotionInfo\":\"单品促销,打折优惠：满3件，打7.50折,满减优惠：满1000.00元，减120.00元,满减优惠：满1000.00元，减120.00元,无优惠\",\"billType\":1,\"billHeader\":\"1111\",\"billContent\":\"1111\",\"billReceiverPhone\":\"18613030352\",\"billReceiverEmail\":\"1002219331@qq.com\",\"receiverName\":\"大梨\",\"receiverPhone\":\"18033441849\",\"receiverPostCode\":\"518000\",\"receiverProvince\":\"广东省\",\"receiverCity\":\"深圳市\",\"receiverRegion\":\"福田区\",\"receiverDetailAddress\":\"东晓街道\",\"note\":\"111\",\"confirmStatus\":1,\"deleteStatus\":0,\"useIntegration\":1000,\"paymentTime\":\"2021-03-16 20:58:57\",\"deliveryTime\":\"2021-03-16 20:58:57\",\"receiveTime\":\"2021-03-16 20:58:57\",\"commentTime\":\"2021-03-16 20:58:57\",\"modifyTime\":\"2021-03-16 20:58:57\",\"listOperateHistoryData\":null,\"listOrderItemData\":[{\"id\":36,\"orderId\":15,\"orderSn\":\"201809130101000001\",\"productId\":26,\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg\",\"productName\":\"华为 HUAWEI P20\",\"productBrand\":\"华为\",\"productSn\":\"6946605\",\"productPrice\":3788,\"productQuantity\":1,\"productSkuId\":90,\"productSkuCode\":\"201806070026001\",\"productCategoryId\":19,\"promotionName\":\"单品促销\",\"promotionAmount\":200,\"couponAmount\":2.02,\"integrationAmount\":0,\"realAmount\":3585.98,\"giftIntegration\":3788,\"gift_growth\":3788,\"productAttr\":\"[{\\\"key\\\":\\\"颜色\\\",\\\"value\\\":\\\"金色\\\"},{\\\"key\\\":\\\"容量\\\",\\\"value\\\":\\\"16G\\\"}]\"},{\"id\":37,\"orderId\":15,\"orderSn\":\"201809130101000001\",\"productId\":27,\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/xiaomi.jpg\",\"productName\":\"小米8\",\"productBrand\":\"小米\",\"productSn\":\"7437788\",\"productPrice\":2699,\"productQuantity\":3,\"productSkuId\":98,\"productSkuCode\":\"201808270027001\",\"productCategoryId\":19,\"promotionName\":\"打折优惠：满3件，打7.50折\",\"promotionAmount\":674.75,\"couponAmount\":1.44,\"integrationAmount\":0,\"realAmount\":2022.81,\"giftIntegration\":2699,\"gift_growth\":2699,\"productAttr\":\"[{\\\"key\\\":\\\"颜色\\\",\\\"value\\\":\\\"黑色\\\"},{\\\"key\\\":\\\"容量\\\",\\\"value\\\":\\\"32G\\\"}]\"},{\"id\":38,\"orderId\":15,\"orderSn\":\"201809130101000001\",\"productId\":28,\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg\",\"productName\":\"红米5A\",\"productBrand\":\"小米\",\"productSn\":\"7437789\",\"productPrice\":649,\"productQuantity\":1,\"productSkuId\":102,\"productSkuCode\":\"201808270028001\",\"productCategoryId\":19,\"promotionName\":\"满减优惠：满1000.00元，减120.00元\",\"promotionAmount\":57.6,\"couponAmount\":0.35,\"integrationAmount\":0,\"realAmount\":591.05,\"giftIntegration\":649,\"gift_growth\":649,\"productAttr\":\"[{\\\"key\\\":\\\"颜色\\\",\\\"value\\\":\\\"金色\\\"},{\\\"key\\\":\\\"容量\\\",\\\"value\\\":\\\"16G\\\"}]\"},{\"id\":39,\"orderId\":15,\"orderSn\":\"201809130101000001\",\"productId\":28,\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg\",\"productName\":\"红米5A\",\"productBrand\":\"小米\",\"productSn\":\"7437789\",\"productPrice\":699,\"productQuantity\":1,\"productSkuId\":103,\"productSkuCode\":\"201808270028001\",\"productCategoryId\":19,\"promotionName\":\"满减优惠：满1000.00元，减120.00元\",\"promotionAmount\":62.4,\"couponAmount\":0.37,\"integrationAmount\":0,\"realAmount\":636.23,\"giftIntegration\":649,\"gift_growth\":649,\"productAttr\":\"[{\\\"key\\\":\\\"颜色\\\",\\\"value\\\":\\\"金色\\\"},{\\\"key\\\":\\\"容量\\\",\\\"value\\\":\\\"32G\\\"}]\"},{\"id\":40,\"orderId\":15,\"orderSn\":\"201809130101000001\",\"productId\":29,\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5acc5248N6a5f81cd.jpg\",\"productName\":\"Apple iPhone 8 Plus\",\"productBrand\":\"苹果\",\"productSn\":\"7437799\",\"productPrice\":5499,\"productQuantity\":1,\"productSkuId\":106,\"productSkuCode\":\"201808270029001\",\"productCategoryId\":19,\"promotionName\":\"无优惠\",\"promotionAmount\":0,\"couponAmount\":2.94,\"integrationAmount\":0,\"realAmount\":5496.06,\"giftIntegration\":5499,\"gift_growth\":5499,\"productAttr\":\"[{\\\"key\\\":\\\"颜色\\\",\\\"value\\\":\\\"金色\\\"},{\\\"key\\\":\\\"容量\\\",\\\"value\\\":\\\"32G\\\"}]\"}]},{\"id\":17,\"memberId\":1,\"couponId\":2,\"orderSn\":\"201809150101000003\",\"createTime\":\"2018-09-15 12:24:27\",\"memberUserName\":\"test\",\"totalAmount\":18732,\"payAmount\":16377.75,\"freightAmount\":0,\"promotionAmount\":2344.25,\"integrationAmount\":0,\"couponAmount\":10,\"discountAmount\":0,\"payType\":0,\"sourceType\":1,\"status\":4,\"orderType\":0,\"deliveryCompany\":\"顺丰快递\",\"deliverySn\":\"201707196398345\",\"autoConfirmDay\":15,\"integration\":13284,\"growth\":13284,\"promotionInfo\":\"单品促销,打折优惠：满3件，打7.50折,满减优惠：满1000.00元，减120.00元,满减优惠：满1000.00元，减120.00元,无优惠\",\"billType\":1,\"billHeader\":\"1111\",\"billContent\":\"1111\",\"billReceiverPhone\":\"18613030352\",\"billReceiverEmail\":\"1002219331@qq.com\",\"receiverName\":\"大梨\",\"receiverPhone\":\"18033441849\",\"receiverPostCode\":\"518000\",\"receiverProvince\":\"广东省\",\"receiverCity\":\"深圳市\",\"receiverRegion\":\"福田区\",\"receiverDetailAddress\":\"东晓街道\",\"note\":\"111\",\"confirmStatus\":0,\"deleteStatus\":0,\"useIntegration\":1000,\"paymentTime\":\"2021-03-16 20:58:57\",\"deliveryTime\":\"2021-03-16 20:58:57\",\"receiveTime\":\"2021-03-16 20:58:57\",\"commentTime\":\"2021-03-16 20:58:57\",\"modifyTime\":\"2021-03-16 20:58:57\",\"listOperateHistoryData\":[{\"id\":12,\"orderId\":17,\"operateMan\":\"后台管理员\",\"createTime\":\"2018-10-15 16:43:40\",\"orderStatus\":4,\"note\":\"订单关闭:xxx\"}],\"listOrderItemData\":null},{\"id\":18,\"memberId\":1,\"couponId\":2,\"orderSn\":\"201809150102000004\",\"createTime\":\"2018-09-15 14:24:29\",\"memberUserName\":\"test\",\"totalAmount\":18732,\"payAmount\":16377.75,\"freightAmount\":0,\"promotionAmount\":2344.25,\"integrationAmount\":0,\"couponAmount\":10,\"discountAmount\":0,\"payType\":1,\"sourceType\":1,\"status\":2,\"orderType\":0,\"deliveryCompany\":\"顺丰快递\",\"deliverySn\":\"201707196398345\",\"autoConfirmDay\":15,\"integration\":13284,\"growth\":13284,\"promotionInfo\":\"单品促销,打折优惠：满3件，打7.50折,满减优惠：满1000.00元，减120.00元,满减优惠：满1000.00元，减120.00元,无优惠\",\"billType\":1,\"billHeader\":\"1111\",\"billContent\":\"1111\",\"billReceiverPhone\":\"18613030352\",\"billReceiverEmail\":\"1002219331@qq.com\",\"receiverName\":\"大梨\",\"receiverPhone\":\"18033441849\",\"receiverPostCode\":\"518000\",\"receiverProvince\":\"广东省\",\"receiverCity\":\"深圳市\",\"receiverRegion\":\"福田区\",\"receiverDetailAddress\":\"东晓街道\",\"note\":\"\",\"confirmStatus\":0,\"deleteStatus\":0,\"useIntegration\":1000,\"paymentTime\":\"2021-03-16 20:58:57\",\"deliveryTime\":\"2023-06-25 10:30:11\",\"receiveTime\":\"2021-03-16 20:58:57\",\"commentTime\":\"2021-03-16 20:58:57\",\"modifyTime\":\"2021-03-16 20:58:57\",\"listOperateHistoryData\":[{\"id\":17,\"orderId\":18,\"operateMan\":\"后台管理员\",\"createTime\":\"2018-10-16 14:42:17\",\"orderStatus\":2,\"note\":\"完成发货\"}],\"listOrderItemData\":null},{\"id\":19,\"memberId\":1,\"couponId\":2,\"orderSn\":\"201809130101000003\",\"createTime\":\"2018-09-13 16:57:40\",\"memberUserName\":\"test\",\"totalAmount\":18732,\"payAmount\":16377.75,\"freightAmount\":0,\"promotionAmount\":2344.25,\"integrationAmount\":0,\"couponAmount\":10,\"discountAmount\":0,\"payType\":2,\"sourceType\":1,\"status\":2,\"orderType\":0,\"deliveryCompany\":\"顺丰快递\",\"deliverySn\":\"201707196398345\",\"autoConfirmDay\":15,\"integration\":13284,\"growth\":13284,\"promotionInfo\":\"单品促销,打折优惠：满3件，打7.50折,满减优惠：满1000.00元，减120.00元,满减优惠：满1000.00元，减120.00元,无优惠\",\"billType\":1,\"billHeader\":\"1111\",\"billContent\":\"1111\",\"billReceiverPhone\":\"18613030352\",\"billReceiverEmail\":\"1002219331@qq.com\",\"receiverName\":\"大梨\",\"receiverPhone\":\"18033441849\",\"receiverPostCode\":\"518000\",\"receiverProvince\":\"广东省\",\"receiverCity\":\"深圳市\",\"receiverRegion\":\"福田区\",\"receiverDetailAddress\":\"东晓街道\",\"note\":\"111\",\"confirmStatus\":0,\"deleteStatus\":0,\"useIntegration\":1000,\"paymentTime\":\"2021-03-16 20:58:57\",\"deliveryTime\":\"2021-03-16 20:58:57\",\"receiveTime\":\"2021-03-16 20:58:57\",\"commentTime\":\"2021-03-16 20:58:57\",\"modifyTime\":\"2021-03-16 20:58:57\",\"listOperateHistoryData\":null,\"listOrderItemData\":null},{\"id\":20,\"memberId\":1,\"couponId\":2,\"orderSn\":\"201809130102000004\",\"createTime\":\"2018-09-13 17:03:00\",\"memberUserName\":\"test\",\"totalAmount\":18732,\"payAmount\":16377.75,\"freightAmount\":0,\"promotionAmount\":2344.25,\"integrationAmount\":0,\"couponAmount\":10,\"discountAmount\":0,\"payType\":1,\"sourceType\":1,\"status\":3,\"orderType\":0,\"deliveryCompany\":\"顺丰快递\",\"deliverySn\":\"201707196398345\",\"autoConfirmDay\":15,\"integration\":13284,\"growth\":13284,\"promotionInfo\":\"单品促销,打折优惠：满3件，打7.50折,满减优惠：满1000.00元，减120.00元,满减优惠：满1000.00元，减120.00元,无优惠\",\"billType\":1,\"billHeader\":\"1111\",\"billContent\":\"1111\",\"billReceiverPhone\":\"18613030352\",\"billReceiverEmail\":\"1002219331@qq.com\",\"receiverName\":\"大梨\",\"receiverPhone\":\"18033441849\",\"receiverPostCode\":\"518000\",\"receiverProvince\":\"广东省\",\"receiverCity\":\"深圳市\",\"receiverRegion\":\"福田区\",\"receiverDetailAddress\":\"东晓街道\",\"note\":\"111\",\"confirmStatus\":0,\"deleteStatus\":0,\"useIntegration\":1000,\"paymentTime\":\"2021-03-16 20:58:57\",\"deliveryTime\":\"2021-03-16 20:58:57\",\"receiveTime\":\"2021-03-16 20:58:57\",\"commentTime\":\"2021-03-16 20:58:57\",\"modifyTime\":\"2021-03-16 20:58:57\",\"listOperateHistoryData\":null,\"listOrderItemData\":null},{\"id\":22,\"memberId\":1,\"couponId\":2,\"orderSn\":\"201809150101000005\",\"createTime\":\"2018-09-15 12:24:27\",\"memberUserName\":\"test\",\"totalAmount\":18732,\"payAmount\":16377.75,\"freightAmount\":0,\"promotionAmount\":2344.25,\"integrationAmount\":0,\"couponAmount\":10,\"discountAmount\":0,\"payType\":0,\"sourceType\":1,\"status\":4,\"orderType\":0,\"deliveryCompany\":\"顺丰快递\",\"deliverySn\":\"201707196398345\",\"autoConfirmDay\":15,\"integration\":13284,\"growth\":13284,\"promotionInfo\":\"单品促销,打折优惠：满3件，打7.50折,满减优惠：满1000.00元，减120.00元,满减优惠：满1000.00元，减120.00元,无优惠\",\"billType\":1,\"billHeader\":\"1111\",\"billContent\":\"1111\",\"billReceiverPhone\":\"18613030352\",\"billReceiverEmail\":\"1002219331@qq.com\",\"receiverName\":\"大梨\",\"receiverPhone\":\"18033441849\",\"receiverPostCode\":\"518000\",\"receiverProvince\":\"广东省\",\"receiverCity\":\"深圳市\",\"receiverRegion\":\"福田区\",\"receiverDetailAddress\":\"东晓街道\",\"note\":\"111\",\"confirmStatus\":0,\"deleteStatus\":0,\"useIntegration\":1000,\"paymentTime\":\"2021-03-16 20:58:57\",\"deliveryTime\":\"2021-03-16 20:58:57\",\"receiveTime\":\"2021-03-16 20:58:57\",\"commentTime\":\"2021-03-16 20:58:57\",\"modifyTime\":\"2021-03-16 20:58:57\",\"listOperateHistoryData\":[{\"id\":9,\"orderId\":22,\"operateMan\":\"后台管理员\",\"createTime\":\"2018-10-15 16:31:48\",\"orderStatus\":4,\"note\":\"订单关闭:xxx\"},{\"id\":10,\"orderId\":22,\"operateMan\":\"后台管理员\",\"createTime\":\"2018-10-15 16:35:08\",\"orderStatus\":4,\"note\":\"订单关闭:xxx\"},{\"id\":11,\"orderId\":22,\"operateMan\":\"后台管理员\",\"createTime\":\"2018-10-15 16:35:59\",\"orderStatus\":4,\"note\":\"订单关闭:xxx\"}],\"listOrderItemData\":null},{\"id\":23,\"memberId\":1,\"couponId\":2,\"orderSn\":\"201809150102000006\",\"createTime\":\"2018-09-15 14:24:29\",\"memberUserName\":\"test\",\"totalAmount\":18732,\"payAmount\":16377.75,\"freightAmount\":0,\"promotionAmount\":2344.25,\"integrationAmount\":0,\"couponAmount\":10,\"discountAmount\":0,\"payType\":1,\"sourceType\":1,\"status\":2,\"orderType\":0,\"deliveryCompany\":\"顺丰快递\",\"deliverySn\":\"201707196398345\",\"autoConfirmDay\":15,\"integration\":13284,\"growth\":13284,\"promotionInfo\":\"单品促销,打折优惠：满3件，打7.50折,满减优惠：满1000.00元，减120.00元,满减优惠：满1000.00元，减120.00元,无优惠\",\"billType\":1,\"billHeader\":\"1111\",\"billContent\":\"1111\",\"billReceiverPhone\":\"18613030352\",\"billReceiverEmail\":\"1002219331@qq.com\",\"receiverName\":\"大梨\",\"receiverPhone\":\"18033441849\",\"receiverPostCode\":\"518000\",\"receiverProvince\":\"广东省\",\"receiverCity\":\"深圳市\",\"receiverRegion\":\"福田区\",\"receiverDetailAddress\":\"东晓街道\",\"note\":\"\",\"confirmStatus\":0,\"deleteStatus\":0,\"useIntegration\":1000,\"paymentTime\":\"2021-03-16 20:58:57\",\"deliveryTime\":\"2023-06-25 11:14:56\",\"receiveTime\":\"2021-03-16 20:58:57\",\"commentTime\":\"2021-03-16 20:58:57\",\"modifyTime\":\"2021-03-16 20:58:57\",\"listOperateHistoryData\":[{\"id\":15,\"orderId\":23,\"operateMan\":\"后台管理员\",\"createTime\":\"2018-10-16 14:41:28\",\"orderStatus\":2,\"note\":\"完成发货\"}],\"listOrderItemData\":null},{\"id\":24,\"memberId\":1,\"couponId\":2,\"orderSn\":\"201809130101000005\",\"createTime\":\"2018-09-13 16:57:40\",\"memberUserName\":\"test\",\"totalAmount\":18732,\"payAmount\":16377.75,\"freightAmount\":0,\"promotionAmount\":2344.25,\"integrationAmount\":0,\"couponAmount\":10,\"discountAmount\":0,\"payType\":2,\"sourceType\":1,\"status\":2,\"orderType\":0,\"deliveryCompany\":\"顺丰快递\",\"deliverySn\":\"201707196398345\",\"autoConfirmDay\":15,\"integration\":13284,\"growth\":13284,\"promotionInfo\":\"单品促销,打折优惠：满3件，打7.50折,满减优惠：满1000.00元，减120.00元,满减优惠：满1000.00元，减120.00元,无优惠\",\"billType\":1,\"billHeader\":\"1111\",\"billContent\":\"1111\",\"billReceiverPhone\":\"18613030352\",\"billReceiverEmail\":\"1002219331@qq.com\",\"receiverName\":\"大梨\",\"receiverPhone\":\"18033441849\",\"receiverPostCode\":\"518000\",\"receiverProvince\":\"广东省\",\"receiverCity\":\"深圳市\",\"receiverRegion\":\"福田区\",\"receiverDetailAddress\":\"东晓街道\",\"note\":\"111\",\"confirmStatus\":0,\"deleteStatus\":0,\"useIntegration\":1000,\"paymentTime\":\"2021-03-16 20:58:57\",\"deliveryTime\":\"2021-03-16 20:58:57\",\"receiveTime\":\"2021-03-16 20:58:57\",\"commentTime\":\"2021-03-16 20:58:57\",\"modifyTime\":\"2021-03-16 20:58:57\",\"listOperateHistoryData\":null,\"listOrderItemData\":null}],\"pageSize\":10,\"success\":true,\"total\":15}",
            "time": 131,
            "ip": "123.185.180.109",
            "operationTime": "2023-09-08 11:15:25"
        },
        {
            "id": 27899,
            "userName": "admin",
            "operation": "POST",
            "method": "/api/order/returnreason/list",
            "requestParams": "{\"current\":1,\"pageSize\":10}",
            "responseParams": "{\"code\":\"000000\",\"message\":\"查询退货原因成功\",\"current\":1,\"data\":[{\"id\":1,\"name\":\"质量问题\",\"sort\":1,\"status\":1,\"createTime\":\"2018-10-17 10:00:45\"},{\"id\":2,\"name\":\"尺码太大\",\"sort\":1,\"status\":1,\"createTime\":\"2018-10-17 10:01:03\"},{\"id\":3,\"name\":\"颜色不喜欢\",\"sort\":1,\"status\":1,\"createTime\":\"2018-10-17 10:01:13\"},{\"id\":4,\"name\":\"7天无理由退货\",\"sort\":1,\"status\":1,\"createTime\":\"2018-10-17 10:01:47\"},{\"id\":5,\"name\":\"价格问题\",\"sort\":1,\"status\":0,\"createTime\":\"2018-10-17 10:01:57\"},{\"id\":12,\"name\":\"发票问题\",\"sort\":0,\"status\":1,\"createTime\":\"2018-10-19 16:28:36\"},{\"id\":13,\"name\":\"其他问题\",\"sort\":0,\"status\":1,\"createTime\":\"2018-10-19 16:28:51\"},{\"id\":14,\"name\":\"物流问题\",\"sort\":0,\"status\":1,\"createTime\":\"2018-10-19 16:29:01\"},{\"id\":15,\"name\":\"售后问题\",\"sort\":0,\"status\":1,\"createTime\":\"2018-10-19 16:29:11\"}],\"pageSize\":10,\"success\":true,\"total\":9}",
            "time": 13,
            "ip": "123.185.180.109",
            "operationTime": "2023-09-08 11:15:24"
        },
        {
            "id": 27898,
            "userName": "admin",
            "operation": "POST",
            "method": "/api/order/returnapply/list",
            "requestParams": "{\"current\":1,\"pageSize\":10}",
            "responseParams": "{\"code\":\"000000\",\"message\":\"查询退货申请列表成功\",\"current\":1,\"data\":[{\"id\":3,\"orderId\":12,\"companyAddressId\":0,\"productId\":26,\"orderSn\":\"201809150101000001\",\"createTime\":\"2018-10-17 14:34:57\",\"memberUserName\":\"test\",\"returnAmount\":3585,\"returnName\":\"大梨\",\"returnPhone\":\"18000000000\",\"status\":2,\"handleTime\":\"2023-07-04 23:19:31\",\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg\",\"productName\":\"华为 HUAWEI P20\",\"productBrand\":\"华为\",\"productAttr\":\"颜色：金色;内存：16G\",\"productCount\":1,\"productPrice\":3788,\"productRealPrice\":3585,\"reason\":\"质量问题\",\"description\":\"老是卡\",\"proofPics\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg,http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/xiaomi.jpg\",\"handleNote\":\"\",\"handleMan\":\"admin\",\"receiveMan\":\"admin\",\"receiveTime\":\"2023-07-04 23:19:31\",\"receiveNote\":\"\"},{\"id\":4,\"orderId\":12,\"companyAddressId\":2,\"productId\":27,\"orderSn\":\"201809150101000001\",\"createTime\":\"2018-10-17 14:40:21\",\"memberUserName\":\"test\",\"returnAmount\":3585,\"returnName\":\"大梨\",\"returnPhone\":\"18000000000\",\"status\":1,\"handleTime\":\"2021-03-16 20:56:40\",\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/xiaomi.jpg\",\"productName\":\"小米8\",\"productBrand\":\"小米\",\"productAttr\":\"颜色：黑色;内存：32G\",\"productCount\":1,\"productPrice\":2699,\"productRealPrice\":2022,\"reason\":\"质量问题\",\"description\":\"不够高端\",\"proofPics\":\"\",\"handleNote\":\"已经处理了\",\"handleMan\":\"admin\",\"receiveMan\":\"admin\",\"receiveTime\":\"2021-03-16 20:56:16\",\"receiveNote\":\"收货了\"},{\"id\":5,\"orderId\":12,\"companyAddressId\":3,\"productId\":28,\"orderSn\":\"201809150101000001\",\"createTime\":\"2018-10-17 14:44:18\",\"memberUserName\":\"test\",\"returnAmount\":3585,\"returnName\":\"大梨\",\"returnPhone\":\"18000000000\",\"status\":2,\"handleTime\":\"2021-03-16 20:56:40\",\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg\",\"productName\":\"红米5A\",\"productBrand\":\"小米\",\"productAttr\":\"颜色：金色;内存：16G\",\"productCount\":1,\"productPrice\":649,\"productRealPrice\":591,\"reason\":\"质量问题\",\"description\":\"颜色太土\",\"proofPics\":\"\",\"handleNote\":\"已经处理了\",\"handleMan\":\"admin\",\"receiveMan\":\"admin\",\"receiveTime\":\"2021-03-16 20:56:16\",\"receiveNote\":\"收货了\"},{\"id\":8,\"orderId\":13,\"companyAddressId\":1,\"productId\":28,\"orderSn\":\"201809150102000002\",\"createTime\":\"2018-10-17 14:44:18\",\"memberUserName\":\"test\",\"returnAmount\":3585,\"returnName\":\"大梨\",\"returnPhone\":\"18000000000\",\"status\":3,\"handleTime\":\"2021-03-16 20:56:40\",\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg\",\"productName\":\"红米5A\",\"productBrand\":\"小米\",\"productAttr\":\"颜色：金色;内存：16G\",\"productCount\":1,\"productPrice\":649,\"productRealPrice\":591,\"reason\":\"质量问题\",\"description\":\"颜色太土\",\"proofPics\":\"\",\"handleNote\":\"理由不够充分\",\"handleMan\":\"admin\",\"receiveMan\":\"admin\",\"receiveTime\":\"2021-03-16 20:56:16\",\"receiveNote\":\"收货了\"},{\"id\":9,\"orderId\":14,\"companyAddressId\":2,\"productId\":26,\"orderSn\":\"201809130101000001\",\"createTime\":\"2018-10-17 14:34:57\",\"memberUserName\":\"test\",\"returnAmount\":3500,\"returnName\":\"大梨\",\"returnPhone\":\"18000000000\",\"status\":2,\"handleTime\":\"2021-03-16 20:56:40\",\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg\",\"productName\":\"华为 HUAWEI P20\",\"productBrand\":\"华为\",\"productAttr\":\"颜色：金色;内存：16G\",\"productCount\":1,\"productPrice\":3788,\"productRealPrice\":3585,\"reason\":\"质量问题\",\"description\":\"老是卡\",\"proofPics\":\"\",\"handleNote\":\"呵呵\",\"handleMan\":\"admin\",\"receiveMan\":\"admin\",\"receiveTime\":\"2021-03-16 20:56:16\",\"receiveNote\":\"收货了\"},{\"id\":10,\"orderId\":14,\"companyAddressId\":1,\"productId\":27,\"orderSn\":\"201809130101000001\",\"createTime\":\"2018-10-17 14:40:21\",\"memberUserName\":\"test\",\"returnAmount\":3585,\"returnName\":\"大梨\",\"returnPhone\":\"18000000000\",\"status\":3,\"handleTime\":\"2021-03-16 20:56:40\",\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/xiaomi.jpg\",\"productName\":\"小米8\",\"productBrand\":\"小米\",\"productAttr\":\"颜色：黑色;内存：32G\",\"productCount\":1,\"productPrice\":2699,\"productRealPrice\":2022,\"reason\":\"质量问题\",\"description\":\"不够高端\",\"proofPics\":\"\",\"handleNote\":\"就是不退\",\"handleMan\":\"admin\",\"receiveMan\":\"admin\",\"receiveTime\":\"2021-03-16 20:56:16\",\"receiveNote\":\"收货了\"},{\"id\":11,\"orderId\":14,\"companyAddressId\":2,\"productId\":28,\"orderSn\":\"201809130101000001\",\"createTime\":\"2018-10-17 14:44:18\",\"memberUserName\":\"test\",\"returnAmount\":591,\"returnName\":\"大梨\",\"returnPhone\":\"18000000000\",\"status\":2,\"handleTime\":\"2023-08-18 14:33:53\",\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg\",\"productName\":\"红米5A\",\"productBrand\":\"小米\",\"productAttr\":\"颜色：金色;内存：16G\",\"productCount\":1,\"productPrice\":649,\"productRealPrice\":591,\"reason\":\"质量问题\",\"description\":\"颜色太土\",\"proofPics\":\"\",\"handleNote\":\"\",\"handleMan\":\"admin\",\"receiveMan\":\"admin\",\"receiveTime\":\"2023-08-18 14:33:53\",\"receiveNote\":\"\"},{\"id\":12,\"orderId\":15,\"companyAddressId\":3,\"productId\":26,\"orderSn\":\"201809130102000002\",\"createTime\":\"2018-10-17 14:34:57\",\"memberUserName\":\"test\",\"returnAmount\":3500,\"returnName\":\"大梨\",\"returnPhone\":\"18000000000\",\"status\":2,\"handleTime\":\"2021-03-16 20:56:40\",\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg\",\"productName\":\"华为 HUAWEI P20\",\"productBrand\":\"华为\",\"productAttr\":\"颜色：金色;内存：16G\",\"productCount\":1,\"productPrice\":3788,\"productRealPrice\":3585,\"reason\":\"质量问题\",\"description\":\"老是卡\",\"proofPics\":\"\",\"handleNote\":\"退货了\",\"handleMan\":\"admin\",\"receiveMan\":\"admin\",\"receiveTime\":\"2021-03-16 20:56:16\",\"receiveNote\":\"收货了\"}],\"pageSize\":10,\"success\":true,\"total\":8}",
            "time": 13,
            "ip": "123.185.180.109",
            "operationTime": "2023-09-08 11:15:24"
        },
        {
            "id": 27896,
            "userName": "admin",
            "operation": "POST",
            "method": "/api/order/returnapply/list",
            "requestParams": "{\"current\":1,\"pageSize\":10}",
            "responseParams": "{\"code\":\"000000\",\"message\":\"查询退货申请列表成功\",\"current\":1,\"data\":[{\"id\":3,\"orderId\":12,\"companyAddressId\":0,\"productId\":26,\"orderSn\":\"201809150101000001\",\"createTime\":\"2018-10-17 14:34:57\",\"memberUserName\":\"test\",\"returnAmount\":3585,\"returnName\":\"大梨\",\"returnPhone\":\"18000000000\",\"status\":2,\"handleTime\":\"2023-07-04 23:19:31\",\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg\",\"productName\":\"华为 HUAWEI P20\",\"productBrand\":\"华为\",\"productAttr\":\"颜色：金色;内存：16G\",\"productCount\":1,\"productPrice\":3788,\"productRealPrice\":3585,\"reason\":\"质量问题\",\"description\":\"老是卡\",\"proofPics\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg,http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/xiaomi.jpg\",\"handleNote\":\"\",\"handleMan\":\"admin\",\"receiveMan\":\"admin\",\"receiveTime\":\"2023-07-04 23:19:31\",\"receiveNote\":\"\"},{\"id\":4,\"orderId\":12,\"companyAddressId\":2,\"productId\":27,\"orderSn\":\"201809150101000001\",\"createTime\":\"2018-10-17 14:40:21\",\"memberUserName\":\"test\",\"returnAmount\":3585,\"returnName\":\"大梨\",\"returnPhone\":\"18000000000\",\"status\":1,\"handleTime\":\"2021-03-16 20:56:40\",\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/xiaomi.jpg\",\"productName\":\"小米8\",\"productBrand\":\"小米\",\"productAttr\":\"颜色：黑色;内存：32G\",\"productCount\":1,\"productPrice\":2699,\"productRealPrice\":2022,\"reason\":\"质量问题\",\"description\":\"不够高端\",\"proofPics\":\"\",\"handleNote\":\"已经处理了\",\"handleMan\":\"admin\",\"receiveMan\":\"admin\",\"receiveTime\":\"2021-03-16 20:56:16\",\"receiveNote\":\"收货了\"},{\"id\":5,\"orderId\":12,\"companyAddressId\":3,\"productId\":28,\"orderSn\":\"201809150101000001\",\"createTime\":\"2018-10-17 14:44:18\",\"memberUserName\":\"test\",\"returnAmount\":3585,\"returnName\":\"大梨\",\"returnPhone\":\"18000000000\",\"status\":2,\"handleTime\":\"2021-03-16 20:56:40\",\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg\",\"productName\":\"红米5A\",\"productBrand\":\"小米\",\"productAttr\":\"颜色：金色;内存：16G\",\"productCount\":1,\"productPrice\":649,\"productRealPrice\":591,\"reason\":\"质量问题\",\"description\":\"颜色太土\",\"proofPics\":\"\",\"handleNote\":\"已经处理了\",\"handleMan\":\"admin\",\"receiveMan\":\"admin\",\"receiveTime\":\"2021-03-16 20:56:16\",\"receiveNote\":\"收货了\"},{\"id\":8,\"orderId\":13,\"companyAddressId\":1,\"productId\":28,\"orderSn\":\"201809150102000002\",\"createTime\":\"2018-10-17 14:44:18\",\"memberUserName\":\"test\",\"returnAmount\":3585,\"returnName\":\"大梨\",\"returnPhone\":\"18000000000\",\"status\":3,\"handleTime\":\"2021-03-16 20:56:40\",\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg\",\"productName\":\"红米5A\",\"productBrand\":\"小米\",\"productAttr\":\"颜色：金色;内存：16G\",\"productCount\":1,\"productPrice\":649,\"productRealPrice\":591,\"reason\":\"质量问题\",\"description\":\"颜色太土\",\"proofPics\":\"\",\"handleNote\":\"理由不够充分\",\"handleMan\":\"admin\",\"receiveMan\":\"admin\",\"receiveTime\":\"2021-03-16 20:56:16\",\"receiveNote\":\"收货了\"},{\"id\":9,\"orderId\":14,\"companyAddressId\":2,\"productId\":26,\"orderSn\":\"201809130101000001\",\"createTime\":\"2018-10-17 14:34:57\",\"memberUserName\":\"test\",\"returnAmount\":3500,\"returnName\":\"大梨\",\"returnPhone\":\"18000000000\",\"status\":2,\"handleTime\":\"2021-03-16 20:56:40\",\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg\",\"productName\":\"华为 HUAWEI P20\",\"productBrand\":\"华为\",\"productAttr\":\"颜色：金色;内存：16G\",\"productCount\":1,\"productPrice\":3788,\"productRealPrice\":3585,\"reason\":\"质量问题\",\"description\":\"老是卡\",\"proofPics\":\"\",\"handleNote\":\"呵呵\",\"handleMan\":\"admin\",\"receiveMan\":\"admin\",\"receiveTime\":\"2021-03-16 20:56:16\",\"receiveNote\":\"收货了\"},{\"id\":10,\"orderId\":14,\"companyAddressId\":1,\"productId\":27,\"orderSn\":\"201809130101000001\",\"createTime\":\"2018-10-17 14:40:21\",\"memberUserName\":\"test\",\"returnAmount\":3585,\"returnName\":\"大梨\",\"returnPhone\":\"18000000000\",\"status\":3,\"handleTime\":\"2021-03-16 20:56:40\",\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/xiaomi.jpg\",\"productName\":\"小米8\",\"productBrand\":\"小米\",\"productAttr\":\"颜色：黑色;内存：32G\",\"productCount\":1,\"productPrice\":2699,\"productRealPrice\":2022,\"reason\":\"质量问题\",\"description\":\"不够高端\",\"proofPics\":\"\",\"handleNote\":\"就是不退\",\"handleMan\":\"admin\",\"receiveMan\":\"admin\",\"receiveTime\":\"2021-03-16 20:56:16\",\"receiveNote\":\"收货了\"},{\"id\":11,\"orderId\":14,\"companyAddressId\":2,\"productId\":28,\"orderSn\":\"201809130101000001\",\"createTime\":\"2018-10-17 14:44:18\",\"memberUserName\":\"test\",\"returnAmount\":591,\"returnName\":\"大梨\",\"returnPhone\":\"18000000000\",\"status\":2,\"handleTime\":\"2023-08-18 14:33:53\",\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg\",\"productName\":\"红米5A\",\"productBrand\":\"小米\",\"productAttr\":\"颜色：金色;内存：16G\",\"productCount\":1,\"productPrice\":649,\"productRealPrice\":591,\"reason\":\"质量问题\",\"description\":\"颜色太土\",\"proofPics\":\"\",\"handleNote\":\"\",\"handleMan\":\"admin\",\"receiveMan\":\"admin\",\"receiveTime\":\"2023-08-18 14:33:53\",\"receiveNote\":\"\"},{\"id\":12,\"orderId\":15,\"companyAddressId\":3,\"productId\":26,\"orderSn\":\"201809130102000002\",\"createTime\":\"2018-10-17 14:34:57\",\"memberUserName\":\"test\",\"returnAmount\":3500,\"returnName\":\"大梨\",\"returnPhone\":\"18000000000\",\"status\":2,\"handleTime\":\"2021-03-16 20:56:40\",\"productPic\":\"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg\",\"productName\":\"华为 HUAWEI P20\",\"productBrand\":\"华为\",\"productAttr\":\"颜色：金色;内存：16G\",\"productCount\":1,\"productPrice\":3788,\"productRealPrice\":3585,\"reason\":\"质量问题\",\"description\":\"老是卡\",\"proofPics\":\"\",\"handleNote\":\"退货了\",\"handleMan\":\"admin\",\"receiveMan\":\"admin\",\"receiveTime\":\"2021-03-16 20:56:16\",\"receiveNote\":\"收货了\"}],\"pageSize\":10,\"success\":true,\"total\":8}",
            "time": 13,
            "ip": "123.185.180.109",
            "operationTime": "2023-09-08 11:15:13"
        },
        {
            "id": 27897,
            "userName": "admin",
            "operation": "POST",
            "method": "/api/order/returnreason/list",
            "requestParams": "{\"current\":1,\"pageSize\":10}",
            "responseParams": "{\"code\":\"000000\",\"message\":\"查询退货原因成功\",\"current\":1,\"data\":[{\"id\":1,\"name\":\"质量问题\",\"sort\":1,\"status\":1,\"createTime\":\"2018-10-17 10:00:45\"},{\"id\":2,\"name\":\"尺码太大\",\"sort\":1,\"status\":1,\"createTime\":\"2018-10-17 10:01:03\"},{\"id\":3,\"name\":\"颜色不喜欢\",\"sort\":1,\"status\":1,\"createTime\":\"2018-10-17 10:01:13\"},{\"id\":4,\"name\":\"7天无理由退货\",\"sort\":1,\"status\":1,\"createTime\":\"2018-10-17 10:01:47\"},{\"id\":5,\"name\":\"价格问题\",\"sort\":1,\"status\":0,\"createTime\":\"2018-10-17 10:01:57\"},{\"id\":12,\"name\":\"发票问题\",\"sort\":0,\"status\":1,\"createTime\":\"2018-10-19 16:28:36\"},{\"id\":13,\"name\":\"其他问题\",\"sort\":0,\"status\":1,\"createTime\":\"2018-10-19 16:28:51\"},{\"id\":14,\"name\":\"物流问题\",\"sort\":0,\"status\":1,\"createTime\":\"2018-10-19 16:29:01\"},{\"id\":15,\"name\":\"售后问题\",\"sort\":0,\"status\":1,\"createTime\":\"2018-10-19 16:29:11\"}],\"pageSize\":10,\"success\":true,\"total\":9}",
            "time": 12,
            "ip": "123.185.180.109",
            "operationTime": "2023-09-08 11:15:13"
        },
        {
            "id": 27895,
            "userName": "admin",
            "operation": "POST",
            "method": "/api/order/setting/list",
            "requestParams": "{\"current\":1,\"pageSize\":10}",
            "responseParams": "{\"code\":\"000000\",\"message\":\"查询订单设置成功\",\"current\":1,\"data\":[{\"id\":1,\"flashOrderOvertime\":7,\"normalOrderOvertime\":120,\"confirmOvertime\":15,\"finishOvertime\":7,\"commentOvertime\":7}],\"pageSize\":10,\"success\":true,\"total\":1}",
            "time": 24,
            "ip": "123.185.180.109",
            "operationTime": "2023-09-08 11:15:08"
        },
        {
            "id": 27893,
            "userName": "admin",
            "operation": "POST",
            "method": "/api/member/loginlog/list",
            "requestParams": "{\"current\":1,\"pageSize\":6,\"memberId\":0}",
            "responseParams": "{\"code\":\"000000\",\"message\":\"查询员登录记录列表成功\",\"current\":1,\"data\":null,\"pageSize\":6,\"success\":true,\"total\":0}",
            "time": 9,
            "ip": "123.185.180.109",
            "operationTime": "2023-09-08 11:14:55"
        }
    ],
    "pageSize": 10,
    "success": true,
    "total": 27769
}

drone/device/list
{
    "current": 1,
    "data": [
        {
            "id": 1,
            "name": "万和",
            "firstLetter": "W",
            "sort": 0,
            "factoryStatus": 1,
            "showStatus": 1,
            "productCount": 100,
            "productCommentCount": 100,
            "logo": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg(5).jpg",
            "bigPic": "12",
            "brandStory": "Victoria's Secret的故事"
        },
        {
            "id": 2,
            "name": "三星",
            "firstLetter": "S",
            "sort": 100,
            "factoryStatus": 1,
            "showStatus": 1,
            "productCount": 100,
            "productCommentCount": 100,
            "logo": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg (1).jpg",
            "bigPic": " ",
            "brandStory": "三星的故事"
        },
        {
            "id": 3,
            "name": "华为",
            "firstLetter": "H",
            "sort": 100,
            "factoryStatus": 1,
            "showStatus": 0,
            "productCount": 100,
            "productCommentCount": 100,
            "logo": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg (2).jpg",
            "bigPic": " ",
            "brandStory": "Victoria's Secret的故事"
        },
        {
            "id": 4,
            "name": "格力",
            "firstLetter": "G",
            "sort": 30,
            "factoryStatus": 1,
            "showStatus": 0,
            "productCount": 100,
            "productCommentCount": 100,
            "logo": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg (3).jpg",
            "bigPic": " ",
            "brandStory": "Victoria's Secret的故事"
        },
        {
            "id": 5,
            "name": "方太",
            "firstLetter": "F",
            "sort": 20,
            "factoryStatus": 1,
            "showStatus": 0,
            "productCount": 100,
            "productCommentCount": 100,
            "logo": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg (4).jpg",
            "bigPic": " ",
            "brandStory": "Victoria's Secret的故事"
        },
        {
            "id": 6,
            "name": "小米",
            "firstLetter": "M",
            "sort": 500,
            "factoryStatus": 1,
            "showStatus": 1,
            "productCount": 100,
            "productCommentCount": 100,
            "logo": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180518/5a912944N474afb7a.png",
            "bigPic": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180518/5afd7778Nf7800b75.jpg",
            "brandStory": "小米手机的故事"
        },
        {
            "id": 21,
            "name": "OPPO",
            "firstLetter": "O",
            "sort": 0,
            "factoryStatus": 1,
            "showStatus": 1,
            "productCount": 88,
            "productCommentCount": 500,
            "logo": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg(6).jpg",
            "bigPic": "",
            "brandStory": "string"
        },
        {
            "id": 49,
            "name": "七匹狼",
            "firstLetter": "S",
            "sort": 200,
            "factoryStatus": 1,
            "showStatus": 1,
            "productCount": 77,
            "productCommentCount": 400,
            "logo": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180518/1522738681.jpg",
            "bigPic": " ",
            "brandStory": "BOOB的故事"
        },
        {
            "id": 50,
            "name": "海澜之家",
            "firstLetter": "H",
            "sort": 200,
            "factoryStatus": 1,
            "showStatus": 1,
            "productCount": 66,
            "productCommentCount": 300,
            "logo": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/LOGO1024.png",
            "bigPic": "",
            "brandStory": "海澜之家的故事"
        },
        {
            "id": 51,
            "name": "苹果",
            "firstLetter": "A",
            "sort": 200,
            "factoryStatus": 1,
            "showStatus": 1,
            "productCount": 55,
            "productCommentCount": 200,
            "logo": "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg.jpg",
            "bigPic": " ",
            "brandStory": "苹果的故事"
        }
    ],
    "pageSize": 10,
    "success": true,
    "total": 11,
    "code": "000000",
    "message": "查询商品品牌成功"
}
drone/task/list
drone/taskInfo/list
{
    "code": "000000",
    "message": "查询限时购表成功",
    "current": 1,
    "data": [
        {
            "id": 2,
            "title": "春季家电家具疯狂秒杀1",
            "startDate": "2018-11-12",
            "endDate": "2018-11-23",
            "status": 1,
            "createTime": "2018-11-16 11:12:13"
        },
        {
            "id": 3,
            "title": "手机特卖",
            "startDate": "2018-11-03",
            "endDate": "2018-11-10",
            "status": 1,
            "createTime": "2018-11-16 11:11:31"
        },
        {
            "id": 4,
            "title": "春季家电家具疯狂秒杀3",
            "startDate": "2018-11-24",
            "endDate": "2018-11-25",
            "status": 1,
            "createTime": "2018-11-16 11:12:19"
        },
        {
            "id": 5,
            "title": "春季家电家具疯狂秒杀4",
            "startDate": "2018-11-16",
            "endDate": "2018-11-16",
            "status": 1,
            "createTime": "2018-11-16 11:12:24"
        },
        {
            "id": 6,
            "title": "春季家电家具疯狂秒杀5",
            "startDate": "2018-11-16",
            "endDate": "2018-11-16",
            "status": 1,
            "createTime": "2018-11-16 11:12:31"
        },
        {
            "id": 7,
            "title": "春季家电家具疯狂秒杀6",
            "startDate": "2018-11-16",
            "endDate": "2018-11-16",
            "status": 1,
            "createTime": "2018-11-16 11:12:35"
        },
        {
            "id": 8,
            "title": "春季家电家具疯狂秒杀7",
            "startDate": "2018-11-16",
            "endDate": "2018-11-16",
            "status": 0,
            "createTime": "2018-11-16 11:12:39"
        },
        {
            "id": 9,
            "title": "春季家电家具疯狂秒杀8",
            "startDate": "2018-11-16",
            "endDate": "2018-11-16",
            "status": 0,
            "createTime": "2018-11-16 11:12:42"
        },
        {
            "id": 13,
            "title": "测试",
            "startDate": "2018-11-01",
            "endDate": "2018-11-30",
            "status": 1,
            "createTime": "2018-11-19 10:34:24"
        }
    ],
    "pageSize": 10,
    "success": true,
    "total": 9
}
```
