/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 17:48:22
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-29 17:43:23
 * @FilePath: \zero-admin-ui-master\mock\aialert.ts
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
   * @category :告警信息管理
   * @function :
   */
  //#region -------------------------------------------------------------------------

  // 巡检计划查询
  'POST /api/uav/alert/list': (req: Request, res: Response) => {
    // 生成 ListtAlertHistoryData 的模拟数据
    const mockListtAlertHistoryData = () => {
      return Mock.mock({
        id: '@integer(1, 100)',
        name: '@cname',
        image: '@image',
        type: '@integer(0, 3)',
        code: '@string("number", 6)',
        level: '@integer(1, 5)',
        count: '@integer(1, 10)',
        platform: '@integer(0, 4)',
        start_time: '@datetime("yyyy-MM-dd HH:mm:ss")',
        end_time: '@datetime("yyyy-MM-dd HH:mm:ss")',
        note: '@sentence(6, 12)',
        lan: '@integer(1, 100)',
        lon: '@integer(1, 100)',
        altitude: '@integer(1, 100)',
        confirm: '@integer(0, 1)',
      });
    };

    // 生成 ListAlertHistoryResp 的模拟数据
    const mockListAlertHistoryResp = () => {
      const data = [];
      for (let i = 0; i < 10; i++) {
        data.push(mockListtAlertHistoryData());
      }

      return Mock.mock({
        data: data,
        current: 1,
        pageSize: 10,
        success: true,
        total: 100,
        code: '200',
        message: '成功',
      });
    };

    // 调用函数生成模拟数据
    const mockData = mockListAlertHistoryResp();

    res.json(mockData);
  },

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
};
