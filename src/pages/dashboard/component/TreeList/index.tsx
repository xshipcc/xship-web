// @ts-nocheck
import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { useSelector, useDispatch, useModel } from 'umi';
import styles from './index.less';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Select, Button } from 'antd';
import { Table } from 'antd';
import TableEditable from './table';
// const DropList: React.FC = (data: any) => {};

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
  const [collapse, setCollapse] = useState(true);
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

  return (
    <div className={styles.content}>
      <Row>
        <Col span={16} className={styles.dropList}>
          <div className={styles.selectname}>
            <Select
              labelInValue
              defaultValue={{ value: 'demo', label: 'demo' }}
              style={{ width: 160 }}
              onChange={handleChange}
              options={listdata}
            />
          </div>
        </Col>
        <Col span={7} offset={1} className={styles.add} onClick={() => handleListAdd()}>
          添加
        </Col>
      </Row>
      <Row className={styles.header}>
        <Col span={2}>
          {collapse ? (
            <CaretRightOutlined
              className={styles.collpase}
              onClick={() => {
                setCollapse(false);
              }}
            />
          ) : (
            <CaretDownOutlined
              className={styles.collpase}
              onClick={() => {
                setCollapse(true);
              }}
            />
          )}
        </Col>
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
      <table>
        {collapse ? null : (
          <div className={styles.tableContent}>
            {/* <Table columns={columns} dataSource={tableData} pagination={false} size="small" /> */}
            <TableEditable listData={listdata} />
          </div>
        )}
      </table>
    </div>
  );
};

export default App;
