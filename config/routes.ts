export default [
  // 登录
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/AIalert/list',
  },
  // 无人机巡检大屏
  {
    path: '/dashboard',
    name: '无人机巡检大屏',
    layout: false,
    icon: 'dashboard',
    component: './dashboard/',
  },
  // 智能告警
  {
    name: '智能告警',
    icon: 'monitor',
    path: '/AIalert/list',
    component: './AIalert',
  },
  // 报表管理
  {
    name: '报表管理',
    icon: 'FileSearchOutlined',
    path: '/report/list',
    component: './report',
  },
  // 系统管理
  {
    path: '/system',
    name: '系统管理',
    icon: 'crown',
    routes: [
      {
        name: '用户列表',
        icon: 'table',
        path: '/system/user/list',
        component: './system/user',
      },
      {
        name: '角色列表',
        icon: 'table',
        path: '/system/role/list',
        component: './system/role',
      },
      {
        name: '菜单列表',
        icon: 'table',
        path: '/system/menu/list',
        component: './system/menu',
      },
      {
        name: '机构列表',
        icon: 'table',
        path: '/system/dept/list',
        component: './system/dept',
      },
      {
        name: '字典列表',
        icon: 'table',
        path: '/system/dict/list',
        component: './system/dict',
      },
      {
        name: '职位列表',
        icon: 'table',
        path: '/system/job/list',
        component: './system/job',
      },
    ],
  },
  // 日志管理
  {
    path: '/log',
    name: '日志管理',
    icon: 'crown',
    routes: [
      {
        name: '登录日志',
        icon: 'table',
        path: '/log/loginLog/list',
        component: './log/loginlog',
      },
      {
        name: '操作日志',
        icon: 'table',
        path: '/log/sysLog/list',
        component: './log/syslog',
      },
    ],
  },
  // 监控设备管理
  {
    name: '监控管理',
    icon: 'FundOutlined',
    path: '/monitor/list',
    component: './monitor',
  },
  // 无人机管理
  {
    path: '/drone',
    name: '无人机管理',
    icon: 'crown',
    routes: [
      {
        name: '设备管理',
        icon: 'table',
        path: '/drone/device/list',
        component: './drone/device',
      },
      {
        name: '巡检计划',
        icon: 'table',
        path: '/drone/task/list',
        component: './drone/task',
      },
      {
        name: '巡检历史',
        icon: 'table',
        path: '/drone/history/list',
        component: './drone/history',
      },
      {
        name: '航线规划',
        icon: 'table',
        path: '/drone/routePlan/list',
        component: './drone/routePlan',
      },
      {
        name: '无人机网络频段',
        icon: 'table',
        path: '/drone/droneInfo/list',
        component: './drone/droneInfo',
      },
    ],
  },
  // ai识别管理
  {
    path: '/AIrecognition',
    name: 'AI',
    icon: 'FundOutlined',
    routes: [
      {
        name: '摄像头管理',
        icon: 'table',
        path: '/AIrecognition/camera/list',
        component: './AIrecognition/camera',
      },
      {
        name: '车辆管理',
        icon: 'table',
        path: '/AIrecognition/car/list',
        component: './AIrecognition/car',
      },
      {
        name: '人员管理',
        icon: 'table',
        path: '/AIrecognition/people/list',
        component: './AIrecognition/people',
      },
    ],
  },
  //
  {
    component: './404',
  },
];
