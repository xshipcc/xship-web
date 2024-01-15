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

import type { ListCarData, AddCarReq } from './data.d';

import { addCar, queryCar, removeCar, updateCar } from './service';

const { confirm } = Modal;
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: AddCarReq) => {
  const hide = message.loading('正在添加');
  try {
    await addCar({ ...fields });
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
const handleUpdate = async (fields: ListCarData) => {
  console.log('handleUpdate -> fields:', fields);
  const hide = message.loading('正在更新');
  try {
    await updateCar(fields);
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
const handleRemove = async (selectedRows: ListCarData[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeCar({
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
  const [currentRow, setCurrentRow] = useState<ListCarData>();
  const [selectedRowsState, setSelectedRows] = useState<ListCarData[]>([]);

  const showDeleteConfirm = (item: ListCarData) => {
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
  // export interface ListCarData {
  //   id: number;
  //   name: string;
  //   card: string;
  //   photo: string;
  //   type: number;
  //   phone: string;
  //   agency: string;
  //   status: number;
  // }

  const columns: ProColumns<ListCarData>[] = [
    {
      title: '主键',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '车辆名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '车牌号',
      hideInSearch: true,

      dataIndex: 'card',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '车辆照片',
      dataIndex: 'photo',
      valueType: 'image',
      fieldProps: { width: 100, height: 80 },
      hideInSearch: true,
    },
    {
      title: '车辆等级',
      dataIndex: 'type',
      hideInSearch: true,

      valueEnum: {
        0: { text: '本部', color: '#282c34' },
        1: { text: '外来', color: '#4d78cc' },
        2: { text: '工程', color: '#d4504d' },
      },
    },
    {
      title: '所属机构',
      dataIndex: 'agency',
      hideInSearch: true,
    },
    {
      title: '账号状态',
      dataIndex: 'status',
      hideInSearch: true,

      valueEnum: {
        0: { text: '禁用', color: '#4d78cc' },
        1: { text: '启用', color: '#282c34' },
      },
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
      <ProTable<ListCarData>
        headerTitle="车辆列表"
        actionRef={actionRef}
        rowKey="id"
        // search={{
        //   labelWidth: 120,
        // }}
        search={false}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建车辆
          </Button>,
        ]}
        request={queryCar}
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
          <ProDescriptions<ListCarData>
            column={2}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<ListCarData>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default FlashPromotionList;
