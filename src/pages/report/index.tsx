import {
  PlusOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Divider, message, Drawer, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import CreateFlashForm from './components/CreateFlashForm';
import UpdateFlashForm from './components/UpdateFlashForm';

import type { ListUavDeviceData, AddUavDeviceReqType } from './data.d';

import { addDevice, queryDevice, removeDevice, updateDevice } from './service';

const { confirm } = Modal;
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: AddUavDeviceReqType) => {
  const hide = message.loading('正在添加');
  try {
    // const demodata = await addDevice({
    //   name: 'test',
    //   ip: '192.1.1.1',
    //   port: 111,
    //   hangar_ip: '222',
    //   hangar_port: 22,
    // });
    // console.log('handleAdd -> demodata:', demodata);

    await addDevice({ ...fields });
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
const handleUpdate = async (fields: ListUavDeviceData) => {
  console.log('handleUpdate -> fields:', fields);
  const hide = message.loading('正在更新');
  try {
    await updateDevice(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

// const queryDeviceData = async () => {
//   try {
//     const response = await queryDevice({ pageSize: 10, current: 1 });
//     console.log('queryDeviceData -> response:', response);

//     message.success('更新成功');
//     return true;
//   } catch (error) {
//     message.error('更新失败请重试！');
//     return false;
//   }
// };

// queryDeviceData();
/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: ListUavDeviceData[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeDevice({
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
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ListUavDeviceData>();
  const [selectedRowsState, setSelectedRows] = useState<ListUavDeviceData[]>([]);

  // queryDevice();

  const showDeleteConfirm = (item: ListUavDeviceData) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined />,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove([item]).then((r) => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {},
    });
  };

  // export interface ListUavDeviceData {
  //   id: number; // 无人机id
  //   name: string; // 无人机名称
  //   ip: string; // 无人机IP
  //   port: number; // 无人机port
  //   r_port: number; // 无人机接收端口port
  //   hangar_ip: string; // 无人机机库IP
  //   hangar_port: number; // 无人机机库port
  //   hangar_rport: number; // 无人机机库接收port
  //   cam_ip: string; // 摄像头IP
  //   cam_port: number; // 摄像头port
  //   cam_url: string; // 摄像头rtsp 地址
  //   create_time: Date; // 创建时间
  // }

  const columns: ProColumns<ListUavDeviceData>[] = [
    {
      title: '无人机id',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '无人机id',
      dataIndex: 'ip',
    },
    {
      title: '无人机端口',
      dataIndex: 'port',
    },
    {
      title: '无人机接收端口',
      dataIndex: 'r_port',
    },
    {
      title: '无人机库ip',
      dataIndex: 'hangar_ip',
    },
    {
      title: '无人机库端口',
      dataIndex: 'hangar_port',
    },
    {
      title: '无人机库接收端口',
      dataIndex: 'hangar_rport',
    },
    {
      title: '摄像头IP',
      dataIndex: 'cam_ip',
    },
    {
      title: '摄像头port',
      dataIndex: 'cam_port',
    },
    {
      title: '摄像头rtsp 地址',
      dataIndex: 'cam_url',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              showDeleteConfirm(record);
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<ListUavDeviceData>
        headerTitle="报表管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建无人机列表
          </Button>,
        ]}
        request={queryDevice}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        pagination={{ pageSize: 20 }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}

      <CreateFlashForm
        key={'CreateFlashForm'}
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        createModalVisible={createModalVisible}
      />

      <UpdateFlashForm
        key={'UpdateFlashForm'}
        onSubmit={async (value) => {
          console.log('onSubmit={ -> value:', value);
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<ListUavDeviceData>
            column={2}
            title={currentRow?.hangar_port}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<ListUavDeviceData>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default FlashPromotionList;
