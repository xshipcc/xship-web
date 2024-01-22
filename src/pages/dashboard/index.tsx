// @ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-09 20:12:31
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-22 11:54:39
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState, useRef } from 'react';
import styles from './index.less';
import 'cesium/Source/Widgets/widgets.css';
import { Col, Row } from 'antd';
import Monitor from '@/pages/dashboard/component/Monitor';
import Routemark from '@/pages/dashboard/component/Routemark';
import Awareness from '@/pages/dashboard/component/Awareness/left';
import AwarenessCenter from '@/pages/dashboard/component/Awareness/center';
import AwarenessRight from '@/pages/dashboard/component/Awareness/right';
import Analysis from '@/pages/dashboard/component/Analysis/left';
import AnalysisCenter from '@/pages/dashboard/component/Analysis/center';
import AnalysisRight from '@/pages/dashboard/component/Analysis/right';
import Map from '@/pages/dashboard/component/Map';
import { Header } from '@/pages/dashboard/component/Header';
import type { DashboardAnalysData } from '@/pages/dashboard/typings';
import { queryStatistics } from '@/pages/AIalert/service';
import * as mqtt from 'mqtt';
import { debounce } from 'lodash';
import { useSelector, useDispatch, history } from 'umi';
const initView = {
  drone: {
    total: 2,
    online: 84,
    breakdown: 2,
  },
  inspection: {
    total: 128,
    complete: 48,
    rate: 69,
    today: 198,
    breakdown: 47,
    warning: 34,
  },
  radar: [
    {
      item: 'Design',
      user: 'a',
      score: 70,
    },
    {
      item: 'Design',
      user: 'b',
      score: 30,
    },
    {
      item: 'Development',
      user: 'a',
      score: 60,
    },
    {
      item: 'Development',
      user: 'b',
      score: 70,
    },
    {
      item: 'Marketing',
      user: 'a',
      score: 50,
    },
    {
      item: 'Marketing',
      user: 'b',
      score: 60,
    },
    {
      item: 'Users',
      user: 'a',
      score: 40,
    },
    {
      item: 'Users',
      user: 'b',
      score: 50,
    },
    {
      item: 'Test',
      user: 'a',
      score: 60,
    },
    {
      item: 'Test',
      user: 'b',
      score: 70,
    },
  ],
  line: [
    {
      type: '异常',
      date: 2400,
      value: 67,
    },
    {
      type: '告警',
      date: 2400,
      value: 60,
    },
    {
      type: '异常',
      date: 2401,
      value: 95,
    },
    {
      type: '告警',
      date: 2401,
      value: 30,
    },
    {
      type: '异常',
      date: 2402,
      value: 88,
    },
    {
      type: '告警',
      date: 2402,
      value: 41,
    },
    {
      type: '异常',
      date: 2403,
      value: 38,
    },
    {
      type: '告警',
      date: 2403,
      value: 52,
    },
    {
      type: '异常',
      date: 2404,
      value: 65,
    },
    {
      type: '告警',
      date: 2404,
      value: 24,
    },
  ],
  DualAxes: {
    histgram: [
      {
        time: '2023-03',
        value: 350,
        type: 'uv',
      },
      {
        time: '2023-04',
        value: 900,
        type: 'uv',
      },
      {
        time: '2023-05',
        value: 300,
        type: 'uv',
      },
      {
        time: '2023-06',
        value: 450,
        type: 'uv',
      },
      {
        time: '2023-07',
        value: 470,
        type: 'uv',
      },
      {
        time: '2023-03',
        value: 220,
        type: 'bill',
      },
      {
        time: '2023-04',
        value: 300,
        type: 'bill',
      },
      {
        time: '2023-05',
        value: 250,
        type: 'bill',
      },
      {
        time: '2023-06',
        value: 220,
        type: 'bill',
      },
      {
        time: '2023-07',
        value: 362,
        type: 'bill',
      },
    ],
    linegram: [
      {
        time: '2023-03',
        count: 800,
        name: 'a',
      },
      {
        time: '2023-04',
        count: 600,
        name: 'a',
      },
      {
        time: '2023-05',
        count: 400,
        name: 'a',
      },
      {
        time: '2023-06',
        count: 380,
        name: 'a',
      },
      {
        time: '2023-07',
        count: 220,
        name: 'a',
      },
    ],
  },
  bar: [
    {
      name: '人员告警',
      value: 38,
    },
    {
      name: '入侵告警',
      value: 52,
    },
    {
      name: '烟雾告警',
      value: 61,
    },
    {
      name: '人脸告警',
      value: 145,
    },
    {
      name: '车辆告警',
      value: 48,
    },
  ],
  alarmPie: [
    {
      title: '高刚',
      value: 89,
    },
    {
      title: '潘艳',
      value: 41,
    },
    {
      title: '夏静',
      value: 7,
    },
    {
      title: '许敏',
      value: 24,
    },
  ],
}; //模拟

