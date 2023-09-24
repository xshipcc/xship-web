/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-24 22:18:24
 * @FilePath: \zero-admin-ui-master\mock\user.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Request, Response } from 'express';

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
  /**
   *  @file user.ts
   *  @time 2023/09/24
   * @category :用户登陆信息获取
   * @function :
   */
  //#region -------------------------------------------------------------------------

  'GET /api/sys/user/currentUser': (req: Request, res: Response) => {
    res.send({
      code: '000000',
      message: '获取个人信息成功',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      name: 'admin',
      menuTree: [
        {
          id: 1,
          path: '/dashboard',
          name: '无人机巡检大屏',
          parentId: 0,
          icon: 'SmileOutlined',
        },
        {
          id: 11,
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
          id: 12,
          path: '/drone',
          name: '无人机管理',
          parentId: 0,
          icon: 'GiftOutlined',
        },
        {
          id: 13,
          path: '/drone/device/list',
          name: '设备管理',
          parentId: 12,
          icon: '',
        },
        {
          id: 14,
          path: '/drone/task/list',
          name: '巡检计划',
          parentId: 12,
          icon: '',
        },
        {
          id: 15,
          path: '/drone/history/list',
          name: '巡检历史',
          parentId: 12,
          icon: '',
        },
        {
          id: 16,
          path: '/drone/routePlan/list',
          name: '航线管理',
          parentId: 12,
          icon: '',
        },
      ],
    });
  },
  //
  'POST /api/sys/user/login': (req: Request, res: Response) => {
    res.send({
      message: '登录成功',
      status: 'ok',
      currentAuthority: 'admin',
      userName: 'admin',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQxNDU5MDksImlhdCI6MTY5NDA1OTUwOSwidXNlcklkIjoxLCJ1c2VyTmFtZSI6ImFkbWluIn0.aEZznffgsD50rNQmLYSjwjfCA_m3CiWtcTLI4LF0zzI',
      accessExpire: 1694145909,
      refreshAfter: 1694102709,
    });
  },

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */

  'POST /api/login/account': (req: Request, res: Response) => {
    const { password, username, type } = req.body;

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
};
