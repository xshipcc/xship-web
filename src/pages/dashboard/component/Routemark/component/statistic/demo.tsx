/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-18 15:51:21
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-24 19:52:41
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Routemark\component\statistic\demo.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { DashboardAnalysData } from '@/pages/dashboard/typings';
import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import { useSelector } from 'umi';
import styles from './index.less';

const LineChart = (props: any) => {
  const analysisInfo: DashboardAnalysData = useSelector(
    (state: any) => state.dashboardModel.analysisInfo,
  );
  return (
    <div id="lineDiv" className={styles.line}>
      <div className="total">
        <div className="sphere">
          <div className="sphere-bg"></div>
          <div className="sum">
            <span>航线总数</span>
            <p>{analysisInfo?.fly_total}条</p>
          </div>
        </div>
        <div className="cicle3"></div>

        <div className="cicle8">
          <span>89个</span>
          <p>节点数</p>
        </div>
        <div className="cicle9">
          <span>89%</span>
          <p>完成率</p>
        </div>
        <div className="cicle10">
          <span>8个</span>
          <p>异常数</p>
        </div>
        <div className="cicle11">
          <span>89次</span>
          <p>执行数</p>
        </div>
      </div>
    </div>
  );
};
export default LineChart;
