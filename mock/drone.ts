/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 17:48:22
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-02 02:42:27
 * @FilePath: \zero-admin-ui-master\mock\drone.ts
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
  'POST /api/product/brand/list': (req: Request, res: Response) => {
    res.send({
      current: 1,
      data: [
        {
          id: 1,
          name: '万和',
          firstLetter: 'W',
          sort: 0,
          factoryStatus: 1,
          showStatus: 1,
          productCount: 100,
          productCommentCount: 100,
          logo: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg(5).jpg',
          bigPic: '12',
          brandStory: "Victoria's Secret的故事",
        },
        {
          id: 2,
          name: '三星',
          firstLetter: 'S',
          sort: 100,
          factoryStatus: 1,
          showStatus: 1,
          productCount: 100,
          productCommentCount: 100,
          logo: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg (1).jpg',
          bigPic: ' ',
          brandStory: '三星的故事',
        },
        {
          id: 3,
          name: '华为',
          firstLetter: 'H',
          sort: 100,
          factoryStatus: 1,
          showStatus: 0,
          productCount: 100,
          productCommentCount: 100,
          logo: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg (2).jpg',
          bigPic: ' ',
          brandStory: "Victoria's Secret的故事",
        },
        {
          id: 4,
          name: '格力',
          firstLetter: 'G',
          sort: 30,
          factoryStatus: 1,
          showStatus: 0,
          productCount: 100,
          productCommentCount: 100,
          logo: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg (3).jpg',
          bigPic: ' ',
          brandStory: "Victoria's Secret的故事",
        },
        {
          id: 5,
          name: '方太',
          firstLetter: 'F',
          sort: 20,
          factoryStatus: 1,
          showStatus: 0,
          productCount: 100,
          productCommentCount: 100,
          logo: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg (4).jpg',
          bigPic: ' ',
          brandStory: "Victoria's Secret的故事",
        },
        {
          id: 6,
          name: '小米',
          firstLetter: 'M',
          sort: 500,
          factoryStatus: 1,
          showStatus: 1,
          productCount: 100,
          productCommentCount: 100,
          logo: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180518/5a912944N474afb7a.png',
          bigPic:
            'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180518/5afd7778Nf7800b75.jpg',
          brandStory: '小米手机的故事',
        },
        {
          id: 21,
          name: 'OPPO',
          firstLetter: 'O',
          sort: 0,
          factoryStatus: 1,
          showStatus: 1,
          productCount: 88,
          productCommentCount: 500,
          logo: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg(6).jpg',
          bigPic: '',
          brandStory: 'string',
        },
        {
          id: 49,
          name: '七匹狼',
          firstLetter: 'S',
          sort: 200,
          factoryStatus: 1,
          showStatus: 1,
          productCount: 77,
          productCommentCount: 400,
          logo: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180518/1522738681.jpg',
          bigPic: ' ',
          brandStory: 'BOOB的故事',
        },
        {
          id: 50,
          name: '海澜之家',
          firstLetter: 'H',
          sort: 200,
          factoryStatus: 1,
          showStatus: 1,
          productCount: 66,
          productCommentCount: 300,
          logo: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/LOGO1024.png',
          bigPic: '',
          brandStory: '海澜之家的故事',
        },
        {
          id: 51,
          name: '苹果',
          firstLetter: 'A',
          sort: 200,
          factoryStatus: 1,
          showStatus: 1,
          productCount: 55,
          productCommentCount: 200,
          logo: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg.jpg',
          bigPic: ' ',
          brandStory: '苹果的故事',
        },
      ],
      pageSize: 10,
      success: true,
      total: 11,
      code: '000000',
      message: '查询商品品牌成功',
    });
  },

  // 任务管理 ,任务信息
  'POST /api/sms/flashpromotion/list': (req: Request, res: Response) => {
    res.json({
      code: '000000',
      message: '查询限时购表成功',
      current: 1,
      data: [
        {
          id: 2,
          title: '春季家电家具疯狂秒杀1',
          startDate: '2018-11-12',
          endDate: '2018-11-23',
          status: 1,
          createTime: '2018-11-16 11:12:13',
        },
        {
          id: 3,
          title: '手机特卖',
          startDate: '2018-11-03',
          endDate: '2018-11-10',
          status: 1,
          createTime: '2018-11-16 11:11:31',
        },
        {
          id: 4,
          title: '春季家电家具疯狂秒杀3',
          startDate: '2018-11-24',
          endDate: '2018-11-25',
          status: 1,
          createTime: '2018-11-16 11:12:19',
        },
        {
          id: 5,
          title: '春季家电家具疯狂秒杀4',
          startDate: '2018-11-16',
          endDate: '2018-11-16',
          status: 1,
          createTime: '2018-11-16 11:12:24',
        },
        {
          id: 6,
          title: '春季家电家具疯狂秒杀5',
          startDate: '2018-11-16',
          endDate: '2018-11-16',
          status: 1,
          createTime: '2018-11-16 11:12:31',
        },
        {
          id: 7,
          title: '春季家电家具疯狂秒杀6',
          startDate: '2018-11-16',
          endDate: '2018-11-16',
          status: 1,
          createTime: '2018-11-16 11:12:35',
        },
        {
          id: 8,
          title: '春季家电家具疯狂秒杀7',
          startDate: '2018-11-16',
          endDate: '2018-11-16',
          status: 0,
          createTime: '2018-11-16 11:12:39',
        },
        {
          id: 9,
          title: '春季家电家具疯狂秒杀8',
          startDate: '2018-11-16',
          endDate: '2018-11-16',
          status: 0,
          createTime: '2018-11-16 11:12:42',
        },
        {
          id: 13,
          title: '测试',
          startDate: '2018-11-01',
          endDate: '2018-11-30',
          status: 1,
          createTime: '2018-11-19 10:34:24',
        },
      ],
      pageSize: 10,
      success: true,
      total: 9,
    });
  },

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
  // 巡检历史查询
  'POST /api/uav/history/list': (req: Request, res: Response) => {
    const data = Mock.mock({
      'data|10': [
        {
          id: '@integer(1, 100)',
          uavId: '@integer(1, 100)',
          flyId: '@integer(1, 100)',
          operator: '@cname',
          createTime: '@datetime',
          endTime: '@datetime',
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
  // 巡检计划查询
  'POST /api/uav/plan/list': (req: Request, res: Response) => {
    const data = Mock.mock({
      'data|10': [
        {
          id: '@integer(1, 100)',
          uav_id: '@integer(1, 100)',
          uav_icon:
            'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg(5).jpg',
          plan: '@time("HH:mm:ss")',
          flyId: '@integer(1, 100)',
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
  // 航线查询
  'POST /api/uav/fly/list': (req: Request, res: Response) => {
    // 定义数据类型
    const nodeDataType = {
      'key|+1': 1,
      'horizontal|100-999.2': 0,
      'vertical|100-999.2': 0,
      'stayTime|0-100': 0,
    };

    const nodeType = {
      name: '@city()',
      coord: '[111.11,37.11,112]',
      nodeData: () => Mock.mock({ 'list|3-6': [nodeDataType] }).list, // 随机生成3-6个节点
    };

    const listUavFlyDataType = {
      'id|+1': 1,
      name: '@name()',
      data: () => Mock.mock({ 'list|1-3': [nodeType] }).list, // 随机生成1-3条航线数据
      create_time: '@datetime("yyyy-MM-dd HH:mm:ss")',
      creator: '@name()',
    };

    const listUavFlyRespType = {
      current: 1,
      'data|5': [listUavFlyDataType], // 随机生成1-10页的数据
      pageSize: 10,
      success: true,
      total: 100,
      code: '0000',
      message: 'success',
    };

    // 生成数据
    const mockData = Mock.mock(listUavFlyRespType);
    // const data = Mock.mock({
    //   'data|10': [
    //     {
    //       id: '@integer(1, 100)',
    //       name: '@cname',
    //       'data|3': ['@float(-180, 180, 6)'],
    //       createTime: '@datetime',
    //       creator: '@cname',
    //     },
    //   ],
    //   Current: 1,
    //   PageSize: 10,
    //   Success: true,
    //   Total: 100,
    //   Code: '200',
    //   Message: '成功',
    // });
    res.json(mockData);
  },

  // 任
  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
};
