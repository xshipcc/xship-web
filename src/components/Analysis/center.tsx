/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-15 09:48:03
 * @FilePath: \zero-admin-ui-master\src\components\Analysis\center.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { DualAxes } from '@ant-design/plots';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './center.less';

const AnalysisCenter: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file index.tsx
   *  @time 2023/09/13
   * @category :
   * @function :
   */

  const DemoDualAxes = () => {
    const uvBillData = [
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
    ];
    const transformData = [
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
      {
        time: '2019-03',
        count: 750,
        name: 'b',
      },
      {
        time: '2019-04',
        count: 650,
        name: 'b',
      },
      {
        time: '2019-05',
        count: 450,
        name: 'b',
      },
      {
        time: '2019-06',
        count: 400,
        name: 'b',
      },
      {
        time: '2019-07',
        count: 320,
        name: 'b',
      },
      {
        time: '2019-03',
        count: 900,
        name: 'c',
      },
      {
        time: '2019-04',
        count: 600,
        name: 'c',
      },
      {
        time: '2019-05',
        count: 450,
        name: 'c',
      },
      {
        time: '2019-06',
        count: 300,
        name: 'c',
      },
      {
        time: '2019-07',
        count: 200,
        name: 'c',
      },
    ];
    const config = {
      data: [uvBillData, transformData],
      xField: 'time',
      yField: ['value', 'count'],
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          seriesField: 'type',
          columnWidthRatio: 0.4,
        },
        {
          geometry: 'line',
          seriesField: 'name',
          lineStyle: ({ name }) => {
            if (name === 'a') {
              return {
                lineDash: [1, 4],
                opacity: 1,
              };
            }

            return {
              opacity: 0.5,
            };
          },
        },
      ],
    };
    return <DualAxes {...config} />;
  };

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------

  return (
    <>
      <div className={styles.content}>
        <Row>
          <Col span={0.7} className={styles.arrow} />
          <Col span={23.3} className={styles.title}>
            近日巡检对比
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.titleLine} />
        </Row>
        {/*  */}
        <Row>
          <Col span={24} className={styles.chart}>
            {DemoDualAxes()}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AnalysisCenter;
