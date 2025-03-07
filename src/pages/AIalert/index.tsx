import { EditOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateBrandForm from './components/UpdateBrandForm';
import type {
  ListAlertHistoryRespType,
  ListAlertHistoryData,
  UpdateAlertHistoryReqType,
} from './data.d';
import { queryAlert, upadtaAlert } from './service';

const { confirm } = Modal;

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: UpdateAlertHistoryReqType) => {
  const hide = message.loading('正在更新');
  try {
    await upadtaAlert(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

const TableList: React.FC = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ListAlertHistoryData>();
  const [selectedRowsState, setSelectedRows] = useState<ListAlertHistoryData[]>([]);
  useEffect(() => {
    localStorage.setItem('router', 'dashboard');
  }, []);

  // interface ListAlertHistoryData {
  //   id: number;
  //   name: string;
  //   image: string;
  //   type: number;
  //   code: string;
  //   level: number;
  //   count: number;
  //   platform: number;
  //   start_time: string;
  //   end_time: string;
  //   note: string;
  //   confirm: number;
  // }
  const columns: ProColumns<ListAlertHistoryData>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '任务编号',
      dataIndex: 'history_id',
      hideInSearch: true,
    },
    // {
    //   title: '报警标题',
    //   dataIndex: 'name',
    //   hideInSearch: true,
    // },
    {
      title: '报警截图',
      dataIndex: 'image',
      valueType: 'image',
      fieldProps: { width: 100, height: 80 },
      // render: (text) => <a href="#">{text}</a>,
      hideInSearch: true,
    },

    {
      title: '消息类型',
      dataIndex: 'type',
      valueEnum: {
        0: { text: '行人', color: '#282c34' },
        1: { text: '自行车', color: '#4d78cc' },
        2: { text: '车辆', color: '#d4504d' },
        3: { text: '货车', color: '#8b8d8a' },
        4: { text: '卡车', color: '#8b8d8a' },
        5: { text: '三轮车', color: '#8b8d8a' },
        6: { text: '公交车', color: '#8b8d8a' },
        7: { text: '摩托车', color: '#8b8d8a' },
        8: { text: '火警', color: '#8b8d8a' },
        9: { text: '烟雾', color: '#8b8d8a' },
      },
    },
    // {
    //   title: '系统分类二级类别',
    //   dataIndex: 'code',
    //   hideInSearch: true,
    // },
    // {
    //   title: '报警等级',
    //   dataIndex: 'level',
    //   hideInSearch: true,
    //   valueType: 'digit',
    // },

    // {
    //   title: '报警数量',
    //   dataIndex: 'count',
    //   valueType: 'digit',
    //   hideInSearch: true,
    // },
    {
      title: '报警平台',
      hideInSearch: true,
      dataIndex: 'platform',
      valueEnum: {
        0: { text: '全部', color: '#98c379' },
        1: { text: '飞机', color: '#2b394b' },
        2: { text: '摄像头', color: '#c678dd' },
        3: { text: '机库', color: '#b3a794' },
        4: { text: 'AI', color: '#4d78cc' },
      },
    },
    {
      title: '发现时间',
      dataIndex: 'start_time',
      valueType: 'date',
      render: (dom, entity) => {
        return <>{entity.start_time}</>;
      },
    },
    // {
    //   hideInSearch: true,
    //   title: '结束时间',
    //   dataIndex: 'end_time',
    //   valueType: 'dateTime',
    // },
    // {
    //   title: '备注',
    //   dataIndex: 'note',
    //   hideInSearch: true,
    // },
    {
      title: '坐标',
      render: (text, record) => (
        <span>
          经度 {record.lon}
          纬度 {record.lat}
          高度 {record.alt}
        </span>
      ),
      hideInSearch: true,
    },
    {
      hideInSearch: true,
      title: '报警确认',
      valueEnum: {
        1: { text: '是', color: '#00ff00' },
        0: { text: '否', color: '#ff0000' },
      },
      // hideInSearch: true,
      dataIndex: 'confirm',
    },
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
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<ListAlertHistoryData>
        headerTitle="告警列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          // <Button type="primary" onClick={() => handleModalVisible(true)}>
          //   <PlusOutlined /> 新建品牌
          // </Button>,
        ]}
        // request={queryAlert}
        request={async (params: any = {}, sort, filter) => {
          console.log('request={ -> params:', params);
          // interface ListAlertHistoryReq {
          //   current?: number;
          //   pageSize?: number;
          //   type: number;
          //   start_time: string;
          //   end_time: string;
          //   platform: number;
          //   confirm: number;
          // }

          const data = {
            ...params,
            type: params?.type ? Number(params.type) : -1,
            history_id: -1,
            start_time: params?.start_time ? params.start_time : '',
            end_time: params?.end_time ? params.end_time : '',
            platform: params?.uav_id ? params.uav_id : 0,
            confirm: params?.confirm ? Number(params.confirm) : 0,
          };
          const res: ListAlertHistoryRespType = await queryAlert(data);
          const url = window.location.href;
          const startIndex = url.indexOf('://') + 3;
          const endIndex =
            url.indexOf(':', startIndex) !== -1
              ? url.indexOf(':', startIndex)
              : url.indexOf('/', startIndex);
          const extractedUrl = url.substring(startIndex, endIndex);
          if (res?.data) {
            res.data.map((item: any) => {
              // return item;
              // return (item.image = 'http://127.0.0.1/' + item.image);
              return (item.image = 'http://' + extractedUrl + '/' + item.image);
            });
            console.log('res.data.map -> res.data:', res.data);
            // {data: [], pageSize: 10, current: 1, total:28, success: true,}
            return {
              data: res.data,
              pageSize: res.pageSize,
              current: 1,
              total: +res.total,
              success: res.success,
            };
          } else {
            return {
              data: null,
              pageSize: res.pageSize,
              current: 1,
              total: +res.total,
              success: res.success,
            };
          }
        }}
        columns={columns}
        pagination={{ pageSize: 10, simple: true }}
      />
      <UpdateBrandForm
        key={'UpdateBrandForm'}
        onSubmit={async (value) => {
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
          <ProDescriptions<ListAlertHistoryData>
            column={2}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<ListAlertHistoryData>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
