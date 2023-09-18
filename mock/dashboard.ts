import { Request, Response } from 'express';
import Mock from 'mockjs';
export default {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file dashboard.ts
   *  @time 2023/09/16
   * @category :
   * @function :
   */

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
          'pie|4': [
            {
              title: '@cname',
              'value|0-100': 1,
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

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------
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
