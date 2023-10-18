// @ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-09 20:12:31
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-18 00:23:11
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import 'cesium/Source/Widgets/widgets.css';
import { Col, Row } from 'antd';
import Monitor from '@/pages/dashboard/component/Monitor';
import Routemark from '@/pages/dashboard/component/Routemark';
import Awareness from '@/pages/dashboard/component/Awareness/left';
import AwarenessRight from '@/pages/dashboard/component/Awareness/right';
import Analysis from '@/pages/dashboard/component/Analysis/left';
import AnalysisRight from '@/pages/dashboard/component/Analysis/right';
import Map from '@/pages/dashboard/component/Map';
import { Header } from '@/pages/dashboard/component/Header';
import AnalysisCenter from '@/pages/dashboard/component/Analysis/center';
import NoFoundPage from '@/pages/404';
import { useSelector, useDispatch } from 'umi';
const initView = {
  drone: {
    total: 2,
    online: 84,
    breakdown: 2,
  },
  inspection: {
    total: 128,
    complete: 48,
    rate: 69,
    today: 198,
    breakdown: 47,
    warning: 34,
  },
  radar: [
    {
      item: 'Design',
      user: 'a',
      score: 70,
    },
    {
      item: 'Design',
      user: 'b',
      score: 30,
    },
    {
      item: 'Development',
      user: 'a',
      score: 60,
    },
    {
      item: 'Development',
      user: 'b',
      score: 70,
    },
    {
      item: 'Marketing',
      user: 'a',
      score: 50,
    },
    {
      item: 'Marketing',
      user: 'b',
      score: 60,
    },
    {
      item: 'Users',
      user: 'a',
      score: 40,
    },
    {
      item: 'Users',
      user: 'b',
      score: 50,
    },
    {
      item: 'Test',
      user: 'a',
      score: 60,
    },
    {
      item: 'Test',
      user: 'b',
      score: 70,
    },
  ],
  line: [
    {
      type: '异常',
      date: 2400,
      value: 67,
    },
    {
      type: '告警',
      date: 2400,
      value: 60,
    },
    {
      type: '异常',
      date: 2401,
      value: 95,
    },
    {
      type: '告警',
      date: 2401,
      value: 30,
    },
    {
      type: '异常',
      date: 2402,
      value: 88,
    },
    {
      type: '告警',
      date: 2402,
      value: 41,
    },
    {
      type: '异常',
      date: 2403,
      value: 38,
    },
    {
      type: '告警',
      date: 2403,
      value: 52,
    },
    {
      type: '异常',
      date: 2404,
      value: 65,
    },
    {
      type: '告警',
      date: 2404,
      value: 24,
    },
  ],
  DualAxes: {
    histgram: [
      {
        time: '2023-03',
        value: 350,
        type: 'uv',
      },
      {
        time: '2023-04',
        value: 900,
        type: 'uv',
      },
      {
        time: '2023-05',
        value: 300,
        type: 'uv',
      },
      {
        time: '2023-06',
        value: 450,
        type: 'uv',
      },
      {
        time: '2023-07',
        value: 470,
        type: 'uv',
      },
      {
        time: '2023-03',
        value: 220,
        type: 'bill',
      },
      {
        time: '2023-04',
        value: 300,
        type: 'bill',
      },
      {
        time: '2023-05',
        value: 250,
        type: 'bill',
      },
      {
        time: '2023-06',
        value: 220,
        type: 'bill',
      },
      {
        time: '2023-07',
        value: 362,
        type: 'bill',
      },
    ],
    linegram: [
      {
        time: '2023-03',
        count: 800,
        name: 'a',
      },
      {
        time: '2023-04',
        count: 600,
        name: 'a',
      },
      {
        time: '2023-05',
        count: 400,
        name: 'a',
      },
      {
        time: '2023-06',
        count: 380,
        name: 'a',
      },
      {
        time: '2023-07',
        count: 220,
        name: 'a',
      },
    ],
  },
  bar: [
    {
      name: '人员告警',
      value: 38,
    },
    {
      name: '入侵告警',
      value: 52,
    },
    {
      name: '烟雾告警',
      value: 61,
    },
    {
      name: '人脸告警',
      value: 145,
    },
    {
      name: '车辆告警',
      value: 48,
    },
  ],
  alarmPie: [
    {
      title: '高刚',
      value: 89,
    },
    {
      title: '潘艳',
      value: 41,
    },
    {
      title: '夏静',
      value: 7,
    },
    {
      title: '许敏',
      value: 24,
    },
  ],
}; //模拟

const Dashboard: React.FC = () => {
  /**
   *  @file index.tsx
   *  @time 2023/10/17
   * @category :大屏数据初始化
   * @function :
   */
  //#region -------------------------------------------------------------------------

  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await dispatch({
        //   type: 'dashboardModel/fetchDashboardInfo',
        //   payload: { name: 'dashboardInfo' },
        // });
        // setData(response); // 在异步操作完成后更新数据状态
      } catch (error) {
        // 处理错误
      }
    };
    fetchData();
  }, []);

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */

  /**
   *  @file index.tsx
   *  @time 2023/10/17
   * @category :组件渲染
   * @function :
   */
  //#region -------------------------------------------------------------------------

  const currentComponent = useSelector((state: any) => state.dashboardModel.currentComponent);
  const RenderComponent = (component) => {
    switch (component) {
      case 'Analysis':
        return (
          <>
            <div className={styles.left}>
              <Analysis initValue={initView} />
            </div>
            <div className={styles.center}>
              <AnalysisCenter initValue={initView} />
            </div>
            <div className={styles.right}>
              <AnalysisRight initValue={initView} />
            </div>
          </>
        );
      case 'Awareness':
        return (
          <>
            <div className={styles.awarenesstimeLine} />
            <div span={5} className={styles.awarenessleft}>
              <Awareness initValue={initView} />
            </div>
            <div span={5} offset={14} className={styles.right}>
              <AwarenessRight initValue={initView} />
            </div>
          </>
        );
      case 'Monitor':
        return (
          <>
            <div className={styles.monitortimeLine} />
            <Row>
              <div span={24} className={styles.monitorContent}>
                <Monitor initValue={initView} />
              </div>
            </Row>
          </>
        );
      case 'Routemark':
        return (
          <>
            {/* <div span={19} className={styles.timeline}>
            1111
          </div> */}
            <div span={5} offset={19} className={styles.left}>
              <Routemark initValue={initView} />
            </div>
          </>
        );
    }
  };

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */

  return (
    <div className="container">
      <div className="container__body">
        {/* <div className="mask" /> */}
        <div className="masking top" />
        <div className="masking right" />
        <div className="masking bottom" />
        <div className="masking left" />
        {/* map  */}
        <Map />
        {/* map  */}
        <div className={styles.screen}>
          {/* header */}
          <div className={styles.header}>
            <Header />
          </div>
          {/* header */}
          {/* content */}
          <div className={styles.content}>{RenderComponent(currentComponent)}</div>
          {/* content */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
