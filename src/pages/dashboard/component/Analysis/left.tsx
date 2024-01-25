/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-25 11:46:47
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Analysis\left.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './left.less';
import type { DashboardAnalysData, DashboardInfoType, DataHangr } from '@/pages/dashboard/typings';
import Title from '@/pages/dashboard/component/common/Title';
import Radar from './component/road';
import Line from './component/Line';
import { queryStatistics } from '@/pages/AIalert/service';
import * as mqtt from 'mqtt';
import { useDispatch, useSelector } from 'umi';

const Analysis: React.FC = (props) => {
  const dispatch = useDispatch();
  const hangar: DataHangr = useSelector((state: any) => state.dashboardModel.hangar);

  const [info, handleinfo] = useState<any>({
    hatch: false,
    charging: true,
    mechanism: true,
    wind_angle: '0',
    rain_snow: '0',
    out_temp: '0',
    in_temp: '0',
  });
  useEffect(() => {
    // queryReport({ current: 1, pageSize: 10 }).then((res) => {
    //   console.log('queryAlertHistory -> res:', res);
    // });
    queryStatistics({ id: 0 }).then((res: DashboardAnalysData) => {
      dispatch({
        type: 'dashboardModel/changeAnalysisInfo',
        payload: res,
      });
      console.log('queryAlertHistory -> res:', res);
    });
  }, []);

  const def: any = '';
  const client = useRef(def);
  // mqtt消息接收
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
    const mqttUrl = 'ws://' + extractedUrl + ':' + MQTT_PORT;
    // const mqttUrl = 'ws://192.168.8.3:8883/mqtt';

    client.current = mqtt.connect(mqttUrl, {
      clientId,
      username,
      password,
      // ...other options
    });
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
    mqttSub({ topic: 'state', qos: 0 });

    client.current.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'state') {
        // const jsonObject = JSON.parse(mqttMessage);
        const jsonObject = JSON.parse(mqttMessage).hangar;
        console.log('主页显示dashboardTime', jsonObject);
        const hangarInfo = {};
        Object.keys(jsonObject).forEach((key) => {
          hangarInfo[key] = jsonObject[key].data;
        });
        console.log('Object.keys -> hangarInfo:', hangarInfo);

        handleinfo(hangarInfo);
      }
    });
    // 进入页面  提醒更新 当前状态和路线信息
    // client.current.publish('control', JSON.stringify({ cmd: 'state', data: 'on' }));

    return () => {
      if (client.current) client.current.end();
    };
  }, []);

  const windDirections = ['西北风', '西风', '西南风', '南风', '东南风', '东风', '东北风', '北风'];
  // 1在下雨 0不在下雨
  const rain = ['晴天', '雨天'];
  //     #7  6   5   4   3   2   1   0
  //         #北风 东北风 东风  东南风 南风  西南风 西风  西北风
  return (
    <>
      <div className={styles.content}>
        <div className={styles.top}>
          <Title title={'当日指标分析'} />
          {/*  */}
          <div className={styles.count}>
            <div className={styles.countInfo}>
              <span className={styles.infoSmall}>舱外温度</span>
              <span>{info?.out_temp}℃</span>
              <span className={styles.infoSmall}>舱内温度</span>
              <span>{info?.in_temp}℃</span>
            </div>
            <div className={styles.total}>
              <div className={styles.totalValue}>
                {/* <div className={styles.round}></div> */}
                {/* <span>{info}</span>
                <span>{info}</span> */}
                <span>{windDirections[Number(info?.wind_angle)]}</span>
                <span>{rain[Number(info?.rain_snow)]}</span>
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
