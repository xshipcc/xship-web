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

// const getAccess = () => {
//   return access;
// };

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
