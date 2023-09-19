/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-19 16:56:44
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Analysis\right.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './right.less';
import { Pie } from '@ant-design/plots';
import AlertList from '@/pages/dashboard/component/alertList';
import type { DashboardInfoType } from '@/pages/dashboard/typings';
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

  const DemoPie = (data: any[]) => {
    // const data = [
    //   {
    //     type: '分类一',
    //     value: 27,
    //   },
    //   {
    //     type: '分类二',
    //     value: 25,
    //   },
    //   {
    //     type: '分类三',
    //     value: 18,
    //   },
    //   {
    //     type: '分类四',
    //     value: 15,
    //   },
    // ];
    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'title',
      radius: 0.8,
      label: {
        type: 'outer',
        content: '{name} {percentage}',
      },
      interactions: [
        {
          type: 'pie-legend-active',
        },
        {
          type: 'element-active',
        },
      ],
    };
    return <Pie {...config} />;
  };

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------

  return (
    <>
      <div className={styles.content}>
        <Row>
          <Col span={2} className={styles.arrow} />
          <Col span={22} className={styles.title}>
            巡检数
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.titleLine} />
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
          <Col span={2} className={styles.arrow} />
          <Col span={22} className={styles.title}>
            即时告警
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.titleLine} />
        </Row>
        {/*  */}
        <Row>
          <Col span={11} offset={1} className={styles.timepicker}>
            <Row>
              <Col span={3} offset={7} className={styles.calendar} />
              <Col span={14} className={styles.calendartext}>
                全部
              </Col>
            </Row>
          </Col>
          <Col span={11} offset={1} className={styles.timepicker}>
            <Row>
              <Col span={3} offset={7} className={styles.calendar} />
              <Col span={14} className={styles.calendartext}>
                30分钟内
              </Col>
            </Row>
          </Col>
        </Row>
        {/*  */}
        <Row>
          <Col span={24}>
            <AlertList height={160} />
          </Col>
        </Row>
        {/*  */}
        <Row>
          <Col span={2} className={styles.arrow} />
          <Col span={22} className={styles.title}>
            严重报警比例
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.titleLine} />
        </Row>
        {/*  */}
        <Row>
          <Col span={24} className={styles.chart}>
            {DemoPie(value.alarmPie)}
          </Col>
        </Row>
      </div>
    </>
  );
};
export default AnalysisRight;
