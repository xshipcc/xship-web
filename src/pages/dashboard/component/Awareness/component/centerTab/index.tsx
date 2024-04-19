/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-04-10 12:06:34
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\component\centerTab\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Popconfirm, Row, Select, message } from 'antd';
import styles from './index.less';

import React, { useEffect, useState } from 'react';

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
import { useDispatch, useSelector } from 'umi';
import Dialog from '../dialog';
import AwarenessButton from '../button';
import { queryHistory } from '@/pages/drone/history/service';

const CenterTab: React.FC = (props: any) => {
  const client = props.client;
  let timerId: any = {};

  const [ValueView, setValueView] = useState(1);
  const [circleValue, setcircleValue] = useState(1);
  const [ValueFocus, setValueFocus] = useState(1);
  const [roadList, setroadList] = useState([{ value: 'demo', label: 'demo' }]);
  const [currentRoad, setcurrentRoad] = useState<any>([]);
  const dashboardinfoMqtt = useSelector((state: any) => state.dashboardModel.dashboardinfoMqtt);

  useEffect(() => {
    console.log('dashboardinfoMqtt111111111:', dashboardinfoMqtt);

    return () => {};
  }, [dashboardinfoMqtt]);
  const Info = (type: any, key: any) => {
    console.log('dashboardinfoMqtt:', dashboardinfoMqtt);

    console.log('dashboardinfoMqtt:', dashboardinfoMqtt[type][key]);

    switch (key) {
      case 'hatch':
        console.log('dashboardinfoMqtt1111:', dashboardinfoMqtt[type][key]);
        return dashboardinfoMqtt[type][key] === 0
          ? '舱盖关闭'
          : dashboardinfoMqtt[type][key] === 1
          ? '正在打开'
          : '已打开';
      case 'homing':
        console.log('dashboardinfoMqtt1111:', dashboardinfoMqtt[type][key]);
        return dashboardinfoMqtt[type][key] === 0
          ? '锁定'
          : dashboardinfoMqtt[type][key] === 1
          ? '正在锁定'
          : dashboardinfoMqtt[type][key] === 2
          ? '打开'
          : '正在打开';
      case 'charge':
        console.log('dashboardinfoMqtt1111:', dashboardinfoMqtt[type][key]);
        return dashboardinfoMqtt[type][key] === 0 ? '电源断开 ' : '电源打开';
      case 'uavpower_status':
        console.log('dashboardinfoMqtt1111:', dashboardinfoMqtt[type][key]);
        return dashboardinfoMqtt[type][key] === 0 ? '无人机下电' : '无人机上电';
      case 'lon':
        return dashboardinfoMqtt[type][key].toFixed(7);
      case 'lat':
        return dashboardinfoMqtt[type][key].toFixed(7);
      case 'height':
        return dashboardinfoMqtt[type][key].toFixed(2);
      default:
        return dashboardinfoMqtt[type][key];
    }
  };
  const RenderList = (params: any[], type: string) =>
    params?.map((item: any) => (
      <Row key={item.value}>
        <Col span={12} className={styles.listInfo}>
          {item.value}
        </Col>
        <Col span={12} className={styles.listInfo2}>
          {/* {dashboardinfoMqtt.data[item.key]} */}
          {Info(type, item.key)}
          {item.unit}
        </Col>
      </Row>
    ));
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
    fetchFlyData({ pageSize: 100, current: 1 });
  }, []);

  const handleChange = (params: string) => {
    setcurrentRoad(JSON.parse(params));
    console.log('handleChange -> JSON.parse(params):', JSON.parse(params));
    console.log(`handleChange ${params}`);
  };
  const dispatch = useDispatch();

  const loadCurrentRoad = () => {
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
    // coord.lon + 0.0063375,
    // coord.lat +  0.00077765,
    const currentRoadoffset = currentRoad.map((item: any) => {
      // item.coord[0] = item.coord[0] + 0.0063375;
      // item.coord[1] = item.coord[1] + 0.00077765;
      return item;
    });
    console.log('currentRoadoffset -> 偏移对比mq:', currentRoadoffset);

    dispatch({
      type: 'dashboardModel/saveCurrentFlyingRoad',
      payload: currentRoadoffset,
    });

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
  const [reqParams, setreqParams] = useState({
    platform: 0,
    confirm: 0,
    create_time: '',
    end_time: '',
    uav_id: 0,
    operator: '',
  });

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
  const editPointSignal = useSelector((state: any) => state.dashboardModel.editPointSignal);
  const isModalOpen = useSelector((state: any) => state.dashboardModel.isModalOpen);
  const [isModalOpenCache, setisModalOpenCache] = useState(isModalOpen);

  const showModal = () => {
    // 开始编辑 坐标点
    dispatch({
      type: 'dashboardModel/changeEditPointSignal',
      payload: '1',
    });
  };
  // 定点设置完成,同时编辑信号为真
  useEffect(() => {
    console.log('editPointSignal:', editPointSignal);

    // 编辑结束
    if (editPointSignal == '2') {
      setisModalOpenCache(true);
      console.log('isModalOpenCache:', isModalOpenCache);
      dispatch({
        type: 'dashboardModel/changeEditPointSignal',
        payload: '0',
      });
      dispatch({
        type: 'dashboardModel/changeisModalOpen',
        payload: true,
      });
      // dispatch({
      //   type: 'dashboardModel/changeEditPointSignal',
      //   payload: '0',
      // });
    }
  }, [editPointSignal]);

  const sendMqttControl = (param: any, type: string) => {
    let controlInfo = {
      cmd: 'default',
      data: 'on',
    };

    if (props?.dashboardState[type][param]) {
      console.log('sendMqttControl -> props?.dashboardState:', props?.dashboardState);
      console.log(
        'sendMqttControl ->  props?.dashboardState[type][param]:',
        props?.dashboardState[type][param].data,
      );
      controlInfo = {
        cmd: type + '/' + param,
        data: props?.dashboardState[type][param].data,
      };
    } else {
      controlInfo = {
        cmd: type + '/' + param,
        data: 'on',
      };
    }
    if (param === 'mode') {
      console.log('sendMqttControlmode -> props?.dashboardState:', props?.dashboardState);
      console.log(
        'sendMqttControl ->  props?.dashboardState[type][param]:',
        props?.dashboardState[type][param],
      );
      controlInfo = {
        cmd: type + '/' + param,
        data: props?.dashboardState[type][param].data !== 'on' ? 'manual' : 'automatic',
      };
      console.log('sendMqttControl -> controlInfo:', controlInfo);
    }
    if (param === 'hatch1' || param === 'hatch2') {
      console.log('sendMqttControlmode -> props?.dashboardState:', props?.dashboardState);
      console.log(
        'sendMqttControl ->  props?.dashboardState[type][param]:',
        props?.dashboardState[type][param],
      );
      controlInfo = {
        cmd: type + '/' + 'hatch',
        data: param === 'hatch1' ? 'on' : 'off',
      };
      console.log('sendMqttControl -> controlInfo:', controlInfo);
    }
    if (param === 'mechanism1' || param === 'mechanism2') {
      console.log('sendMqttControlmode -> props?.dashboardState:', props?.dashboardState);
      console.log(
        'sendMqttControl ->  props?.dashboardState[type][param]:',
        props?.dashboardState[type][param],
      );
      controlInfo = {
        cmd: type + '/' + 'mechanism',
        data: param === 'mechanism1' ? 'off' : 'on',
      };
    }
    // if (param === 'light') {
    //   console.log('sendMqttControl -> props?.dashboardState:', props?.dashboardState);
    //   console.log(
    //     'sendMqttControl ->  props?.dashboardState[type][param]:',
    //     props?.dashboardState[type][param],
    //   );
    //   controlInfo = {
    //     cmd: type + '/' + param,
    //     data: props?.dashboardState[type][param] === 'on' ? 'manual' : 'automatic',
    //   };
    // }
    console.log('sendMqttControl -> controlInfo:', controlInfo);
    console.log('sendMqttControl -> controlInfo:', JSON.stringify(controlInfo));
    client.current.publish('control', JSON.stringify(controlInfo));
  };

  // useEffect(() => {

  //   sendMqttControl('pause', 'player');
  // }, []);

  const RenderButtonList = (params: any[], type: string) =>
    params?.map((item: any) => (
      <Row key={item.key}>
        <Col span={12} className={styles.listInfo}>
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
              sendMqttControl(item.key, type);
            }}
            onCancel={() => {
              message.error('取消');
            }}
            okText="确认"
            cancelText="取消"
          >
            {/* user-select: none;
  pointer-events: none; */}
            <a
              className={
                props?.dashboardState.drone.check.data === 'on' &&
                item.key != 'check' &&
                type === 'drone'
                  ? styles.buttonDisable
                  : styles.button
              }
            >
              {props?.dashboardState[type][item.key] ? (
                <AwarenessButton
                  // @ts-ignore
                  name={
                    props?.dashboardState[type][item.key].data === 'on' ? item.button : item.over
                  }
                  over={item.over}
                  url={'/demo'}
                  disable={
                    props?.dashboardState.drone.check.data === 'on' &&
                    item.key != 'check' &&
                    type === 'drone'
                      ? true
                      : false
                  }
                />
              ) : (
                // @ts-ignore
                <AwarenessButton name={item.button} over={item.over} url={'/demo'} />
              )}
            </a>
          </Popconfirm>
        </Col>
      </Row>
    ));
  //         ('warehouse_status', ctypes.c_ubyte),#舱盖状态 0舱盖关闭 1正在打开 2已打开
  //         ('homing_status', ctypes.c_ubyte),#归位机构状态 0锁定 1正在锁定 2打开 3正在打开
  //         ('battery_status', ctypes.c_ubyte),#充电机状态  0电源断开 1电源打开
  //         ('uavpower_status', ctypes.c_float),#无人机电源状态 0无人机下电 1无人机上电

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
                      // className={
                      //   props?.dashboardState.drone.planid.data != -1
                      //     ? styles.buttonDisable
                      //     : styles.button
                      // }
                      span={8}
                      offset={4}
                      onClick={() => {
                        loadCurrentRoad();
                      }}
                    >
                      {/* @ts-ignore */}
                      <AwarenessButton
                        // disable={props?.dashboardState.drone.planid.data != -1 ? true : false}
                        name={'加载航线'}
                        over={'成功'}
                      />
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
                            setcircleValue(parseFloat(event.target.value));
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
                        <a
                          className={
                            props?.dashboardState.drone.check.data === 'on'
                              ? styles.buttonDisable
                              : styles.button
                          }
                        >
                          {/* @ts-ignore */}
                          <AwarenessButton
                            disable={props?.dashboardState.drone.check.data === 'on' ? true : false}
                            name={'加载圈数'}
                            over={'成功'}
                          />
                        </a>
                      </Popconfirm>
                    </Col>
                  </Row>
                  {/*  */}
                  <Row>
                    <Col span={12} className={styles.listInfo}>
                      定点悬停
                    </Col>
                    <Col span={12} style={{ color: 'turquoise' }}>
                      {isModalOpen ? <Dialog client={client.current} /> : <></>}
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
                        <a
                          className={
                            props?.dashboardState.drone.check.data === 'on'
                              ? styles.buttonDisable
                              : styles.button
                          }
                        >
                          {/* @ts-ignore */}
                          <AwarenessButton
                            disable={props?.dashboardState.drone.check.data === 'on' ? true : false}
                            name={'定点悬停'}
                            over={'over'}
                            url={'/demo'}
                          />
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
                <Col span={5}>
                  {RenderButtonList(hangarButtonList1, 'hangar')}

                  <Row>
                    <Col span={12} className={styles.listInfo}>
                      归位机构
                    </Col>
                    <Col span={6} style={{ color: 'turquoise' }}>
                      {isModalOpen ? <Dialog client={client.current} /> : <></>}
                      {/*  */}
                      <Popconfirm
                        title={'是否执行'}
                        onConfirm={() => {
                          // 解锁
                          sendMqttControl('mechanism1', 'hangar');
                        }}
                        onCancel={() => {
                          message.error('取消');
                        }}
                        okText="确认"
                        cancelText="取消"
                      >
                        <a
                        // className={
                        //   props?.dashboardState.drone.check.data === 'on'
                        //     ? styles.buttonDisable
                        //     : styles.button
                        // }
                        >
                          {/* @ts-ignore */}
                          <AwarenessButton
                            // disable={props?.dashboardState.drone.check.data === 'on' ? true : false}
                            name={'解锁'}
                            over={'over'}
                            url={'/demo'}
                          />
                        </a>
                      </Popconfirm>
                    </Col>
                    <Col span={6} style={{ color: 'turquoise' }}>
                      {isModalOpen ? <Dialog client={client.current} /> : <></>}
                      {/*  */}
                      <Popconfirm
                        title={'是否执行'}
                        onConfirm={() => {
                          sendMqttControl('mechanism2', 'hangar');
                        }}
                        onCancel={() => {
                          message.error('取消');
                        }}
                        okText="确认"
                        cancelText="取消"
                      >
                        <a
                        // className={
                        //   props?.dashboardState.drone.check.data === 'on'
                        //     ? styles.buttonDisable
                        //     : styles.button
                        // }
                        >
                          {/* @ts-ignore */}
                          <AwarenessButton
                            // disable={props?.dashboardState.drone.check.data === 'on' ? true : false}
                            name={'锁定'}
                            over={'over'}
                            url={'/demo'}
                          />
                        </a>
                      </Popconfirm>
                    </Col>
                    {/*  */}
                  </Row>
                  <Row>
                    <Col span={12} className={styles.listInfo}>
                      舱盖控制
                    </Col>
                    <Col span={6} style={{ color: 'turquoise' }}>
                      {isModalOpen ? <Dialog client={client.current} /> : <></>}
                      {/*  */}
                      <Popconfirm
                        title={'是否执行'}
                        onConfirm={() => {
                          sendMqttControl('hatch1', 'hangar');
                        }}
                        onCancel={() => {
                          message.error('取消');
                        }}
                        okText="确认"
                        cancelText="取消"
                      >
                        <a
                        // className={
                        //   props?.dashboardState.drone.check.data === 'on'
                        //     ? styles.buttonDisable
                        //     : styles.button
                        // }
                        >
                          {/* @ts-ignore */}
                          <AwarenessButton
                            // disable={props?.dashboardState.drone.check.data === 'on' ? true : false}
                            name={'舱盖开'}
                            over={'over'}
                            url={'/demo'}
                          />
                        </a>
                      </Popconfirm>
                    </Col>
                    <Col span={6} style={{ color: 'turquoise' }}>
                      {isModalOpen ? <Dialog client={client.current} /> : <></>}
                      {/*  */}
                      <Popconfirm
                        title={'是否执行'}
                        onConfirm={() => {
                          sendMqttControl('hatch2', 'hangar');
                        }}
                        onCancel={() => {
                          message.error('取消');
                        }}
                        okText="确认"
                        cancelText="取消"
                      >
                        <a
                        // className={
                        //   props?.dashboardState.drone.check.data === 'on'
                        //     ? styles.buttonDisable
                        //     : styles.button
                        // }
                        >
                          {/* @ts-ignore */}
                          <AwarenessButton
                            // disable={props?.dashboardState.drone.check.data === 'on' ? true : false}
                            name={'舱盖关'}
                            over={'over'}
                            url={'/demo'}
                          />
                        </a>
                      </Popconfirm>
                    </Col>
                    {/*  */}
                  </Row>
                </Col>
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
                  {RenderButtonList(monitorButtonList2, 'monitor')}
                  <Row>
                    <Col span={12} className={styles.listInfo}>
                      视场变倍
                    </Col>
                    <Col span={12} style={{ color: 'white' }}>
                      <div className="number-control">
                        <div
                          className="number-left"
                          onMouseUp={() => {
                            sendMqttControl('stop', 'monitor');
                          }}
                          onMouseDown={() => {
                            timerId = setInterval(() => {
                              setValueView((item) => item - 1);
                              console.log('RenderComponent -> ValueView:', ValueView);
                              sendMqttControl('view-', 'monitor');
                            }, 350); // 每200毫秒调用一次increaseCount函数
                            document.addEventListener('mouseup', () => {
                              clearInterval(timerId);
                            });
                          }}
                          // onClick={() => {
                          //   const value = ValueView - 1;
                          //   setValueView(value);
                          //   console.log('RenderComponent -> ValueView:', ValueView);
                          //   sendMqttControl('view', 'monitor');
                          // }}
                        />
                        {/* <input
          type="number"
          value={ValueView}
          name="number"
          className="number-quantity"
        /> */}
                        <div
                          className="number-right"
                          onMouseUp={() => {
                            sendMqttControl('stop', 'monitor');
                          }}
                          onMouseDown={() => {
                            timerId = setInterval(() => {
                              setValueView((item) => item + 1);
                              console.log('RenderComponent -> ValueView:', ValueView);
                              sendMqttControl('view+', 'monitor');
                            }, 350); // 每200毫秒调用一次increaseCount函数
                            document.addEventListener('mouseup', () => {
                              clearInterval(timerId);
                            });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12} className={styles.listInfo}>
                      焦距设置
                    </Col>
                    <Col span={12} style={{ color: 'white' }}>
                      <div className="number-control">
                        <div
                          className="number-left"
                          onMouseUp={() => {
                            sendMqttControl('stop', 'monitor');
                          }}
                          onMouseDown={() => {
                            timerId = setInterval(() => {
                              console.log('timerId -> ValueFocus:', ValueFocus);
                              setValueFocus((item) => item - 1);
                              sendMqttControl('focus-', 'monitor');
                            }, 350); // 每200毫秒调用一次increaseCount函数
                            document.addEventListener('mouseup', () => {
                              clearInterval(timerId);
                            });
                          }}
                        />
                        <div
                          className="number-right"
                          onMouseUp={() => {
                            sendMqttControl('stop', 'monitor');
                          }}
                          onMouseDown={() => {
                            timerId = setInterval(() => {
                              console.log('timerId -> ValueFocus:', ValueFocus);
                              setValueFocus((item) => item + 1);
                              sendMqttControl('focus+', 'monitor');
                            }, 350); // 每200毫秒调用一次increaseCount函数
                            document.addEventListener('mouseup', () => {
                              clearInterval(timerId);
                            });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
                {/*  */}
                <Col span={5} offset={1}>
                  {RenderButtonList(monitorButtonList1, 'monitor')}
                </Col>
                <Col span={7} offset={1}>
                  <div className="control-wrapper">
                    <div
                      className="control-btn control-top"
                      onMouseUp={() => {
                        sendMqttControl('stop', 'monitor');
                      }}
                      onMouseDown={() => {
                        timerId = setInterval(() => {
                          sendMqttControl('up', 'monitor');
                        }, 350); // 每200毫秒调用一次increaseCount函数
                        document.addEventListener('mouseup', () => clearInterval(timerId));
                      }}
                      // onClick={() => {
                      //   sendMqttControl('up', 'monitor');
                      // }}
                    />
                    <div
                      className="control-btn control-bottom"
                      onMouseUp={() => {
                        sendMqttControl('stop', 'monitor');
                      }}
                      onMouseDown={() => {
                        timerId = setInterval(() => {
                          sendMqttControl('down', 'monitor');
                        }, 350); // 每200毫秒调用一次increaseCount函数
                        document.addEventListener('mouseup', () => clearInterval(timerId));
                      }}
                    />
                    <div
                      className="control-btn control-left"
                      onMouseUp={() => {
                        sendMqttControl('stop', 'monitor');
                      }}
                      onMouseDown={() => {
                        timerId = setInterval(() => {
                          sendMqttControl('left', 'monitor');
                        }, 350); // 每200毫秒调用一次increaseCount函数
                        document.addEventListener('mouseup', () => clearInterval(timerId));
                      }}
                    />
                    <div
                      className="control-btn control-right"
                      onMouseUp={() => {
                        sendMqttControl('stop', 'monitor');
                      }}
                      onMouseDown={() => {
                        timerId = setInterval(() => {
                          sendMqttControl('right', 'monitor');
                        }, 350); // 每200毫秒调用一次increaseCount函数
                        document.addEventListener('mouseup', () => clearInterval(timerId));
                      }}
                    />
                    {/* <div className="control-btn control-top"></div>
                    <div className="control-btn control-left"> </div>
                    <div className="control-btn control-bottom"></div>
                    <div className="control-btn control-right"></div> */}
                    <div className="control-round">
                      <div
                        className="control-round-inner"
                        onClick={() => {
                          message.success('归中');
                          sendMqttControl('centering', 'monitor');
                        }}
                      />
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
