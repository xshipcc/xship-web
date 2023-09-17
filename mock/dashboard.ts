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

  'get /api/dashboard/analysis': (req: Request, res: Response) => {
    res.json(
      Mock.mock({
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
          {
            title: '@cname',
            'value|0-100': 1,
          },
          {
            title: '@cname',
            'value|0-100': 1,
          },
        ],
        'chart|10': [
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
        line: [
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
