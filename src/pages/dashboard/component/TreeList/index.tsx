// @ts-nocheck
import React, { useState, useRef } from 'react';
import { Col, Row } from 'antd';
import { useSelector, useDispatch, useModel } from 'umi';
import styles from './index.less';
import { Select, Button } from 'antd';
import TableEditable from './table';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Space } from 'antd';
import type { InputRef } from 'antd';

const App = () => {
  const [data, setData] = useState([
    { key: '0', name: 'Edwad', coord: '114.292, 38.067,100', stay: '1', parent: '东北' },
    { key: '1', name: 'Edwa', coord: '114.293, 38.067,100', stay: '2', parent: '东北' },
  ]);
  const [listdata, setList] = useState([
    { value: '东北', label: '东北' },
    { value: 'Edwa', label: 'Edwa' },
  ]);

  const [currentList, setCurrentList] = useState(listdata[0].label);
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

  const handleListAdd = () => {
    const newData = [{ key: listIndex + '', name: '', coord: '', stay: '' }];
    setData(newData);
    setList([...listdata, { value: '测试', label: '测试' }]);
    setCurrentList('测试');
    setlistIndex(newData.length);
  };
  const handleChange = (value: string) => {
    console.log(value);
    console.log('routeList:', listdata);
    // setCurrentList(value);
  };

  /**
   *  @file index.tsx
   *  @time 2023/10/01
   * @category :
   * @function :
   */
  //#region -------------------------------------------------------------------------
  let indexItem = 0;
  const [items, setItems] = useState(['jack', 'lucy']);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setItems([...items, name || `New item ${indexItem++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
  return (
    <div className={styles.content}>
      <Select
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
                Add item
              </Button>
            </Space>
          </>
        )}
        options={items.map((item) => ({ label: item, value: item }))}
      />

      <Row className={styles.header}>
        <Col span={2}></Col>
        <Col span={12} className={styles.headerTitle}>
          {currentList}
        </Col>
        {editSignal ? (
          <Col span={5} className={styles.headerEdit} onClick={() => editTrack()}>
            编辑
          </Col>
        ) : (
          <Col span={5} className={styles.headerEdit} onClick={() => handleSaveList()}>
            保存
          </Col>
        )}
        <Col span={5} className={styles.headerDel} onClick={() => editTrackOver()}>
          执行
        </Col>
      </Row>
      <div className={styles.tableContent}>
        <TableEditable listData={listdata} />
      </div>
    </div>
  );
};

export default App;
