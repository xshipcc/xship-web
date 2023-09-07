import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */
let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

const getAccess = () => {
  return access;
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': (req: Request, res: Response) => {
    res.send({
      code: '000000',
      message: '获取个人信息成功',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      name: 'admin',
      menuTree: [
        {
          id: 1,
          path: '/welcome',
          name: '欢迎',
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
          path: '/system/user/list',
          name: '用户列表',
          parentId: 2,
          icon: '1',
        },
        {
          id: 4,
          path: '/system/role/list',
          name: '角色列表',
          parentId: 2,
          icon: '',
        },
        {
          id: 5,
          path: '/system/menu/list',
          name: '菜单列表',
          parentId: 2,
          icon: '',
        },
        {
          id: 6,
          path: '/system/dept/list',
          name: '机构列表',
          parentId: 2,
          icon: '',
        },
        {
          id: 7,
          path: '/system/dict/list',
          name: '字典列表',
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
          path: '/pms',
          name: '商品管理',
          parentId: 0,
          icon: 'GiftOutlined',
        },
        {
          id: 18,
          path: '/pms/productBrand/list',
          name: '商品品牌',
          parentId: 16,
          icon: '',
        },

        {
          id: 20,
          path: '/oms',
          name: '订单管理',
          parentId: 0,
          icon: 'DollarCircleOutlined',
        },
        {
          id: 21,
          path: '/oms/orderSetting/list',
          name: '订单设置',
          parentId: 20,
          icon: '',
        },
        {
          id: 22,
          path: '/oms/orderReturnApply/list',
          name: '退货列表',
          parentId: 20,
          icon: '',
        },
        {
          id: 23,
          path: '/oms/orderReturnReason/list',
          name: '退货原因',
          parentId: 20,
          icon: '',
        },
        {
          id: 24,
          path: '/oms/order/list',
          name: '订单列表',
          parentId: 20,
          icon: '',
        },
        {
          id: 25,
          path: '/sms',
          name: '营销管理',
          parentId: 0,
          icon: 'AlertOutlined',
        },
        {
          id: 26,
          path: '/sms/flashPromotion/list',
          name: '秒杀活动',
          parentId: 25,
          icon: '',
        },
        {
          id: 27,
          path: '/sms/homeBrand/list',
          name: '品牌推荐',
          parentId: 25,
          icon: '',
        },
        {
          id: 28,
          path: '/sms/homeNewProduct/list',
          name: '新品推荐',
          parentId: 25,
          icon: '',
        },
        {
          id: 29,
          path: '/sms/homeRecommendProduct/list',
          name: '人气推荐',
          parentId: 25,
          icon: '',
        },
        {
          id: 30,
          path: '/sms/homeRecommendSubject/list',
          name: '专题推荐',
          parentId: 25,
          icon: '',
        },
        {
          id: 31,
          path: '/sms/homeAdvertise/list',
          name: '广告列表',
          parentId: 25,
          icon: '',
        },
        {
          id: 32,
          path: '/sms/coupon/list',
          name: '优惠券',
          parentId: 25,
          icon: '',
        },
        {
          id: 33,
          path: '/system/job/list',
          name: '职位列表',
          parentId: 2,
          icon: '',
        },
        {
          id: 109,
          path: '/pms/attribute/list',
          name: '属性选项',
          parentId: 16,
          icon: '',
        },
        {
          id: 113,
          path: '/pms/attributecategory/list',
          name: '属性分类',
          parentId: 16,
          icon: '',
        },
        {
          id: 141,
          path: '/oms/payRefund',
          name: '支付\u0026退款订单',
          parentId: 20,
          icon: '-',
        },
        {
          id: 142,
          path: '/oms/postage',
          name: '邮费管理',
          parentId: 20,
          icon: '-',
        },
      ],
      menuTreeVue: [
        {
          id: 4,
          parentId: 2,
          title: '角色列表',
          path: 'roleList',
          name: '角色列表',
          icon: 'el-icon-female',
          redirect: '',
          component: 'system/role/index',
          meta: {
            title: '角色列表',
            icon: 'el-icon-female',
          },
        },
        {
          id: 5,
          parentId: 2,
          title: '菜单列表',
          path: 'resourcesList',
          name: '菜单列表',
          icon: 'el-icon-postcard',
          redirect: '',
          component: 'system/resource/index',
          meta: {
            title: '菜单列表',
            icon: 'el-icon-postcard',
          },
        },
        {
          id: 6,
          parentId: 2,
          title: '机构列表',
          path: 'deptList',
          name: '机构列表',
          icon: 'el-icon-bangzhu',
          redirect: '',
          component: 'system/dept/index',
          meta: {
            title: '机构列表',
            icon: 'el-icon-bangzhu',
          },
        },
        {
          id: 7,
          parentId: 2,
          title: '字典列表',
          path: 'dictList',
          name: '字典列表',
          icon: 'el-icon-delete-location',
          redirect: '',
          component: 'system/dict/index',
          meta: {
            title: '字典列表',
            icon: 'el-icon-delete-location',
          },
        },
        {
          id: 8,
          parentId: 0,
          title: '日志管理',
          path: '/log',
          name: '日志管理',
          icon: 'el-icon-delete',
          redirect: '/log/loginLogList',
          component: 'Layout',
          meta: {
            title: '日志管理',
            icon: 'el-icon-delete',
          },
        },
        {
          id: 9,
          parentId: 8,
          title: '登录日志',
          path: 'loginLogList',
          name: '登录日志',
          icon: 'el-icon-remove-outline',
          redirect: '',
          component: 'log/loginlog/index',
          meta: {
            title: '登录日志',
            icon: 'el-icon-remove-outline',
          },
        },
        {
          id: 10,
          parentId: 8,
          title: '操作日志',
          path: 'sysLogList',
          name: '操作日志',
          icon: 'el-icon-camera',
          redirect: '',
          component: 'log/syslog/index',
          meta: {
            title: '操作日志',
            icon: 'el-icon-camera',
          },
        },
        {
          id: 11,
          parentId: 0,
          title: '会员管理',
          path: '/ums',
          name: '会员管理',
          icon: 'el-icon-headset',
          redirect: '/ums/memberList',
          component: 'Layout',
          meta: {
            title: '会员管理',
            icon: 'el-icon-headset',
          },
        },
        {
          id: 12,
          parentId: 11,
          title: '会员列表',
          path: 'memberList',
          name: '会员列表',
          icon: 'el-icon-camera',
          redirect: '',
          component: 'ums/member/index',
          meta: {
            title: '会员列表',
            icon: 'el-icon-camera',
          },
        },
        {
          id: 13,
          parentId: 11,
          title: '会员等级',
          path: 'memberLevelList',
          name: '会员等级',
          icon: 'el-icon-remove-outline',
          redirect: '',
          component: 'ums/member_level/index',
          meta: {
            title: '会员等级',
            icon: 'el-icon-remove-outline',
          },
        },
        {
          id: 16,
          parentId: 0,
          title: '商品管理',
          path: '/pms',
          name: '商品管理',
          icon: 'el-icon-coffee',
          redirect: '/pms/productList',
          component: 'Layout',
          meta: {
            title: '商品管理',
            icon: 'el-icon-coffee',
          },
        },
        {
          id: 17,
          parentId: 16,
          title: '商品分类',
          path: 'productCategoryList',
          name: '商品分类',
          icon: 'el-icon-remove-outline',
          redirect: '',
          component: 'pms/product_category/index',
          meta: {
            title: '商品分类',
            icon: 'el-icon-remove-outline',
          },
        },
        {
          id: 18,
          parentId: 16,
          title: '商品品牌',
          path: 'productBrandList',
          name: '商品品牌',
          icon: 'el-icon-remove-outline',
          redirect: '',
          component: 'pms/product_brand/index',
          meta: {
            title: '商品品牌',
            icon: 'el-icon-remove-outline',
          },
        },
        {
          id: 19,
          parentId: 16,
          title: '商品列表',
          path: 'productList',
          name: '商品列表',
          icon: 'el-icon-camera',
          redirect: '',
          component: 'pms/product/index',
          meta: {
            title: '商品列表',
            icon: 'el-icon-camera',
          },
        },
        {
          id: 20,
          parentId: 0,
          title: '订单管理',
          path: '/oms',
          name: '订单管理',
          icon: 'el-icon-shopping-cart-full',
          redirect: '/oms/orderList',
          component: 'Layout',
          meta: {
            title: '订单管理',
            icon: 'el-icon-shopping-cart-full',
          },
        },
        {
          id: 21,
          parentId: 20,
          title: '订单设置',
          path: 'orderSetting',
          name: '订单设置',
          icon: 'el-icon-remove-outline',
          redirect: '',
          component: 'oms/order_setting/index',
          meta: {
            title: '订单设置',
            icon: 'el-icon-remove-outline',
          },
        },
        {
          id: 22,
          parentId: 20,
          title: '退货列表',
          path: 'orderReturnApplyList',
          name: '退货列表',
          icon: 'el-icon-remove-outline',
          redirect: '',
          component: 'oms/order_return_apply/index',
          meta: {
            title: '退货列表',
            icon: 'el-icon-remove-outline',
          },
        },
        {
          id: 23,
          parentId: 20,
          title: '退货原因',
          path: 'orderReturnReasonList',
          name: '退货原因',
          icon: 'el-icon-remove-outline',
          redirect: '',
          component: 'oms/order_return_reason/index',
          meta: {
            title: '退货原因',
            icon: 'el-icon-remove-outline',
          },
        },
        {
          id: 24,
          parentId: 20,
          title: '订单列表',
          path: 'orderList',
          name: '订单列表',
          icon: 'el-icon-camera',
          redirect: '',
          component: 'oms/order/index',
          meta: {
            title: '订单列表',
            icon: 'el-icon-camera',
          },
        },
        {
          id: 25,
          parentId: 0,
          title: '营销管理',
          path: '/sms',
          name: '营销管理',
          icon: 'el-icon-cold-drink',
          redirect: '/sms/flashPromotionList',
          component: 'Layout',
          meta: {
            title: '营销管理',
            icon: 'el-icon-cold-drink',
          },
        },
        {
          id: 26,
          parentId: 25,
          title: '秒杀活动',
          path: 'flashPromotionList',
          name: '秒杀活动',
          icon: 'el-icon-camera',
          redirect: '',
          component: 'sms/flash_promotion/index',
          meta: {
            title: '秒杀活动',
            icon: 'el-icon-camera',
          },
        },
        {
          id: 27,
          parentId: 25,
          title: '品牌推荐',
          path: 'homeBrandList',
          name: '品牌推荐',
          icon: 'el-icon-remove-outline',
          redirect: '',
          component: 'sms/home_brand/index',
          meta: {
            title: '品牌推荐',
            icon: 'el-icon-remove-outline',
          },
        },
        {
          id: 28,
          parentId: 25,
          title: '新品推荐',
          path: 'homeNewProductList',
          name: '新品推荐',
          icon: 'el-icon-remove-outline',
          redirect: '',
          component: 'sms/home_new_product/index',
          meta: {
            title: '新品推荐',
            icon: 'el-icon-remove-outline',
          },
        },
        {
          id: 29,
          parentId: 25,
          title: '人气推荐',
          path: 'homeRecommendProductList',
          name: '人气推荐',
          icon: 'el-icon-remove-outline',
          redirect: '',
          component: 'sms/home_recommend_product/index',
          meta: {
            title: '人气推荐',
            icon: 'el-icon-remove-outline',
          },
        },
        {
          id: 30,
          parentId: 25,
          title: '专题推荐',
          path: 'homeRecommendSubjectList',
          name: '专题推荐',
          icon: 'el-icon-remove-outline',
          redirect: '',
          component: 'sms/home_recommend_subject/index',
          meta: {
            title: '专题推荐',
            icon: 'el-icon-remove-outline',
          },
        },
        {
          id: 31,
          parentId: 25,
          title: '广告列表',
          path: 'homeAdvertiseList',
          name: '广告列表',
          icon: 'el-icon-remove-outline',
          redirect: '',
          component: 'sms/home_advertise/index',
          meta: {
            title: '广告列表',
            icon: 'el-icon-remove-outline',
          },
        },
        {
          id: 32,
          parentId: 25,
          title: '优惠券',
          path: 'couponList',
          name: '优惠券',
          icon: 'el-icon-remove-outline',
          redirect: '',
          component: 'sms/coupon/index',
          meta: {
            title: '优惠券',
            icon: 'el-icon-remove-outline',
          },
        },
        {
          id: 33,
          parentId: 2,
          title: '职位列表',
          path: 'jobList',
          name: '职位列表',
          icon: 'el-icon-delete-location',
          redirect: '',
          component: 'system/job/index',
          meta: {
            title: '职位列表',
            icon: 'el-icon-delete-location',
          },
        },
      ],
    });
  },
  'POST /api/login': (req: Request, res: Response) => {
    res.send({
      code: '000000',
      message: '登录成功',
      status: 'ok',
      currentAuthority: 'admin',
      id: 1,
      userName: 'admin',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQxNDU5MDksImlhdCI6MTY5NDA1OTUwOSwidXNlcklkIjoxLCJ1c2VyTmFtZSI6ImFkbWluIn0.aEZznffgsD50rNQmLYSjwjfCA_m3CiWtcTLI4LF0zzI',
      accessExpire: 1694145909,
      refreshAfter: 1694102709,
    });
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await waitTime(2000);
    if (password === 'ant.design' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }
    if (password === 'ant.design' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      access = 'user';
      return;
    }
    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
  },
  'POST /api/login/outLogin': (req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user', success: true });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,
};
