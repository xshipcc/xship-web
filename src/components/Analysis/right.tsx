/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-13 23:59:44
 * @FilePath: \zero-admin-ui-master\src\components\Analysis\right.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './right.less';
import { Area } from '@ant-design/plots';
const AnalysisRight: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file index.tsx
   *  @time 2023/09/13
   * @category :
   * @function :
   */

  const [data, setData] = useState([]);
  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/b21e7336-0b3e-486c-9070-612ede49284e.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'country',
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
            今日巡逻
          </Col>
          <Col span={8} className={styles.text}>
            异常次数
          </Col>
          <Col span={8} className={styles.text}>
            告警次数
          </Col>
        </Row>
        <Row>
          <Col span={8} className={styles.text}>
            11111
          </Col>
          <Col span={8} className={styles.text}>
            1111
          </Col>
          <Col span={8} className={styles.textRed}>
            111
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
          <Col span={12} className={styles.timepicker}></Col>
          <Col span={12} className={styles.timepicker}></Col>
        </Row>
      </div>
    </>
  );
};

export default AnalysisRight;
