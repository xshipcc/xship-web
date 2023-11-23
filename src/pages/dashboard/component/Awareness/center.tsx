/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-23 10:58:23
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

  const [dashboardinfo, setdashboardinfo] = useState<DashboardinfoType>({
    monitor: {
      lat: 0,
      lon: 0,
      target_height: 0,
      tf_usage: 0,
      tf_total: 0,
    },
    hangar: {
      battery_v: 0,
      battery_temp: 0,
      warehouse_status: 0,
      battery_status: 0,
      homing_status: 0,
      uavpower_status: 0,
    },
    drone: {
      lat: 0,
      lon: 0,
      height: 0,
      pitch: 0,
      trajectory: 0,
      roll_angle: 0,
      rel_height: 0,
      target_height: 0,
      fly_time: 0,
      fly_distance: 0,
      speed: 0,
      gps_speed: 0,
    },
  });
  const [dashboardState, setdashboardState] = useState<dashboardStateType>({
    drone: {
      check: 'off',
      unlock: 'off',
      takeoff: 'off',
      return: 'off',
      lock: 'off',
      mode: 'off',
      light: 'off',
    },
    monitor: {
      video: 'off',
      positioning: 'off',
    },
    hangar: {
      hatch: 'off',
      charging: 'off',
      mechanism: 'off',
    },
    player: {
      play: 'off',
      pause: 'off',
      speed: '1',
    },
  });
  const handleForceupdateMethod = useForceUpdate();
  // mqtt消息接收
  useEffect(() => {
    const clientId = 'awareness' + Math.random().toString(16).substring(2, 8);
    const username = 'emqx_test';
    const password = 'emqx_test';
    client.current = mqtt.connect(WS_MQTT_URL, {
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

    client.current.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'info') {
        // const jsonObject = JSON.parse(mqttMessage);
        const jsonObject = JSON.parse(mqttMessage);
        console.log('client.current.on -> jsonObject:', jsonObject);
        setdashboardinfo((item: DashboardinfoType) => {
          item[jsonObject.type] = jsonObject.data;
          console.log('setdashboardinfo -> item:', item);
          console.log('dashboardinfo:', dashboardinfo);

          console.log('setdashboardinfo -> item[jsonObject.type]:', item[jsonObject.type]);
          return item;
        });
        handleForceupdateMethod();
        // console.log('client.on -> jsonObject:', jsonObject);
        // setDroneData(JSON.parse(mqttMessage));
      }
      if (topic === 'state') {
        // const jsonObject = JSON.parse(mqttMessage);
        const jsonObject = JSON.parse(mqttMessage);
        console.log('client.current.on -> jsonObject:', jsonObject);
        setdashboardState((item: dashboardStateType) => {
          item[jsonObject.type] = jsonObject.data;
          console.log('setdashboardState -> item:', item);
          return item;
        });
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
                    dashboardinfo={dashboardinfo}
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
                    dashboardinfo={dashboardinfo}
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
                    dashboardinfo={dashboardinfo}
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
