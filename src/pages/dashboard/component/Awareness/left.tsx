/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-04-15 12:02:10
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\left.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Col, List, message, Row, Select, Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './left.less';
// import Player from '@/components/VideoReact';
import { queryDevice } from '@/pages/drone/device/service';
// import schedule from 'node-schedule';
import cronParser from 'cron-parser';
import * as mqtt from 'mqtt';
import { useDispatch, useSelector } from 'umi';
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
  const currentTab = useSelector((state: any) => state.dashboardModel.currentTab);

  const [droneinfo, setdroneinfo] = useState({ cam_url: '' });
  const [timeInfo, settimeInfo] = useState('无');
  const [timeInfoInselect, settimeInfoInselect] = useState('无');
  const [consoleInfo, setconsoleInfo] = useState(['控制台信息']);
  useEffect(() => {
    setconsoleInfo((item: any) => {
      if (localStorage.getItem('consoleInfo')) {
        // @ts-ignore
        const storedStrings = JSON.parse(localStorage.getItem('consoleInfo'));
        console.log('setconsoleInfo -> storedStrings:', storedStrings);
        // 判断数组长度是否大于 100，如果是则弹出最前面的数，直到长度等于 100
        while (storedStrings.length > 100) {
          storedStrings.pop(); // 弹出数组中的第一个元素
        }
        console.log('setconsoleInfo -> storedStrings:', storedStrings);

        return [...storedStrings];
      } else {
        return item;
      }
    });
  }, []);
  const [videoUrl, setVideoUrl] = useState('');
  const getDroneData = async () => {
    const resp: any = await queryDevice({ pageSize: 10, current: 1 });
    console.log('getDroneData -> resp:', resp);
    // {data: [], pageSize: 10, current: 1, total:28, success: true,}
    setdroneinfo(resp.data[0]);
    handleForceupdateMethod();
  };
  // const [taskList, settaskList] = useState<any>([]);
  const taskList = useRef(def);
  const taskListCache = useRef(def);

  const getHoursUntilNextExecution = (cronExpression: string) => {
    const interval = cronParser.parseExpression(cronExpression);
    const nextDate = interval.next().toString();
    return nextDate;
  };
  // const [defaultTask, setdefaultTask] = useState<any>(null);
  const defaultTask = useRef(-1);

  const [show, setshow] = useState<any>(true);
  // useEffect(() => {
  //   // if (defaultTask.current.length > 0) {
  //   //   setshow(true);
  //   // }
  //   //  else {
  //   //   setshow(false);
  //   // }
  //   console.log('defaultTask.current:', defaultTask.current);
  // }, [defaultTask.current]);
  const currentComponent = useSelector((state: any) => state.dashboardModel.currentComponent);

  useEffect(() => {
    if (currentComponent == 'Awareness') {
      setTimeout(() => {
        client.current.publish('control', JSON.stringify({ cmd: 'state', data: 'on' }));
        client.current.publish('control', JSON.stringify({ cmd: 'road', data: 'on' }));
      }, 2000);
    }
  }, [currentComponent]);
  useEffect(() => {
    getDroneData();
    queryPlan({ pageSize: 1000, current: 1 }).then((resp) => {
      if (resp?.data) {
        taskListCache.current = resp?.data
          .filter((item1: { status: number }) => item1.status === 1)
          .map((item: any) => {
            return { value: JSON.stringify({ plan: item.plan, id: item.id }), label: item.name };
          });
        taskListCache.current.push({ value: -1, label: '不执行' });
        taskList.current = taskListCache.current;
        // settaskList(tasks);
        console.log('resRoad.data.map -> item:', resp.data);
      }
      setshow(false);
      setTimeout(() => {
        setshow(true);
      }, 100);
    });
  }, []);
  const excute = (data: any) => {
    // const data = { data: 'on' };
    const controlInfo = {
      cmd: 'drone' + '/' + 'plan',
      data: data,
    };
    console.log('sendMqttControl -> controlInfo:', controlInfo);
    console.log('sendMqttControl -> controlInfo:', JSON.stringify(controlInfo));
    client.current.publish('control', JSON.stringify(controlInfo));
  };
  const handleChange = (params: any) => {
    if (params === -1) {
      settimeInfo('无');
      excute(-1);
    } else {
      console.log(`handleChange ${params}`);
      const selectData = JSON.parse(params);
      const difference = getHoursUntilNextExecution(selectData.plan);
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
      excute(selectData.id);
      console.log('handleChange -> difference:', difference);
    }
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
    mqttSub({ topic: ['console', 'control', 'state'], qos: 0 });

    client.current.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'console') {
        // const jsonObject = JSON.parse(mqttMessage);
        // const jsonObject = JSON.parse(mqttMessage);
        // console.log('client.current.on -> jsonObject1111:', jsonObject);

        setconsoleInfo((item: any) => {
          localStorage.setItem('consoleInfo', JSON.stringify([mqttMessage.toString(), ...item]));
          console.log('storedStrings -> item:', item);
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
      if (topic === 'state') {
        // const jsonObject = JSON.parse(mqttMessage);
        const jsonObject = JSON.parse(mqttMessage);
        console.log('client.current.on -> jsonObjecttask:', jsonObject);
        if (jsonObject?.drone?.planid?.data) {
          const currentTask = taskList.current.filter((item1: { value: string }) => {
            return JSON.parse(item1.value).id === jsonObject?.drone?.planid.data;
          });
          console.log('currentTask -> currentTask:');
          console.log('client.current.on -> 当前执行:', taskList.current, currentTask);

          if (currentTask.length > 0) {
            defaultTask.current = currentTask[0].value;
            console.log('client.current.on -> 当前执行:', taskList.current, defaultTask.current);

            // message.success(`当前执行 ${currentTask[0].label}`);
            // setdefaultTask(currentTask[0].value);
            // handleChange(currentTask[0].value);
            // 时间显示
            const selectData = JSON.parse(currentTask[0].value);
            const difference = getHoursUntilNextExecution(selectData.plan);
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
            settimeInfoInselect(chineseDate);
            taskList.current = [currentTask[0], { value: -1, label: '不执行' }];
            if (jsonObject?.drone?.play?.historyid === -1) {
              setshow(false);
              setTimeout(() => {
                setshow(true);
              }, 200);
            }
          } else {
            // message.success('当前未执行');
            defaultTask.current = -1;
            settimeInfo('无');
            settimeInfoInselect('无');
            console.log('client.current.on -> 当前执行不:', defaultTask.current);

            taskList.current = taskListCache.current;
            if (jsonObject?.drone?.play?.historyid === -1) {
              setshow(false);
              setTimeout(() => {
                setshow(true);
              }, 200);
            }
          }
        }
      }
    });

    // setTimeout(() => {
    //   setshow(true);
    //   message.warning('未收到巡检计划');
    // }, 3000);
    return () => {
      if (client.current) client.current.end();
    };
  }, []);
  // const player = useSelector((state: any) => state.dashboardModel.player);

  // const videoRef = useRef(null);

  // useEffect(() => {
  //   console.log('useEffect ->  播放暂停.current:', videoRef.current, player);

  //   const playVideo = () => {
  //     videoRef.current.play();
  //   };

  //   const pauseVideo = () => {
  //     videoRef.current.pause();
  //   };
  //   if (videoRef.current != null) {
  //     if (player.pause) {
  //       pauseVideo();
  //     } else {
  //       playVideo();
  //     }
  //   }
  // }, [player.pause]);

  // useEffect(() => {
  //   console.log('useEffect ->  播放速度.current:', videoRef.current, player);

  //   const speedUpVideo = () => {
  //     console.log('speedUpVideo ->  播放速度.speed:', player.speed);

  //     videoRef.current.playbackRate = player.speed;
  //   };
  //   if (videoRef.current != null) speedUpVideo();
  // }, [player.speed]);

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------
  return (
    <>
      <div className={styles.content}>
        <div className={styles.tab}>
          {show && (
            <Tabs
              tabPosition={'left'}
              activeKey={'hangar'}
              items={[
                {
                  label: `控制台信息`,
                  key: 'hangar',
                  // @ts-ignore
                  children: (
                    <div className={styles.infoList}>
                      <Row>
                        <Col span={8}>
                          <Select
                            onChange={handleChange}
                            options={taskList.current}
                            value={defaultTask.current}
                            // value={defaultTask.current}
                          />
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
                          {timeInfoInselect}
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
                // {
                //   label: `回放画面`,
                //   key: 'drone',
                //   disabled: true,
                //   children: (
                //     <Row>
                //       <Col span={24} className={styles.video}>
                //         {/* @ts-ignore */}
                //         {console.log('droneinfo:', droneinfo)}
                //         <video
                //           src={videoUrl}
                //           ref={videoRef}
                //           autoPlay
                //           muted
                //           controls
                //           className={styles.video}
                //         />
                //         {/* <Player url={droneinfo.cam_url} height={'19'} width={'100'} /> */}
                //         {/* <Player url={droneinfo.cam_url} height={'19'} width={'100'} /> */}
                //       </Col>
                //     </Row>
                //   ),
                // },
              ]}
            />
          )}
        </div>

        {/*  */}
        {/*  */}
      </div>
    </>
  );
};

export default Awareness;
