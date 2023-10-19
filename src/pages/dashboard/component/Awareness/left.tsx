/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-19 10:31:29
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\left.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './left.less';
// import Player from '@/components/VideoReact';
import Player from '@/components/VideoFlv';
import { useSelector } from 'umi';
import { DroneDataType } from '../../typings';
import * as mqtt from 'mqtt';
import Title from '../common/Title';

const Awareness: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file left.tsx
   *  @time 2023/09/13
   * @category :
   * @function :
   */

  const [DroneData, setDroneData] = useState({
    speed: 0,
    lat: 0,
    lon: 0,
    height: 0,
    target_angle: 0,
  });

  useEffect(() => {
    const clientId = 'awareness' + Math.random().toString(16).substring(2, 8);
    const username = 'emqx_test';
    const password = 'emqx_test';

    const client = mqtt.connect(WS_MQTT_URL, {
      clientId,
      username,
      password,
      // ...other options
    });
    const mqttSub = (subscription: { topic: any; qos: any }) => {
      if (client) {
        const { topic, qos } = subscription;
        client.subscribe(topic, { qos }, (error) => {
          if (error) {
            console.log('Subscribe to topics error', error);
            return;
          }
          console.log(`Subscribe to topics: ${topic}`);
        });
      }
    };
    mqttSub({ topic: 'uav', qos: 0 });

    client.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'uav') {
        // const jsonObject = JSON.parse(mqttMessage);
        const jsonObject = JSON.parse(mqttMessage);
        // console.log('client.on -> jsonObject:', jsonObject);
        setDroneData(JSON.parse(mqttMessage));
      }
    });
  }, []);
  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------
  return (
    <>
      <div className={styles.content}>
        <div className={styles.top}>
          <Title title={'无人机画面'} />
          <Row>
            <Col span={24} className={styles.video}>
              <Player url={VIDEO_URL} height={'19'} width={'100'} />
            </Col>
          </Row>
        </div>
        {/*  */}
        <div className={styles.middle}>
          <Title title={'无人机画面'} />
          <Row>
            <Col span={2} className={'arrow'} />
            <Col span={22} className={'title'}>
              无人机态势信息
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row>
                <Col className={styles.text} span={4} offset={1}>
                  速度:
                </Col>
                <Col className={styles.text} span={19}>
                  {DroneData.speed}
                </Col>
              </Row>
              <Row>
                <Col className={styles.text} span={4} offset={1}>
                  坐标:
                </Col>
                <Col className={styles.text} span={19}>
                  {'[' + DroneData.lon + ',' + DroneData.lat + ']'}
                </Col>
              </Row>
              <Row>
                <Col className={styles.text} span={4} offset={1}>
                  高度:
                </Col>
                <Col className={styles.text} span={19}>
                  {DroneData.height}
                </Col>
              </Row>
              <Row>
                <Col className={styles.text} span={4} offset={1}>
                  角度:
                </Col>
                <Col className={styles.text} span={19}>
                  {DroneData.target_angle}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        {/*  */}
        <div className={styles.bottom}>
          <Title title={'无人机画面'} />
          <Row>
            <Col span={24} className={styles.video}></Col>
          </Row>
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default Awareness;
