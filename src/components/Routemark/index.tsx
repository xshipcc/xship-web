/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-15 19:57:40
 * @FilePath: \zero-admin-ui-master\src\components\Routemark\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import TreeDemo from '@/components/TreeList/index';

// export default App;

const Routemark: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file right.tsx
   *  @time 2023/09/14
   * @category :
   * @function :
   */

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------
  return (
    <>
      <div className={styles.content}>
        <Row>
          <Col span={2} className={styles.arrow} />
          <Col span={22} className={styles.title}>
            巡检数
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.titleLine} />
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
            66
          </Col>
          <Col span={8} className={styles.textnumber}>
            77
          </Col>
          <Col span={8} className={styles.textRed}>
            88
          </Col>
        </Row>
        {/*  */}
        <Row>
          <Col span={2} className={styles.arrow} />
          <Col span={22} className={styles.title}>
            智能巡检
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.titleLine} />
        </Row>
        {/*  */}
        <TreeDemo />
      </div>
    </>
  );
};

export default Routemark;
