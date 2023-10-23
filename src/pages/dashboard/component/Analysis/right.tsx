//@ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-19 12:57:29
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Analysis\right.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './right.less';
import Column from './component/column';
import Pie from './component/pie';

import type { DashboardInfoType } from '@/pages/dashboard/typings';
import Title from '@/pages/dashboard/component/common/Title';
import { Rose } from '@ant-design/plots';

import { Bar } from '@ant-design/plots';

const AnalysisRight: React.FC = (props) => {
  // @ts-ignore
  const [value] = useState<DashboardInfoType>(props.initValue);

  //#region    -----------------------------------------------------------------------
  /**
   *  @file index.tsx
   *  @time 2023/09/13
   * @category :
   * @function :
   */

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------

  return (
    <>
      <div className={styles.content}>
        <div className={styles.top}>
          {/*  */}
          <div className={styles.sum}>
            <div className={styles.data}>
              <div className={styles.title}>总巡检次数</div>
              <div className={styles.number}>32</div>
            </div>
            <div className={styles.cicle1} />
            {/* <canvas id="canvas1"></canvas>
            <canvas id="canvas2"></canvas> */}
            <div className={styles.data1}>
              <div className={styles.qiu}>
                <p>80%</p>
              </div>
              <span>完成率</span>
            </div>
            <div className={styles.data2}>
              <div className={styles.qiu}>
                <p>70%</p>
              </div>
              <span>故障率</span>
            </div>
            <div className={styles.data3}>
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
            </div>
          </div>
          {/*  */}
        </div>
        {/*  */}
        <div className={styles.middle}>
          <Title title={'告警发送频率'} />
          <Column />
          {/* <div className={styles.column}>{DemoBar(value.bar)}</div> */}
        </div>
        {/*  */}
        <div className={styles.bottom}>
          <Title title={'严重报警比例'} />
          <Pie />
        </div>
      </div>
    </>
  );
};
export default AnalysisRight;
