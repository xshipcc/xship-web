/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-13 18:41:41
 * @FilePath: \zero-admin-ui-master\src\components\Analysis\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Area } from '@ant-design/plots';
const Analysis: React.FC = () => {
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
          <Col span={4} className={styles.arrow} />
          <Col span={20} className={styles.title}>
            无人机数量
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.titleLine} />
        </Row>
        {/*  */}
        <Row>
          <Col span={8} className={styles.text}>
            总数量
          </Col>
          <Col span={8} className={styles.text}>
            在线
          </Col>
          <Col span={8} className={styles.text}>
            异常
          </Col>
        </Row>
        {/*  */}
        <Row>
          <Col span={8} className={styles.text}>
            col-8
          </Col>
          <Col span={8} className={styles.text}>
            col-8
          </Col>
          <Col span={8} className={styles.textRed}>
            col-8
          </Col>
        </Row>
        {/*  */}
        <Row>
          <Col span={4} className={styles.arrow} />
          <Col span={20} className={styles.title}>
            无人机巡检时长
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.titleLine} />
        </Row>
        {/*  */}
        <Row>
          <Col span={3} className={styles.ring} />
          <Col span={3} className={styles.text}>
            col-6
          </Col>
          <Col span={4} className={styles.text}>
            col-6
          </Col>
          <Col span={3} className={styles.text}>
            col-6
          </Col>
          <Col span={4} className={styles.text}>
            col-6
          </Col>
          <Col span={3} className={styles.text}>
            col-6
          </Col>
          <Col span={4} className={styles.text}>
            col-6
          </Col>
        </Row>
        {/*  */}
        <Row>
          <Col span={12} className={styles.text}>
            col-6
          </Col>
          <Col span={12} className={styles.text}>
            col-6
          </Col>
        </Row>
        <Row>
          <Col span={12} className={styles.text}>
            col-6
          </Col>
          <Col span={12} className={styles.text}>
            col-6
          </Col>
        </Row>
        {/*  */}
        <Row>
          <Col span={4} className={styles.arrow} />
          <Col span={20} className={styles.title}>
            历史巡检告警趋势
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.titleLine} />
        </Row>
        {/*  */}
        <Row>
          <Col span={24} className={styles.chart}>
            <Area {...config} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Analysis;
