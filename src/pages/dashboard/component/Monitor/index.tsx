import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

const Monitor: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file index.tsx
   *  @time 2023/09/14
   * @category :
   * @function :
   */
  const style: React.CSSProperties = { background: '' };
  const VideoList = () => {
    const columns = React.useMemo(() => {
      return Array.from({ length: 3 }, (_, i) => (
        <Col key={i} span={8}>
          <div style={style} className={styles.video}>
            <Row>
              <Col span={2} className={styles.arrow} />
              <Col span={22} className={styles.title}>
                监控画面 {i + 1}
              </Col>
            </Row>
            <Row>
              <Col span={24} className={styles.titleLine} />
            </Row>
            <Col className={styles.videocontent} span={24}>
              Video {i + 1}
            </Col>
          </div>
        </Col>
      ));
    }, []);

    return (
      <div>
        <Row gutter={[30, 30]}>{columns}</Row>
        <Row gutter={[30, 30]}>{columns}</Row>
      </div>
    );
  };

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------

  return (
    <>
      <div className={styles.content}>
        {/*  */}
        <Row>
          <Col span={24}>{VideoList()}</Col>
        </Row>
        {/*  */}
        <Row className={styles.dateButton}>
          <Col span={11} offset={1} className={styles.timepicker}>
            <Row>
              <Col span={3} offset={3} className={styles.calendar} />
              <Col span={17} className={styles.calendartext}>
                全部
              </Col>
            </Row>
          </Col>
          <Col span={11} offset={1} className={styles.timepicker}>
            <Row>
              <Col span={3} offset={3} className={styles.calendar} />
              <Col span={17} className={styles.calendartext}>
                30分钟内
              </Col>
            </Row>
          </Col>
        </Row>
        {/*  */}
      </div>
    </>
  );
};

export default Monitor;
