/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-24 19:57:51
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Analysis\right.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import styles from './right.less';
import Column from './component/column';
import { useSelector } from 'umi';
import { DashboardAnalysData } from '@/pages/dashboard/typings';
import type { DashboardInfoType } from '@/pages/dashboard/typings';
import Title from '@/pages/dashboard/component/common/Title';

const AnalysisRight: React.FC = (props) => {
  // @ts-ignore
  const [value] = useState<DashboardInfoType>(props.initValue);
  const analysisInfo: DashboardAnalysData = useSelector(
    (state: any) => state.dashboardModel.analysisInfo,
  );
  console.log(
    'analysisInfo:',
    analysisInfo.completion / analysisInfo.total,
    analysisInfo.completion,
    analysisInfo.total,
  );

  return (
    <>
      <div className={styles.content}>
        <div className={styles.top}>
          {/*  */}
          <div className={styles.sum}>
            <div className={styles.data}>
              <div className={styles.title}>总巡检次数</div>
              <div className={styles.number}>{analysisInfo.total}</div>
            </div>
            <div className={styles.cicle1} />
            {/* <canvas id="canvas1"></canvas>
            <canvas id="canvas2"></canvas> */}
            <div className={styles.data1}>
              <div className={styles.qiu}>
                <p>
                  {analysisInfo.completion /
                    (analysisInfo.total === 0 ? analysisInfo.total + 1 : analysisInfo.total)}
                  %
                </p>
              </div>
              <span>总完成率</span>
            </div>
            <div className={styles.data2}>
              <div className={styles.qiu}>
                <p>{analysisInfo.completion}次</p>
              </div>
              <span>完成次数</span>
            </div>
            {/* <div className={styles.data3}>
              <div className={styles.qiu}>
                <p>73%</p>
              </div>
              <span>处理率</span>
            </div>
            <div className={styles.data4}>
              <div className={styles.qiu}>
                <p>73%</p>
              </div>
              <span>同比</span>
            </div> */}
          </div>
          {/*  */}
        </div>
        {/*  */}
        <div className={styles.middle}>
          <Title title={'告警信息统计'} />
          <Column />
          {/* <div className={styles.column}>{DemoBar(value.bar)}</div> */}
        </div>
        {/*  */}
        {/* <div className={styles.bottom}>
          <Title title={'严重报警比例'} />
          <Pie />
        </div> */}
      </div>
    </>
  );
};

export default AnalysisRight;
