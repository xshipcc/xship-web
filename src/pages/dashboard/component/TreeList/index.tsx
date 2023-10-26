// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { Col, Row } from 'antd';
import { useSelector, useDispatch } from 'umi';
import styles from './index.less';
import { Select, Button } from 'antd';
import TableEditable from './table';
import { PlusOutlined } from '@ant-design/icons';
import { SaveOutlined } from '@ant-design/icons';
import { Divider, Input, Space } from 'antd';
import { message } from 'antd';
import type { InputRef } from 'antd';
import { queryFly, addFly } from '@/pages/drone/routePlan/service';
import type {
  ListUavFlyReqType,
  ListUavFlyRespType,
  NodeType,
  ListUavFlyDataType,
} from '@/pages/drone/routePlan/data';

const App = () => {
  /**
   *  @file index.tsx
   *  @time 2023/10/26
   * @category :数据初始化
   * @function :
   */
  //#region -------------------------------------------------------------------------

  const [flyData, setFlyData] = useState<ListUavFlyDataType[]>(null);
  const [flyNameList, setFlyNameList] = useState([]);

  // 获取航线数据和航线名称列表
  useEffect(() => {
    const fetchFlyData = async (params: ListUavFlyReqType) => {
      try {
        const Data: ListUavFlyRespType = await queryFly(params);
        setFlyData(Data.data);

        return true;
      } catch (error) {
        return false;
      }
    };
    fetchFlyData({ pageSize: 10, current: 1 });
    const nameListData = flyData?.map((item) => item.name);
    setFlyNameList(nameListData);
  }, []);
  // 获取名称列表
  useEffect(() => {}, [flyData]);

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */

  /**
   *  @file index.tsx
   *  @time 2023/10/01
   * @category :
   * @function :
   */
  //#region -------------------------------------------------------------------------
  let indexItem = 0;
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);
  const [currentFly, setCurrentFly] = useState<ListUavFlyDataType>(null);
  const currentFlyCache = useRef<ListUavFlyDataType>(null);
  const initData = useSelector((state: any) => state.dashboardModel.currentFlyData);
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const [editSignal, setEditSignal] = useState(true);

  // 获取全局的轨迹信息
  const dispatch = useDispatch();
  const trackList = useSelector((state: any) => state.trackModel.trackList);
  const editTrack = () => {
    setEditSignal(false);
    dispatch({
      type: 'trackModel/changeEditSignal',
      payload: [true, false],
    });
  };
  const editTrackOver = () => {
    setEditSignal(true);
    dispatch({
      type: 'trackModel/changeEditSignal',
      payload: [false, true],
    });

    // console.log('App -> trackList:', trackList);`
    // console.log('App -> currentFly:', currentFly);

    const transformedArray = trackList.map(([longitude, latitude, height], index) => ({
      name: currentFly?.data[index]?.name ? currentFly.data[index]?.name : '',
      coord: `[${longitude},${latitude},${height}]`,
      nodeData: [],
    }));
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');

    const formattedTime = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
    const editData = {
      id: 0,
      name: name,
      create_time: formattedTime,
      creator: 'Paul Lewis',
      data: transformedArray,
    };
    // console.log('editTrackOver -> editData.name:', name);
    setCurrentFly(editData);
    currentFlyCache.current = editData;
  };

  useEffect(() => {
    dispatch({
      type: 'dashboardModel/saveCurrentFlyData',
      payload: currentFly,
    });
  }, [currentFly]);
  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setFlyNameList([...flyNameList, name || `路线${indexItem++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const isJson = (value) => {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  };
  const handleChange = (value: string) => {
    const current = flyData.find((item) => item.name === value);
    const json = isJson(current?.data);
    console.log('handleChange -> json:', json);
    if (current?.data && json) {
      current.data = JSON.parse(current?.data);
      console.log('handleChange -> JSON.parse(current?.data):', current);
    }

    setCurrentFly(current);
    setName(value);
    currentFlyCache.current = flyData.find((item) => item.name === value);
    dispatch({
      type: 'dashboardModel/saveCurrentFlyData',
      payload: currentFlyCache.current,
    });
    dispatch({
      type: 'trackModel/changeDestoryTackSignal',
      payload: [true],
    });
    dispatch({
      type: 'trackModel/changeEditSignal',
      payload: [false, true],
    });
  };
  // 实时修改经纬高,名称
  const changelan = (value: string, index: any) => {
    const Cache = currentFlyCache.current?.data.map((item: NodeType) => {
      if (item.name === index) {
        const cootdCache = JSON.parse(item.coord);
        cootdCache[0] = value.target.value;
        const updatedNode = Object.assign({}, item); // 创建一个新对象并复制属性
        updatedNode.coord = '[' + cootdCache + ']';
        return updatedNode;
      }
      return item;
    });
    // currentFlyCache.current.data = Cache;
    const updatedCurrentFlyCache = Object.assign({}, currentFlyCache.current); // 创建一个新对象并复制属性
    updatedCurrentFlyCache.data = Cache;
    // console.log('changealt -> updatedCurrentFlyCache:', updatedCurrentFlyCache);
    dispatch({
      type: 'dashboardModel/saveCurrentFlyData',
      payload: updatedCurrentFlyCache,
    });
  };
  const changelat = (value: string, index: any) => {
    const Cache = currentFlyCache.current?.data.map((item: NodeType) => {
      if (item.name === index) {
        const cootdCache = JSON.parse(item.coord);
        cootdCache[1] = value.target.value;
        const updatedNode = Object.assign({}, item); // 创建一个新对象并复制属性
        updatedNode.coord = '[' + cootdCache + ']';
        return updatedNode;
      }
      return item;
    });
    // currentFlyCache.current.data = Cache;
    const updatedCurrentFlyCache = Object.assign({}, currentFlyCache.current); // 创建一个新对象并复制属性
    updatedCurrentFlyCache.data = Cache;
    // console.log('changealt -> updatedCurrentFlyCache:', updatedCurrentFlyCache);
    dispatch({
      type: 'dashboardModel/saveCurrentFlyData',
      payload: updatedCurrentFlyCache,
    });
  };
  const changealt = (value: string, index: any) => {
    const Cache = currentFlyCache.current?.data.map((item: NodeType) => {
      if (item.name === index) {
        const cootdCache = JSON.parse(item.coord);
        cootdCache[2] = value.target.value;
        const updatedNode = Object.assign({}, item); // 创建一个新对象并复制属性
        updatedNode.coord = '[' + cootdCache + ']';
        return updatedNode;
      }
      return item;
    });
    // currentFlyCache.current.data = Cache;
    const updatedCurrentFlyCache = Object.assign({}, currentFlyCache.current); // 创建一个新对象并复制属性
    updatedCurrentFlyCache.data = Cache;
    // console.log('changealt -> updatedCurrentFlyCache:', updatedCurrentFlyCache);
    dispatch({
      type: 'dashboardModel/saveCurrentFlyData',
      payload: updatedCurrentFlyCache,
    });
  };
  // export interface AddUavFlyReqType {
  //   name: string;
  //   data: string;
  //   create_time: string;
  //   creator: string;
  // }
  const handleAdd = async () => {
    const params = {
      name: initData?.name ? initData?.name : '',
      data: initData?.data ? JSON.stringify(initData?.data) : '',
      create_time: initData?.create_time ? initData?.create_time : '',
      creator: initData?.creator ? initData?.creator : '',
    };
    console.log('handleAdd -> params:', params);

    const hide = message.loading('正在添加');
    try {
      await addFly({ ...params });
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };
  const changename = (value: string, index: any) => {
    const Cache = currentFlyCache.current?.data.map((item: NodeType) => {
      if (item.name === index) {
        const updatedNode = Object.assign({}, item); // 创建一个新对象并复制属性
        updatedNode.name = value.target.value;
        return updatedNode;
      }
      return item;
    });
    // currentFlyCache.current.data = Cache;
    const updatedCurrentFlyCache = Object.assign({}, currentFlyCache.current); // 创建一个新对象并复制属性
    updatedCurrentFlyCache.data = Cache;
    // console.log('changealt -> updatedCurrentFlyCache:', updatedCurrentFlyCache);
    dispatch({
      type: 'dashboardModel/saveCurrentFlyData',
      payload: updatedCurrentFlyCache,
    });
  };
  // 子组件实例方法
  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
  return (
    <div className={styles.content}>
      <Row className={styles.selcet}>
        <Col span={24}>
          <Select
            onChange={handleChange}
            style={{ width: '100%' }}
            placeholder="custom dropdown render"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Space style={{ padding: '0 8px 4px' }}>
                  <Input
                    placeholder="Please enter item"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    添加路线
                  </Button>
                </Space>
              </>
            )}
            options={flyNameList?.map((item) => ({ label: item, value: item }))}
          />
        </Col>
      </Row>
      <Row className={styles.buttonRow}>
        <Col span={10}>
          {editSignal ? (
            <Button
              type="text"
              className={styles.button}
              onClick={() => {
                editTrack();
              }}
            >
              航线编辑
            </Button>
          ) : (
            <Button
              type="text"
              className={styles.button}
              onClick={() => {
                editTrackOver();
              }}
            >
              编辑完成
            </Button>
          )}
        </Col>
        <Col span={10} offset={4} className={'title'}>
          <Button
            type="text"
            className={styles.button}
            onClick={() => {
              handleAdd();
            }}
          >
            保存航线
          </Button>
        </Col>
      </Row>
      <div className={styles.nodeList}>
        {currentFly?.data.map((item: NodeType) => (
          <div key={item.id}>
            <Row className={styles.header}>
              <Col span={6}></Col>
              <Col span={18}></Col>
            </Row>

            {/* <div className={styles.tableContent}>
              <TableEditable listData={item} />
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
// <Row className={styles.header}>
//   <Col span={6}>
//     <Input
//       defaultValue={item.name}
//       placeholder="请输入名称"
//       onChange={(e) => {
//         changename(e, item.name);
//       }}
//     />
//   </Col>
//   <Col span={18}>
//     <Space.Compact size="middle">
//       <Input
//         defaultValue={JSON.parse(item.coord)[0]}
//         placeholder="请输入经度"
//         readOnly="true"
//         onChange={(e) => {
//           changelan(e, item.name);
//         }}
//       />
//       <Input
//         defaultValue={JSON.parse(item.coord)[1]}
//         placeholder="请输入维度"
//         readOnly="true"
//         onChange={(e) => {
//           changelat(e, item.name);
//         }}
//       />
//       <Input
//         defaultValue={JSON.parse(item.coord)[2]}
//         placeholder="请输入高度"
//         readOnly="true"
//         onChange={(e) => {
//           changealt(e, item.name);
//         }}
//       />
//     </Space.Compact>
//   </Col>
// </Row>
