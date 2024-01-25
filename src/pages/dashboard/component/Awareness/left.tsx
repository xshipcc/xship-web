/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-24 14:01:45
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\left.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Col, List, Row, Select, Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './left.less';
// import Player from '@/components/VideoReact';
import { queryDevice } from '@/pages/drone/device/service';
// import schedule from 'node-schedule';
import cronParser from 'cron-parser';
import * as mqtt from 'mqtt';
import { useDispatch } from 'umi';
import { queryPlan } from '@/pages/drone/task/service';
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

  const [droneinfo, setdroneinfo] = useState({ cam_url: '' });
  const [timeInfo, settimeInfo] = useState('');
  const [consoleInfo, setconsoleInfo] = useState(['控制台信息']);
  const [videoUrl, setVideoUrl] = useState('');
  const getDroneData = async () => {
    const resp: any = await queryDevice({ pageSize: 10, current: 1 });
    console.log('getDroneData -> resp:', resp);
    // {data: [], pageSize: 10, current: 1, total:28, success: true,}
    setdroneinfo(resp.data[0]);
    handleForceupdateMethod();
  };
  const [taskList, settaskList] = useState<any>([]);

  useEffect(() => {
    getDroneData();
    queryPlan({ pageSize: 1000, current: 1 }).then((resp) => {
      if (resp?.data) {
        const tasks = resp?.data.map((item: any) => {
          return { value: item.plan, label: item.name };
        });
        settaskList(tasks);
        console.log('resRoad.data.map -> item:', resp.data);
      }
    });
  }, []);
  const getHoursUntilNextExecution = (cronExpression: string) => {
    const interval = cronParser.parseExpression(cronExpression);
    const nextDate = interval.next().toString();
    return nextDate;
  };

  const handleChange = (params: string) => {
    console.log(`handleChange ${params}`);
    const difference = getHoursUntilNextExecution(params);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    };
    const date = new Date(difference);
    const chineseDate = date.toLocaleString('zh-CN', options);
    settimeInfo(chineseDate);
    console.log('handleChange -> difference:', difference);
  };

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
        // const jsonObject = JSON.parse(mqttMessage);
        // console.log('client.current.on -> jsonObject1111:', jsonObject);

        setconsoleInfo((item: any) => {
          return [mqttMessage.toString(), ...item];
        });
        handleForceupdateMethod();
      }
      if (topic === 'control') {
        // const jsonObject = JSON.parse(mqttMessage);
        const jsonObject = JSON.parse(mqttMessage);
        const url1 = 'http://' + extractedUrl + '/' + jsonObject.data;
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
                label: `控制台信息`,
                key: 'hangar',
                // @ts-ignore
                children: (
                  <div className={styles.infoList}>
                    <Row>
                      <Col span={8}>
                        <Select onChange={handleChange} options={taskList} />
                      </Col>
                      <Col
                        span={14}
                        offset={2}
                        // onClick={() => {
                        //   sendMqttControl();
                        // }}
                        className={styles.infoTime}
                      >
                        执行时间:
                        {timeInfo}
                        {/* <button className={styles.infoButton}>自动飞行</button> */}
                      </Col>
                    </Row>
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
              {
                label: `回放画面`,
                key: 'drone',
                children: (
                  <Row>
                    <Col span={24} className={styles.video}>
                      {/* @ts-ignore */}
                      {console.log('droneinfo:', droneinfo)}
                      <video src={videoUrl} autoPlay controls muted className={styles.video} />
                      {/* <Player url={droneinfo.cam_url} height={'19'} width={'100'} /> */}
                      {/* <Player url={droneinfo.cam_url} height={'19'} width={'100'} /> */}
                    </Col>
                  </Row>
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
