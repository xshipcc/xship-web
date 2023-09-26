// @ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-09 20:12:31
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-26 10:46:57
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
  const [activeIndex, setActiveIndex] = useState(0);
  // const { initialState } = useModel('@@initialState');
  // console.log('initialState:', initialState);

  const dispatch = useDispatch();

  // const initView = useSelector((state: any) => state.dashboardModel.dashboardInfo);
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
          time: '2019-03',
          value: 350,
          type: 'uv',
        },
        {
          time: '2019-04',
          value: 900,
          type: 'uv',
        },
        {
          time: '2019-05',
          value: 300,
          type: 'uv',
        },
        {
          time: '2019-06',
          value: 450,
          type: 'uv',
        },
        {
          time: '2019-07',
          value: 470,
          type: 'uv',
        },
        {
          time: '2019-03',
          value: 220,
          type: 'bill',
        },
        {
          time: '2019-04',
          value: 300,
          type: 'bill',
        },
        {
          time: '2019-05',
          value: 250,
          type: 'bill',
        },
        {
          time: '2019-06',
          value: 220,
          type: 'bill',
        },
        {
          time: '2019-07',
          value: 362,
          type: 'bill',
        },
      ],
      linegram: [
        {
          time: '2019-03',
          count: 800,
          name: 'a',
        },
        {
          time: '2019-04',
          count: 600,
          name: 'a',
        },
        {
          time: '2019-05',
          count: 400,
          name: 'a',
        },
        {
          time: '2019-06',
          count: 380,
          name: 'a',
        },
        {
          time: '2019-07',
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
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await dispatch({
        //   type: 'dashboardModel/fetchDashboardInfo',
        //   payload: { name: 'dashboardInfo' },
        // });
        // setData(response); // 在异步操作完成后更新数据状态
        setData('test'); //测试
      } catch (error) {
        // 处理错误
      }
    };
    fetchData();
  }, []);

  const ShowComponent = (name: string) => {
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

  const handleClick = (index) => {
    setActiveIndex(index);
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
            className={activeIndex === 0 ? styles.buttonActive : styles.button}
            onClick={() => {
              ShowComponent('Analysis');
              handleClick(0);
            }}
          >
            统计分析
          </Button>
          <Button
            type="text"
            className={activeIndex === 1 ? styles.buttonActive : styles.button}
            onClick={() => {
              ShowComponent('Awareness');
              handleClick(1);
            }}
          >
            态势感知
          </Button>
          <Button
            type="text"
            className={activeIndex === 2 ? styles.buttonActive : styles.button}
            onClick={() => {
              ShowComponent('Monitor');
              handleClick(2);
            }}
          >
            监控查看
          </Button>
          <Button
            type="text"
            className={activeIndex === 3 ? styles.buttonActive : styles.button}
            onClick={() => {
              ShowComponent('Routemark');
              handleClick(3);
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
