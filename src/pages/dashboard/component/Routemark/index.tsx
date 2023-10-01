/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-19 10:15:12
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\Routemark\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import TreeList from '@/pages/dashboard/component/TreeList/index';

// export default App;

const Routemark: React.FC = (props) => {
  // @ts-ignore
  const [value] = useState<DashboardInfoType>(props.initValue);

  return (
    <>
      <div className={'boxall'}>
        <div className={styles.content}>
          <Row>
            <Col span={2} className={'arrow'} />
            <Col span={22} className={'title'}>
              巡检数
            </Col>
          </Row>
          <Row>
            <Col span={24} className={'titleLine'} />
          </Row>
          {/*  */}
          <Row>
            <Col span={8} className={styles.text}>
              今日巡检
            </Col>
            <Col span={8} className={styles.text}>
              异常次数
            </Col>
            <Col span={8} className={styles.text}>
              告警次数
            </Col>
          </Row>
          <Row>
            <Col span={8} className={styles.textnumber}>
              {value.inspection.today}
            </Col>
            <Col span={8} className={styles.textnumber}>
              {value.inspection.breakdown}
            </Col>
            <Col span={8} className={styles.textRed}>
              {value.inspection.warning}
            </Col>
          </Row>
          {/*  */}
          <Row>
            <Col span={2} className={'arrow'} />
            <Col span={22} className={'title'}>
              智能巡检
            </Col>
          </Row>
          <Row>
            <Col span={24} className={'titleLine'} />
          </Row>
          {/*  */}
          <TreeList />
        </div>
        <div className={'boxfoot'}></div>
      </div>
    </>
  );
};

export default Routemark;
