import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Col, Form, Input, List, Row, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import styles from './index.less';
import type { AddUavFlyReqType, ListUavFlyReqType } from '@/pages/drone/routePlan/data';
import type { ListUavFlyDataType } from '@/pages/drone/routePlan/data';
import type { NodeType } from '@/pages/drone/routePlan/data';
import { Divider } from 'antd';

import { queryFly, updateFly, addFly } from '@/pages/drone/routePlan/service';
import { RollbackOutlined } from '@ant-design/icons';
import { message, Drawer, Modal } from 'antd';
import { useModel } from 'umi';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  id: number;
  name: string;
  data: string;
  create_time: string;
  creator: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const App: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const [dataSource, setDataSource] = useState([
    {
      id: 0,
      name: 'string',
      data: 'string',
      create_time: 'string',
      creator: 'string',
    },
  ]);

  /**
   *
   * 获取当前的航线信息并且更新航线数据
   * @param {ListUavFlyReqType} params
   * @return {*}
   */
  const fetchFlyData = async (params: ListUavFlyReqType) => {
    try {
      const Data = await queryFly(params);
      setDataSource(Data.data);
      return true;
    } catch (error) {
      console.log('fetchFlyData -> error:', error);
      return false;
    }
  };

  // 获取航线数据列表
  useEffect(() => {
    fetchFlyData({ pageSize: 10, current: 1 });
  }, []);

  /**
   *添加新的航线,同时更新航线数据列表
   *
   */
  const handleAdd = async () => {
    const newData: AddUavFlyReqType = {
      creator: initialState?.currentUser?.name,
      name: `demo`,
      data: 'demo',
      create_time: `demo`,
    };
    try {
      const response = await addFly(newData);
      // console.log('*fetchDashboardInfo -> response:', response);
      const { code, result } = response;
      console.log('getData', code);
      if (code === '000000') {
        message.success('添加成功');
        fetchFlyData({ pageSize: 10, current: 1 });
      }
    } catch (error) {
      message.success('添加失败');
      console.log('catch getData:', error);
    }
    // updateFly(newData);
  };

  /**
   *  @file index.tsx
   *  @time 2023/10/27
   * @category :drawer
   * @function :
   */
  //#region -------------------------------------------------------------------------
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentRoad, setcurrentRoad] = useState<ListUavFlyDataType>({
    id: 1,
    creator: 'default',
    name: `default`,
    data: [],
    create_time: `default`,
  });
  const toggleDrawer = (data: any) => {
    console.log('toggleDrawer -> param2:', data);
    setcurrentRoad(data);
    setShowDrawer(true);
  };
  const closeDrawer = () => {
    // setcurrentRoad({
    //   id: 1,
    //   creator: 'default',
    //   name: `default`,
    //   data: [],
    //   create_time: `default`,
    // });

    setShowDrawer(false);
  };
  const changeName = (e: any, index: any) => {
    // console.log('changeName -> index:', index);
    // console.log('changeName -> data:', e.target.value);
    currentRoad.data = e.target.value;
    setcurrentRoad(currentRoad);
  };
  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '航线名称',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      editable: false,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
    {
      title: (
        <div>
          <Button type="primary" onClick={handleAdd}>
            添加航线
          </Button>
        </div>
      ),
      dataIndex: 'operation',
      // @ts-ignore
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Button type="primary" onClick={() => toggleDrawer(record)}>
            航线预览
          </Button>
        ) : null,
    },
  ];

  /**
   *保存编辑航线的信息
   *
   * @param {DataType} row
   */
  const handleSave = async (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    try {
      // @ts-ignore
      const response = await updateFly(row);
      // console.log('*fetchDashboardInfo -> response:', response);
      const { code, result } = response;
      console.log('getData', code);
      if (code === '000000') {
        message.success('修改成功');
        fetchFlyData({ pageSize: 10, current: 1 });
      }
    } catch (error) {
      message.success('修改失败');
      console.log('catch getData:', error);
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
  return (
    <div className={styles.trackList}>
      {showDrawer ? (
        <div className={styles.drawer}>
          {/*  */}
          <Divider style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
            {/* <RollbackOutlined className={styles.back} /> */}
            {currentRoad.name}
          </Divider>
          <List
            pagination={{
              pageSize: 9,
              showSizeChanger: false,
            }}
            dataSource={currentRoad.data}
            renderItem={(item: NodeType, index) => (
              <>
                <Row>
                  <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                    节点名称
                  </Col>
                  <Col span={12} style={{ color: 'white' }}>
                    <Input
                      defaultValue={item.name}
                      placeholder="请输入经度"
                      onChange={(e) => {
                        changeName(e, index);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                    坐标
                  </Col>
                  <Col span={12} style={{ color: 'white' }}>
                    {item.name}
                  </Col>
                </Row>
              </>
            )}
          />
          <Row>
            <Col span={9} offset={2}>
              <Button type="primary" onClick={() => {}}>
                航线编辑
              </Button>
            </Col>
            <Col span={9} offset={2}>
              <Button
                type="primary"
                onClick={() => {
                  closeDrawer();
                }}
              >
                保存航线
              </Button>
            </Col>
          </Row>

          {/*  */}
        </div>
      ) : (
        <Table
          pagination={{
            pageSize: 9,
            showSizeChanger: false,
          }}
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
      )}
    </div>
  );
};

export default App;
