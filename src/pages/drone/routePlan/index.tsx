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
import type { ListUavFlyDataType, AddUavFlyReqType } from './data.d';
import { updateFly, addFly, removeFly, queryFly } from './service';

const { confirm } = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: AddUavFlyReqType) => {
  const hide = message.loading('正在添加');
  try {
    await addFly({ ...fields });
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
const handleUpdate = async (fields: ListUavFlyDataType) => {
  const hide = message.loading('正在更新');
  try {
    await updateFly(fields);
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
const handleRemove = async (selectedRows: ListUavFlyDataType[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeFly({
      ids: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    // message.error('删除失败，请重试');
    return false;
  }
};

const FlashPromotionList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ListUavFlyDataType>();
  const [selectedRowsState, setSelectedRows] = useState<ListUavFlyDataType[]>([]);

  const showDeleteConfirm = (item: ListUavFlyDataType) => {
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

  // interface ListUavFlyDataType {
  //   id: number;
  //   name: string;
  //   data: string;
  //   create_time: string;
  //   creator: string;
  // }

  // coord: (3)[(114.34407002766382, 38.102266826221765, 103.59158938390343)];
  // heightmode: '00';
  // hovertime: 10;
  // name: '0号';
  // photo: '0';
  // radius: 25;
  // speed: 5;
  const TableJson = useCallback((json: any) => {
    try {
      return JSON.parse(json);
    } catch (error) {
      return [{ name: '', coord: [0, 0, 0], hovertime: '' }];
    }
  }, []);

  const columnsRoad: TableProps<any>['columns'] = [
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
            ' 维度: ' +
            record.coord[1].toFixed(7) +
            ' 高度: ' +
            record.coord[2].toFixed(2)}
        </>
      ),
    },
    {
      title: '悬停时间',
      dataIndex: 'hovertime',
      key: 'hovertime',
    },
  ];
  const columns: ProColumns<ListUavFlyDataType>[] = [
    {
      title: '航线编号',
      dataIndex: 'id',
      valueType: 'digit',
      hideInSearch: true,
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
      render: (_, record) => (
        <>
          <Table columns={columnsRoad} dataSource={TableJson(record.data)} pagination={false} />
          {/* {JSON.parse(record.data).map((item) => {
              return (
                <div>
                  <div>节点序号{item.name}</div>
                  <div>无人机坐标{item.coord}</div>
                  <div>悬停时间{item.hovertime}</div>
                </div>
              );
            })} */}
        </>
      ),
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
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
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
      <ProTable<ListUavFlyDataType>
        headerTitle="航线列表"
        actionRef={actionRef}
        rowKey="id"
        // search={{
        //   labelWidth: 120,
        // }}
        search={false}
        toolBarRender={() => []}
        request={queryFly}
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
          if (!showDetail) {
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
          <ProDescriptions<ListUavFlyDataType>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<ListUavFlyDataType>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default FlashPromotionList;
