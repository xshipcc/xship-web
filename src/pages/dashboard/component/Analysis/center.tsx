/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-18 00:28:28
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Analysis\center.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { DualAxes } from '@ant-design/plots';
import { Col, Row } from 'antd';
import Title from '@/pages/dashboard/component/common/Title';
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
        <Title title={'今日巡检对比'} />
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
