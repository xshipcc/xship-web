/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-25 13:14:44
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\center.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { DualAxes } from '@ant-design/plots';
import { Button, Col, Row, Select, Switch, Tabs } from 'antd';
import Title from '../common/Title';
import AwarenessButton from './component/button';

import React, { useState } from 'react';
import styles from './center.less';
import type { DashboardInfoType } from '@/pages/dashboard/typings';
import { ControlOutlined } from '@ant-design/icons';
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
  /**
   *  @file center.tsx
   *  @time 2023/10/24
   * @category :tab
   * @function :
   */
  //#region -------------------------------------------------------------------------

  const [activeTab, setActiveTab] = useState('drone');
  const [Collapase, setCollapase] = useState(false);
  const handleChange = (params: string) => {
    console.log(`selected ${params}`);
  };

  // const handleClickTab = (index: string) => {
  //   setActiveTab(index);
  // };
  const droneInfoList = [
    {
      key: `水平速度`,
      unit: 'm/s',
    },
    {
      key: `垂直速度`,
      unit: 'm/s',
    },
    {
      key: `目标高度`,
      unit: 'km',
    },
    {
      key: `飞行时间`,
      unit: 'km',
    },
    {
      key: `飞行高度`,
      unit: 'km',
    },
  ];
  const droneStateList = [
    {
      key: `经度`,
      unit: '°',
    },
    {
      key: `维度`,
      unit: '°',
    },
    {
      key: `高度`,
      unit: 'km',
    },
    {
      key: `俯仰角`,
      unit: '°',
    },
    {
      key: `滚转角`,
      unit: '°',
    },
    {
      key: `航向`,
      unit: '°',
    },
  ];

  const droneButtonList = [
    {
      key: `自检`,
      button: '自检',
      over: '自检成功',
    },
    {
      key: `解锁`,
      button: '解锁',
      over: '成功',
    },
    {
      key: `起飞`,
      button: '起飞',
      over: '成功',
    },
    {
      key: `回家降落`,
      button: '回家降落',
      over: '成功',
    },
    {
      key: `加锁`,
      button: '加锁',
      over: '加锁成功',
    },
  ];
  const hangarInfoList1 = [
    {
      key: `电池电压`,
      unit: 'V',
    },
    {
      key: `电池温度`,
      unit: '°C',
    },
    {
      key: `电池状态`,
      unit: '充电中',
    },
  ];
  const hangarInfoList2 = [
    {
      key: `舱盖状态`,
      unit: 'km',
    },
    {
      key: `归位机构状态`,
      unit: 'km',
    },
  ];
  const monitorList = [
    {
      key: `经度`,
      unit: '°',
    },
    {
      key: `维度`,
      unit: '°',
    },
    {
      key: `高度`,
      unit: 'km',
    },
  ];
  const monitorTFList = [
    {
      key: `TF总容量`,
      unit: '°',
    },
    {
      key: `使用容量`,
      unit: '°',
    },
    {
      key: `数据保存状态`,
      unit: 'km',
    },
    {
      key: `摄像头工作状态`,
      unit: '°',
    },
  ];
  const monitorButtonList1 = [
    {
      key: `跟踪`,
      button: '跟踪',
      over: '成功',
    },
    {
      key: `激光定位`,
      button: '激光定位',
      over: '成功',
    },
    {
      key: `下视`,
      button: '下视',
      over: '成功',
    },
    {
      key: `归中`,
      button: '归中',
      over: '归中',
    },
    {
      key: `扫描`,
      button: '扫描',
      over: '成功',
    },
  ];
  const monitorButtonList2 = [
    {
      key: `拍照`,
      button: '拍照',
      over: '成功',
    },
    {
      key: `录像`,
      button: '录像 ',
      over: '成功',
    },
  ];
  const RenderList = (params: any[]) =>
    params?.map((item: any) => (
      <Row key={item.key}>
        <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
          {item.key}
        </Col>
        <Col span={12} style={{ color: 'white' }}>
          {item.unit} <b></b>
        </Col>
      </Row>
    ));
  const RenderButtonList = (params: any[]) =>
    params?.map((item: any) => (
      <Row key={item.key}>
        <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
          {item.key}
        </Col>
        <Col span={12} style={{ color: 'white' }}>
          {/* @ts-ignore */}
          <AwarenessButton name={item.button} over={item.over} url={'/demo'} />
        </Col>
      </Row>
    ));
  const RenderComponent = (component: string) => {
    switch (component) {
      case 'drone':
        return (
          <div className={styles.tabContent}>
            <Title title={'无人机控制'} className={styles.title} />
            <div className={styles.board}>
              <Row>
                {/*  */}
                <Col span={5}>{RenderList(droneInfoList)}</Col>
                {/*  */}
                <Col span={5}>{RenderList(droneStateList)}</Col>
                {/*  */}
                <Col span={5}>{RenderButtonList(droneButtonList)}</Col>
                <Col span={8} offset={1}>
                  <Row style={{ padding: '8px' }}>
                    <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                      控制模式
                    </Col>
                    <Col span={12} style={{ color: 'turquoise' }}>
                      <Switch checkedChildren="程控" unCheckedChildren="手控" defaultChecked />
                    </Col>
                  </Row>
                  <Row style={{ padding: '8px' }}>
                    <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                      防撞灯
                    </Col>
                    <Col span={12} style={{ color: 'turquoise' }}>
                      <Switch
                        checkedChildren="防撞灯开"
                        unCheckedChildren="防撞灯关"
                        defaultChecked
                      />
                    </Col>
                  </Row>
                  <Row style={{ padding: '8px' }}>
                    <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                      航线加载
                    </Col>
                    <Col span={12}>
                      <Select
                        defaultValue="lucy"
                        onChange={handleChange}
                        options={[
                          { value: 'jack', label: 'Jack' },
                          { value: 'lucy', label: 'Lucy' },
                          { value: 'Yiminghe', label: 'yiminghe' },
                          { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                      />
                    </Col>
                  </Row>
                  <Row style={{ padding: '8px' }}>
                    <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                      航向角度
                    </Col>
                    <Col span={12}>
                      <div className="number-control">
                        <div className="number-left"></div>
                        <input type="number" name="number" className="number-quantity" />
                        <div className="number-right"></div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        );
      case 'hangar':
        return (
          <div className={styles.tabContent}>
            <Title title={'飞机库控制'} className={styles.title} />
            <div className={styles.board}>
              <Row>
                {/*  */}
                <Col span={5}>{RenderList(hangarInfoList1)}</Col>
                {/*  */}
                <Col span={5}>{RenderList(hangarInfoList2)}</Col>
                {/*  */}
                <Col span={5}>
                  <Row style={{ padding: '8px' }}>
                    <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                      舱盖
                    </Col>
                    <Col span={12} style={{ color: 'turquoise' }}>
                      <Switch checkedChildren="舱盖开" unCheckedChildren="舱盖关" defaultChecked />
                    </Col>
                  </Row>
                  <Row style={{ padding: '8px' }}>
                    <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                      充电装置
                    </Col>
                    <Col span={12} style={{ color: 'turquoise' }}>
                      <Switch checkedChildren="连接" unCheckedChildren="断开" defaultChecked />
                    </Col>
                  </Row>
                  <Row style={{ padding: '8px' }}>
                    <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
                      归位机构
                    </Col>
                    <Col span={12} style={{ color: 'turquoise' }}>
                      <Switch checkedChildren="锁定" unCheckedChildren="解锁" defaultChecked />
                    </Col>
                  </Row>
                </Col>
                <Col span={8} offset={1}></Col>
              </Row>
            </div>
          </div>
        );
      case 'monitor':
        return (
          <div className={styles.tabContent}>
            <Title title={'摄像头控制'} className={styles.title} />
            <div className={styles.board}>
              <Row>
                {/*  */}
                <Col span={5}>{RenderList(monitorList)}</Col>
                {/*  */}
                <Col span={5}>
                  {RenderList(monitorTFList)}
                  {RenderButtonList(monitorButtonList2)}
                </Col>
                {/*  */}
                <Col span={5} offset={1}>
                  {RenderButtonList(monitorButtonList1)}
                </Col>
                <Col span={7} offset={1}>
                  <div className="main">
                    <div className="up">
                      <button className="card1">上</button>
                      <button className="card2">下</button>
                      <div>
                        <div>视场变倍</div>
                        <div className="number-control">
                          <div className="number-left"></div>
                          <input type="number" name="number" className="number-quantity" />
                          <div className="number-right"></div>
                        </div>
                      </div>
                    </div>
                    <div className="down">
                      <button className="card3">左</button>
                      <button className="card4">右</button>
                      <div>
                        <div>焦距设置</div>
                        <div className="number-control">
                          <div className="number-left"></div>
                          <input type="number" name="number" className="number-quantity" />
                          <div className="number-right"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        );
    }
  };

  const onTabChange = (key: string) => {
    setActiveTab(key);
    console.log(key);
  };
  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
  return (
    <div className={Collapase ? styles.contentCollapse : styles.content}>
      <div className={Collapase ? styles.collapaseButtonClose : styles.collapaseButton}>
        <Button
          type="text"
          icon={<ControlOutlined />}
          onClick={() => (Collapase ? setCollapase(false) : setCollapase(true))}
        />
      </div>
      <div className={Collapase ? styles.tabCollapse : styles.tab}>
        {Collapase ? (
          <></>
        ) : (
          <Tabs
            tabPosition={'left'}
            onChange={onTabChange}
            // @ts-ignore
            items={[
              {
                label: `无人机`,
                key: 'drone',
                children: RenderComponent(activeTab),
              },
              {
                label: `飞机库`,
                key: 'hangar',
                children: RenderComponent(activeTab),
              },
              {
                label: `摄像头`,
                key: 'monitor',
                children: RenderComponent(activeTab),
              },
            ]}
          />
        )}
      </div>
      {/*  */}
      {/*  */}
    </div>
  );
};

export default AnalysisCenter;
