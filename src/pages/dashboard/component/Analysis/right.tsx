/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-01 23:26:20
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Analysis\right.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './right.less';

import type { DashboardInfoType } from '@/pages/dashboard/typings';

import { Rose } from '@ant-design/plots';

import { Bar } from '@ant-design/plots';

const DemoBar = (data: any[]) => {
  const config = {
    data,
    xField: 'value',
    yField: 'name',
    seriesField: 'name',
    legend: false,
    barBackground: {
      style: {
        fill: 'rgb(15, 72, 138)',
      },
    },
  };
  return <Bar {...config} />;
};

const DemoRose = () => {
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    radius: 0.8,
    legend: false,
  };
  return <Rose {...config} />;
};
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
      <div className={'boxall'}>
        <div className={styles.content}>
          <Row>
            <Col span={2} className={'arrow'} />
            <Col span={22} className={'title'}>
              巡检数量
            </Col>
          </Row>
          <Row>
            <Col span={24} className={'titleLine'} />
          </Row>
          {/*  */}
          <Row>
            <Col span={8} className={styles.text}>
              今日巡检
            </Col>
            <Col span={8} className={styles.text}>
              异常次数
            </Col>
            <Col span={8} className={styles.text}>
              告警次数
            </Col>
          </Row>
          <Row>
            <Col span={8} className={styles.textnumber}>
              {value.inspection.today}
            </Col>
            <Col span={8} className={styles.textnumber}>
              {value.inspection.breakdown}
            </Col>
            <Col span={8} className={styles.textRed}>
              {value.inspection.warning}
            </Col>
          </Row>
          {/*  */}
          <Row>
            <Col span={2} className={'arrow'} />
            <Col span={22} className={'title'}>
              告警发生频率
            </Col>
          </Row>
          <Row>
            <Col span={24} className={'titleLine'} />
          </Row>
          {/*  */}
          <Row className={styles.column}>
            <Col className={styles.content} span={24}>
              {DemoBar(value.bar)}
            </Col>
          </Row>
          {/*  */}
          <Row>
            <Col span={2} className={'arrow'} />
            <Col span={22} className={'title'}>
              严重报警比例
            </Col>
          </Row>
          <Row>
            <Col span={24} className={'titleLine'} />
          </Row>
          {/*  */}
          <Row>
            <Col span={24} className={styles.chart}>
              {DemoRose()}
            </Col>
          </Row>
        </div>
        <div className={'boxfoot'} />
      </div>
    </>
  );
};
export default AnalysisRight;
