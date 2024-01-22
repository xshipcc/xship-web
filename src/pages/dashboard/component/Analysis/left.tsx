/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-22 09:13:25
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Analysis\left.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './left.less';
import type { DashboardAnalysData, DashboardInfoType } from '@/pages/dashboard/typings';
import Title from '@/pages/dashboard/component/common/Title';
import Radar from './component/road';
import Line from './component/Line';
import { queryStatistics, queryReport } from '@/pages/AIalert/service';
import * as mqtt from 'mqtt';

const Analysis: React.FC = (props) => {
  const def: any = '';
  const client = useRef(def);
  const [info, handleinfo] = useState<any>([]);
  useEffect(() => {
    const clientId = 'awareness' + Math.random().toString(16).substring(2, 8);
    const username = 'emqx_test';
    const password = 'emqx_test';
    const url = window.location.href;
    const startIndex = url.indexOf('://') + 3;
    const endIndex =
      url.indexOf(':', startIndex) !== -1
        ? url.indexOf(':', startIndex)
        : url.indexOf('/', startIndex);
    const extractedUrl = url.substring(startIndex, endIndex);
    //TODO   替换
    // const mqttUrl = 'ws://' + '127.0.0.1' + ':' + MQTT_PORT;
    const mqttUrl = 'ws://' + extractedUrl + ':' + MQTT_PORT;

    client.current = mqtt.connect(mqttUrl, {
      clientId,
      username,
      password,
    });
    // console.log('useEffect -> client.current:', client.current);
    const mqttSub = (subscription: { topic: any; qos: any }) => {
      if (client) {
        const { topic, qos } = subscription;
        client.current.subscribe(topic, { qos }, (error: any) => {
          if (error) {
            console.log('Subscribe to topics error', error);
            return;
          }
          console.log(`Subscribe to topics: ${topic}`);
        });
      }
    };
    mqttSub({ topic: 'info', qos: 0 });

    client.current.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'info') {
        try {
          const jsonObject = JSON.parse(mqttMessage);
          // const jsonObject = JSON.stringify(JSON.parse(mqttMessage));
          if (jsonObject.type === 'drone') {
            console.log('统计信息', jsonObject);
            handleinfo(jsonObject.data);
          }
        } catch (error) {
          handleinfo(JSON.stringify('字符解析错误'));
        }
        // dashboardinfo[jsonObject.type] = jsonObject.data;
      }
    });

    return () => {
      if (client.current) client.current.end();
    };
  }, []);
  return (
    <>
      <div className={styles.content}>
        <div className={styles.top}>
          <Title title={'当日指标分析'} />
          {/*  */}
          <div className={styles.count}>
            <div className={styles.countInfo}>
              <span className={styles.infoSmall}>舱外温度</span>
              <span>{info}℃~48℃</span>
              <span className={styles.infoSmall}>舱外湿度</span>
              <span>{info}%</span>
            </div>
            <div className={styles.total}>
              <div className={styles.totalValue}>
                {/* <div className={styles.round}></div> */}
                <span>{info}</span>
                <span>{info}</span>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className={styles.middle}>
          <Title title={'告警分布可视化'} />
          <Row className={styles.radar}>
            <Col span={24}>
              <Radar />
            </Col>
          </Row>
        </div>
        {/*  */}
        <div className={styles.bottom}>
          <Title title={'历史告警统计'} />
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
