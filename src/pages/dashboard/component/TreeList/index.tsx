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
import type { InputRef } from 'antd';
import { queryFly } from '@/pages/drone/routePlan/service';
import type {
  ListUavFlyReqType,
  ListUavFlyRespType,
  NodeType,
  ListUavFlyDataType,
} from '@/pages/drone/routePlan/data';

const App = () => {
  const [flyData, setFlyData] = useState<ListUavFlyDataType[]>(null);
  const [flyNameList, setflyNameList] = useState([]);

  // 获取航线数据
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
  }, []);
  // 获取名称列表
  useEffect(() => {
    const nameListData = flyData?.map((item) => item.name);
    setflyNameList(nameListData);
  }, [flyData]);

  const [data, setData] = useState([
    { key: '0', name: 'Edwad', coord: '114.292, 38.067,100', stay: '1', parent: '东北' },
    { key: '1', name: 'Edwa', coord: '114.293, 38.067,100', stay: '2', parent: '东北' },
  ]);

  const [editSignal, setEditSignal] = useState(true);

  const [listIndex, setlistIndex] = useState(data.length);
  // 获取全局的轨迹信息
  const dispatch = useDispatch();

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
  };

  const handleSaveList = () => {
    setlistIndex(0);
    setData([]);
  };

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

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setflyNameList([...flyNameList, name || `路线${indexItem++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const handleChange = (value: string) => {
    setCurrentFly(flyData.find((item) => item.name === value));

    console.log('handleChange -> currentFly:', currentFly);
  };
  const changelan = (value: string) => {
    // setCurrentFly(flyData.find((item) => item.name === value));
  };
  const changelalt = (value: string) => {
    // setCurrentFly(flyData.find((item) => item.name === value));
  };
  const changealt = (value: string) => {
    // setCurrentFly(flyData.find((item) => item.name === value));
  };

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
        <Col span={12} className={'title'}>
          <Button
            type="text"
            className={styles.button}
            onClick={() => {
              editTrack();
            }}
          >
            航线编辑
          </Button>
        </Col>
        <Col span={12} className={'title'}>
          <Button type="text" className={styles.button} onClick={() => {}}>
            保存信息
          </Button>
        </Col>
      </Row>
      <div className={styles.nodeList}>
        {currentFly?.data.map((item: NodeType) => (
          <div key={item.id}>
            <Row className={styles.header}>
              <Col span={6} className={styles.headerTitle}>
                {item.name}
              </Col>
              <Col span={18}>
                <Space.Compact size="middle">
                  <Input
                    defaultValue={JSON.parse(item.coord)[0]}
                    placeholder="请输入经度"
                    onChange={changelan}
                  />
                  <Input
                    defaultValue={JSON.parse(item.coord)[1]}
                    placeholder="请输入维度"
                    onChange={changelalt}
                  />
                  <Input
                    defaultValue={JSON.parse(item.coord)[2]}
                    placeholder="请输入高度"
                    onChange={changealt}
                  />
                </Space.Compact>
              </Col>
            </Row>
            <div className={styles.tableContent}>
              <TableEditable listData={item.nodeData} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
