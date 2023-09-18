/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-18 09:29:21
 * @FilePath: \zero-admin-ui-master\src\components\Analysis\center.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { DualAxes } from '@ant-design/plots';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import styles from './center.less';
import type { DashboardInfoType } from '@/pages/dashboard/typings';
const AnalysisCenter: React.FC = (props) => {
  // @ts-ignore
  const [value] = useState<DashboardInfoType>(props.initValue);
  //#region    -----------------------------------------------------------------------
  /**
   *  @file index.tsx
   *  @time 2023/09/13
   * @category :
   * @function :
   */

  const DemoDualAxes = () => {
    // const uvBillData = [
    //   {
    //     time: '2019-03',
    //     value: 350,
    //     type: 'uv',
    //   },
    //   {
    //     time: '2019-04',
    //     value: 900,
    //     type: 'uv',
    //   },
    //   {
    //     time: '2019-05',
    //     value: 300,
    //     type: 'uv',
    //   },
    //   {
    //     time: '2019-06',
    //     value: 450,
    //     type: 'uv',
    //   },
    //   {
    //     time: '2019-07',
    //     value: 470,
    //     type: 'uv',
    //   },
    //   {
    //     time: '2019-03',
    //     value: 220,
    //     type: 'bill',
    //   },
    //   {
    //     time: '2019-04',
    //     value: 300,
    //     type: 'bill',
    //   },
    //   {
    //     time: '2019-05',
    //     value: 250,
    //     type: 'bill',
    //   },
    //   {
    //     time: '2019-06',
    //     value: 220,
    //     type: 'bill',
    //   },
    //   {
    //     time: '2019-07',
    //     value: 362,
    //     type: 'bill',
    //   },
    // ];
    // const transformData = [
    //   {
    //     time: '2019-03',
    //     count: 800,
    //     name: 'a',
    //   },
    //   {
    //     time: '2019-04',
    //     count: 600,
    //     name: 'a',
    //   },
    //   {
    //     time: '2019-05',
    //     count: 400,
    //     name: 'a',
    //   },
    //   {
    //     time: '2019-06',
    //     count: 380,
    //     name: 'a',
    //   },
    //   {
    //     time: '2019-07',
    //     count: 220,
    //     name: 'a',
    //   },
    // ];
    const config = {
      data: [value.DualAxes.histgram, value.DualAxes.linegram],
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
          // @ts-ignore
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
