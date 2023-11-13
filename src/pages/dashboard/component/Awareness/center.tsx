/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-13 11:33:07
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\center.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Col, Popconfirm, Row, Select, Switch, Tabs, message } from 'antd';
import Title from '../common/Title';
import AwarenessButton from './component/button';
import React, { useEffect, useRef, useState } from 'react';
import styles from './center.less';
import { ControlOutlined } from '@ant-design/icons';
import * as mqtt from 'mqtt';
import { queryFly } from '@/pages/drone/routePlan/service';
import type { ListUavFlyReqType } from '@/pages/drone/routePlan/data';
import { useDispatch } from 'umi';

type DroneData = {
  lat: number;
  lon: number;
  height: number;
  pitch: number;
  trajectory: number;
  rollAngle: number;
  relHeight: number;
  targetHeight: number;
  flyTime: number;
  flyDistance: number;
  speed: number;
  gpsSpeed: number;
};

type HangarData = {
  batteryV: number;
  batteryTemp: number;
  warehouseStatus: number;
  batteryStatus: number;
  homingStatus: number;
  uavPowerStatus: number;
};

type MonitorData = {
  lat: number;
  lon: number;
  targetHeight: number;
  tfUsage: number;
  tfTotal: number;
};
type DashboardinfoType = {
  monitor: MonitorData;
  hangar: HangarData;
  drone: DroneData;
};

