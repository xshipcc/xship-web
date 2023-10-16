/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-09 20:12:31
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-16 02:29:49
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\header\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import 'cesium/Source/Widgets/widgets.css';
import { Button, Col, Row } from 'antd';

import Timer from '@/pages/dashboard/component/Timer';
import { useSelector, useDispatch } from 'umi';
import { history } from 'umi';
export const Header: React.FC = () => {
  //   const currentComponent = useSelector((state: any) => state.dashboardModel.currentComponent);
  const dispatch = useDispatch();

  const ChangeComponent = (componentName: string) => {
    dispatch({
      type: 'dashboardModel/fetchDashboardInfo',
      payload: { name: componentName },
    });
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div>
      <Timer />
      <div className={styles.home} onClick={() => history.push('/')} />

      <div className={styles.logo} />
      {/*  */}
      <Row className={styles.header}>
        <Col span={1} className={styles.logo} />

        <Col span={4} offset={1} className={styles.text}>
          <p className={styles.textbig}>无人机自动巡检系统</p>
          <p className={styles.textsmall}>UAV Automated Inspection System</p>
        </Col>

        <Col span={19} className={styles.rightheader}>
          <Button
            type="text"
            className={activeIndex === 0 ? styles.buttonActive : styles.button}
            onClick={() => {
              ChangeComponent('Analysis');
              handleClick(0);
            }}
          >
            统计分析
          </Button>
          <Button
            type="text"
            className={activeIndex === 1 ? styles.buttonActive : styles.button}
            onClick={() => {
              ChangeComponent('Awareness');
              handleClick(1);
            }}
          >
            态势感知
          </Button>
          <Button
            type="text"
            className={activeIndex === 2 ? styles.buttonActive : styles.button}
            onClick={() => {
              ChangeComponent('Monitor');
              handleClick(2);
            }}
          >
            监控查看
          </Button>
          <Button
            type="text"
            className={activeIndex === 3 ? styles.buttonActive : styles.button}
            onClick={() => {
              ChangeComponent('Routemark');
              handleClick(3);
            }}
          >
            路径规划
          </Button>
        </Col>
      </Row>
    </div>
  );
};

// export default Dashboard;
