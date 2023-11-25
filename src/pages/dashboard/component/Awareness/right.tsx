/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-25 17:08:12
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\right.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Col, Row, Select } from 'antd';
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

  /**
   *切换列表
   *false为告警  true为巡检
   */
  const handleClick = () => {
    // setShowDetail(!showDetail);
    console.log('showDetail:', showDetail);
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

  const def: any = '';
  const client = useRef(def);
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
  const [speed, setspeed] = useState(1);
  const currentFlyingid = useSelector((state: any) => state.dashboardModel.currentFlyingid);
  console.log('ChangeComponent -> currentFlyingid:', currentFlyingid);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.top}>
          <Title title={'当前航线进度'} />
          <Row className={styles.timeLine}>
            <Col span={24}>
              <TimeLine client={client} />
              {showDetail || currentFlyingid != -1 ? (
                <Row className={styles.playButton}>
                  <Col span={8}>
                    <Button
                      type="text"
                      onClick={() => {
                        ChangeComponent('Awareness');
                        // @ts-ignore
                        sendMqttControl('play', 'player', currentFlyingid.data);
                      }}
                    >
                      播放
                    </Button>
                  </Col>
                  <Col span={8}>
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
            <SwapOutlined />
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