const AnalysisCenter: React.FC = (props) => {
  const def: any = '';
  const client = useRef(def);
  const [dashboardinfo, setdashboardinfo] = useState<DashboardinfoType>({
    monitor: {
      lat: 0,
      lon: 0,
      targetHeight: 0,
      tfUsage: 0,
      tfTotal: 0,
    },
    hangar: {
      batteryV: 0,
      batteryTemp: 0,
      warehouseStatus: 0,
      batteryStatus: 0,
      homingStatus: 0,
      uavPowerStatus: 0,
    },
    drone: {
      lat: 0,
      lon: 0,
      height: 0,
      pitch: 0,
      trajectory: 0,
      rollAngle: 0,
      relHeight: 0,
      targetHeight: 0,
      flyTime: 0,
      flyDistance: 0,
      speed: 0,
      gpsSpeed: 0,
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
  // @ts-ignore
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index: number) => {
    setActiveIndex(1);
    setTimeout(() => {
      setActiveIndex(2);
    }, 2000);
  };
  /**
   *  @file center.tsx
   *  @time 2023/10/24
   * @category :tab
   * @function :
   */
  //#region -------------------------------------------------------------------------

  const [activeTab, setActiveTab] = useState('drone');
  const [Collapase, setCollapase] = useState(false);

  /**
   *  @file center.tsx
   *  @time 2023/11/02
   * @category :面板的按钮和数据加载
   * @function :
   */
  //#region -------------------------------------------------------------------------

  // 面板信息加载
  const droneInfoList = [
    {
      key: `水平速度`,
      unit: 'm/s',
    },
    {
      key: `垂直速度`,
      unit: 'm/s',
    },
    {
      key: `目标高度`,
      unit: 'km',
    },
    {
      key: `飞行时间`,
      unit: 'km',
    },
    {
      key: `飞行高度`,
      unit: 'km',
    },
  ];
  const droneStateList = [
    {
      key: `经度`,
      unit: '°',
    },
    {
      key: `维度`,
      unit: '°',
    },
    {
      key: `高度`,
      unit: 'km',
    },
    {
      key: `俯仰角`,
      unit: '°',
    },
    {
      key: `滚转角`,
      unit: '°',
    },
    {
      key: `航向`,
      unit: '°',
    },
  ];
  const hangarInfoList1 = [
    {
      key: `电池电压`,
      unit: 'V',
    },
    {
      key: `电池温度`,
      unit: '°C',
    },
    {
      key: `电池状态`,
      unit: '充电中',
    },
  ];
  const hangarInfoList2 = [
    {
      key: `舱盖状态`,
      unit: 'km',
    },
    {
      key: `归位机构状态`,
      unit: 'km',
    },
  ];
  const monitorList = [
    {
      key: `经度`,
      unit: '°',
    },
    {
      key: `维度`,
      unit: '°',
    },
    {
      key: `高度`,
      unit: 'km',
    },
  ];
  const monitorTFList = [
    {
      key: `TF总容量`,
      unit: '°',
    },
    {
      key: `使用容量`,
      unit: '°',
    },
    {
      key: `数据保存状态`,
      unit: 'km',
    },
    {
      key: `摄像头工作状态`,
      unit: '°',
    },
  ];
  // 面板控制加载
  const droneButtonList = [
    {
      key: `check`,
      button: '自检',
      over: '自检成功',
    },
    {
      key: `unlock`,
      button: '解锁',
      over: '成功',
    },
    {
      key: `takeoff`,
      button: '起飞',
      over: '成功',
    },
    {
      key: `return`,
      button: '回家降落',
      over: '成功',
    },
    {
      key: `lock`,
      button: '加锁',
      over: '加锁成功',
    },
  ];
  const monitorButtonList1 = [
    {
      key: `tracking`,
      button: '跟踪',
      over: '成功',
    },
    {
      key: `positioning`,
      button: '激光定位',
      over: '成功',
    },
    {
      key: `downward`,
      button: '下视',
      over: '成功',
    },
    {
      key: `centering`,
      button: '归中',
      over: '归中',
    },
    {
      key: `scanning`,
      button: '扫描',
      over: '成功',
    },
  ];
  const monitorButtonList2 = [
    {
      key: `photo`,
      button: '拍照',
      over: '成功',
    },
    {
      key: `video`,
      button: '录像 ',
      over: '成功',
    },
  ];
  const RenderList = (params: any[]) =>
    params?.map((item: any) => (
      <Row key={item.key}>
        <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
          {item.key}
        </Col>
        <Col span={12} style={{ color: 'white' }}>
          {item.unit} <b></b>
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
  const [popconfirm, setpopconfirm] = useState(false);

  const RenderButtonList = (params: any[], type: string) =>
    params?.map((item: any) => (
      <Row key={item.key}>
        <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
          {item.button}
        </Col>
        <Col
          span={12}
          style={{ color: 'white' }}
          // onClick={() => {
          //   sendMqttControl(item.key, type);
          // }}
        >
          <Popconfirm
            title={'是否执行' + item.button}
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

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
  const [ValueView, setValueView] = useState(1);
  const [ValueFocus, setValueFocus] = useState(1);
  const [roadList, setroadList] = useState([{ value: 'demo', label: 'demo' }]);
  const [currentRoad, setcurrentRoad] = useState([]);

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
    dispatch({
      type: 'dashboardModel/saveCurrentFlyingRoad',
      payload: currentRoad,
    });
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
                <Col span={5}>{RenderList(droneInfoList)}</Col>
                {/*  */}
                <Col span={5}>{RenderList(droneStateList)}</Col>
                {/*  */}
                <Col span={5}>{RenderButtonList(droneButtonList, 'drone')}</Col>
                <Col span={8} offset={1}>
                  <Row style={{ padding: '8px' }}>
                    <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                      控制模式
                    </Col>
                    <Col span={12} style={{ color: 'turquoise' }}>
                      <Switch
                        checkedChildren="程控"
                        unCheckedChildren="手控"
                        defaultChecked
                        onClick={() => {
                          sendMqttControl('mode', 'drone');
                        }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ padding: '8px' }}>
                    <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                      防撞灯
                    </Col>
                    <Col span={12} style={{ color: 'turquoise' }}>
                      <Switch
                        checkedChildren="防撞灯开"
                        unCheckedChildren="防撞灯关"
                        defaultChecked
                        onClick={() => {
                          sendMqttControl('light', 'drone');
                        }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ padding: '8px' }}>
                    <Col span={8}>
                      <Select defaultValue="default" onChange={handleChange} options={roadList} />
                    </Col>
                    <Col span={9} offset={1}>
                      <div className={styles.circleLoad}>
                        <div> 圈数</div>
                        <input
                          type="number"
                          // value={ValueView}
                          name="number"
                          className="number-quantity"
                        />
                      </div>
                    </Col>
                    <Col
                      span={6}
                      style={{ color: 'white' }}
                      onClick={() => {
                        loadCurrentRoad();
                      }}
                    >
                      {/* @ts-ignore */}
                      <AwarenessButton name={'加载'} over={'成功'} />
                    </Col>
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
                <Col span={5}>{RenderList(hangarInfoList1)}</Col>
                {/*  */}
                <Col span={5}>{RenderList(hangarInfoList2)}</Col>
                {/*  */}
                <Col span={5}>
                  <Row style={{ padding: '8px' }}>
                    <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                      舱盖
                    </Col>
                    <Col span={12} style={{ color: 'turquoise' }}>
                      <Switch
                        checkedChildren="舱盖开"
                        unCheckedChildren="舱盖关"
                        defaultChecked
                        onClick={() => {
                          sendMqttControl('hatch', 'hangar');
                        }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ padding: '8px' }}>
                    <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                      充电装置
                    </Col>
                    <Col span={12} style={{ color: 'turquoise' }}>
                      <Switch
                        checkedChildren="连接"
                        unCheckedChildren="断开"
                        defaultChecked
                        onClick={() => {
                          sendMqttControl('charging', 'hangar');
                        }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ padding: '8px' }}>
                    <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                      归位机构
                    </Col>
                    <Col span={12} style={{ color: 'turquoise' }}>
                      <Switch
                        checkedChildren="锁定"
                        unCheckedChildren="解锁"
                        defaultChecked
                        onClick={() => {
                          sendMqttControl('mechanism', 'hangar');
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={8} offset={1}></Col>
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
                <Col span={5}>{RenderList(monitorList)}</Col>
                {/*  */}
                <Col span={5}>
                  {RenderList(monitorTFList)}
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

  const onTabChange = (key: string) => {
    setActiveTab(key);
    console.log(key);
  };
  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
  return (
    <div className={Collapase ? styles.contentCollapse : styles.content}>
      <div className={Collapase ? styles.collapaseButtonClose : styles.collapaseButton}>
        <Button
          type="text"
          icon={<ControlOutlined />}
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
            // @ts-ignore
            items={[
              {
                label: `无人机`,
                key: 'drone',
                children: RenderComponent(activeTab),
              },
              {
                label: `飞机库`,
                key: 'hangar',
                children: RenderComponent(activeTab),
              },
              {
                label: `摄像头`,
                key: 'monitor',
                children: RenderComponent(activeTab),
              },
            ]}
          />
        )}
      </div>
      {/*  */}
      {/*  */}
    </div>
  );
};

export default AnalysisCenter;
