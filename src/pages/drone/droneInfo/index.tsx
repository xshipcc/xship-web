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
  const getChineseMeaning = useCallback((key) => {
    return '汉语';
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

// <div className={styles.content}>
//     {/* {info} */}
//     <Row>
//       <Col span={12}>
//         <div>
//           <h3>{info.type}</h3>
//           <h3>无人机信息</h3>
//           {Object.entries(info.data).map(([key, value]) => (
//             <div key={key}>
//               <ul>
//                 <li key={key}>
//                   {key}: {value}
//                 </li>
//               </ul>
//             </div>
//           ))}
//         </div>
//       </Col>
//       <Col span={12}>
//         <div>
//           <h3>{infoHangar.type}</h3>
//           <h3>机库信息</h3>
//           {Object.entries(infoHangar.data).map(([key, value]) => (
//             <div key={key}>
//               <ul>
//                 <li key={key}>
//                   {key}: {value}
//                 </li>
//               </ul>
//             </div>
//           ))}
//         </div>
//       </Col>
//     </Row>
//   </div>
