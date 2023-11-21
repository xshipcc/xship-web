/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-17 01:53:31
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\component\dialog\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Input, InputNumber, Modal, Row, Select, message } from 'antd';

import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { useDispatch, useSelector } from 'umi';
interface Route {
  coord: [number, number, number]; // 经度、纬度、高度
  radius: number; // 半径
  time: number; // 时间
  direction: '00' | '01'; // 00=逆时针;01=顺时针
  mode: '00' | '01'; // 00=定点;01=环绕
  speed: number; // 速度
}
export default (props: any) => {
  const { open, client } = props;
  console.log('props:', props);
  const dispatch = useDispatch();

  // 定点巡航
  const isModalOpen = useSelector((state: any) => state.dashboardModel.isModalOpen);

  const currentPoint: Route = useSelector((state: any) => state.dashboardModel.currentPoint);
  const [currentPointCache, setcurrentPointCache] = useState<Route>(
    JSON.parse(JSON.stringify(currentPoint)),
  );

  const sendMqttControl = (param: any, type: string) => {
    const controlInfo = {
      cmd: type + '/' + param,
      data: currentPointCache,
    };
    console.log('sendMqttControl -> controlInfo:', controlInfo);
    console.log('sendMqttControl -> controlInfo:', JSON.stringify(controlInfo));
    client.publish('control', JSON.stringify(controlInfo));
  };

  const handleOk = () => {
    dispatch({
      type: 'dashboardModel/changeisModalOpen',
      payload: false,
    });

    sendMqttControl('point', 'drone');
    message.success('定点巡航');
  };

  const handleCancel = () => {
    dispatch({
      type: 'dashboardModel/changeisModalOpen',
      payload: false,
    });
    message.success('取消');
  };
  return (
    <div className={styles.dialog}>
      <Modal title="定点悬停" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className={styles.nodeList}>
          <Row>
            <Col span={12} style={{ color: 'black' }}>
              经度
            </Col>
            <Col span={12} style={{ color: 'black' }}>
              {/* {item?.coord[0]} */}
              <Input
                className={styles.inputName}
                readOnly={false}
                defaultValue={currentPointCache.coord[0]}
                placeholder="请输入经度"
                onChange={(e) => {
                  setcurrentPointCache((data) => {
                    //@ts-ignore
                    data.coord[0] = e.target.value;
                    return data;
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ color: 'black' }}>
              维度
            </Col>
            <Col span={12} style={{ color: 'black' }}>
              {/* {item?.coord[1]} */}
              <Input
                className={styles.inputName}
                readOnly={false}
                defaultValue={currentPointCache.coord[1]}
                placeholder="请输入维度"
                onChange={(e) => {
                  setcurrentPointCache((data) => {
                    //@ts-ignore
                    data.coord[1] = e.target.value;
                    return data;
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ color: 'black' }}>
              高度
            </Col>
            <Col span={12} style={{ color: 'black' }}>
              <Input
                className={styles.inputName}
                readOnly={false}
                defaultValue={currentPointCache.coord[2]}
                placeholder="请输入高度"
                onChange={(e) => {
                  setcurrentPointCache((data) => {
                    //@ts-ignore
                    data.coord[2] = e.target.value;
                    return data;
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ color: 'black' }}>
              半径
            </Col>
            <Col span={12} style={{ color: 'black' }}>
              <Input
                className={styles.inputName}
                readOnly={false}
                defaultValue={currentPointCache.coord[2]}
                placeholder="请输入半径"
                onChange={(e) => {
                  setcurrentPointCache((data) => {
                    //@ts-ignore
                    data.radius = e.target.value;
                    return data;
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ color: 'black' }}>
              时间
            </Col>
            {/* <Col span={12} style={{ color: 'white' }} className={styles.inputDiv}> */}
            <Col span={12} style={{ color: 'black' }}>
              <Input
                className={styles.inputName}
                readOnly={false}
                defaultValue={currentPointCache.time}
                placeholder="请输入时间s"
                onChange={(e) => {
                  setcurrentPointCache((data) => {
                    //@ts-ignore
                    data.time = e.target.value;
                    return data;
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ color: 'black' }}>
              方向
            </Col>
            <Col span={12} style={{ color: 'black' }}>
              <Select
                id="showStatus"
                defaultValue={currentPointCache.direction}
                onChange={(value) => {
                  setcurrentPointCache((data) => {
                    //@ts-ignore
                    data.direction = value;
                    return data;
                  });
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
            <Col span={12} style={{ color: 'black' }}>
              模式
            </Col>
            <Col span={12} style={{ color: 'black' }}>
              <Select
                id="showStatus"
                defaultValue={currentPointCache.mode}
                onChange={(value) => {
                  setcurrentPointCache((data) => {
                    //@ts-ignore
                    data.mode = value;
                    return data;
                  });
                }}
              >
                <Select.Option value={'00'}>悬停转弯</Select.Option>
                <Select.Option value={'01'}>内切转弯</Select.Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ color: 'black' }}>
              速度
            </Col>
            {/* <Col span={12} style={{ color: 'white' }} className={styles.inputDiv}> */}
            <Col span={12} style={{ color: 'black' }}>
              <Input
                className={styles.inputName}
                readOnly={false}
                defaultValue={currentPointCache.speed}
                placeholder="请输入速度"
                onChange={(e) => {
                  setcurrentPointCache((data) => {
                    //@ts-ignore
                    data.speed = e.target.value;
                    return data;
                  });
                }}
              />
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

// export default AwarenessButton;
