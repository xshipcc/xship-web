/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-12-13 13:39:25
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\left.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Col, List, Row, Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './left.less';
// import Player from '@/components/VideoReact';
import Player from '@/components/VideoFlv';
import * as mqtt from 'mqtt';
import Title from '../common/Title';
import { queryDevice } from '@/pages/drone/device/service';
import { ControlOutlined } from '@ant-design/icons';
import { useDispatch } from 'umi';
function useForceUpdate() {
  const [value, setState] = useState(true);
  return () => setState(!value);
}

const Awareness: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file left.tsx
   *  @time 2023/09/13
   * @category :
   * @function :
   */
  const handleForceupdateMethod = useForceUpdate();
  const def: any = '';
  const client = useRef(def);
  const dispatch = useDispatch();

  const [droneinfo, setdroneinfo] = useState({ cam_url: '' });
  const [consoleInfo, setconsoleInfo] = useState(['1']);
  const [videoUrl, setVideoUrl] = useState('');
  const getDroneData = async () => {
    const resp: any = await queryDevice({ pageSize: 10, current: 1 });
    console.log('getDroneData -> resp:', resp);
    // {data: [], pageSize: 10, current: 1, total:28, success: true,}
    setdroneinfo(resp.data[0]);
    handleForceupdateMethod();
  };

  useEffect(() => {
    getDroneData();
  }, []);

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
    mqttSub({ topic: ['console', 'control'], qos: 0 });

    client.current.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'console') {
        // const jsonObject = JSON.parse(mqttMessage);
        const jsonObject = JSON.parse(mqttMessage);
        console.log('client.current.on -> jsonObject1111:', jsonObject);

        setconsoleInfo((item: any) => {
          return [...item, jsonObject];
        });
        handleForceupdateMethod();
      }
      if (topic === 'control') {
        // const jsonObject = JSON.parse(mqttMessage);
        const jsonObject = JSON.parse(mqttMessage);

        const url1 = 'http://' + extractedUrl + '/' + jsonObject.url;
        console.log('client111.current.on -> url:', url1);
        setVideoUrl(url1);
        handleForceupdateMethod();
      }
    });

    return () => {
      if (client.current) client.current.end();
    };
  }, []);
  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------
  return (
    <>
      <div className={styles.content}>
        <div className={styles.tab}>
          <Tabs
            tabPosition={'left'}
            items={[
              {
                label: `无人机画面`,
                key: 'drone',
                children: (
                  <Row>
                    <Col span={24} className={styles.video}>
                      {/* @ts-ignore */}
                      {console.log('droneinfo:', droneinfo)}
                      <video src={videoUrl} controls className={styles.video}></video>
                      {/* <Player url={droneinfo.cam_url} height={'19'} width={'100'} /> */}
                      {/* <Player url={droneinfo.cam_url} height={'19'} width={'100'} /> */}
                    </Col>
                  </Row>
                ),
              },
              {
                label: `控制台信息`,
                key: 'hangar',
                // @ts-ignore
                children: (
                  <div className={styles.infoList}>
                    <List
                      dataSource={consoleInfo}
                      renderItem={(item) => (
                        <List.Item>
                          <div className={styles.info}>{item}</div>
                        </List.Item>
                      )}
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>

        {/*  */}
        {/*  */}
      </div>
    </>
  );
};

export default Awareness;
