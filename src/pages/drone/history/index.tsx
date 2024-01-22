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
import { queryFly } from '../routePlan/service';
import { queryDevice } from '../device/service';

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
  const [showDetailDevice, setShowDetailDevice] = useState<boolean>(false);
  const [showDetailRoad, setShowDetailRoad] = useState<boolean>(false);
  const columns: ProColumns<ListUavHistoryDataType>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '无人机名称',
      dataIndex: 'uav_name',
      valueType: 'digit',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              queryDevice({ id: entity.uav_id, current: 1, pageSize: 10 }).then((resp) => {
                setCurrentRow(resp.data[0]);
                setShowDetailDevice(true);
              });
            }}
          >
            {dom}
          </a>
        );
      },
      hideInSearch: true,
    },
    {
      title: '巡检路线名称',
      dataIndex: 'fly_name',
      valueType: 'digit',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              queryFly({ id: entity.fly_id, current: 1, pageSize: 10 }).then((resp) => {
                setCurrentRow(resp.data[0]);
                setShowDetailRoad(true);
              });
            }}
          >
            {dom}
          </a>
        );
      },
      hideInSearch: true,
    },
    // {
    //   title: '操作者',
    //   dataIndex: 'operator',
    // },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      hideInSearch: true,
      title: '历史情况',
      dataIndex: 'status',
      valueEnum: {
        1: { text: '未完成', color: 'yellow' },
        0: { text: '完成', color: 'green' },
        2: { text: '故障', color: 'red' },
      },
    },
    {
      title: '异常结束详情',
      dataIndex: 'remark',
      hideInSearch: true,
    },
  ];
  const columnsDevice: ProColumns<any>[] = [
    {
      title: '无人机id',
      valueType: 'digit',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '无人机ip',
      dataIndex: 'ip',
      hideInSearch: true,
    },
    {
      title: '地面端口',
      dataIndex: 'port',
      hideInSearch: true,
    },
    {
      title: '无人机端口',
      dataIndex: 'r_port',
      hideInSearch: true,
    },
    {
      title: '网卡名',
      dataIndex: 'network',
      hideInSearch: true,
    },
    {
      title: '手柄信息',
      dataIndex: 'joystick',
      hideInSearch: true,
    },
    {
      title: '无人机通讯方式',
      hideInSearch: true,

      dataIndex: 'uav_zubo',
      valueEnum: {
        0: { text: '单播' },
        1: { text: '组播' },
      },
    },
    {
      title: '无人机库ip',
      dataIndex: 'hangar_ip',
      hideInSearch: true,
    },
    {
      title: '无人机库端口',
      dataIndex: 'hangar_port',
      hideInSearch: true,
    },
    {
      title: '无人机库接收端口',
      hideInSearch: true,

      dataIndex: 'hangar_rport',
    },

    {
      title: '摄像头IP',
      dataIndex: 'cam_ip',
      hideInSearch: true,
    },
    {
      title: '摄像头port',
      dataIndex: 'cam_port',
      hideInSearch: true,
    },

    {
      title: '设备状态',
      dataIndex: 'status',
      hideInSearch: true,

      valueEnum: {
        1: { text: '启动', color: 'green' },
        0: { text: '禁用', color: 'red' },
      },
    },
  ];
  const columnsRoad: ProColumns<any>[] = [
    {
      title: '航线编号',
      dataIndex: 'id',
      valueType: 'digit',
    },
    {
      title: '航线名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '航线数据',
      dataIndex: 'data',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      hideInSearch: true,
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      hideInSearch: true,
    },
  ];
  return (
    <PageContainer>
      <ProTable<ListUavHistoryDataType>
        headerTitle="无人机巡检历史"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => []}
        request={async (params: any = {}, sort, filter) => {
          console.log('request={ -> params:', params);
          const data = {
            ...params,
            history_id: -1,
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
        pagination={{ pageSize: 10, simple: true }}
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
          if (!showDetailDevice) {
            setCurrentRow(undefined);
          }
        }}
        createModalVisible={createModalVisible}
      />

      <Drawer
        width={600}
        visible={showDetailRoad}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetailRoad(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<any>
            column={2}
            title={'详细信息'}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columnsRoad as ProDescriptionsItemProps<any>[]}
          />
        )}
      </Drawer>
      <Drawer
        width={600}
        visible={showDetailDevice}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetailDevice(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<any>
            column={2}
            title={'详细信息'}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columnsDevice as ProDescriptionsItemProps<any>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default FlashPromotionList;
