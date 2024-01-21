//@ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-18 15:51:21
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-21 12:16:08
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

const LineChart = (props: any) => {
  const client = props.client;
  const currentHistoryData = useSelector((state: any) => state.dashboardModel.currentHistoryData);
  console.log('LineChart -> currentHistoryData:', currentHistoryData);
  const showDetail = useSelector((state: any) => state.dashboardModel.showDetail);

  useEffect(() => {
    console.log('LineChart -> currentHistoryData:', currentHistoryData);
  }, [currentHistoryData]);

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
    // message.success('进度' + value);
  };
  useEffect(() => {
    setInterval(function () {}, 1000);
  }, []);
  return <Slider step={0.5} defaultValue={0} onChange={onChange} disabled={!showDetail} />;
};
export default LineChart;
