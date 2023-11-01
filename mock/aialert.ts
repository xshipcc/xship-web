/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 17:48:22
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-31 16:36:51
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
        id: '999',
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
      for (let i = 0; i < 8; i++) {
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
  // 摄像头设备
  'POST /api/uav/camera/list': (req: Request, res: Response) => {
    // 生成 ListtAlertHistoryData 的模拟数据
    const mockListtAlertHistoryData = () => {
      return Mock.mock({
        id: '999',
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
      for (let i = 0; i < 8; i++) {
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
  // 告警人员识别
  'POST /api/uav/people/list': (req: Request, res: Response) => {
    // 生成 ListPeopleData 的模拟数据
    const ListPeopleData = Mock.mock({
      'id|1-100': 1,
      'level|0-2': 0,
      username: '@first',
      phone: /^1[3456789]\d{9}$/,
      'status|0-1': 0,
      icon: '@image("200x200")',
      'gender|0-2': 0,
      createTime: '@datetime',
    });

    // 生成 ListPeopleResp 的模拟数据
    const ListPeopleResp = Mock.mock({
      code: '200',
      message: 'Success',
      current: 1,
      'data|10': [ListPeopleData],
      pageSize: 20,
      success: true,
      total: 100,
    });

    // 调用函数生成模拟数据
    const mockData = ListPeopleResp;

    res.json(mockData);
  },
  // 告警车辆识别
  'POST /api/uav/car/list': (req: Request, res: Response) => {
    // 生成 ListCarData 的模拟数据
    const ListCarData = Mock.mock({
      'id|1-100': 1,
      name: '@first',
      card: /[A-Z]{3}[0-9]{3}/,
      photo: '@image',
      'type|1-3': 1,
      phone: /^1[3456789]\d{9}$/,
      agency: '@title(3,5)',
      'status|0-1': 1,
    });

    // 生成 ListCarResp 的模拟数据
    const ListCarResp = Mock.mock({
      code: '200',
      message: 'Success',
      current: 1,
      'data|10': [ListCarData],
      pageSize: 20,
      success: true,
      total: 100,
    });

    res.json(ListCarResp);
  },

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
};
