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

import type { ListUavDeviceData, AddUavDeviceReqType } from './data.d';

import { addDevice, queryDevice, removeDevice, updateDevice } from './service';
import MyDocument from './pdfcomponent';
// import ReactPDF from '@react-pdf/renderer';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
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
function MyPDF() {
  return (
    <div>
      <PDFViewer width={900} height={800}>
        <MyDocument />
      </PDFViewer>
    </div>
  );
}

const FlashPromotionList: React.FC = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ListUavDeviceData>();
  const [selectedRowsState, setSelectedRows] = useState<ListUavDeviceData[]>([]);

  // queryDevice();

  const showDeleteConfirm = (item: ListUavDeviceData) => {
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
      title: '报表id',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      valueType: 'date',
      dataIndex: 'create_time',
      width: '40%',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
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
          <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
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
      <ProTable<ListUavDeviceData>
        headerTitle="报表管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={queryDevice}
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
        {MyPDF()}
      </Drawer>
    </PageContainer>
  );
};

export default FlashPromotionList;

// function MyPDF() {
//   return (
//     <div>
//       <PDFViewer width={900} height={800}>
//         <MyDocument />
//       </PDFViewer>
//     </div>
//   );
// }

// export default MyPDF;
