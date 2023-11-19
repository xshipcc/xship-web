import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Col, Form, Input, List, Row, Select, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import styles from './index.less';
import type { ListUavFlyReqType } from '@/pages/drone/routePlan/data';
import type { ListUavFlyDataType } from '@/pages/drone/routePlan/data';
import type { NodeType } from '@/pages/drone/routePlan/data';

import { queryFly, updateFly, addFly } from '@/pages/drone/routePlan/service';
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import { message, Drawer, Modal } from 'antd';
import { useDispatch, useModel, useSelector } from 'umi';

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
      const res = await queryFly(params);
      console.log('fetchFlyData -> res:', res);
      // JSON.parse(res.data.data);
      // res.data.map((item: any) => {
      //   item.data = JSON.parse(item.data);
      //   console.log('res.data.map -> item:', item);
      //   return item;
      // });
      setDataSource(res.data);
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
    const newData = {
      creator: initialState?.currentUser?.name,
      name: `default`,
      data: [
        {
          name: 'default',
          coord: [111, 37, 111],
          speed: 5,
          hovertime: 10,
          radius: 25,
          photo: '0', //0拍照  ,1不拍照
          heightmode: '00', //
          turning: '00',
        },
      ],
      create_time: `default`,
    };
    try {
      // @ts-ignore
      newData.data = JSON.stringify(newData.data);

      // newData.data = newData.data + '';
      console.log('handleAdd -> newData:', newData);
      // @ts-ignore
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
  const dispatch = useDispatch();
  const editRoadSignal = useSelector((state: any) => state.dashboardModel.editRoadSignal);
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentRoad, setcurrentRoad] = useState<ListUavFlyDataType>({
    id: 1,
    creator: 'default',
    name: `default`,
    data: [
      {
        name: 'default',
        coord: [111, 37, 111],
        speed: 5,
        hovertime: 10,
        radius: 25,
        photo: '0', //1拍照  ,0不拍照
        heightmode: '00', //
        turning: '00',
      },
    ],
    create_time: `default`,
  });
  // {
  //   "coord": [114.34485589209454, 38.076836312345094, 105.75749666860541],
  //     "speed": 5,
  //       "hovertime": 10,
  //         "radius": 25,
  //           "photo": "0=不拍照;1=拍照",
  //             "heightmode": "00=独立控制;01=高度优先;10=斜线优先",
  //               "turning": "00=悬停转弯;01=内切转弯"

  // },

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
      console.log('handleSave -> row:', row);
      row.data = JSON.stringify(row.data);
      console.log('handleSave -> row:', row);
      const response = await updateFly(row);
      // console.log('*fetchDashboardInfo -> response:', response);
      const { code, result } = response;
      console.log('getData', code);
      if (code === '000000') {
        message.success('修改成功');
        fetchFlyData({ pageSize: 10, current: 1 });
      }
      dispatch({
        type: 'dashboardModel/changeDestoryTackSignal',
        payload: [true],
      });
      setShowDrawer(false);
    } catch (error) {
      message.success('修改失败');
      console.log('catch getData:', error);
    }
  };
  function isJSON(jsonString: any) {
    try {
      JSON.parse(jsonString);
      console.log('toggleDrawer -> jsonString:', jsonString);
      return true;
    } catch (error) {
      console.log('toggleDrawer -> jsonString:', jsonString);
      return false;
    }
  }

  /**
   *打开当前路线,设置当前的路线值
   *
   * @param {*} data
   */
  const toggleDrawer = (item: any) => {
    dispatch({
      type: 'dashboardModel/changeDestoryTackSignal',
      payload: [true],
    });
    console.log('toggleDrawer -> item:', item);
    // isJSON(item.data);
    let parsedArray;
    if (isJSON(item.data)) {
      parsedArray = JSON.parse(item.data);
      // const parsedArray1 = JSON.parse(parsedArray);
      console.log('toggleDrawer -> parsedArray:', parsedArray);
      item.data = parsedArray;
    }
    // 将解析后的对象转换为数组

    setcurrentRoad(item);
    setShowDrawer(true);
  };

  const closeDrawer = async (data: any) => {
    setShowDrawer(false);
    dispatch({
      type: 'dashboardModel/changeDestoryTackSignal',
      payload: [true],
    });
  };

  /**
   *
   *
   * @param {*} value 当前节点输入的值
   * @param {*} index 当前节点的索引
   * @param {*} key 当前修改对应的键
   */
  const changeNode = (value: any, index: any, key: any) => {
    // const tempNode = {
    //   coord: currentRoad.data[index]?.coord ? currentRoad.data[index].coord : '1',
    //   name: value,
    // };
    currentRoad.data[index][key] = value;
    console.log('changeNodeName -> currentRoad:', currentRoad);
    setcurrentRoad(currentRoad);
  };

  //
  const roadData = useSelector((state: any) => state.dashboardModel.currentRoad);

  // 路线完成进行更新
  useEffect(() => {
    console.log('roadData:', roadData);
    // 格式坐标数据为节点数据
    if (roadData?.length > 0) {
      const data: any = [];
      console.log('roadData -> data:', data);
      roadData.map((item: any, index: any) => {
        console.log('roadData.map -> item:', item);
        // data[index].coord = item.coord;
        // data[index].name = index + '号';
        data.push({
          coord: item,
          name: index + '号',
          speed: 5,
          hovertime: 10,
          radius: 25,
          photo: '0', //0拍照  ,1不拍照
          heightmode: '00', //
          turning: '00',
        });
        return;
      });
      currentRoad.data = data;
      console.log('editRoad -> currentRoad:', currentRoad);
      setcurrentRoad(currentRoad);
    }

    // 飞行模拟数据
  }, [roadData]);

  /**
   *路线编辑
   *
   * @param {*} e
   */
  const editRoad = (e: any) => {
    // setEditRoadSignal(e);
    // 发送编辑信号
    dispatch({
      type: 'dashboardModel/changeEditRoadSignal',
      payload: !e,
    });

    // 路线编辑完成
    if (e) {
      // @ts-ignore
      // currentRoad.data = roadData;
      // 发送当前路径数据
      // dispatch({
      //   type: 'dashboardModel/changeEditRoadSignal',
      //   payload: currentRoad,
      // });
      console.log('editRoad -> currentRoad:', currentRoad.data);
      setcurrentRoad(currentRoad);
    }
  };

  /**
   *查看当前路径
   *
   */
  const lookCurrentRoad = () => {
    if (currentRoad.data[0]?.coord) {
      console.log('lookCurrentRoad -> currentRoad:', currentRoad);
      dispatch({
        type: 'dashboardModel/saveCurrentFlyingRoad',
        payload: currentRoad.data,
      });
    } else {
      message.success('请先绘制航线');
    }
  };
  ////////////////////
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
            添加
          </Button>
        </div>
      ),
      dataIndex: 'operation',
      width: '20%',
      // @ts-ignore
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Button type="primary" onClick={() => toggleDrawer(record)}>
            查看
          </Button>
        ) : null,
    },
  ];

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
          <Row>
            <Col
              span={5}
              className={styles.title}
              onClick={() => {
                closeDrawer(currentRoad);
              }}
            >
              <RollbackOutlined /> 返回
            </Col>
            <Col span={14}>
              <div className={styles.title}>{currentRoad.name}</div>
            </Col>
            <Col
              span={5}
              className={styles.title}
              onClick={() => {
                // @ts-ignore
                handleSave(currentRoad);
              }}
            >
              <CheckOutlined />
              保存
            </Col>
          </Row>
          <List
            // pagination={{
            //   pageSize: 3,
            //   showSizeChanger: false,
            // }}
            dataSource={currentRoad.data}
            renderItem={(item: NodeType, index) => (
              <div className={styles.nodeList}>
                {console.log('nodeitem', item)}

                <Row>
                  <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                    经度
                  </Col>
                  <Col span={12} style={{ color: 'white' }}>
                    {/* {item?.coord[0]} */}
                    {item?.coord ? item.coord[0] : 'default'}
                  </Col>
                </Row>
                <Row>
                  <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                    维度
                  </Col>
                  <Col span={12} style={{ color: 'white' }}>
                    {/* {item?.coord[1]} */}
                    {item?.coord ? item.coord[1] : 'default'}
                  </Col>
                </Row>
                <Row>
                  <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                    高度
                  </Col>
                  <Col span={12} style={{ color: 'white' }}>
                    {item?.coord ? item.coord[2] : 'default'}

                    {/* {item?.coord[2]} */}
                  </Col>
                </Row>
                <Row>
                  <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                    距离上一点
                  </Col>
                  <Col span={12} style={{ color: 'white' }}>
                    {item?.coord ? item.coord[2] : 'default'}
                    {/* {item?.coord[2]} */}
                  </Col>
                </Row>
                <Row>
                  <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                    节点名称
                  </Col>
                  {/* <Col span={12} style={{ color: 'white' }} className={styles.inputDiv}> */}
                  <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                    {item?.name ? item.name : 'default'}
                    {/* <Input
                      className={styles.inputName}
                      readOnly={true}
                      defaultValue={item.name}
                      placeholder="请输入节点名称"
                      onChange={(e) => {
                        changeNodeName(e, index);
                      }}
                    /> */}
                  </Col>
                </Row>
                <Row>
                  <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                    高度模式
                  </Col>
                  <Col span={12} style={{ color: 'white' }}>
                    <Select
                      id="showStatus"
                      defaultValue={item.heightmode}
                      onChange={(value) => {
                        changeNode(value, index, 'heightmode');
                      }}
                    >
                      <Select.Option value={'00'}>独立控制</Select.Option>
                      <Select.Option value={'01'}>高度优先</Select.Option>
                      <Select.Option value={'10'}>斜线控制</Select.Option>
                    </Select>
                    {/* <Select defaultValue="default" onChange={handleChange} options={roadList} /> */}
                  </Col>
                </Row>
                <Row>
                  <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                    转弯方式
                  </Col>
                  <Col span={12} style={{ color: 'white' }}>
                    <Select
                      id="showStatus"
                      defaultValue={item.turning}
                      onChange={(value) => {
                        changeNode(value, index, 'turning');
                      }}
                    >
                      <Select.Option value={'00'}>悬停转弯</Select.Option>
                      <Select.Option value={'01'}>内切转弯</Select.Option>
                    </Select>
                  </Col>
                </Row>
                <Row>
                  <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                    拍照
                  </Col>
                  <Col span={12} style={{ color: 'white' }}>
                    <Select
                      id="showStatus"
                      defaultValue={item.photo}
                      onChange={(value) => {
                        changeNode(value, index, 'photo');
                      }}
                    >
                      <Select.Option value={'0'}>不拍照</Select.Option>
                      <Select.Option value={'1'}>拍照</Select.Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            )}
          />
          <Row>
            <Col span={9} offset={2}>
              <Button
                type="primary"
                onClick={() => {
                  editRoad(editRoadSignal);
                }}
              >
                {editRoadSignal ? '编辑完成' : '航线编辑'}
              </Button>
            </Col>
            <Col span={9} offset={2}>
              <Button
                type="primary"
                onClick={() => {
                  lookCurrentRoad();
                }}
              >
                预览航线
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
