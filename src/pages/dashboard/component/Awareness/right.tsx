/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-19 17:02:15
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\right.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './right.less';
import AlertList from '@/pages/dashboard/component/alertList';
const AwarenessRight: React.FC = () => {
  /**
   *  @file right.tsx
   *  @time 2023/09/19
   * @category :
   * @function :
   */
  //#region -------------------------------------------------------------------------

  const [AlertLists, setAlertLists] = useState<string>('analysis');

  const ShowList = (name: string) => {
    setAlertLists(name);
  };

  const renderLisit = () => {
    // switch (AlertLists) {
    //   case 'Awareness':
    //     return <Awareness />;
    //   default:
    //     return <Analysis />;
    // }
  };

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */

  return (
    <>
      <div className={styles.content}>
        <Row>
          <Col span={2} className={styles.arrow} />
          <Col span={22} className={styles.title}>
            告警情况
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.titleLine} />
        </Row>
        {/*  */}
        <Row>
          <Col span={12} className={styles.title}>
            <Button
              type="text"
              className={styles.button}
              onClick={() => {
                ShowList('analysis');
              }}
            >
              即时告警
            </Button>
          </Col>
          <Col span={12} className={styles.title}>
            <Button
              type="text"
              className={styles.button}
              onClick={() => {
                ShowList('Awareness');
              }}
            >
              历史查看
            </Button>
          </Col>
        </Row>
        {/*  */}
        <Row>
          <Col span={11} offset={1} className={styles.timepicker}>
            <Row>
              <Col span={3} offset={7} className={styles.calendar} />
              <Col span={14} className={styles.calendartext}>
                全部
              </Col>
            </Row>
          </Col>
          <Col span={11} offset={1} className={styles.timepicker}>
            <Row>
              <Col span={3} offset={7} className={styles.calendar} />
              <Col span={14} className={styles.calendartext}>
                30分钟内
              </Col>
            </Row>
          </Col>
        </Row>
        {/*  */}
        <Row>
          <Col span={24} className={styles.listcontent}>
            <AlertList height={400} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AwarenessRight;
