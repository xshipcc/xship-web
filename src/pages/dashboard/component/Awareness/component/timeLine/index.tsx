//@ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-18 15:51:21
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-25 16:02:28
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\component\timeLine\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import styles from './index.less';
import { useSelector, useDispatch } from 'umi';
import { Button, Col, Row, message, Slider } from 'antd';
import { useState } from 'react';
const LineChart = (props: any) => {
  const client = props.client;
  const currentFlyingid = useSelector((state: any) => state.dashboardModel.currentFlyingid);
  const position = useSelector((state: any) => state.dashboardModel.position);
  console.log('LineChart -> position:', position);
  const [process, setprocess] = useState(10);
  const [drag, setdrag] = useState(true);

  useEffect(() => {
    setprocess(position * 100);
    console.log('useEffect -> position111111111:', position);
    // console.log('LineChart -> currentHistoryData:', currentHistoryData);
  }, [position]);

  useEffect(() => {
    if (currentFlyingid != -1) {
      setdrag(false);
    } else {
      setdrag(true);
    }
  }, [currentFlyingid]);
  const sendMqttControl = (param: any, type: string, data: any) => {
    let controlInfo = {
      cmd: 'default',
      data: 'on',
    };

    controlInfo = {
      cmd: type + '/' + param,
      data: data,
    };

    console.log('sendMqttControl -> controlInfo:', controlInfo);
    console.log('sendMqttControl -> controlInfo:', JSON.stringify(controlInfo));
    client.current.publish('control', JSON.stringify(controlInfo));
  };

  const onChange = (value: number | number[]) => {
    sendMqttControl('seek', 'player', value);
    // setprocess(value);
    // message.success('进度' + value);
  };
  // useEffect(() => {
  //   setInterval(function () {
  //     setprocess((item) => {
  //       return item + 1;
  //     });
  //   }, 1000);
  // }, []);
  return <Slider step={0.5} value={process} onChange={onChange} disabled={false} />;
};
export default LineChart;
