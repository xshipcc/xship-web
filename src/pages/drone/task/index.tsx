import {
  PlusOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Divider, message, Drawer, Modal, Table, TableProps } from 'antd';
import React, { useState, useRef, useCallback } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import CreateFlashForm from './components/CreateFlashForm';
import UpdateFlashForm from './components/UpdateFlashForm';
import type { ListUavPlanDataType, AddUavPlanReqType, UpdateUavPlanReqType } from './data.d';
import { updatePlan, addPlan, removePlan, queryPlan } from './service';
import { queryFly } from '../routePlan/service';
import { queryDevice } from '../device/service';

const { confirm } = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: AddUavPlanReqType) => {
  console.log('handleAdd -> fields:', fields);
  const hide = message.loading('正在添加');
  try {
    await addPlan({ ...fields });
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
const handleUpdate = async (fields: UpdateUavPlanReqType) => {
  const hide = message.loading('正在更新');
  try {
    await updatePlan(fields);
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
const handleRemove = async (selectedRows: ListUavPlanDataType[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removePlan({
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
  const [showDetailDevice, setShowDetailDevice] = useState<boolean>(false);
  const [showDetailRoad, setShowDetailRoad] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ListUavPlanDataType>();
  const [selectedRowsState, setSelectedRows] = useState<ListUavPlanDataType[]>([]);

  const showDeleteConfirm = (item: ListUavPlanDataType) => {
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
  const TableJson = useCallback((json: any) => {
    try {
      return JSON.parse(json);
    } catch (error) {
      return [{ name: '', coord: '', hovertime: '' }];
    }
  }, []);

  const columnsRoadData: TableProps<any>['columns'] = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '航点坐标',
      dataIndex: 'coord',
      key: 'coord',
      render: (_, record) => (
        <>
          {' 经度: ' +
            record.coord[0].toFixed(7) +
            ' 纬度: ' +
            record.coord[1].toFixed(7) +
            ' 高度: ' +
            record.coord[2].toFixed(7)}
        </>
      ),
    },
    {
      title: '悬停时间',
      dataIndex: 'hovertime',
      key: 'hovertime',
    },
  ];
  // interface ListUavPlanDataType {
  //   id: number;
  //   uav_id: number; // 无人机ID
  //   uav_icon: number; // 无人机 icon
  //   plan: string; // 飞行计划时间
  //   fly_id: number; // 巡检路线id
  // }
  const parseField = (field: string, unit: string) => {
    console.log('parseField -> field:', field);
    if (field === '*') {
      return [''];
    } else {
      const values = field.split(',');
      return values;
    }
  };
  const cartesianProduct = (arrays: any[][]): any[][] => {
    const result: any[][] = [];
    function cartesianHelper(current: any[], index: number) {
      if (index === arrays.length) {
        result.push(current);
        return;
      }
      for (let i = 0; i < arrays[index].length; i++) {
        cartesianHelper([...current, arrays[index][i]], index + 1);
      }
    }
    cartesianHelper([], 0);
    console.log('cartesianProduct -> result:', result);

    return result;
  };

  const cronToChinese = (cronExpression: string) => {
    const parts = cronExpression.split(' ');
    // console.log('cronToChinese -> parts:', parts);
    const [second, minute, hour, dayOfMonth, month, dayOfWeek, demo] = parts;

    const minuteStr = parseField(minute, '分钟');
    const hourStr = parseField(hour, '时');
    const monthStr = parseField(month, '月');

    if (dayOfWeek === '*') {
      const dayOfMonthStr = parseField(dayOfMonth, '日');
      console.log('cronToChinese -> minuteStr:', minuteStr, hourStr, dayOfMonthStr, monthStr);
      // @ts-ignore
      const cartesianData = cartesianProduct([monthStr, dayOfMonthStr, hourStr, minuteStr]);
      const arraytable = cartesianData.map((item: any) => {
        const itemModif = item.map((itemTime, index) => {
          console.log('itemModif -> itemTime:', itemTime);
          switch (index) {
            case item.length - 1:
              return itemTime.length > 0 ? itemTime + '分' : '每分钟';
            case item.length - 2:
              return itemTime.length > 0 ? itemTime + '时' : '每时';
            case item.length - 3:
              return itemTime.length > 0 ? itemTime + '日' : '每日';
            case item.length - 4:
              return itemTime.length > 0 ? '每年' + itemTime + '月' : '每月';
          }
        });
        console.log('itemModif -> itemModif:', itemModif);
        let arr = itemModif;

        if (itemModif.includes('每月') && itemModif.includes('每日')) {
          // console.log('有');

          arr = itemModif.filter((item1: string) => item1 !== '每月');
          if (itemModif.includes('每时') && itemModif.includes('每日')) {
            // console.log('有');
            arr = arr.filter((item2: string) => item2 !== '每日');
          }
        }
        return { time: arr.join(' ') };
      });
      console.log('cartesianData.map -> cartesianData:', arraytable);
      return arraytable;
    } else {
      const dayOfWeekStr = parseField(dayOfWeek, '周');
      const cartesianData = cartesianProduct([monthStr, dayOfWeekStr, hourStr, minuteStr]);
      const arraytable = cartesianData.map((item: any) => {
        const itemModif = item.map((itemTime, index) => {
          switch (index) {
            case item.length - 1:
              return itemTime.length > 0 ? itemTime + '分' : '每分';
            case item.length - 2:
              return itemTime.length > 0 ? itemTime + '时' : '每小时';
            case item.length - 3:
              switch (index) {
                case 1:
                  return '星期一';
                case 2:
                  return '星期二';
                case 3:
                  return '星期三';
                case 4:
                  return '星期四';
                case 5:
                  return '星期五';
                case 6:
                  return '星期五';
                case 7:
                  return '星期日';
              }
            case item.length - 4:
              return itemTime.length > 0 ? '每年' + itemTime + '月' : '每月';
          }
        });
        return { time: itemModif.join(' ') };
      });
      console.log('cartesianData.map -> cartesianData:', arraytable);
      return arraytable;
    }
  };

  const columnsTime: TableProps<any>['columns'] = [
    {
      dataIndex: 'time',
      key: 'time',
    },
  ];
  const columns: ProColumns<ListUavPlanDataType>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '巡检计划名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    // {
    //   title: '无人机',
    //   dataIndex: 'uav_id',
    //   hideInSearch: true,
    // },
    {
      title: '无人机',
      dataIndex: 'uav_name',
      // hideInSearch: true,

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
    },
    {
      title: '飞行计划时间',
      dataIndex: 'plan',
      hideInSearch: true,
      render: (_, record) => (
        // @ts-ignore
        // cronToChinese(record.plan),
        <>
          <Table
            columns={columnsTime}
            // @ts-ignore
            dataSource={cronToChinese(record.plan)}
            pagination={false}
          />
        </>
      ),
      // render: (dom, entity) => {
      //   // @ts-ignore
      //   return <div>{cronToChinese(entity.plan)}</div>;
      // },
    },
    {
      title: '巡检路线',
      dataIndex: 'fly_name',
      // hideInSearch: true,
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
    },
    {
      title: '计划状态',
      hideInSearch: true,
      dataIndex: 'status',
      valueEnum: {
        0: { text: '禁用', color: 'red' },
        1: { text: '启动', color: 'green' },
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
      title: '创建时间',
      dataIndex: 'create_time',
      hideInSearch: true,
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      hideInSearch: true,
    },
    {
      title: '航线数据',
      dataIndex: 'data',
      hideInSearch: true,
      render: (_, record) => (
        <>
          <Table columns={columnsRoadData} dataSource={TableJson(record.data)} pagination={false} />
        </>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<ListUavPlanDataType>
        headerTitle="巡检任务"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        // search={false}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined rev={undefined} /> 新建巡检任务
          </Button>,
        ]}
        request={async (params) => {
          const data = {
            ...params,
            // uav_id: -1,
            // fly_id: -1,
          };
          const res = await queryPlan(data);
          return res;
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        pagination={{ pageSize: 10, simple: true }}
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
          if (!showDetailDevice) {
            setCurrentRow(undefined);
          }
        }}
        createModalVisible={createModalVisible}
      />

      <UpdateFlashForm
        key={'UpdateFlashForm'}
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
          if (!showDetailDevice) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
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
          <ProDescriptions<ListUavPlanDataType>
            column={2}
            title={'详细信息'}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columnsRoad as ProDescriptionsItemProps<ListUavPlanDataType>[]}
          />
        )}
      </Drawer>
      <Drawer
        width={800}
        visible={showDetailDevice}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetailDevice(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<ListUavPlanDataType>
            column={2}
            title={'详细信息'}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columnsDevice as ProDescriptionsItemProps<ListUavPlanDataType>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default FlashPromotionList;
