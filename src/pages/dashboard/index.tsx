// @ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-09 20:12:31
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-17 14:57:04
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useRef, useState } from 'react';
import styles from './dashboard.less';
import 'cesium/Source/Widgets/widgets.css';
import { Button, Col, Row } from 'antd';
import Monitor from '@/components/Monitor';
import Routemark from '@/components/Routemark';
import Awareness from '@/components/Awareness/left';
import AwarenessRight from '@/components/Awareness/right';
import Analysis from '@/components/Analysis/left';
import AnalysisRight from '@/components/Analysis/right';
import Timer from '@/components/Timer/time';
import Map from '@/components/Map/map';
import AnalysisCenter from '@/components/Analysis/center';
import NoFoundPage from '@/pages/404';
import { useSelector, useDispatch } from 'umi';

const Dashboard: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file dashboard.tsx
   *  @time 2023/09/13
   * @category :数据初始化
   * @function :
   */
  const [components, setcomponents] = useState<string>('analysis');
  const dispatch = useDispatch();
  const initData = useSelector((state: any) => {
    return state.dashboardModel.dashboardInfo;
  });

  const ShowComponent = (name: string) => {
    setcomponents(name);
  };

  const renderComponent = () => {
    switch (components) {
      case 'Awareness':
        dispatch({
          type: 'dashboardModel/fetchDashboardInfo',
          payload: { components },
        });
        return (
          <>
            <div className={styles.awarenesstimeLine} />;
            <Row className={styles.content}>
              <Col span={5} className={styles.awarenessleft}>
                <Awareness />;
              </Col>
              <Col span={5} offset={14} className={styles.right}>
                <AwarenessRight />;
              </Col>
            </Row>
          </>
        );
      case 'Monitor':
        dispatch({
          type: 'dashboardModel/fetchDashboardInfo',
          payload: { components },
        });
        return (
          <>
            <div className={styles.monitortimeLine} />;
            <Row>
              <Col span={24} className={styles.monitorContent}>
                <Monitor />;
              </Col>
            </Row>
          </>
        );
      case 'Routemark':
        dispatch({
          type: 'dashboardModel/fetchDashboardInfo',
          payload: { components },
        });
        return (
          <Row className={styles.content}>
            {/* <Col span={19} className={styles.timeline}>
            1111
          </Col> */}
            <Col span={5} offset={19} className={styles.left}>
              <Routemark />;
            </Col>
          </Row>
        );
      case 'analysis':
        dispatch({
          type: 'dashboardModel/fetchDashboardInfo',
          payload: { components },
        });
        return (
          <Row className={styles.content}>
            <Col span={5} className={styles.left}>
              <Analysis />;
            </Col>
            <Col span={14} className={styles.center}>
              <AnalysisCenter />;
            </Col>
            <Col span={5} className={styles.right}>
              <AnalysisRight />;
            </Col>
          </Row>
        );
      default:
        return <NoFoundPage />;
    }
  };

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------

  return (
    <div className={styles.screen}>
      {/* map  */}
      <Map />
      {/* map  */}
      {/* time */}
      <Timer />
      {/* home */}
      <div className={styles.home} />
      <div className={styles.logo} />
      {/* time */}
      {/* header */}
      <Row className={styles.header}>
        {/* <Col span={1} className={styles.logo} /> */}
        <Col span={4} offset={1} className={styles.text}>
          {/* <div className={styles.text}> */}
          <p className={styles.textbig}>无人机自动巡检系统</p>
          <p className={styles.textsmall}>UAV Automated Inspection System</p>
          {/* </div> */}
        </Col>
        <Col span={19} className={styles.rightheader}>
          <Button
            type="text"
            className={styles.button}
            onClick={() => {
              ShowComponent('analysis');
            }}
          >
            统计分析
          </Button>
          <Button
            type="text"
            className={styles.button}
            onClick={() => {
              ShowComponent('Awareness');
            }}
          >
            态势感知
          </Button>
          <Button
            type="text"
            className={styles.button}
            onClick={() => {
              ShowComponent('Monitor');
            }}
          >
            监控查看
          </Button>
          <Button
            type="text"
            className={styles.button}
            onClick={() => {
              ShowComponent('Routemark');
            }}
          >
            路径规划
          </Button>
        </Col>
      </Row>
      {/* header */}
      {/* content */}
      {renderComponent()}
      {/* content */}
    </div>
  );
};

export default React.memo(Dashboard);
