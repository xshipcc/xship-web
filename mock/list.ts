import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

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
  //
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

  //#region    -----------------------------------------------------------------------
  /**
   *  @file user.ts
   *  @time 2023/09/08
   * @category :
   * @function :
   */

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------
};
