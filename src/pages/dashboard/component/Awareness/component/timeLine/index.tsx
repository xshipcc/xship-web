//@ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-18 15:51:21
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-17 14:04:17
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\component\timeLine\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import styles from './index.less';
import { useSelector, useDispatch } from 'umi';
import { Button, Col, Row, Select, Slider } from 'antd';

const LineChart = (props: any) => {
  const client = props.client;
  const currentHistoryData = useSelector((state: any) => state.dashboardModel.currentHistoryData);

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
  };
  useEffect(() => {
    setInterval(function () {}, 1000);
  }, []);
  return <Slider range step={0.5} defaultValue={[0, 0]} onChange={onChange} />;
};
export default LineChart;
