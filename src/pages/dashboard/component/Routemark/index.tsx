/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-26 11:46:44
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
import Line from './component/statistic/demo';
import Track from './component/track';

// export default App;

const Routemark: React.FC = (props) => {
  // @ts-ignore
  const [value] = useState<DashboardInfoType>(props.initValue);

  return (
    <>
      <div className={styles.content}>
        {/*  */}
        <div className={styles.top}>
          <Title title={'航线信息统计'} />
          {/* <Row>
            <Col span={8} className={styles.text}>
              航线总数,平均航线长度,平均节点数量,平均执行时间,航线平均巡检次数
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
          </Row> */}
          <Line />
        </div>
        {/*  */}
        <div className={styles.middle}>
          <Title title={' 智能巡检'} />
          {/* <TreeList /> */}
          <Track />
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default React.memo(Routemark);
