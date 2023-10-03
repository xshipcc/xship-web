/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-03 14:53:53
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\left.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './left.less';
import VideoPlayer from './video';
import { useSelector } from 'umi';
import { DroneDataType } from '../../typings';
import * as mqtt from 'mqtt';

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

    const client = mqtt.connect('ws://ai.javodata.com:8883/mqtt', {
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
        console.log('client.on -> jsonObject:', jsonObject);
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
      <div className={'boxall'}>
        <div className={styles.content}>
          <div className={styles.flyMonitor}>
            {' '}
            <Row>
              <Col span={2} className={'arrow'} />
              <Col span={22} className={'title'}>
                无人机画面01
              </Col>
            </Row>
            <Row>
              <Col span={24} className={'titleLine'} />
            </Row>
            {/*  */}
            <Row>
              <Col span={24} className={styles.video}>
                <VideoPlayer />
              </Col>
            </Row>
            {/*  */}
            <Row>
              <Col span={2} className={'arrow'} />
              <Col span={22} className={'title'}>
                无人机画面02
              </Col>
            </Row>
            <Row>
              <Col span={24} className={'titleLine'} />
            </Row>
            {/*  */}
            <Row>
              <Col span={24} className={styles.video}>
                <VideoPlayer />
              </Col>
            </Row>
          </div>

          {/*  */}
          <div className={styles.board}>
            <Row>
              <Col span={2} className={'arrow'} />
              <Col span={22} className={'title'}>
                无人机态势信息
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Row>
                  <Col className={styles.text} span={8}>
                    速度:
                  </Col>
                  <Col className={styles.text} span={16}>
                    {DroneData.speed}
                  </Col>
                </Row>
                <Row>
                  <Col className={styles.text} span={8}>
                    坐标:
                  </Col>
                  <Col className={styles.text} span={16}>
                    {DroneData.height + DroneData.lat + DroneData.lon}
                  </Col>
                </Row>
                <Row>
                  <Col className={styles.text} span={8}>
                    角度:
                  </Col>
                  <Col className={styles.text} span={16}>
                    {DroneData.target_angle}
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
        <div className={'boxfoot'} />
      </div>
    </>
  );
};

export default Awareness;
