/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-01 23:27:50
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Analysis\left.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import styles from './left.less';
import { Area } from '@ant-design/plots';
import type { DashboardInfoType } from '@/pages/dashboard/typings';

import { Radar } from '@ant-design/plots';

const DemoRadar = (data: any[]) => {
  const config = {
    data,
    xField: 'item',
    yField: 'score',
    seriesField: 'user',
    legend: false,
    meta: {
      score: {
        alias: '分数',
        min: 0,
        max: 80,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    },
    yAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null,
          },
        },
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    // 开启面积
    area: {},
    // 开启辅助点
    point: {
      size: 2,
    },
  };

  return <Radar {...config} />;
};

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

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
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
      <div className={'boxall'}>
        <div className={styles.content}>
          <Row>
            <Col span={2} className={'arrow'} />
            <Col span={22} className={'title'}>
              无人机数量
            </Col>
          </Row>
          <Row>
            <Col span={24} className={'titleLine'} />
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
              {value.drone.total}
            </Col>
            <Col span={8} className={styles.textnumber}>
              {value.drone.online}
            </Col>
            <Col span={8} className={styles.textRed}>
              {value.drone.breakdown}
            </Col>
          </Row>
          {/*  */}
          <Row>
            <Col span={2} className={'arrow'} />
            <Col span={22} className={'title'}>
              无人机巡检时长
            </Col>
          </Row>
          <Row>
            <Col span={24} className={'titleLine'} />
          </Row>
          {/*  */}
          <Row className={styles.textRow}>
            <Col span={3} className={styles.ring} />
            <Col span={3} className={styles.textwhite}>
              总数
            </Col>
            <Col span={4} className={styles.textyellow}>
              {value.inspection.total}
            </Col>
            <Col span={3} className={styles.textwhite}>
              完成
            </Col>
            <Col span={3} className={styles.textgreen}>
              {value.inspection.complete}
            </Col>
            <Col span={4} className={styles.textwhite}>
              处理率
            </Col>
            <Col span={3} className={styles.textgreen}>
              {value.inspection.rate}%
            </Col>
          </Row>
          {/*  */}

          <Row className={styles.radar}>
            <Col span={23} offset={1}>
              <div className={styles.radar}>{DemoRadar(value.radar)}</div>
            </Col>
          </Row>
          {/*  */}
          <Row>
            <Col span={2} className={'arrow'} />
            <Col span={22} className={'title'}>
              历史巡检告警趋势
            </Col>
          </Row>
          <Row>
            <Col span={24} className={'titleLine'} />
          </Row>
          {/*  */}
          <Row>
            <Col span={24} className={styles.chart}>
              <Area {...config} />
            </Col>
          </Row>
          <div className={'boxfoot'} />
        </div>
      </div>
    </>
  );
};

export default Analysis;
