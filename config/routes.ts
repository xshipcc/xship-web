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
    path: '/dashboard',
    name: '无人机巡检大屏',
    layout: false,
    icon: 'smile',
    component: './dashboard',
  },

  {
    name: '智能告警',
    icon: 'table',
    path: '/AIalert/list',
    component: './AIalert',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'crown',
    routes: [
      {
        name: '管理员列表',
        icon: 'table',
        path: '/system/admin/list',
        component: './system/admin',
      },
      {
        name: '访客列表',
        icon: 'table',
        path: '/system/visitor/list',
        component: './system/visitor',
      },
      {
        name: '操作员列表',
        icon: 'table',
        path: '/system/operator/list',
        component: './system/operator',
      },
    ],
  },
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
        name: '任务管理',
        icon: 'table',
        path: '/drone/task/list',
        component: './drone/task',
      },
      {
        name: '信息库管理',
        icon: 'table',
        path: '/drone/taskInfo/list',
        component: './drone/taskInfo',
      },
    ],
  },
  {
    component: './404',
  },
];
