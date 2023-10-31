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
import type {
  ListUavHistoryDataType,
  AddUavHistoryReqType,
  ListUavHistoryRespType,
} from './data.d';
import { queryHistory, addHistory } from './service';

const { confirm } = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: AddUavHistoryReqType) => {
  console.log('handleAdd -> fields:', fields);
  const hide = message.loading('正在添加');
  try {
    await addHistory({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const FlashPromotionList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ListUavHistoryDataType>();

  // interface ListUavHistoryDataType {
  //   id: number;
  //   uav_id: number; // 无人机id
  //   fly_id: number; // 巡检路线id
  //   operator: string; // 操作者
  //   create_time: string; // 创建时间
  //   end_time: string; // 结束时间
  // }

  const columns: ProColumns<ListUavHistoryDataType>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '无人机id',
      dataIndex: 'uav_id',
      valueType: 'digit',
    },
    {
      title: '巡检路线id',
      dataIndex: 'fly_id',
      valueType: 'digit',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '操作者',
      dataIndex: 'operator',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      valueType: 'dateTime',
    },
  ];

  return (
    <PageContainer>
      <ProTable<ListUavHistoryDataType>
        headerTitle="无人机巡检历史"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建巡检历史
          </Button>,
        ]}
        request={async (params: any = {}, sort, filter) => {
          console.log('request={ -> params:', params);
          const data = {
            ...params,
            create_time: params?.create_time ? params.create_time : '',
            end_time: params?.end_time ? params.end_time : '',
            operator: params?.operator ? params.operator : '',
            uav_id: params?.uav_id ? params.uav_id : -1,
            fly_id: params?.fly_id ? params.fly_id : -1,
          };
          const res: ListUavHistoryRespType = await queryHistory(data);
          return {
            data: res.data,
            pageSize: res.pageSize,
            current: 1,
            total: +res.total,
            success: res.success,
          };
        }}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />

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
          <ProDescriptions<ListUavHistoryDataType>
            column={2}
            title={currentRow?.operator}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<ListUavHistoryDataType>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default FlashPromotionList;
