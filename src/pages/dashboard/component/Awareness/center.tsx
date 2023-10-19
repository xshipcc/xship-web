/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-20 00:17:18
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\center.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { DualAxes } from '@ant-design/plots';
import { Button, Col, Row } from 'antd';
import Title from '../common/Title';
import AwarenessButton from './component/button';

import React, { useState } from 'react';
import styles from './center.less';
import type { DashboardInfoType } from '@/pages/dashboard/typings';
import {
  CheckOutlined,
  ClockCircleOutlined,
  LoadingOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
const AnalysisCenter: React.FC = (props) => {
  // @ts-ignore
  const [value] = useState<DashboardInfoType>(props.initValue);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index: number) => {
    setActiveIndex(1);
    setTimeout(() => {
      setActiveIndex(2);
    }, 2000);
  };
  //#region    -----------------------------------------------------------------------
  /**
   *  @file index.tsx
   *  @time 2023/09/13
   * @category :
   * @function :
   */

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------

  return (
    <div className={styles.content}>
      {/*  */}
      <div className={styles.board}>
        {/*  */}
        <div className={styles.left}>
          <Title title={'无人机控制'} />
          {/*  */}
          <div className={styles.box}>
            <Row>
              <Col span={12} className={styles.leftContent}>
                <div className="area-inbox-1">
                  {/* 无人机位置/定位模式 传感器状态 电源状态 无人机通信状态无人机详细参数
                  无人机经纬度及GPS状态等无人机各个传感器状态显示无人机工作功率、剩余电量、工作电流值计算无人机数据帧频(80ms)
                  显示无人机状态信息
                  <dt>无人机状态</dt>
                  <dt>无人机状态</dt> */}
                  <dl>
                    <dt style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                      无人机通讯状态
                    </dt>
                    <dd className="font12">
                      <span style={{ color: '#40e10f' }}>76ms</span>
                      <b></b>
                    </dd>
                    <dd className="font-red ml-20">
                      <Row className="font-red ml-20">
                        <Col span={6} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                          经度
                        </Col>
                        <Col span={18} style={{ color: 'turquoise' }}>
                          114.231231 <b></b>
                        </Col>
                      </Row>
                      <Row className="font-red ml-20">
                        <Col span={6} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                          维度
                        </Col>
                        <Col span={18} style={{ color: 'turquoise' }}>
                          37.1133 <b></b>
                        </Col>
                      </Row>
                      <Row className="font-red ml-20">
                        <Col span={6} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                          高度
                        </Col>
                        <Col span={18} style={{ color: 'turquoise' }}>
                          37.113m <b></b>
                        </Col>
                      </Row>
                    </dd>
                    <dt style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>传感器状态</dt>
                    <dd>
                      <span style={{ color: '#40e10f' }}>正常</span>
                      <b></b>
                    </dd>
                  </dl>
                  <div className="round-1"></div>
                  <div className="round-2"></div>
                  <div className="round-3">30%</div>
                </div>
              </Col>
              <Col span={12} className={styles.rightContent}>
                <Row gutter={[16, 24]} className={styles.buttonRow}>
                  <Col span={8}>
                    {/* @ts-ignore */}
                    <AwarenessButton name={'自检'} over={'自检完成'} url={'/demo'} />
                  </Col>
                  <Col span={8}>
                    {/* @ts-ignore */}
                    <AwarenessButton name={'解锁'} over={'解锁完成'} url={'/demo'} />
                  </Col>
                  <Col span={8}>
                    {/* @ts-ignore */}
                    <AwarenessButton name={'加锁'} over={'加锁完成'} url={'/demo'} />
                  </Col>
                </Row>
                <Row gutter={[16, 24]} className={styles.buttonRow}>
                  <Col span={8}>
                    {/* @ts-ignore */}
                    <AwarenessButton name={'起飞'} over={'自检完成'} url={'/demo'} />
                  </Col>
                  <Col span={8}>
                    {/* @ts-ignore */}
                    <AwarenessButton name={'降落'} over={'降落完成'} url={'/demo'} />
                  </Col>
                  <Col span={8}>
                    {/* @ts-ignore */}
                    <AwarenessButton name={'回家'} over={'回家完成'} url={'/demo'} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          {/*  */}
        </div>
        {/*  */}
        <div className={styles.right}>
          <Title title={'机库控制'} />
          <div className={styles.rightbox}>
            <div className={styles.box}>
              <Row>
                <Col span={8} className={styles.leftContent}></Col>
                {/*  */}
                <Col span={16} className={styles.rightContent}>
                  <Row gutter={[16, 24]} className={styles.buttonRow}>
                    <Col span={8}>
                      {/* @ts-ignore */}
                      <AwarenessButton name={'自检'} over={'自检完成'} url={'/demo'} />
                    </Col>
                    <Col span={8}>
                      {/* @ts-ignore */}
                      <AwarenessButton name={'解锁'} over={'解锁完成'} url={'/demo'} />
                    </Col>
                    <Col span={8}>
                      {/* @ts-ignore */}
                      <AwarenessButton name={'加锁'} over={'加锁完成'} url={'/demo'} />
                    </Col>
                  </Row>
                  <Row gutter={[16, 24]} className={styles.buttonRow}>
                    <Col span={8}>
                      {/* @ts-ignore */}
                      <AwarenessButton name={'起飞'} over={'自检完成'} url={'/demo'} />
                    </Col>
                    <Col span={8}>
                      {/* @ts-ignore */}
                      <AwarenessButton name={'降落'} over={'降落完成'} url={'/demo'} />
                    </Col>
                    <Col span={8}>
                      {/* @ts-ignore */}
                      <AwarenessButton name={'回家'} over={'回家完成'} url={'/demo'} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
      {/*  */}
    </div>
  );
};

export default AnalysisCenter;
