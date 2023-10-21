/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-18 16:36:30
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Analysis\left.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './left.less';
import type { DashboardInfoType } from '@/pages/dashboard/typings';
import Title from '@/pages/dashboard/component/common/Title';
import Radar from './component/road';
import Line from './component/Line';

const Analysis: React.FC = (props) => {
  // @ts-ignore
  const [value] = useState<DashboardInfoType>(props.initValue);
  // console.log('props:', props);
  //#region    -----------------------------------------------------------------------
  /**
   *  @file index.tsx
   *  @time 2023/09/13
   * @category :area
   * @function :
   */

  const [data, setData] = useState(value.line);
  // const asyncFetch = () => {
  //   fetch('https://gw.alipayobjects.com/os/bmw-prod/b21e7336-0b3e-486c-9070-612ede49284e.json')
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => {
  //       console.log('fetch data failed', error);
  //     });
  // };

  // useEffect(() => {
  //   asyncFetch();
  // }, []);

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------
  /**
   *  @file left.tsx
   *  @time 2023/10/18
   * @category :
   * @function :
   */
  //#region -------------------------------------------------------------------------

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
  return (
    <>
      <div className={styles.content}>
        <div className={styles.top}>
          <Title title={'当日指标分析'} />
          {/*  */}
          <div className={styles.count}>
            <div className={styles.countInfo}>
              <span className={styles.infoSmall}>今日气温</span>
              <span>35℃~48℃</span>
              <span className={styles.infoSmall}>空气质量等级</span>
              <span>优</span>
            </div>
            <div className={styles.total}>
              <div className={styles.totalValue}>
                <span>200</span>
                <span>当日巡检总数</span>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className={styles.middle}>
          <Title title={'巡检路线可视化'} />
          <Row className={styles.radar}>
            <Col span={24}>
              <Radar />
            </Col>
          </Row>
        </div>
        {/*  */}
        <div className={styles.bottom}>
          <Title title={'历史告警'} />
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
