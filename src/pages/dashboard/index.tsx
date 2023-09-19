// @ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-09 20:12:31
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-19 22:18:47
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import styles from './dashboard.less';
import 'cesium/Source/Widgets/widgets.css';
import { Button, Col, Row } from 'antd';
import Monitor from '@/pages/dashboard/component/Monitor';
import Routemark from '@/pages/dashboard/component/Routemark';
import Awareness from '@/pages/dashboard/component/Awareness/left';
import AwarenessRight from '@/pages/dashboard/component/Awareness/right';
import Analysis from '@/pages/dashboard/component/Analysis/left';
import AnalysisRight from '@/pages/dashboard/component/Analysis/right';
import Timer from '@/pages/dashboard/component/Timer';
import Map from '@/pages/dashboard/component/Map';
import AnalysisCenter from '@/pages/dashboard/component/Analysis/center';
import NoFoundPage from '@/pages/404';
import { useSelector, useDispatch, useModel } from 'umi';
import { history } from 'umi';
const Dashboard: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file dashboard.tsx
   *  @time 2023/09/13
   * @category :数据初始化
   * @function :
   */
  const [components, setcomponents] = useState<string>('Analysis');
  const { initialState } = useModel('@@initialState');
  console.log('initialState:', initialState);

  const dispatch = useDispatch();

  const initView = useSelector((state: any) => state.dashboardModel.dashboardInfo);
  // useEffect(() => {
  //   dispatch({
  //     type: 'dashboardModel/fetchDashboardInfo',
  //     payload: { name: 'Analysis' },
  //   });
  //   console.log('initView:', initView);
  // }, []);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch({
          type: 'dashboardModel/fetchDashboardInfo',
          payload: { name: 'dashboardInfo' },
        });
        setData(response); // 在异步操作完成后更新数据状态
      } catch (error) {
        // 处理错误
      }
    };
    fetchData();
  }, [dispatch]);

  const ShowComponent = (name: string) => {
    // 在初始化时进行dispatch
    // dispatch({
    //   type: 'dashboardModel/fetchDashboardInfo',
    //   payload: { name },
    // });
    setcomponents(name);
    console.log('initData -> initData:', initView);
  };

  const RenderComponent = () => {
    if (data === null) {
      return <div />; // 在数据加载完成前显示加载中
    }
    switch (components) {
      case 'Analysis':
        return (
          <>
            <Row className={styles.content}>
              <Col span={5} className={styles.left}>
                <Analysis initValue={initView} />;
              </Col>
              <Col span={14} className={styles.center}>
                <AnalysisCenter initValue={initView} />;
              </Col>
              <Col span={5} className={styles.right}>
                <AnalysisRight initValue={initView} />;
              </Col>
            </Row>
          </>
        );
      case 'Awareness':
        return (
          <>
            <div className={styles.awarenesstimeLine} />;
            <Row className={styles.content}>
              <Col span={5} className={styles.awarenessleft}>
                <Awareness initValue={initView} />;
              </Col>
              <Col span={5} offset={14} className={styles.right}>
                <AwarenessRight initValue={initView} />;
              </Col>
            </Row>
          </>
        );
      case 'Monitor':
        return (
          <>
            <div className={styles.monitortimeLine} />;
            <Row>
              <Col span={24} className={styles.monitorContent}>
                <Monitor initValue={initView} />;
              </Col>
            </Row>
          </>
        );
      case 'Routemark':
        return (
          <Row className={styles.content}>
            {/* <Col span={19} className={styles.timeline}>
            1111
          </Col> */}
            <Col span={5} offset={19} className={styles.left}>
              <Routemark initValue={initView} />;
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
      <div className={styles.home} onClick={() => history.push('/')} />
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
              ShowComponent('Analysis');
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
      {RenderComponent()}
      {/* content */}
    </div>
  );
};

export default Dashboard;
