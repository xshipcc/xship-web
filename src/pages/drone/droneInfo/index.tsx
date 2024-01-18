import {
  PlusOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Divider, message, Drawer, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import styles from './index.less';

import * as mqtt from 'mqtt';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DisplayKeyValuePairs = (data) => {
  const renderKeyValuePairs = () => {
    return Object.entries(data).map(([key, value]) => {
      if (typeof value === 'object') {
        return (
          <div key={key}>
            <h3>{key}</h3>
            {renderKeyValuePairs()}
          </div>
        );
      }

      return (
        <p key={key}>
          {key}: {value}
        </p>
      );
    });
  };

  return <div>{renderKeyValuePairs()}</div>;
};
const FlashPromotionList: React.FC = () => {
  const [info, handleinfo] = useState<any>({
    type: 'drone',
    data: {
      battery_v: 0,
      battery_temp: 0,
      warehouse_status: 0,
      battery_status: 0,
      homing_status: 0,
      uavpower_status: 0,
    },
  });
  const def: any = '';
  const client = useRef(def);
  // queryNetwork();
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

          console.log('dashboardinfo222222222222222', jsonObject);
          handleinfo(jsonObject);
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

  return (
    <PageContainer>
      <div className={styles.content}>
        {/* {info} */}
        <div>
          <h3>{info.type}</h3>
          <h3>数据信息</h3>
          {Object.entries(info.data).map(([key, value]) => (
            <div key={key}>
              <ul>
                <li key={key}>
                  {key}: {value}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default FlashPromotionList;
//  <ProTable<ListUavNetworkDataType>
//    headerTitle="无人机网络频段列表"
//    actionRef={actionRef}
//    rowKey="id"
//    search={{
//      labelWidth: 120,
//    }}
//    toolBarRender={() => [
//      <Button type="primary" onClick={() => handleModalVisible(true)}>
//        <PlusOutlined rev={undefined} /> 新建网络频段
//      </Button>,
//    ]}
//    request={queryNetwork}
//    columns={columns}
//    rowSelection={{
//      onChange: (_, selectedRows) => setSelectedRows(selectedRows),
//    }}
//    pagination={{ pageSize: 20 }}
//  />;
