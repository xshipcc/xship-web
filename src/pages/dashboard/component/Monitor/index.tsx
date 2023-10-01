import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';

const Monitor: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file index.tsx
   *  @time 2023/09/14
   * @category :
   * @function :
   */
  const style: React.CSSProperties = { background: '' };
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const VideoList = () => {
    const columns = React.useMemo(() => {
      return Array.from({ length: 3 }, (_, i) => (
        <Col key={i} span={8}>
          <div style={style} className={styles.video}>
            <Row>
              <Col span={2} className={'arrow'} />
              <Col span={22} className={'title'}>
                监控画面 {i + 1}
              </Col>
            </Row>
            <Row>
              <Col span={24} className={'titleLine'} />
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
          <Space direction="vertical">
            <DatePicker onChange={onChange} />
          </Space>
        </Row>
        {/*  */}
      </div>
    </>
  );
};

export default Monitor;
