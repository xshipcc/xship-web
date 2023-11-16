/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-02 10:32:56
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\component\button\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Input, InputNumber, Modal, Row, Select, message } from 'antd';

import React, { useState } from 'react';
import styles from './index.less';
export default (props: any) => {
  interface Route {
    coord: [number, number, number]; // 经度、纬度、高度
    radius: number; // 半径
    time: number; // 时间
    direction: '00' | '01'; // 00=逆时针;01=顺时针
    mode: '00' | '01'; // 00=定点;01=环绕
    speed: number; // 速度
  }
  // 定点巡航
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [currentPoint, setcurrentPoint] = useState<Route>({
    coord: [114.33264199360657, 38.0865966192828, 111],
    speed: 5,
    time: 10,
    radius: 25,
    mode: '00', // "00=定点;01=环绕",
    direction: '00', //"00=逆时针;01=顺时针"
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    message.success('确认');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal title="定点悬停" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div className={styles.nodeList}>
        <Row>
          <Col span={12} style={{ color: 'black', fontFamily: 'YouSheBiaoTiHei' }}>
            经度
          </Col>
          <Col span={12} style={{ color: 'black' }}>
            {/* {item?.coord[0]} */}
            <Input
              className={styles.inputName}
              readOnly={false}
              defaultValue={currentPoint.coord[0]}
              placeholder="请输入经度"
              onChange={(e) => {
                // changeNodeName(e, index);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ color: 'black', fontFamily: 'YouSheBiaoTiHei' }}>
            维度
          </Col>
          <Col span={12} style={{ color: 'black' }}>
            {/* {item?.coord[1]} */}
            <Input
              className={styles.inputName}
              readOnly={false}
              defaultValue={currentPoint.coord[1]}
              placeholder="请输入维度"
              onChange={(e) => {
                // changeNodeName(e, index);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ color: 'black', fontFamily: 'YouSheBiaoTiHei' }}>
            高度
          </Col>
          <Col span={12} style={{ color: 'black' }}>
            <Input
              className={styles.inputName}
              readOnly={false}
              defaultValue={currentPoint.coord[2]}
              placeholder="请输入高度"
              onChange={(e) => {
                // changeNodeName(e, index);
              }}
            />
            {/* {currentPoint?.coord ? currentPoint.coord[2] : 'default'} */}
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ color: 'black', fontFamily: 'YouSheBiaoTiHei' }}>
            半径
          </Col>
          {/* <Col span={12} style={{ color: 'white' }} className={styles.inputDiv}> */}
          <Col span={12} style={{ color: 'black', fontFamily: 'YouSheBiaoTiHei' }}>
            <InputNumber
              min={1}
              max={10}
              defaultValue={currentPoint.radius}
              // onChange=
              // {onChange}
            />
            ;
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ color: 'black', fontFamily: 'YouSheBiaoTiHei' }}>
            时间
          </Col>
          {/* <Col span={12} style={{ color: 'white' }} className={styles.inputDiv}> */}
          <Col span={12} style={{ color: 'black', fontFamily: 'YouSheBiaoTiHei' }}>
            <Input
              className={styles.inputName}
              readOnly={false}
              defaultValue={currentPoint.time}
              placeholder="请输入节点名称"
              onChange={(e) => {
                // changeNodeName(e, index);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ color: 'black', fontFamily: 'YouSheBiaoTiHei' }}>
            方向
          </Col>
          <Col span={12} style={{ color: 'black' }}>
            <Select
              id="showStatus"
              defaultValue={currentPoint.direction}
              onChange={(value) => {
                // changeNode(value, index, 'heightmode');
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
          <Col span={12} style={{ color: 'black', fontFamily: 'YouSheBiaoTiHei' }}>
            模式
          </Col>
          <Col span={12} style={{ color: 'black' }}>
            <Select
              id="showStatus"
              defaultValue={currentPoint.mode}
              onChange={(value) => {
                // changeNode(value, index, 'turning');
              }}
            >
              <Select.Option value={'00'}>悬停转弯</Select.Option>
              <Select.Option value={'01'}>内切转弯</Select.Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ color: 'black', fontFamily: 'YouSheBiaoTiHei' }}>
            速度
          </Col>
          {/* <Col span={12} style={{ color: 'white' }} className={styles.inputDiv}> */}
          <Col span={12} style={{ color: 'black', fontFamily: 'YouSheBiaoTiHei' }}>
            <InputNumber
              min={1}
              max={10}
              defaultValue={currentPoint.speed}
              // onChange=
              // {onChange}
            />
            ;
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

// export default AwarenessButton;
