/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-09 20:12:31
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-21 12:55:23
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Header\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import 'cesium/Source/Widgets/widgets.css';
import { Button, Col, Row, message } from 'antd';

import Timer from '@/pages/dashboard/component/Timer';
import { useSelector, useDispatch } from 'umi';
import { history } from 'umi';
export const Header: React.FC = () => {
  //   const currentComponent = useSelector((state: any) => state.dashboardModel.currentComponent);
  const dispatch = useDispatch();
  const currentComponent = useSelector((state: any) => state.dashboardModel.currentComponent);
  const [activeIndex, setActiveIndex] = useState(currentComponent);

  const ChangeComponent = (componentName: string) => {
    dispatch({
      type: 'dashboardModel/changeCurrentComponent',
      payload: componentName,
    });
    setActiveIndex(componentName);
  };

  return (
    <div>
      <Timer />
      <div
        className={styles.home}
        onClick={() => {
          history.push('/');
          window.location.reload();
        }}
      />

      {/*  */}
      <div className={styles.header}>
        <div
          className={styles.title}
          onClick={() => {
            dispatch({
              type: 'dashboardModel/changeCentering',
              payload: Math.random(),
            });
            message.success('场景归中');
          }}
        >
          无人机自动巡检系统
        </div>
        <Row className={styles.buttonRow}>
          <Col span={2} offset={8}>
            <Button
              type="text"
              className={activeIndex === 'Analysis' ? styles.buttonActive : styles.button}
              onClick={() => {
                ChangeComponent('Analysis');
              }}
            >
              统计分析
            </Button>
          </Col>
          <Col span={2}>
            <Button
              type="text"
              className={activeIndex === 'Awareness' ? styles.buttonActive : styles.button}
              onClick={() => {
                ChangeComponent('Awareness');
              }}
            >
              态势感知
            </Button>
          </Col>
          <Col span={2}>
            <Button
              type="text"
              className={activeIndex === 'Monitor' ? styles.buttonActive : styles.button}
              onClick={() => {
                ChangeComponent('Monitor');
              }}
            >
              监控查看
            </Button>
          </Col>
          <Col span={2}>
            <Button
              type="text"
              className={activeIndex === 'Routemark' ? styles.buttonActive : styles.button}
              onClick={() => {
                ChangeComponent('Routemark');
              }}
            >
              路径规划
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

// export default Dashboard;
