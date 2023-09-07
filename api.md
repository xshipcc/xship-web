# login

```json
{
  "timestamp": 1693981108,
  "code": "200",
  "status": 200,
  "message": "登录成功",
  "result": {
    "id": "1582631698900717568",
    "dept_id": "1574566521848467456",
    "nick_name": "jinpu",
    "role": 0,
    "menu": [
      {
        "name": "地图",
        "path": "/map",
        "icon": "icon-ditu",
        "menu_render": 2,
        "header_render": 2,
        "component": "./Welcome"
      },
      {
        "name": "统计分析",
        "path": "/statistical-analysis",
        "icon": "icon-dashboard3",
        "component": "./StatisticalAnalysis"
      },
      {
        "name": "矿场管理",
        "path": "/company",
        "icon": "icon-kuang1",
        "component": "./Company"
      },
      {
        "name": "车辆管理",
        "path": "/car",
        "icon": "icon-car",
        "component": "./Cars"
      },
      {
        "name": "车辆预警",
        "path": "/warring",
        "icon": "icon-car",
        "hide_in_menu": 1,
        "component": "./EarlyWarring"
      },
      {
        "name": "蓝牙卡管理",
        "path": "/bluetooth",
        "icon": "icon-bluetooth1",
        "routes": [
          {
            "name": "蓝牙卡管理",
            "path": "/bluetooth/bluetooth",
            "component": "./BluetoothCard"
          },
          {
            "name": "蓝牙卡历史",
            "path": "/bluetooth/blue-card-record",
            "component": "./BluetoothCardHistory"
          }
        ]
      },
      {
        "name": "报表管理",
        "path": "/report",
        "icon": "icon-dashborad1",
        "component": "./Report"
      },
      {
        "name": "监控管理",
        "path": "/monitor",
        "icon": "icon-monitor",
        "component": "./Monitor"
      },
      {
        "name": "AI监管",
        "path": "/regulation",
        "icon": "icon-ai1",
        "routes": [
          {
            "name": "车辆记录",
            "path": "/regulation/car",
            "component": "./record/CarRecord"
          },
          {
            "name": "抓拍记录",
            "path": "/regulation/capture",
            "component": "./record/Capture"
          },
          {
            "name": "异常报警",
            "path": "/regulation/abnormal-alarm",
            "component": "./record/AbnormalAlarm"
          },
          {
            "name": "车辆日志",
            "path": "/regulation/abnormal-car",
            "component": "./record/AbnormalCarLog"
          },
          {
            "name": "场地异常",
            "path": "/regulation/site-anomaly",
            "component": "./record/SiteAnomaly"
          }
        ]
      },
      {
        "name": "系统管理",
        "path": "/system",
        "icon": "icon-system",
        "routes": [
          {
            "name": "组织机构管理",
            "path": "/system/dept",
            "component": "./system/dept"
          },
          {
            "name": "菜单管理",
            "path": "/system/menu",
            "component": "./system/menu"
          },
          {
            "name": "角色管理",
            "path": "/system/role",
            "component": "./system/role"
          },
          {
            "name": "用户管理",
            "path": "/system/user",
            "component": "./system/user"
          }
        ]
      },
      {
        "name": "视频列表",
        "path": "/video-list/:id",
        "hide_in_menu": 1,
        "menu_render": 2,
        "header_render": 2,
        "component": "/VideoList"
      },
      {
        "name": "视频播放",
        "path": "/video-info",
        "hide_in_menu": 1,
        "menu_render": 2,
        "header_render": 2,
        "component": "./VideoInfo"
      },
      {
        "name": "视频历史",
        "path": "/video-history/:mid",
        "hide_in_menu": 1,
        "menu_render": 2,
        "header_render": 2,
        "component": "./VideoHistory"
      },
      {
        "name": "操作日志",
        "path": "/operationlogrecord",
        "icon": "icon-cao2",
        "component": "./OperationLogRecord"
      }
    ],
    "menu_name_list": [
      "地图",
      "车辆记录",
      "组织机构管理",
      "蓝牙卡管理",
      "统计分析",
      "抓拍记录",
      "菜单管理",
      "蓝牙卡历史",
      "矿场管理",
      "角色管理",
      "车辆管理",
      "异常报警",
      "车辆预警",
      "用户管理",
      "车辆日志",
      "蓝牙卡管理",
      "场地异常",
      "报表管理",
      "监控管理",
      "AI监管",
      "系统管理",
      "视频列表",
      "视频播放",
      "视频历史",
      "操作日志"
    ],
    "perms": [],
    "is_bottom": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXB0TmFtZSI6IjE1ODUxODQ5MTk5ODQ4MDM4NDAiLCJleHAiOjE2OTQwNjc1MDgsImlhdCI6MTY5Mzk4MTEwOCwibmlja05hbWUiOiJqaW5wdSIsInVzZXJJZCI6IjE1ODI2MzE2OTg5MDA3MTc1NjgifQ.61z5-w-Or49qN5M0LDBIHtR1t7zxf36iDBc5hWo4s0U",
    "ids": [
      "1574581815186821120",
      "1574589158070947840",
      "1574589356671242240",
      "1578586447387037696",
      "1578631625103642624",
      "1578631865206575104",
      "1578632189375942656",
      "1579317455702986752",
      "1579322376351387648",
      "1579322931777900544",
      "1579323277178834944",
      "1579405641343045632",
      "1580394334862184448"
    ],
    "accessExpire": 1694067508,
    "refreshAfter": 1694024308
  }
}

tree
{
    "timestamp": 1693981108,
    "code": "1000200",
    "status": 200,
    "message": "",
    "result": [
        {
            "value": "1574566271876337664",
            "title": "超级管理员",
            "pid": "0",
            "children": [
                {
                    "value": "1574566521848467456",
                    "title": "德泰",
                    "pid": "1574566271876337664",
                    "children": [
                        {
                            "value": "1583341911320563712",
                            "title": "3eeee",
                            "pid": "1574566521848467456",
                            "children": []
                        }
                    ]
                }
            ]
        }
    ]
}
```