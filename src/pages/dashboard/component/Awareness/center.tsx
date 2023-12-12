/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-27 12:35:53
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\center.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './center.less';
import { ControlOutlined } from '@ant-design/icons';
import RenderComponent from './component/centerTab';
import type { DashboardinfoType, dashboardStateType } from './data';
import * as mqtt from 'mqtt';
import { useDispatch, useSelector } from 'umi';

function useForceUpdate() {
  const [value, setState] = useState(true);
  return () => setState(!value);
}

const AwarenessCenter: React.FC = () => {
  /**
   *  @file center.tsx
   *  @time 2023/11/16
   * @category :控制面板
   * @function :
   */
  //#region -------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState('drone');
  const [Collapase, setCollapase] = useState(false);

  const onTabChange = (key: string) => {
    setActiveTab(key);
    console.log(key);
  };
  const def: any = '';

  const client = useRef(def);

  // const dashboardinfo = {
  //   monitor: {
  //     lat: 0,
  //     lon: 0,
  //     target_height: 0,
  //     tf_usage: 0,
  //     tf_total: 0,
  //   },
  //   hangar: {
  //     battery_v: 0,
  //     battery_temp: 0,
  //     hatch: 0,
  //     charge: 0,
  //     homing: 0,
  //     uavpower_status: 0,
  //   },
  //   drone: {
  //     lat: 0,
  //     lon: 0,
  //     height: 0,
  //     pitch: 0,
  //     trajectory: 0,
  //     roll_angle: 0,
  //     rel_height: 0,
  //     target_height: 0,
  //     fly_time: 0,
  //     fly_distance: 0,
  //     speed: 0,
  //     gps_speed: 0,
  //   },
  // };

  const [dashboardState, setdashboardState] = useState({
    drone: {
      check: { data: 'on' },
      unlock: { data: 'on' },
      takeoff: { data: 'on' },
      return: { data: 'on' },
      lock: { data: 'on' },
      historyid: { data: -1 },
      mode: { data: 'on' },
      light: { data: 'on' },
    },
    monitor: {
      video: { data: 'on' },
      positioning: { data: 'on' },
    },
    hangar: {
      hatch: { data: 'on' },
      charging: { data: 'on' },
      mechanism: { data: 'on' },
    },
    player: {
      play: { data: -1 },
      pause: { data: 'on' },
      speed: { data: '1/2/4/6' },
    },
  });
  const handleForceupdateMethod = useForceUpdate();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('useEffect -> dashboardState111:', dashboardState);

    if (dashboardState.drone.historyid?.data !== -1) {
      console.log(
        'useEffect -> dashboardState.drone.historyid?.data:',
        dashboardState.drone.historyid?.data,
      );

      dispatch({
        type: 'dashboardModel/changecurrentFlyingid',
        payload: dashboardState.drone.historyid.data,
      });
    }
  }, [dashboardState.drone.historyid]);

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
    setTimeout(() => {
      mqttSub({ topic: 'control', qos: 0 });
    }, 1000);
    setTimeout(() => {
      mqttSub({ topic: 'state', qos: 0 });
    }, 1500);
    const dashboardinfo = {};

    client.current.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'info') {
        // const jsonObject = JSON.parse(mqttMessage);
        const jsonObject = JSON.parse(mqttMessage);
        console.log('dashboardinfo2', jsonObject);
        console.log('dashboardinfo2', dashboardinfo[jsonObject.type]);
        // dashboardinfo[jsonObject.type] = jsonObject.data;
        console.log('client.current.on -> dashboardinfo2:', dashboardinfo);

        dispatch({
          type: 'dashboardModel/changedashboardinfoMqtt',
          payload: jsonObject,
        });

        // setdashboardinfo((item: any) => {
        //   item[jsonObject.type] = jsonObject.data;
        //   console.log('setdashboardinfo -> item:', item);
        //   console.log('dashboardinfo:', dashboardinfo);

        //   console.log('setdashboardinfo -> item[jsonObject.type]:', item[jsonObject.type]);
        //   return item;
        // });
        handleForceupdateMethod();
      }
      if (topic === 'state') {
        // const jsonObject = JSON.parse(mqttMessage);
        const jsonObject = JSON.parse(mqttMessage);
        console.log('client.current.on -> jsonObject1111:', jsonObject);
        setdashboardState(jsonObject);
        handleForceupdateMethod();

        // console.log('client.on -> jsonObject:', jsonObject);
        // setDroneData(JSON.parse(mqttMessage));
      }
    });

    return () => {
      if (client.current) client.current.end();
    };
  }, []);

  return (
    <div className={Collapase ? styles.contentCollapse : styles.content}>
      <div className={Collapase ? styles.collapaseButtonClose : styles.collapaseButton}>
        <Button
          type="text"
          icon={<ControlOutlined rev={undefined} />}
          onClick={() => (Collapase ? setCollapase(false) : setCollapase(true))}
        />
      </div>
      <div className={Collapase ? styles.tabCollapse : styles.tab}>
        {Collapase ? (
          <></>
        ) : (
          <Tabs
            tabPosition={'left'}
            onChange={onTabChange}
            items={[
              {
                label: `无人机`,
                key: 'drone',
                children: (
                  <RenderComponent
                    // @ts-ignore
                    component={activeTab}
                    dashboardState={dashboardState}
                    client={client}
                  />
                ),
              },
              {
                label: `飞机库`,
                key: 'hangar',
                // @ts-ignore
                children: (
                  <RenderComponent
                    // @ts-ignore
                    component={activeTab}
                    dashboardState={dashboardState}
                    client={client}
                  />
                ),
              },
              {
                label: `摄像头`,
                key: 'monitor',
                // @ts-ignore
                children: (
                  <RenderComponent
                    // @ts-ignore
                    component={activeTab}
                    dashboardState={dashboardState}
                    client={client}
                  />
                ),
              },
            ]}
          />
        )}
      </div>
      {/*  */}
    </div>
  );
  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
};

export default AwarenessCenter;
