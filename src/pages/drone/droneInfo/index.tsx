import {
  PlusOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Divider, message, Drawer, Modal, Row, Col } from 'antd';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

import * as mqtt from 'mqtt';

const FlashPromotionList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [info, handleinfo] = useState<any>([]);
  const def: any = '';
  const client = useRef(def);
  const MeaningList = {
    head: '帧头1',
    head2: '帧头2',
    length: '数据长度',
    cmd: '命令',
    s_cmd: '子命令',
    temp: '温度',
    eng: '功耗',
    v: '电压',
    a: '电流',
    PWM1: 'PWM1',
    PWM2: 'PWM2',
    PWM3: 'PWM3',
    PWM4: 'PWM4',
    PWM5: 'PWM5',
    PWM6: 'PWM6',
    PWM7: 'PWM7',
    PWM8: 'PWM8',
    PWM9: 'PWM9',
    PWM10: 'PWM10',
    offset_staus: '差分状态',
    lat: '纬度',
    lon: '经度',
    height: 'GPS高度',
    rel_height: '相对原点高度x10',
    real_height: '实时距地高度x10',
    target_speed: '目标速度x100',
    speed: '地速x100',
    gps_speed: '组合导航向速度X100',
    trajectory: '轨迹角X10',
    pitch: '俯仰角X100',
    roll_angle: '横滚角角X100',
    fu_wing: '副翼',
    updown: '升降',
    speedup: '油门',
    toward: '方向',
    lock: '锁定',
    toward_angle: '机头指向角',
    fly_ctl: '飞行控制模式',
    staus: '状态',
    fly_status: '飞行阶段',
    gps_lost: 'GPS丢星时间',
    link_lost: '链路中断时间',
    area: '飞行区域',
    turns_done: '已飞行圈数',
    turns_todo: '等待飞行圈数',
    fly_distance: '飞行点距离',
    fly_time: '飞行时间',
    target_point: '目标航点',
    target_height: '目标高度',
    target_angle: '目标航向',
    stay_time: '悬停时间',
    flyctl_v: '飞控电压',
    engine_v: '动力电压',
    gps_stars: 'GPS星数',
    HDOP: '水平精度HDOP',
    VDOP: '垂直精度VDOP',
    SDOP: '速度精度SDOP',
    year: '年',
    month: '月',
    day: '日',
    hour: '时',
    min: '分',
    sec: '秒',
    flyctl_temp: '飞控温度',
    offset_dist: '侧偏距',
    channel_1: '通道1',
    channel_2: '通道2',
    channel_3: '通道3',
    channel_4: '通道4',
    channel_5: '通道5',
    channel_6: '通道6',
    height_cm: '高度厘米位',
    ms: '毫秒',
    cmd_back1: '指令返回值1',
    cmd_back2: '指令返回值2',
    crc: 'CRC校验值',
    end: '结束标志',
    aa: 'AA',
    bb: 'BB',
  };
  const getChineseMeaning = useCallback((key) => {
    return MeaningList[key];
  }, []);
  const extractKeysAndValues = useCallback((obj, prefix = '', meaningPrefix = '') => {
    const result: any = [];
    for (const key in obj) {
      const value = obj[key];
      const meaning = getChineseMeaning(key);
      // 将键、值和汉语意思添加到结果数组中
      result.push({ key: key, name: meaning, value: value });
      // 如果值是对象，则递归调用该函数
      if (typeof value === 'object' && !Array.isArray(value)) {
        const newPrefix = `${prefix}${key}.`;
        const newMeaningPrefix = `${meaningPrefix}${meaning} - `;
        extractKeysAndValues(value, newPrefix, newMeaningPrefix);
      }
    }
    console.log('extractKeysAndValues -> result:', result);
    return result;
  }, []);

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
    // const mqttUrl = 'ws://' + '127.0.0.1' + ':' + MQTT_PORT;
    const mqttUrl = 'ws://' + extractedUrl + ':' + MQTT_PORT;

    client.current = mqtt.connect(mqttUrl, {
      clientId,
      username,
      password,
    });
    // console.log('useEffect -> client.current:', client.current);
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

    client.current.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'info') {
        try {
          const jsonObject = JSON.parse(mqttMessage);
          // const jsonObject = JSON.stringify(JSON.parse(mqttMessage));
          if (jsonObject.type === 'drone') {
            console.log('dashboardinfo222222222222222', jsonObject);
            console.log(
              'client.current.on ->  extractKeysAndValues(jsonObject.data):',
              extractKeysAndValues(jsonObject.data),
            );
            handleinfo(extractKeysAndValues(jsonObject.data));
          }
        } catch (error) {
          handleinfo(JSON.stringify('字符解析错误'));
        }
        // dashboardinfo[jsonObject.type] = jsonObject.data;
      }
    });

    return () => {
      if (client.current) client.current.end();
    };
  }, []);
  const columns: ProColumns<any>[] = [
    {
      title: '键',
      dataIndex: 'key',
      hideInSearch: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '数值',
      dataIndex: 'value',
      hideInSearch: true,
    },
  ];
  return (
    <PageContainer>
      <ProTable<any>
        headerTitle="无人机信息"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        // toolBarRender={() => [
        //   <Button type="primary" onClick={() => handleModalVisible(true)}>
        //     <PlusOutlined rev={undefined} /> 新建网络频段
        //   </Button>,
        // ]}
        dataSource={info}
        columns={columns}
        pagination={{ pageSize: 60, simple: true }}
      />
      ;
    </PageContainer>
  );
};

export default FlashPromotionList;
