/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-16 14:40:25
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\center.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Tabs } from 'antd';
import React, { useState } from 'react';
import styles from './center.less';
import { ControlOutlined } from '@ant-design/icons';
import RenderComponent from './component/centerTab';

const AnalysisCenter: React.FC = () => {
  /**
   *  @file center.tsx
   *  @time 2023/11/16
   * @category :控制面板
   * @function :
   */
  //#region -------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState('drone');
  const [Collapase, setCollapase] = useState(false);

  const onTabChange = (key: string) => {
    setActiveTab(key);
    console.log(key);
  };

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
            items={[
              {
                label: `无人机`,
                key: 'drone',
                // @ts-ignore
                children: <RenderComponent component={activeTab} />,
              },
              {
                label: `飞机库`,
                key: 'hangar',
                // @ts-ignore
                children: <RenderComponent component={activeTab} />,
              },
              {
                label: `摄像头`,
                key: 'monitor',
                // @ts-ignore
                children: <RenderComponent component={activeTab} />,
              },
            ]}
          />
        )}
      </div>
      {/*  */}
    </div>
  );
  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
};

export default AnalysisCenter;
