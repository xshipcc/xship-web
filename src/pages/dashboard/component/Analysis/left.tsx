/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-21 10:27:13
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Analysis\left.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './left.less';
import type { DashboardAnalysData, DashboardInfoType } from '@/pages/dashboard/typings';
import Title from '@/pages/dashboard/component/common/Title';
import Radar from './component/road';
import Line from './component/Line';
import { queryStatistics, queryReport } from '@/pages/AIalert/service';

const Analysis: React.FC = (props) => {
  return (
    <>
      <div className={styles.content}>
        <div className={styles.top}>
          <Title title={'当日指标分析'} />
          {/*  */}
          <div className={styles.count}>
            <div className={styles.countInfo}>
              <span className={styles.infoSmall}>舱外温度</span>
              <span>35℃~48℃</span>
              <span className={styles.infoSmall}>舱外湿度</span>
              <span>20%</span>
            </div>
            <div className={styles.total}>
              <div className={styles.totalValue}>
                {/* <div className={styles.round}></div> */}
                <span>西南风</span>
                <span>雨天</span>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className={styles.middle}>
          <Title title={'告警分布可视化'} />
          <Row className={styles.radar}>
            <Col span={24}>
              <Radar />
            </Col>
          </Row>
        </div>
        {/*  */}
        <div className={styles.bottom}>
          <Title title={'历史告警统计'} />
          <Row>
            <Col span={24} className={styles.chart}>
              <Line />
            </Col>
          </Row>
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default Analysis;
