/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-16 23:29:46
 * @FilePath: \zero-admin-ui-master\src\components\Analysis\left.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './left.less';
import { Area, Pie } from '@ant-design/plots';

const DemoPie = () => {
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
  ];
  const config = {
    appendPadding: 0.1,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    legend: {
      position: 'right-top',
    },
    innerRadius: 0.7,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 8,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '',
      },
    },
  };
  // @ts-ignore
  return <Pie {...config} />;
};

const Analysis: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file index.tsx
   *  @time 2023/09/13
   * @category :area
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

  //#region    -----------------------------------------------------------------------
  /**
   *  @file left.tsx
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
        <Row>
          <Col span={2} className={styles.arrow} />
          <Col span={22} className={styles.title}>
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
        <Row>
          <Col span={8} className={styles.textnumber}>
            66
          </Col>
          <Col span={8} className={styles.textnumber}>
            77
          </Col>
          <Col span={8} className={styles.textRed}>
            88
          </Col>
        </Row>
        {/*  */}
        <Row>
          <Col span={2} className={styles.arrow} />
          <Col span={22} className={styles.title}>
            无人机巡检时长
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.titleLine} />
        </Row>
        {/*  */}
        <Row className={styles.textRow}>
          <Col span={3} className={styles.ring} />
          <Col span={3} className={styles.textwhite}>
            总数
          </Col>
          <Col span={4} className={styles.textyellow}>
            222
          </Col>
          <Col span={3} className={styles.textwhite}>
            完成
          </Col>
          <Col span={3} className={styles.textgreen}>
            555
          </Col>
          <Col span={4} className={styles.textwhite}>
            处理率
          </Col>
          <Col span={3} className={styles.textgreen}>
            55
          </Col>
        </Row>
        {/*  */}
        <div style={{ margin: '2vh' }}>
          <Row>
            <Col span={12} className={styles.pie}>
              {DemoPie()}
            </Col>
            <Col span={12} className={styles.pie}>
              {DemoPie()}
            </Col>
          </Row>
          <Row>
            <Col span={12} className={styles.pie}>
              {DemoPie()}
            </Col>
            <Col span={12} className={styles.pie}>
              {DemoPie()}
            </Col>
          </Row>
        </div>

        {/*  */}
        <Row>
          <Col span={2} className={styles.arrow} />
          <Col span={22} className={styles.title}>
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
