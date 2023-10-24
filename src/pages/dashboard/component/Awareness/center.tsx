/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-24 09:10:52
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\center.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { DualAxes } from '@ant-design/plots';
import { Button, Col, Row, Switch } from 'antd';
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
                  {/*  */}
                  <dl>
                    <dd className="font-red ml-20">
                      <Row>
                        <Col span={6} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                          经度
                        </Col>
                        <Col span={17} offset={1} style={{ color: 'turquoise' }}>
                          114.231231 <b></b>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={6} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                          维度
                        </Col>
                        <Col span={17} offset={1} style={{ color: 'turquoise' }}>
                          37.1133 <b></b>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={6} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                          高度
                        </Col>
                        <Col span={17} offset={1} style={{ color: 'turquoise' }}>
                          37.113m <b></b>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={6} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                          电池功率
                        </Col>
                        <Col span={17} offset={1} style={{ color: 'turquoise' }}>
                          11w <b></b>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={6} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                          工作电流
                        </Col>
                        <Col span={17} offset={1} style={{ color: 'turquoise' }}>
                          3A <b></b>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={6} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                          通讯状态
                        </Col>
                        <Col span={17} offset={1} style={{ color: 'turquoise' }}>
                          好 <b></b>
                        </Col>
                      </Row>
                    </dd>
                  </dl>
                  {/*  */}
                  <div className={styles.powerLeft}>
                    <div>电量</div>
                    <div style={{ color: '#40e10f' }}>37%</div>
                  </div>
                  <div className="round-1"></div>
                  <div className="round-2"></div>
                  <div className="round-3"></div>
                </div>
              </Col>
              <Col span={12} className={styles.rightContent}>
                <Row gutter={[4, 4]} className={styles.buttonRow}>
                  <Col span={8}>
                    {/* @ts-ignore */}
                    <AwarenessButton name={'自检'} over={'成功'} url={'/demo'} />
                  </Col>
                  <Col span={8}>
                    {/* @ts-ignore */}
                    <AwarenessButton name={'解锁'} over={'加锁'} url={'/demo'} />
                  </Col>
                  <Col span={8}>
                    {/* @ts-ignore */}
                    <AwarenessButton name={'起飞'} over={'降落'} url={'/demo'} />
                  </Col>
                </Row>
                <Row gutter={[4, 4]} className={styles.buttonRow}>
                  <Col span={8}>
                    {/* @ts-ignore */}
                    <AwarenessButton name={'回家'} over={'完成'} url={'/demo'} />
                  </Col>
                  <Col span={16}>
                    <div className="Message">
                      <input
                        style={{ color: '#fff' }}
                        title="航向角度"
                        pattern="\d+"
                        placeholder="请输入航向角度"
                        className="MsgInput"
                        type="number"
                        min="0"
                        max="360"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.0"
                        width="30.000000pt"
                        height="30.000000pt"
                        viewBox="0 0 30.000000 30.000000"
                        preserveAspectRatio="xMidYMid meet"
                        className="SendSVG"
                      >
                        <g
                          transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)"
                          fill="#ffffff70"
                          stroke="none"
                        >
                          <path d="M44 256 c-3 -8 -4 -29 -2 -48 3 -31 5 -33 56 -42 28 -5 52 -13 52 -16 0 -3 -24 -11 -52 -16 -52 -9 -53 -9 -56 -48 -2 -21 1 -43 6 -48 10 -10 232 97 232 112 0 7 -211 120 -224 120 -4 0 -9 -6 -12 -14z"></path>
                        </g>
                      </svg>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[4, 4]} className={styles.switchRow}>
                  <Col span={12}>
                    <Switch
                      checkedChildren="航线模式"
                      unCheckedChildren="遥感模式"
                      defaultChecked
                    />
                  </Col>
                  <Col span={12}>
                    <Switch
                      checkedChildren="防撞灯开"
                      unCheckedChildren="防撞灯关"
                      defaultChecked
                    />
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
                <Col span={12} className={styles.leftContent}>
                  <div className={styles.hangarInfo}>
                    <Row>
                      <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                        风速
                      </Col>
                      <Col span={12} style={{ color: 'turquoise' }}>
                        220M/s <b></b>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                        风向
                      </Col>
                      <Col span={12} style={{ color: 'turquoise' }}>
                        东 <b></b>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                        雨雪传感器
                      </Col>
                      <Col span={12} style={{ color: 'turquoise' }}>
                        东 <b></b>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                        舱盖角度
                      </Col>
                      <Col span={12} style={{ color: 'turquoise' }}>
                        东 <b></b>
                      </Col>
                    </Row>
                    <Row className={styles.switchInfo}>
                      <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                        舱盖状态
                      </Col>
                      <Col span={12} style={{ color: 'turquoise' }}>
                        <Switch
                          checkedChildren="舱盖开"
                          unCheckedChildren="舱盖关"
                          defaultChecked
                        />
                      </Col>
                    </Row>
                    <Row className={styles.switchInfo}>
                      <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                        充电机状态
                      </Col>
                      <Col span={12} style={{ color: 'turquoise' }}>
                        <Switch
                          checkedChildren="机场充电"
                          unCheckedChildren="机场断电"
                          defaultChecked
                        />
                      </Col>
                    </Row>
                    <Row className={styles.switchInfo}>
                      <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                        归位机构状态
                      </Col>
                      <Col span={12} style={{ color: 'turquoise' }}>
                        <Switch
                          checkedChildren="归位锁定"
                          unCheckedChildren="归位解锁"
                          defaultChecked
                        />
                      </Col>
                    </Row>
                  </div>
                </Col>
                {/*  */}
                <Col span={12} className={styles.RightContent}>
                  <div className="area-inbox-2">
                    <dl>
                      <dd className="font-red ml-20">
                        <Row>
                          <Col span={6} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                            电池电压
                          </Col>
                          <Col span={18} style={{ color: 'turquoise' }}>
                            220v <b></b>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={6} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                            电池温度
                          </Col>
                          <Col span={18} style={{ color: 'turquoise' }}>
                            37.1133 <b></b>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={6} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                            电池状态
                          </Col>
                          <Col span={18} style={{ color: 'turquoise' }}>
                            37.1M/s <b></b>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={6} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                            舱外温度
                          </Col>
                          <Col span={18} style={{ color: 'turquoise' }}>
                            C <b></b>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={6} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                            舱外湿度
                          </Col>
                          <Col span={18} style={{ color: 'turquoise' }}>
                            40% <b></b>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={6} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                            舱内温度
                          </Col>
                          <Col span={18} style={{ color: 'turquoise' }}>
                            37.1C <b></b>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={6} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                            舱内湿度
                          </Col>
                          <Col span={18} style={{ color: 'turquoise' }}>
                            31% <b></b>
                          </Col>
                        </Row>
                      </dd>
                    </dl>
                    <div className={styles.powerRight}>
                      <div>电量</div>
                      <div style={{ color: '#40e10f' }}>37%</div>
                    </div>
                    <div className="round-1-right"></div>
                    <div className="round-2-right"></div>
                    <div className="round-3-right"></div>
                  </div>
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
