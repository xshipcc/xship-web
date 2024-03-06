/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-03-06 12:38:12
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
import { debounce } from 'lodash';
import { queryHistory } from '@/pages/report/service';
import { queryFly } from '@/pages/drone/routePlan/service';

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
  const [Collapase, setCollapase] = useState(true);

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
  // 菜单相关信号切换
  const currentComponent = useSelector((state: any) => state.dashboardModel.currentComponent);
  const [dashboardState, setdashboardState] = useState({
    drone: {
      check: { data: 'on' },
      unlock: { data: 'on' },
      takeoff: { data: 'on' },
      return: { data: 'on' },
      lock: { data: 'on' },
      historyid: { data: -1 },
      planid: { data: -1 },
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
  const [currentRoad, setcurrentRoad] = useState<any>([]);

  const loadCurrentRoad = (roadData: any) => {
    // currentRoad.data
    // lat":38.0865966192828,"lon":114.33264199360657,"alt":97.20427051352851
    // currentRoad.push({
    //   name: '终点',
    //   coord: [114.33264199360657, 38.0865966192828, 111],
    //   speed: 5,
    //   hovertime: 10,
    //   radius: 25,
    //   photo: '0', //"0=不拍照;1=拍照",
    //   heightmode: '00', //
    //   turning: '00',
    // });
    const currentRoadoffset = roadData.map((item: any) => {
      item.coord[0] = item.coord[0] + 0.0062;
      item.coord[1] = item.coord[1] + 0.0019;

      return item;
    });
    console.log('currentRoadoffset -> 偏移对比:', roadData, currentRoadoffset);

    dispatch({
      type: 'dashboardModel/saveCurrentFlyingRoad',
      payload: currentRoadoffset,
    });
  };
  const [reqParams, setreqParams] = useState({
    platform: -1,
    confirm: -1,
    create_time: '',
    end_time: '',
    uav_id: -1,
    // fly_id: currentFlyingid,
    operator: '',
  });
  const getHistoryList = async (params = {}) => {
    console.log('历史={ -> params:', params);
    console.log('reqParams11:', reqParams);

    const req = {
      ...params,
      ...reqParams,
    };

    const res = await queryHistory(req);
    console.log('requestres:', res);
    if (res?.data) {
      console.log('requestres1111111:', res);
      dispatch({
        type: 'dashboardModel/changecurrentHistoryData',
        payload: res.data[0],
      });
      try {
        if (res.data[0]) {
          console.log('res.data[0].历史点:', res.data[0].fly_data);
          // {"coord":[114.34131048073188,38.10543924297292,403.1840782818318],"name":"0号","speed":5,"hovertime":10,"radius":25,"photo":"0","heightmode":"00","turning":"00"}
          const historyRoad = JSON.parse(res.data[0].fly_data);
          historyRoad.push({
            name: '返航点',
            coord: [res.data[0].lon, res.data[0].lat, res.data[0].alt],
            hovertime: '',
            photo: '0',
            radius: 25,
            speed: 5,
            turning: '00',
          });
          // res.data[0]
          loadCurrentRoad(historyRoad);
        }
      } catch (error) {}

      // roadList;
      //       roadList.map((item)=>{
      // // if( res.data[0].uav_id)
      //       })
      // const resRoad = await queryFly(params);
      // resRoad.data.map((item: any) => {
      //   if ((item.id = res.data[0].uav_id)) {
      //     console.log('resRoad.data.map -> item:', item);
      //     setcurrentRoad(JSON.parse(item.data));
      //   }
      // });
      // res.data[0].map(() => {
      //   setcurrentRoad(JSON.parse(params));
      // });

      // setTimeout(() => {
      //   loadCurrentRoad();
      // }, 1000);
    }
    console.log('currentList={ -> res:', res);

    // return { data: currentList };
  };
  const currentFlyingid = useSelector((state: any) => state.dashboardModel.currentFlyingid);

  useEffect(() => {
    console.log('useEffect -> 回放路线:', dashboardState, dashboardState.drone.historyid.data);

    if (currentFlyingid !== -1) {
      console.log(
        'useEffect -> dashboardState.drone.historyid?.data:',
        dashboardState.drone.historyid?.data,
      );
      console.log('useEffect -> 历史:', dashboardState.drone.historyid.data);

      // dispatch({
      //   type: 'dashboardModel/changecurrentFlyingid',
      //   payload: dashboardState.drone.historyid.data,
      // });
      getHistoryList({ pageSize: 10, current: 1, history_id: currentFlyingid });
    }
  }, [currentFlyingid]);

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
    }, 500);
    setTimeout(() => {
      mqttSub({ topic: 'state', qos: 0 });
    }, 1500);
    const dashboardinfo = {};

    client.current.on('message', (topic: string, mqttMessage: any) => {
      // if (topic === 'info') {
      //   // const jsonObject = JSON.parse(mqttMessage);
      //   const jsonObject = JSON.parse(mqttMessage);
      //   console.log('dashboardinfo2', jsonObject);
      //   console.log('dashboardinfo2p', jsonObject.data.postion);
      //   console.log('dashboardinfo2', dashboardinfo[jsonObject.type]);
      //   // dashboardinfo[jsonObject.type] = jsonObject.data;
      //   console.log('client.current.on -> dashboardinfo2:', dashboardinfo);

      //   dispatch({
      //     type: 'dashboardModel/changedashboardinfoMqtt',
      //     payload: jsonObject,
      //   });
      //   if (typeof jsonObject.data.postion === 'number') {
      //     // 定义一个处理函数，用于更新 data 的值
      //     const handleData = debounce(() => {
      //       dispatch({
      //         type: 'dashboardModel/changePosition',
      //         payload: jsonObject.data.postion,
      //       });
      //     }, 2000); // 设置延迟时间为2秒
      //     handleData();
      //   }

      //   handleForceupdateMethod();
      // }
      if (topic === 'state') {
        // const jsonObject = JSON.parse(mqttMessage);
        const jsonObject = JSON.parse(mqttMessage);
        console.log('client.current.on -> 无人机状态state11111:', jsonObject);
        if (jsonObject?.road) {
          const currentRoadoffset = jsonObject.road.map((item: any) => {
            item.coord[0] = item.coord[0] + 0.0062;
            item.coord[1] = item.coord[1] + 0.0019;

            return item;
          });
          dispatch({
            type: 'dashboardModel/saveCurrentFlyingRoad',
            payload: currentRoadoffset,
          });
        } else {
          setdashboardState(jsonObject);
          handleForceupdateMethod();
        }
      }
    });
    // 进入页面  提醒更新 当前状态和路线信息
    // client.current.publish('control', JSON.stringify({ cmd: 'state', data: 'on' }));

    return () => {
      if (client.current) client.current.end();
    };
  }, []);
  useEffect(() => {
    if (currentComponent == 'Awareness') {
      setTimeout(() => {
        client.current.publish('control', JSON.stringify({ cmd: 'state', data: 'on' }));
        client.current.publish('control', JSON.stringify({ cmd: 'road', data: 'on' }));
      }, 2000);
    }
  }, [currentComponent]);
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
