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
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: '智能告警',
    icon: 'table',
    path: '/AIalert/list',
    component: './AIalert',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
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
    path: '/pms',
    name: '商品管理',
    icon: 'crown',
    routes: [
      {
        name: '品牌管理',
        icon: 'table',
        path: '/pms/productBrand/list',
        component: './pms/product_brand',
      },
    ],
  },
  {
    path: '/oms',
    name: '订单管理',
    icon: 'crown',
    routes: [
      {
        name: '订单列表',
        icon: 'table',
        path: '/oms/order/list',
        component: './oms/order',
      },
      {
        name: '订单设置',
        icon: 'table',
        path: '/oms/orderSetting/list',
        component: './oms/order_setting',
      },
      {
        name: '退货原因',
        icon: 'table',
        path: '/oms/orderReturnReason/list',
        component: './oms/order_return_reason',
      },
    ],
  },
  {
    path: '/sms',
    name: '营销管理',
    icon: 'crown',
    routes: [
      {
        name: '秒杀活动',
        icon: 'table',
        path: '/sms/flashPromotion/list',
        component: './sms/flash_promotion',
      },
      {
        name: '广告列表',
        icon: 'table',
        path: '/sms/homeAdvertise/list',
        component: './sms/home_advertise',
      },
      {
        name: '优惠券',
        icon: 'table',
        path: '/sms/coupon/list',
        component: './sms/coupon',
      },
    ],
  },
  {
    component: './404',
  },
];
