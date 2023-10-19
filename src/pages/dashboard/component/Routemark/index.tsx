/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-19 10:47:57
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Routemark\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import TreeList from '@/pages/dashboard/component/TreeList/index';
import Title from '../common/Title';

// export default App;

const Routemark: React.FC = (props) => {
  // @ts-ignore
  const [value] = useState<DashboardInfoType>(props.initValue);

  return (
    <>
      <div className={styles.content}>
        {/*  */}
        <div className={styles.top}>
          <Title title={'巡检数'} />
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
        </div>
        {/*  */}
        <div className={styles.middle}>
          <Title title={' 智能巡检'} />
          <TreeList />
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default React.memo(Routemark);
