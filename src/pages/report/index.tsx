import {
  ExclamationCircleOutlined,
  VerticalAlignBottomOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Divider, message, Drawer, Modal, Row, Col } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

import type {
  ListUavHistoryDataType,
  AddUavHistoryReqType,
  ListUavHistoryRespType,
} from './data.d';
import { queryHistory, addHistory, queryReport } from './service';
import MyDocument from './pdfcomponent';
// import ReactPDF from '@react-pdf/renderer';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
const { confirm } = Modal;

function MyPDF(currentHistory: any) {
  return (
    <div>
      {/* @ts-ignore */}
      <PDFViewer width={900} height={800}>
        <MyDocument data={currentHistory} />
      </PDFViewer>
    </div>
  );
}

const FlashPromotionList: React.FC = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ListUavHistoryDataType>();
  const [selectedRowsState, setSelectedRows] = useState<ListUavHistoryDataType[]>([]);

  // queryDevice();

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
      title: '报表日期',
      dataIndex: 'create_time',
      valueType: 'date',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '30%',
      hideInSearch: true,
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
            查看
          </Button>
          <Divider type="vertical" />
          {/* @ts-ignore */}
          <PDFDownloadLink
            document={<MyDocument data={currentRow} />}
            fileName={'巡检历史' + currentRow?.id}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                'Loading document...'
              ) : (
                <Button
                  type="primary"
                  icon={<VerticalAlignBottomOutlined rev={undefined} />}
                  onClick={() => {
                    // showDeleteConfirm(record);
                  }}
                >
                  下载
                </Button>
              )
            }
          </PDFDownloadLink>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<ListUavHistoryDataType>
        headerTitle="报表管理"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={queryReport}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        pagination={{ pageSize: 20 }}
      />
      <Drawer
        width={1000}
        visible={updateModalVisible}
        onClose={() => {
          handleUpdateModalVisible(false);
        }}
        closable={true}
      >
        {updateModalVisible && MyPDF(currentRow)}
      </Drawer>
    </PageContainer>
  );
};

export default FlashPromotionList;
