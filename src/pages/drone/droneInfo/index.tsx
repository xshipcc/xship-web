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
import CreateFlashForm from './components/CreateFlashForm';
import UpdateFlashForm from './components/UpdateFlashForm';
import * as mqtt from 'mqtt';

import type { ListUavNetworkDataType, AddUavNetworkReqType } from './data.d';

import { addNetwork, queryNetwork, removeNetwork, updateNetwork } from './service';
import TextArea from 'antd/lib/input/TextArea';

const { confirm } = Modal;
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: AddUavNetworkReqType) => {
  const hide = message.loading('正在添加');
  try {
    // const demodata = await addNetwork({
    //   name: 'test',
    //   ip: '192.1.1.1',
    //   port: 111,
    //   hangar_ip: '222',
    //   hangar_port: 22,
    // });
    // console.log('handleAdd -> demodata:', demodata);

    await addNetwork({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: ListUavNetworkDataType) => {
  console.log('handleUpdate -> fields:', fields);
  const hide = message.loading('正在更新');
  try {
    await updateNetwork(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: ListUavNetworkDataType[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeNetwork({
      ids: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const FlashPromotionList: React.FC = () => {
  const [info, handleinfo] = useState<string>('');

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
    // const mqttUrl = 'ws://' + '192.168.2.213' + ':' + MQTT_PORT;
    const mqttUrl = 'ws://' + extractedUrl + ':' + MQTT_PORT;

    client.current = mqtt.connect(mqttUrl, {
      clientId,
      username,
      password,
    });
    // const mqttSub = (subscription: { topic: any; qos: any }) => {
    //   if (client) {
    //     const { topic, qos } = subscription;
    //     client.current.subscribe(topic, { qos }, (error: any) => {
    //       if (error) {
    //         console.log('Subscribe to topics error', error);
    //         return;
    //       }
    //       console.log(`Subscribe to topics: ${topic}`);
    //     });
    //   }
    // };
    // mqttSub({ topic: 'control', qos: 0 });

    client.current.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'info') {
        // const jsonObject = JSON.parse(mqttMessage);
        const jsonObject = JSON.parse(mqttMessage);
        handleinfo(jsonObject);
        console.log('dashboardinfo2', jsonObject);
        // dashboardinfo[jsonObject.type] = jsonObject.data;
      }
    });

    return () => {
      if (client.current) client.current.end();
    };
  }, []);

  return (
    <PageContainer>
      {/* <TextArea
        showCount
        maxLength={10000}
        style={{ height: 600, width: 1000 }}
        // onChange={onChange}
        placeholder={info}
      /> */}
      <div style={{ fontSize: 18 }}>{info}111111111111111111111111111111111111111111111</div>
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
