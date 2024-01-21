/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-21 11:19:34
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\right.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Col, Row, Select, Slider } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './right.less';
import AlertList from '@/pages/dashboard/component/AlertList/alert';
import HistoryList from '@/pages/dashboard/component/AlertList/history';
import Title from '../common/Title';
import TimeLine from './component/timeLine';
import { FastForwardOutlined, SwapOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'umi';
import * as mqtt from 'mqtt';

const AwarenessRight: React.FC = () => {
  const def: any = '';
  const client = useRef(def);
  /**
   *  @file right.tsx
   *  @time 2023/09/19
   * @category :
   * @function :
   */
  //#region -------------------------------------------------------------------------

  // const [showDetail, setShowDetail] = useState<boolean>(false);
  const dispatch = useDispatch();
  const showDetail = useSelector((state: any) => state.dashboardModel.showDetail);

  const sendMqttControl = (param: any, type: string, data: any) => {
    console.log('sendMqttControl -> data:', data);
    const controlInfo = {
      cmd: type + '/' + param,
      data: data,
    };

    console.log('sendMqttControl -> controlInfo:', controlInfo);
    console.log('sendMqttControl -> controlInfo:', JSON.stringify(controlInfo));
    client.current.publish('control', JSON.stringify(controlInfo));
  };
  /**
   *切换列表
   *false为告警  true为巡检
   */
  const handleClick = () => {
    // setShowDetail(!showDetail);
    console.log('showDetail:', showDetail);
    sendMqttControl('stop', 'player', 'on');
    dispatch({
      type: 'dashboardModel/changecurrentFlyingid',
      payload: -1,
    });
    dispatch({
      type: 'dashboardModel/changeDestoryTackSignal',
      payload: [true],
    });
    dispatch({
      type: 'dashboardModel/changeshowDetail',
      payload: !showDetail,
    });
  };

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
  const ChangeComponent = async (params = {}) => {
    console.log('request={ -> params:', params);
  };

  const onChangeSelector = (value: string) => {
    console.log('onChangeSelector -> value:', value);
  };

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
    // const mqttUrl = 'ws://' + '192.168.2.213' + ':' + MQTT_PORT;
    const mqttUrl = 'ws://' + extractedUrl + ':' + MQTT_PORT;

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
    mqttSub({ topic: 'control', qos: 0 });

    return () => {
      if (client.current) client.current.end();
    };
  }, []);
  const [pause, setpause] = useState(true);
  const [playsignal, setplaysignal] = useState(false);
  const [speed, setspeed] = useState(1);
  const [showButton, setshowButton] = useState(false);
  const currentFlyingid = useSelector((state: any) => state.dashboardModel.currentFlyingid);
  console.log('ChangeComponent -> currentFlyingid:', currentFlyingid);
  const onChange = (value: number | number[]) => {
    console.log('onChange: ', value);
  };
  useEffect(() => {
    if (currentFlyingid != -1) {
      console.log('useEffect -> currentFlyingid:', currentFlyingid);
      dispatch({
        type: 'dashboardModel/changeshowDetail',
        payload: true,
      });
      setshowButton(true);
    } else {
      setshowButton(false);
    }
  }, [currentFlyingid]);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.top}>
          <Title title={'当前航线进度'} />
          <Row className={styles.timeLine}>
            <Col span={24}>
              <div className={styles.slider}>
                <TimeLine client={client} />
                {/* <Slider range step={1} defaultValue={[0, 0]} onChange={onChange} /> */}
              </div>
              {showButton ? (
                <Row className={styles.playButton}>
                  <Col span={8}>
                    <Button
                      type="text"
                      onClick={() => {
                        ChangeComponent('Awareness');
                        if (playsignal) {
                          setpause(!pause);
                          sendMqttControl('pause', 'player', pause ? 'on' : 'off');
                        } else {
                          setplaysignal(true);
                          sendMqttControl('play', 'player', currentFlyingid);
                        }
                      }}
                    >
                      {playsignal ? (pause ? '暂停' : '继续') : '播放'}
                    </Button>
                  </Col>
                  {/* <Col span={8}>
                    <Button
                      type="text"
                      onClick={() => {
                        ChangeComponent('Awareness');
                        setpause(!pause);
                        sendMqttControl('pause', 'player', pause ? 'on' : 'off');
                      }}
                    >
                      {pause ? '暂停' : '继续'}
                    </Button>
                  </Col> */}
                  <Col span={8}>
                    <Button
                      type="text"
                      onClick={() => {
                        ChangeComponent('Awareness');
                        // @ts-ignore
                        sendMqttControl('stop', 'player', 'on');
                        dispatch({
                          type: 'dashboardModel/changeshowDetail',
                          payload: false,
                        });
                      }}
                    >
                      结束
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button
                      type="text"
                      onClick={() => {
                        ChangeComponent('Awareness');
                        setspeed((item) => {
                          // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-param-reassign
                          item === 1 ? (item = 2) : item === 2 ? (item = 4) : (item = 1);
                          return item;
                        });
                        sendMqttControl('speed', 'player', speed);
                      }}
                    >
                      <FastForwardOutlined rev={undefined} />
                      {speed === 1 ? 'x1' : speed === 2 ? 'x2' : 'x4'}
                    </Button>
                  </Col>
                </Row>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </div>
        {/*  */}
        <div className={styles.middle}>
          <Title title={showDetail ? '巡检历史' : '告警详情'} />
          <div
            className={styles.tabChange}
            onClick={() => {
              handleClick();
            }}
          >
            <SwapOutlined rev={undefined} />
            切换
          </div>
          {showDetail ? <HistoryList /> : <AlertList />}
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default AwarenessRight;
