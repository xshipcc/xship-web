/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-02 11:28:01
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\center.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { DualAxes } from '@ant-design/plots';
import { Button, Col, Row, Select, Switch, Tabs } from 'antd';
import Title from '../common/Title';
import AwarenessButton from './component/button';
import React, { useEffect, useRef, useState } from 'react';
import styles from './center.less';
import type { DashboardInfoType } from '@/pages/dashboard/typings';
import { ControlOutlined } from '@ant-design/icons';
import * as mqtt from 'mqtt';

const AnalysisCenter: React.FC = (props) => {
  const def: any = '';
  const client = useRef(def);

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
  const handleChange = (params: string) => {
    console.log(`selected ${params}`);
  };

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
      key: `Check`,
      button: '自检',
      over: '自检成功',
    },
    {
      key: `Unlock`,
      button: '解锁',
      over: '成功',
    },
    {
      key: `Takeoff`,
      button: '起飞',
      over: '成功',
    },
    {
      key: `Return`,
      button: '回家降落',
      over: '成功',
    },
    {
      key: `Lock`,
      button: '加锁',
      over: '加锁成功',
    },
  ];
  const monitorButtonList1 = [
    {
      key: `跟踪`,
      button: '跟踪',
      over: '成功',
    },
    {
      key: `激光定位`,
      button: '激光定位',
      over: '成功',
    },
    {
      key: `下视`,
      button: '下视',
      over: '成功',
    },
    {
      key: `归中`,
      button: '归中',
      over: '归中',
    },
    {
      key: `扫描`,
      button: '扫描',
      over: '成功',
    },
  ];
  const monitorButtonList2 = [
    {
      key: `拍照`,
      button: '拍照',
      over: '成功',
    },
    {
      key: `录像`,
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
    const data = { data: 'on' };
    const controlInfo = {
      [type]: {
        [param]: { data },
      },
    };
    console.log('sendMqttControl -> controlInfo:', controlInfo);
    client.current.publish('control', JSON.stringify(controlInfo));
  };
  const RenderButtonList = (params: any[], type: string) =>
    params?.map((item: any) => (
      <Row key={item.key}>
        <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
          {item.key}
        </Col>
        <Col
          span={12}
          style={{ color: 'white' }}
          onClick={() => {
            sendMqttControl(item.key, type);
          }}
        >
          {/* @ts-ignore */}
          <AwarenessButton name={item.button} over={item.over} url={'/demo'} />
        </Col>
      </Row>
    ));

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
  const [ValueView, setValueView] = useState(1);
  const [ValueFocus, setValueFocus] = useState(1);

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
                          sendMqttControl('Mode', 'drone');
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
                          sendMqttControl('Light', 'drone');
                        }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ padding: '8px' }}>
                    <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                      航线加载
                    </Col>
                    <Col span={12}>
                      <Select
                        defaultValue="lucy"
                        onChange={handleChange}
                        options={[
                          { value: 'jack', label: 'Jack' },
                          { value: 'lucy', label: 'Lucy' },
                          { value: 'Yiminghe', label: 'yiminghe' },
                          { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                      />
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
                          sendMqttControl('Hatch', 'hangar');
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
                          sendMqttControl('Charging', 'hangar');
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
                          sendMqttControl('Mechanism', 'hangar');
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
                        onClick={() => {
                          sendMqttControl('Up', 'monitor');
                        }}
                      >
                        上
                      </button>
                      <button
                        className="card2"
                        onClick={() => {
                          sendMqttControl('Down', 'monitor');
                        }}
                      >
                        下
                      </button>
                      <div>
                        <div>视场变倍</div>
                        <div className="number-control">
                          <div
                            className="number-left"
                            onClick={() => {
                              const value = ValueView - 1;
                              setValueView(value);
                              console.log('RenderComponent -> ValueView:', ValueView);
                              sendMqttControl('View', 'monitor');
                            }}
                          />
                          <input
                            type="number"
                            value={ValueView}
                            name="number"
                            className="number-quantity"
                          />
                          <div
                            className="number-right"
                            onClick={() => {
                              const value = ValueView + 1;
                              setValueView(value);
                              console.log('RenderComponent -> ValueView:', ValueView);

                              sendMqttControl('View', 'monitor');
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="down">
                      <button
                        className="card3"
                        onClick={() => {
                          sendMqttControl('Left', 'monitor');
                        }}
                      >
                        左
                      </button>
                      <button
                        className="card4"
                        onClick={() => {
                          sendMqttControl('Right', 'monitor');
                        }}
                      >
                        右
                      </button>
                      <div>
                        <div>焦距设置</div>
                        <div className="number-control">
                          <div
                            className="number-left"
                            onClick={() => {
                              const value = ValueFocus - 1;
                              setValueFocus(value);

                              sendMqttControl('Focus', 'monitor');
                            }}
                          />
                          <input
                            type="number"
                            name="number"
                            value={ValueFocus}
                            className="number-quantity"
                          />
                          <div
                            className="number-right"
                            onClick={() => {
                              const value = ValueFocus + 1;
                              setValueFocus(value);
                              sendMqttControl('Focus', 'monitor');
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
