/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 17:48:22
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-23 09:18:42
 * @FilePath: \zero-admin-ui-master\mock\monitor.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Request, Response } from 'express';
import Mock from 'mockjs';
export default {
  /**
   *  @file backend.ts
   *  @time 2023/09/24
   * @category :无人机管理
   * @function :
   */
  //#region -------------------------------------------------------------------------

  // 设备管理
  'POST /api/uav/device/list': (req: Request, res: Response) => {
    const data = Mock.mock({
      'data|10': [
        {
          id: '@integer(1, 100)',
          name: '@cname',
          ip: '@ip',
          port: '@integer(8000, 9000)',
          hangarIp: '@ip',
          hangarPort: '@integer(10000, 20000)',
        },
      ],
      current: 1,
      pageSize: 10,
      success: true,
      total: 100,
      code: '200',
      message: '成功',
    });
    res.json(data);
  },

  // 任
  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
};
