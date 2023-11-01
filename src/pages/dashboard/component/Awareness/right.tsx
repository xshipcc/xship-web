/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-01 23:23:33
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\right.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './right.less';
import AlertList from '@/pages/dashboard/component/AlertList/demo';
import HistoryList from '@/pages/dashboard/component/AlertList/history';
import Title from '../common/Title';
import TimeLine from './component/timeLine';
import { SwapOutlined } from '@ant-design/icons';

const AwarenessRight: React.FC = () => {
  /**
   *  @file right.tsx
   *  @time 2023/09/19
   * @category :
   * @function :
   */
  //#region -------------------------------------------------------------------------

  const [showDetail, setShowDetail] = useState<boolean>(false);

  /**
   *切换列表
   *false为告警  true为巡检
   */
  const handleClick = () => {
    setShowDetail(!showDetail);
  };
  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */

  return (
    <>
      <div className={styles.content}>
        <div className={styles.top}>
          <Title title={'当前航线进度'} />
          <Row className={styles.timeLine}>
            <Col span={24}>
              <TimeLine />
            </Col>
          </Row>
        </div>
        {/*  */}
        <div className={styles.middle}>
          <Title title={'告警情况'} />
          <div
            className={styles.tabChange}
            onClick={() => {
              handleClick();
            }}
          >
            <SwapOutlined />
            切换
          </div>
          {showDetail ? <HistoryList /> : <AlertList />}
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default AwarenessRight;
