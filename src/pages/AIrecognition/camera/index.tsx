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

import type { ListCamerasData, AddCamerasReq } from './data.d';

import { addCameras, queryCameras, removeCameras, updateCameras } from './service';

const { confirm } = Modal;
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: AddCamerasReq) => {
  const hide = message.loading('正在添加');
  try {
    await addCameras({ ...fields });
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
const handleUpdate = async (fields: ListCamerasData) => {
  console.log('handleUpdate -> fields:', fields);
  const hide = message.loading('正在更新');
  try {
    await updateCameras(fields);
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
const handleRemove = async (selectedRows: ListCamerasData[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeCameras({
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
  const [currentRow, setCurrentRow] = useState<ListCamerasData>();
  const [selectedRowsState, setSelectedRows] = useState<ListCamerasData[]>([]);

  const showDeleteConfirm = (item: ListCamerasData) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined rev={undefined} />,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove([item]).then((r) => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {},
    });
  };

  // export interface ListCamerasData {
  //   id: number;
  //   name: string;
  //   ip: string;
  //   platform: number; //监控的平台 '使用平台：0-全部 1-飞机 2-摄像头;3-机库;4-AI',
  //   tunnel: number;
  //   url: string;
  //   lat: number;
  //   lon: number;
  //   alt: number;
  //   status: number;
  // }

  const columns: ProColumns<ListCamerasData>[] = [
    {
      title: '主键',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '摄像头名称',
      hideInSearch: true,
      dataIndex: 'name',
    },
    // {
    //   title: '摄像头ip地址',
    //   dataIndex: 'ip',
    //   hideInSearch: true,
    // },
    {
      title: '摄像头平台',
      dataIndex: 'platform',
      hideInSearch: true,

      valueEnum: {
        0: { text: '全部', color: '#282c34' },
        1: { text: '飞机', color: '#4d78cc' },
        2: { text: '摄像头', color: '#d4504d' },
        3: { text: '机库', color: '#d4504d' },
        4: { text: 'AI', color: '#d4504d' },
      },
    },
    {
      title: '摄像头通道',
      dataIndex: 'tunnel',
      hideInSearch: true,
    },
    {
      title: '摄像头地址',
      dataIndex: 'url',
      hideInSearch: true,
    },
    {
      title: 'rtsp地址',
      dataIndex: 'rtsp_url',
      hideInSearch: true,
    },
    {
      title: '经度',
      dataIndex: 'lon',
      hideInSearch: true,
    },
    {
      title: '维度',
      dataIndex: 'lat',
      hideInSearch: true,
    },
    {
      title: '高度',
      dataIndex: 'alt',
      hideInSearch: true,
    },
    {
      title: '摄像头状态',
      hideInSearch: true,
      dataIndex: 'status',
      valueEnum: {
        0: { text: '禁用', color: '#4d78cc' },
        1: { text: '启用', color: '#282c34' },
      },
    },
    // {
    //   title: 'ai识别',
    //   hideInSearch: true,
    //   dataIndex: 'ai_status',
    //   valueEnum: {
    //     0: { text: '禁用', color: '#4d78cc' },
    //     1: { text: '启用', color: '#282c34' },
    //   },
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined rev={undefined} />}
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
            icon={<DeleteOutlined rev={undefined} />}
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
      <ProTable<ListCamerasData>
        headerTitle="摄像头列表"
        actionRef={actionRef}
        rowKey="id"
        // search={{
        //   labelWidth: 120,
        // }}
        search={false}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined rev={undefined} /> 新建摄像头
          </Button>,
        ]}
        request={queryCameras}
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
          <ProDescriptions<ListCamerasData>
            column={2}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<ListCamerasData>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default FlashPromotionList;