const Dashboard: React.FC = () => {
  /**
   *  @file index.tsx
   *  @time 2023/10/17
   * @category :大屏数据初始化
   * @function :
   */
  //#region -------------------------------------------------------------------------
  const dashboardinfoMqtt = useSelector((state: any) => state.dashboardModel.dashboardinfoMqtt);
  const [data, setData] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await dispatch({
        //   type: 'dashboardModel/fetchDashboardInfo',
        //   payload: { name: 'dashboardInfo' },
        // });
        // setData(response); // 在异步操作完成后更新数据状态
      } catch (error) {
        // 处理错误
      }
    };
    fetchData();

    // localStorage.setItem('token', msg.token);
    if (localStorage.getItem('router') == 'index') {
      history.push('/');
    }
    const handleBeforeUnload = (event) => {
      localStorage.setItem('router', 'index');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
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
    mqttSub({ topic: 'info', qos: 0 });

    // const dashboardinfo = {};

    client.current.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'info') {
        // const jsonObject = JSON.parse(mqttMessage);
        const jsonObject = JSON.parse(mqttMessage);
        console.log('dashboardinfo2', jsonObject);

        dispatch({
          type: 'dashboardModel/changedashboardinfoMqtt',
          payload: jsonObject,
        });
        if (typeof jsonObject?.data?.postion === 'number') {
          // 定义一个处理函数，用于更新 data 的值
          const handleData = debounce(() => {
            dispatch({
              type: 'dashboardModel/changePosition',
              payload: jsonObject.data.postion,
            });
          }, 2000); // 设置延迟时间为2秒
          handleData();
        }
        // handleForceupdateMethod();
      }
    });
    // 进入页面  提醒更新 当前状态和路线信息
    // client.current.publish('control', JSON.stringify({ cmd: 'state', data: 'on' }));

    return () => {
      if (client.current) client.current.end();
    };
  }, []);
  const currentComponent = useSelector((state: any) => state.dashboardModel.currentComponent);
  const RenderComponent = (component) => {
    switch (component) {
      case 'Analysis':
        return (
          <>
            <div className={styles.left}>
              <Analysis initValue={initView} />
            </div>
            <div className={styles.center}>
              <AnalysisCenter initValue={initView} />
            </div>
            <div className={styles.right}>
              <AnalysisRight initValue={initView} />
            </div>
          </>
        );
      case 'Awareness':
        return (
          <>
            <div className={styles.awarenessLeft}>
              <Awareness initValue={initView} />
            </div>
            <div className={styles.awarenessCenter}>
              <AwarenessCenter initValue={initView} />
            </div>
            <div className={styles.right}>
              <AwarenessRight initValue={initView} />
            </div>
          </>
        );
      case 'Monitor':
        return (
          <>
            <Row>
              <div span={24} className={styles.monitorContent}>
                <Monitor initValue={initView} />
              </div>
            </Row>
          </>
        );
      case 'Routemark':
        return (
          <>
            {/* <div span={19} className={styles.timeline}>
            1111
          </div> */}
            <div span={5} offset={19} className={styles.right}>
              <Routemark initValue={initView} />
            </div>
          </>
        );
    }
  };

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */

  return (
    <div className="container">
      <div className="container__body">
        {/* <div className="mask" /> */}
        <div className="masking top" />
        <div className="masking right" />
        <div className="masking bottom" />
        <div className="masking left" />
        {/* map  */}
        <Map />
        {/* map  */}
        <div className={styles.screen}>
          {/* header */}
          <div className={styles.header}>
            <div className={styles.titleOfstate}>
              GPS状态: {dashboardinfoMqtt?.drone?.gps_stars}剩余电量:
              {dashboardinfoMqtt.drone.v}
              <br />
              电流值:{dashboardinfoMqtt?.drone?.a} 数据帧频:
              {dashboardinfoMqtt?.drone?.gps_lost}
            </div>
            <Header />
          </div>
          {/* header */}
          {/* content */}
          <div className={styles.content}>{RenderComponent(currentComponent)}</div>
          {/* content */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
