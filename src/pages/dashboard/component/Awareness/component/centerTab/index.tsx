/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-16 14:36:51
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\component\centerTab\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Col, Popconfirm, Row, Select, message } from 'antd';
import styles from './index.less';

import React, { useEffect, useRef, useState } from 'react';
import type { DashboardinfoType } from '../../data';
import * as mqtt from 'mqtt';
import {
  droneButtonList1,
  droneButtonList2,
  droneInfoList,
  droneStateList,
  hangarButtonList1,
  hangarInfoList1,
  hangarInfoList2,
  monitorButtonList1,
  monitorButtonList2,
  monitorList,
  monitorTFList,
} from '../centerList';
import { queryFly } from '@/pages/drone/routePlan/service';
import type { ListUavFlyReqType } from '@/pages/drone/routePlan/data';
import Title from '../../../common/Title';
import { useDispatch } from 'umi';
import Dialog from '../dialog';
import AwarenessButton from '../button';

const CenterTab: React.FC = (props: any) => {
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
  console.log('dashboardinfo:', dashboardinfo);

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

    client.current.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'info') {
        // const jsonObject = JSON.parse(mqttMessage);
        const jsonObject = JSON.parse(mqttMessage);
        console.log('client.current.on -> jsonObject:', jsonObject);
        setdashboardinfo((item: DashboardinfoType) => {
          item[jsonObject.type] = jsonObject;
          console.log('setdashboardinfo -> item[jsonObject.type]:', item[jsonObject.type]);
          return item;
        });
        // console.log('client.on -> jsonObject:', jsonObject);
        // setDroneData(JSON.parse(mqttMessage));
      }
    });

    return () => {
      if (client.current) client.current.end();
    };
  }, []);

  const RenderList = (params: any[], type: string) =>
    params?.map((item: any) => (
      <Row key={item.value}>
        <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
          {item.value}
        </Col>
        <Col span={12} style={{ color: 'white' }}>
          {/* {dashboardinfo[type]} */}
          {item.unit}
        </Col>
      </Row>
    ));

  const sendMqttControl = (param: any, type: string) => {
    console.log('sendMqttControl -> type:', type);
    console.log('sendMqttControl -> param:', param);
    // const data = { data: 'on' };
    const controlInfo = {
      cmd: type + '/' + param,
      data: 'on',
    };
    console.log('sendMqttControl -> controlInfo:', controlInfo);
    console.log('sendMqttControl -> controlInfo:', JSON.stringify(controlInfo));
    client.current.publish('control', JSON.stringify(controlInfo));
  };

  const RenderButtonList = (params: any[], type: string) =>
    params?.map((item: any) => (
      <Row key={item.key}>
        <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
          {item.info}
        </Col>
        <Col
          span={12}
          style={{ color: 'white' }}
          // onClick={() => {
          //   sendMqttControl(item.key, type);
          // }}
        >
          <Popconfirm
            title={'是否执行'}
            onConfirm={() => {
              message.success('确认');
              sendMqttControl(item.button, type);
            }}
            onCancel={() => {
              message.error('取消');
            }}
            okText="确认"
            cancelText="取消"
          >
            <a>
              {/* @ts-ignore */}
              <AwarenessButton name={item.button} over={item.over} url={'/demo'} />
            </a>
          </Popconfirm>
        </Col>
      </Row>
    ));

  const [ValueView, setValueView] = useState(1);
  const [circleValue, setcircleValue] = useState(1);
  const [ValueFocus, setValueFocus] = useState(1);
  const [roadList, setroadList] = useState([{ value: 'demo', label: 'demo' }]);
  const [currentRoad, setcurrentRoad] = useState<any>([]);

  /**
   *
   * 获取当前的航线信息并且更新航线数据
   * @param {ListUavFlyReqType} params
   * @return {*}
   */
  const fetchFlyData = async (params: ListUavFlyReqType) => {
    try {
      const res = await queryFly(params);
      console.log('fetchFlyData -> res:', res);
      // JSON.parse(res.data.data);
      const road = res.data.map((item: any) => {
        return { value: item.data, label: item.name };
      });
      console.log('road -> road:', road);
      setroadList(road);
      return true;
    } catch (error) {
      console.log('fetchFlyData -> error:', error);
      return false;
    }
  };
  useEffect(() => {
    fetchFlyData({ pageSize: 10, current: 1 });
  }, []);

  const handleChange = (params: string) => {
    setcurrentRoad(JSON.parse(params));
    console.log('handleChange -> JSON.parse(params):', JSON.parse(params));
    console.log(`handleChange ${params}`);
  };
  const dispatch = useDispatch();

  const loadCurrentRoad = () => {
    // currentRoad.data
    console.log('loadCurrentRoad -> currentRoad:', currentRoad);
    // lat":38.0865966192828,"lon":114.33264199360657,"alt":97.20427051352851
    currentRoad.push({
      name: '终点',
      coord: [114.33264199360657, 38.0865966192828, 111],
      speed: 5,
      hovertime: 10,
      radius: 25,
      photo: '0', //"0=不拍照;1=拍照",
      heightmode: '00', //
      turning: '00',
    });
    dispatch({
      type: 'dashboardModel/saveCurrentFlyingRoad',
      payload: currentRoad,
    });
    console.log('loadCurrentRoad -> currentRoad:', currentRoad);

    // const data = { data: 'on' };
    const controlInfo = {
      cmd: 'drone' + '/' + 'route',
      data: currentRoad,
    };
    const controlInfoCircle = {
      cmd: 'drone' + '/' + 'circle',
      data: 1,
    };
    console.log('sendMqttControl -> controlInfo:', controlInfo);
    console.log('sendMqttControl -> controlInfo:', JSON.stringify(controlInfo));
    client.current.publish('control', JSON.stringify(controlInfo));
    client.current.publish('control', JSON.stringify(controlInfoCircle));
  };
  const sendCircle = () => {
    // const data = { data: 'on' };
    const controlInfo = {
      cmd: 'drone' + '/' + 'circle',
      data: circleValue,
    };
    console.log('sendMqttControl -> controlInfo:', controlInfo);
    console.log('sendMqttControl -> controlInfo:', JSON.stringify(controlInfo));
    client.current.publish('control', JSON.stringify(controlInfo));
  };

  // 定点巡航
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    message.success('确认');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const RenderComponent = (component: string) => {
    switch (component) {
      case 'drone':
        return (
          <div className={styles.tabContent}>
            <Title title={'无人机控制'} className={styles.title} />
            <div className={styles.board}>
              <Row>
                {/*  */}
                <Col span={5}>{RenderList(droneInfoList, 'drone')}</Col>
                {/*  */}
                <Col span={5}>{RenderList(droneStateList, 'drone')}</Col>
                {/*  */}
                <Col span={5}>{RenderButtonList(droneButtonList1, 'drone')}</Col>
                <Col span={8} offset={1}>
                  {RenderButtonList(droneButtonList2, 'drone')}
                  {/*  */}
                  <Row>
                    <Col span={8}>
                      <Select defaultValue="default" onChange={handleChange} options={roadList} />
                    </Col>
                    <Col
                      span={8}
                      offset={4}
                      style={{ color: 'white' }}
                      onClick={() => {
                        loadCurrentRoad();
                      }}
                    >
                      {/* @ts-ignore */}
                      <AwarenessButton name={'加载航线'} over={'成功'} />
                    </Col>
                  </Row>
                  {/*  */}
                  <Row>
                    <Col span={8}>
                      <div className={styles.circleLoad}>
                        <input
                          type="number"
                          value={circleValue}
                          onChange={(event) => {
                            // @ts-ignore
                            setcircleValue(event.target.value);
                            console.log(
                              'RenderComponent -> event.target.value:',
                              event.target.value,
                            );
                          }}
                          name="number"
                          className="number-quantity"
                        />
                      </div>
                    </Col>
                    <Col
                      span={8}
                      offset={4}
                      style={{ color: 'white' }}
                      // onClick={() => {
                      //   sendCircle();
                      // }}
                    >
                      <Popconfirm
                        title={'是否执行'}
                        onConfirm={() => {
                          message.success('确认');
                          sendCircle();
                        }}
                        onCancel={() => {
                          message.error('取消');
                        }}
                        okText="确认"
                        cancelText="取消"
                      >
                        <a>
                          {/* @ts-ignore */}
                          <AwarenessButton name={'加载圈数'} over={'成功'} />
                        </a>
                      </Popconfirm>
                    </Col>
                  </Row>
                  {/*  */}
                  <Row>
                    <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                      定点悬停
                    </Col>
                    <Col span={12} style={{ color: 'turquoise' }}>
                      <Dialog />
                      {/*  */}
                      <Popconfirm
                        title={'是否执行'}
                        onConfirm={() => {
                          showModal();
                          // sendMqttControl(item.button, type);
                        }}
                        onCancel={() => {
                          message.error('取消');
                        }}
                        okText="确认"
                        cancelText="取消"
                      >
                        <a>
                          {/* @ts-ignore */}
                          <AwarenessButton name={'定点悬停'} over={'over'} url={'/demo'} />
                        </a>
                      </Popconfirm>
                    </Col>
                    {/*  */}
                  </Row>
                  {/*  */}
                </Col>
              </Row>
            </div>
          </div>
        );
      case 'hangar':
        return (
          <div className={styles.tabContent}>
            <Title title={'飞机库控制'} className={styles.title} />
            <div className={styles.board}>
              <Row>
                {/*  */}
                <Col span={5}>{RenderList(hangarInfoList1, 'hangar')}</Col>
                {/*  */}
                <Col span={5}>{RenderList(hangarInfoList2, 'hangar')}</Col>
                {/*  */}
                <Col span={5}>{RenderButtonList(hangarButtonList1, 'hangar')}</Col>
              </Row>
            </div>
          </div>
        );
      case 'monitor':
        return (
          <div className={styles.tabContent}>
            <Title title={'摄像头控制'} className={styles.title} />
            <div className={styles.board}>
              <Row>
                {/*  */}
                <Col span={5}>{RenderList(monitorList, 'monitor')}</Col>
                {/*  */}
                <Col span={5}>
                  {RenderList(monitorTFList, 'monitor')}
                  {RenderButtonList(monitorButtonList2, 'monitor')}
                </Col>
                {/*  */}
                <Col span={5} offset={1}>
                  {RenderButtonList(monitorButtonList1, 'monitor')}
                </Col>
                <Col span={7} offset={1}>
                  <div className="main">
                    <div className="up">
                      <button
                        className="card1"
                        onMouseDown={() => {
                          const timerId = setInterval(() => {
                            sendMqttControl('up', 'monitor');
                          }, 80); // 每200毫秒调用一次increaseCount函数
                          document.addEventListener('mouseup', () => clearInterval(timerId));
                        }}
                        // onClick={() => {
                        //   sendMqttControl('up', 'monitor');
                        // }}
                      >
                        上
                      </button>
                      <button
                        className="card2"
                        onMouseDown={() => {
                          const timerId = setInterval(() => {
                            sendMqttControl('down', 'monitor');
                          }, 80); // 每200毫秒调用一次increaseCount函数
                          document.addEventListener('mouseup', () => clearInterval(timerId));
                        }}
                      >
                        下
                      </button>
                      <div>
                        <div>视场变倍</div>
                        <div className="number-control">
                          <div
                            className="number-left"
                            onMouseDown={() => {
                              const timerId = setInterval(() => {
                                setValueView((item) => item - 1);
                                console.log('RenderComponent -> ValueView:', ValueView);
                                sendMqttControl('view-', 'monitor');
                              }, 80); // 每200毫秒调用一次increaseCount函数
                              document.addEventListener('mouseup', () => clearInterval(timerId));
                            }}
                            // onClick={() => {
                            //   const value = ValueView - 1;
                            //   setValueView(value);
                            //   console.log('RenderComponent -> ValueView:', ValueView);
                            //   sendMqttControl('view', 'monitor');
                            // }}
                          />
                          <input
                            type="number"
                            value={ValueView}
                            name="number"
                            className="number-quantity"
                          />
                          <div
                            className="number-right"
                            onMouseDown={() => {
                              const timerId = setInterval(() => {
                                setValueView((item) => item + 1);
                                console.log('RenderComponent -> ValueView:', ValueView);
                                sendMqttControl('view+', 'monitor');
                              }, 80); // 每200毫秒调用一次increaseCount函数
                              document.addEventListener('mouseup', () => clearInterval(timerId));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="down">
                      <button
                        className="card3"
                        onMouseDown={() => {
                          const timerId = setInterval(() => {
                            sendMqttControl('left', 'monitor');
                          }, 80); // 每200毫秒调用一次increaseCount函数
                          document.addEventListener('mouseup', () => clearInterval(timerId));
                        }}
                      >
                        左
                      </button>
                      <button
                        className="card4"
                        onMouseDown={() => {
                          const timerId = setInterval(() => {
                            sendMqttControl('right', 'monitor');
                          }, 80); // 每200毫秒调用一次increaseCount函数
                          document.addEventListener('mouseup', () => clearInterval(timerId));
                        }}
                      >
                        右
                      </button>
                      <div>
                        <div>焦距设置</div>
                        <div className="number-control">
                          <div
                            className="number-left"
                            onMouseDown={() => {
                              const timerId = setInterval(() => {
                                console.log('timerId -> ValueFocus:', ValueFocus);
                                setValueFocus((item) => item - 1);
                                sendMqttControl('focus-', 'monitor');
                              }, 80); // 每200毫秒调用一次increaseCount函数
                              document.addEventListener('mouseup', () => clearInterval(timerId));
                            }}
                            // onClick={() => {
                            //   const value = ValueFocus - 1;
                            //   setValueFocus(value);

                            //   sendMqttControl('focus-', 'monitor');
                            // }}
                          />
                          <input
                            type="number"
                            name="number"
                            value={ValueFocus}
                            className="number-quantity"
                          />
                          <div
                            className="number-right"
                            onMouseDown={() => {
                              const timerId = setInterval(() => {
                                console.log('timerId -> ValueFocus:', ValueFocus);
                                setValueFocus((item) => item + 1);
                                sendMqttControl('focus+', 'monitor');
                              }, 80); // 每200毫秒调用一次increaseCount函数
                              document.addEventListener('mouseup', () => clearInterval(timerId));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        );
    }
  };
  return <>{RenderComponent(props.component)}</>;
};

export default CenterTab;
