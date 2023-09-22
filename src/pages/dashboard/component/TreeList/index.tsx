// @ts-nocheck
import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { useSelector, useDispatch, useModel } from 'umi';
import styles from './index.less';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
const App = () => {
  const [data, setData] = useState([
    { key: '0', name: 'Edwad', coord: '114.292, 38.067,100', stay: '1' },
    { key: '1', name: 'Edwa', coord: '114.293, 38.067,100', stay: '2' },
  ]);

  const [editIndex, setEditIndex] = useState(-1);
  const [editData, setEditData] = useState({});
  const [collapse, setCollapse] = useState(true);
  const [editSignal, setEditSignal] = useState(true);

  const [listIndex, setlistIndex] = useState(data.length);
  // 获取全局的轨迹信息
  const dispatch = useDispatch();
  const trackList = useSelector((state: any) => state.trackModel.trackList);
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData({ ...data[index] });
  };

  const handleSave = () => {
    if (editIndex !== -1) {
      const newData = [...data];
      newData[editIndex] = editData;
      setData(newData);
      setEditIndex(-1);
      setEditData({});
    }
  };

  const handleCancel = () => {
    setEditIndex(-1);
    setEditData({});
  };

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

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setlistIndex(data.length - 1);
    setData(newData);
  };
  const handleDeleteWhole = () => {
    setlistIndex(0);
    setData([]);
  };
  const handleAdd = () => {
    const newData = [...data, { key: listIndex + '', name: '', coord: '', stay: '' }];
    console.log('handleAdd -> newData:', newData);
    // const newElement = { key: '2', name: '', coord: '', stay: '' };
    // data.push(newElement);
    setData(newData);
    setlistIndex(newData.length);
  };
  // const handleCollapse = (index) => {};
  return (
    <div className={styles.content}>
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
          东北五三线
        </Col>
        {editSignal ? (
          <Col span={5} className={styles.headerEdit} onClick={() => editTrack()}>
            编辑
          </Col>
        ) : (
          <Col span={5} className={styles.headerEdit} onClick={() => editTrackOver()}>
            完成
          </Col>
        )}

        <Col span={5} className={styles.headerDel} onClick={() => handleDeleteWhole()}>
          删除
        </Col>
      </Row>

      <table>
        {collapse ? null : (
          <>
            <Row className={styles.title}>
              <Col span={3}>序号</Col>
              <Col span={5}>命名</Col>
              <Col span={4}>坐标</Col>
              <Col span={7}>停留时间</Col>
              <Col span={5} className={styles.titleGreen} onClick={handleAdd}>
                添加
              </Col>
            </Row>
            {data.map((item, index) => (
              <div
                key={item.key}
                className={styles.textRow}
                style={{
                  background: index % 2 === 0 ? 'rgb(9, 16, 23)' : 'rgb(56, 68, 76)',
                }}
              >
                <div className={styles.textStyle}>{item.key}</div>
                <div>
                  {editIndex === index ? (
                    <input
                      type="text"
                      className={styles.inputStyle}
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  ) : (
                    <div className={styles.textStyle}>{item.name}</div>
                  )}
                </div>
                <div>
                  {editIndex === index ? (
                    <input
                      type="text"
                      className={styles.coordinput}
                      value={editData.coord}
                      onChange={(e) => setEditData({ ...editData, coord: e.target.value })}
                    />
                  ) : (
                    <div className={styles.coord}>{item.coord}</div>
                  )}
                </div>
                <div>
                  {editIndex === index ? (
                    <input
                      type="text"
                      className={styles.inputStyle}
                      value={editData.stay}
                      onChange={(e) => setEditData({ ...editData, stay: e.target.value })}
                    />
                  ) : (
                    <div className={styles.textStyle}>{item.stay}</div>
                  )}
                </div>
                <div>
                  {editIndex === index ? (
                    <>
                      <text className={styles.textred} onClick={handleSave}>
                        保存
                      </text>
                      <text className={styles.textblue} onClick={handleCancel}>
                        取消
                      </text>
                    </>
                  ) : (
                    <>
                      <text className={styles.textred} onClick={() => handleEdit(index)}>
                        编辑
                      </text>
                      <text className={styles.textblue} onClick={() => handleDelete(index)}>
                        删除
                      </text>
                    </>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </table>
    </div>
  );
};

export default App;
