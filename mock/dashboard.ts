import { Request, Response } from 'express';
import Mock from 'mockjs';
import fs from 'fs';
import path from 'path';
export default {
  /**
   *  @file dashboard.ts
   *  @time 2023/09/24
   * @category :大屏展示数据
   * @function :
   */
  //#region -------------------------------------------------------------------------
  // 大屏显示数据
  'get /api/dashboard/dashboardInfo': (req: Request, res: Response) => {
    res.send(
      Mock.mock({
        code: '000000',
        result: {
          drone: {
            'total|0-100': 5,
            'online|0-100': 1,
            'breakdown|0-100': 1,
          },
          inspection: {
            'total|0-200': 5,
            'complete|0-100': 1,
            'rate|0-100': 1,
            'today|0-200': 5,
            'breakdown|0-100': 1,
            'warning|0-100': 40,
          },
          radar: [
            {
              item: 'Design',
              user: 'a',
              score: 70,
            },
            {
              item: 'Design',
              user: 'b',
              score: 30,
            },
            {
              item: 'Development',
              user: 'a',
              score: 60,
            },
            {
              item: 'Development',
              user: 'b',
              score: 70,
            },
            {
              item: 'Marketing',
              user: 'a',
              score: 50,
            },
            {
              item: 'Marketing',
              user: 'b',
              score: 60,
            },
            {
              item: 'Users',
              user: 'a',
              score: 40,
            },
            {
              item: 'Users',
              user: 'b',
              score: 50,
            },
            {
              item: 'Test',
              user: 'a',
              score: 60,
            },
            {
              item: 'Test',
              user: 'b',
              score: 70,
            },
          ],
          'line|5': [
            {
              type: '异常',
              'date|+1': 2400,
              'value|1-100': 1,
            },
            {
              type: '告警',
              'date|+1': 2400,
              'value|0-100': 1,
            },
          ],
          DualAxes: {
            histgram: [
              {
                time: '2019-03',
                value: 350,
                type: 'uv',
              },
              {
                time: '2019-04',
                value: 900,
                type: 'uv',
              },
              {
                time: '2019-05',
                value: 300,
                type: 'uv',
              },
              {
                time: '2019-06',
                value: 450,
                type: 'uv',
              },
              {
                time: '2019-07',
                value: 470,
                type: 'uv',
              },
              {
                time: '2019-03',
                value: 220,
                type: 'bill',
              },
              {
                time: '2019-04',
                value: 300,
                type: 'bill',
              },
              {
                time: '2019-05',
                value: 250,
                type: 'bill',
              },
              {
                time: '2019-06',
                value: 220,
                type: 'bill',
              },
              {
                time: '2019-07',
                value: 362,
                type: 'bill',
              },
            ],
            linegram: [
              {
                time: '2019-03',
                count: 800,
                name: 'a',
              },
              {
                time: '2019-04',
                count: 600,
                name: 'a',
              },
              {
                time: '2019-05',
                count: 400,
                name: 'a',
              },
              {
                time: '2019-06',
                count: 380,
                name: 'a',
              },
              {
                time: '2019-07',
                count: 220,
                name: 'a',
              },
            ],
          },
          bar: [
            {
              name: '人员告警',
              value: 38,
            },
            {
              name: '入侵告警',
              value: 52,
            },
            {
              name: '烟雾告警',
              value: 61,
            },
            {
              name: '人脸告警',
              value: 145,
            },
            {
              name: '车辆告警',
              value: 48,
            },
          ],
          'alarmPie|4': [
            {
              title: '@cname',
              'value|0-100': 1,
            },
          ],
        },
      }),
    );
  },
  // 告警列表数据
  'get /api/dashboard/alertList': (req: Request, res: Response) => {
    res.json(
      Mock.mock({
        result: {
          'results|15': [
            {
              'id|1-10': '2',
              alert: {
                type: 'Ms',
                time: '@datetime',
                info: '@ctitle',
                coordinate: ['111', '111'],
              },
            },
          ],
        },
      }),
    );
  },
  //
  'get /api/dashboard/analysis': (req: Request, res: Response) => {
    res.json(
      Mock.mock({
        'data|10': [
          {
            'id|+1': 1,
            'companyId|0-1': 1,
            'isFalse|0-1': 1,
            title: '@ctitle',
            'deciveId|0-10': 1,
            deciceName: '@ctitle',
            'level|0-3': 1,
            'status|0-1': 1,
            screenshot: 'xxx/a.png',
            createTimeAt: '@datetime',
            handleTimeAt: '@datetime',
            handler: '@cname',
          },
        ],
      }),
    );
  },
  'get /api/dashboard/monitor': (req: Request, res: Response) => {
    res.json(
      Mock.mock({
        'data|10': [
          {
            'id|+1': 1,
            'companyId|0-1': 1,
            'isFalse|0-1': 1,
            title: '@ctitle',
            'deciveId|0-10': 1,
            deciceName: '@ctitle',
            'level|0-3': 1,
            'status|0-1': 1,
            screenshot: 'xxx/a.png',
            createTimeAt: '@datetime',
            handleTimeAt: '@datetime',
            handler: '@cname',
          },
        ],
      }),
    );
  },
  'get /api/dashboard/awareness': (req: Request, res: Response) => {
    res.json(
      Mock.mock({
        'data|10': [
          {
            'id|+1': 1,
            'companyId|0-1': 1,
            'isFalse|0-1': 1,
            title: '@ctitle',
            'deciveId|0-10': 1,
            deciceName: '@ctitle',
            'level|0-3': 1,
            'status|0-1': 1,
            screenshot: 'xxx/a.png',
            createTimeAt: '@datetime',
            handleTimeAt: '@datetime',
            handler: '@cname',
          },
        ],
      }),
    );
  },
  'get /api/dashboard/routemark': (req: Request, res: Response) => {
    res.json(
      Mock.mock({
        code: '000000',
        inspection: {
          'total|0-200': 5,
          'complete|0-100': 1,
          'rate|0-100': 1,
          'today|0-200': 5,
          'breakdown|0-100': 1,
          'warning|0-100': 40,
        },
      }),
    );
  },

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */

  /**
   *  @file dashboard.ts
   *  @time 2023/09/24
   * @category :文件传输接口
   * @function :
   */
  //#region -------------------------------------------------------------------------
  // srctiff个数地图
  'GET /srctiff': (req: Request, res: Response) => {
    const filePath = path.resolve(__dirname, '../public/tif/luquan.tif'); // 指定图片文件路径
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.setHeader('Content-Type', 'image/tiff');
        res.send(data);
      }
    });
  },
  // 路线规划标注点
  'GET /label': (req: Request, res: Response) => {
    const filePath = path.resolve(__dirname, '../public/poi.png'); // 指定图片文件路径
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.setHeader('Content-Type', 'image/tiff');
        res.send(data);
      }
    });
  },
  'GET /czml': (req: Request, res: Response) => {
    const filePath = path.resolve(__dirname, '../public/SampleData/sampleFlight.czml'); // 指定图片文件路径
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.setHeader('Content-Type', 'text');
        res.send(data);
      }
    });
  },
  // 无人机模型
  'GET /model': (req: Request, res: Response) => {
    const filePath = path.resolve(__dirname, '../public/air.glb'); // 指定图片文件路径
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.setHeader('Content-Type', 'glb');
        res.send(data);
      }
    });
  },

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
};

// function getAlarm

function getRole(req: Request, res: Response) {
  res.json(
    Mock.mock({
      'data|10': [
        {
          'id|+1': 1,
          'status|0-1': 1,
          'orderNum|0-1': 1,
          name: '@ctitle',
          createBy: '@cname',
          createTime: '@datetime',
          lastUpdateBy: '@cname',
          lastUpdateTime: '@datetime',
        },
      ],
    }),
  );
}
