/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-01 23:09:04
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\left.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './left.less';

const Awareness: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file left.tsx
   *  @time 2023/09/13
   * @category :
   * @function :
   */

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------
  return (
    <>
      <div className={'boxall'}>
        <div className={styles.content}>
          <Row>
            <Col span={2} className={'arrow'} />
            <Col span={22} className={'title'}>
              无人机画面01
            </Col>
          </Row>
          <Row>
            <Col span={24} className={'titleLine'} />
          </Row>
          {/*  */}
          <Row>
            <Col span={24} className={styles.video} />
          </Row>
          {/*  */}
          <Row>
            <Col span={2} className={'arrow'} />
            <Col span={22} className={'title'}>
              无人机画面02
            </Col>
          </Row>
          <Row>
            <Col span={24} className={'titleLine'} />
          </Row>
          {/*  */}
          <Row>
            <Col span={24} className={styles.video} />
          </Row>
          {/*  */}
          <div className={styles.box}>
            <Row>
              <Col span={2} className={'arrow'} />
              <Col span={22} className={'title'}>
                无人机态势信息
              </Col>
            </Row>
            <Row>
              <Col span={24} />
            </Row>
            <Row>
              <Col span={24}>
                <div className={styles.content}>
                  <Row>
                    <Col className={styles.text} span={8}>
                      无人机id:
                    </Col>
                    <Col className={styles.text} span={16}>
                      test
                    </Col>
                  </Row>
                  <Row>
                    <Col className={styles.text} span={8}>
                      巡检路线id:
                    </Col>
                    <Col className={styles.text} span={16}>
                      test
                    </Col>
                  </Row>
                  <Row>
                    <Col className={styles.text} span={8}>
                      执行时间:
                    </Col>
                    <Col className={styles.text} span={16}>
                      test
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className={'boxfoot'} />
      </div>
    </>
  );
};

export default Awareness;
