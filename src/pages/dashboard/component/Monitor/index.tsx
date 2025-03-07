/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-19 22:19:16
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-23 01:27:01
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Monitor\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
// import Player from '@/components/VideoReact';
import Player from '@/components/VideoFlv';
import Video from './component/video';
const Monitor: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file index.tsx
   *  @time 2023/09/14
   * @category :
   * @function :
   */
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------

  return (
    <>
      <div className={styles.content}>
        {/*  */}
        <Row>{/* <Col span={24}>{VideoList()}</Col> */}</Row>
        {/*  */}
        {/* <div className={styles.container}>
          {new Array(6).fill(null).map((_, index) => (
            <div key={index} className={styles.item}>
              <div key={index} className={styles.video}>
                <Row>
                  <Col span={2} className={'arrow'} />
                  <Col span={22} className={'title'}>
                    监控画面 {index + 1}
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className={'titleLine'} />
                </Row>
                <Col className={styles.videocontent} span={24}>
                  {index > 0 ? (
                    <Player url={'demo'} height={'25'} width={'100'} />
                  ) : (
                    <Player url={VIDEO_URL} height={'25'} width={'100'} />
                  )}
                </Col>
              </div>
            </div>
          ))}
        </div> */}
        {/* <Row className={styles.dateButton}>
          <Space direction="vertical">
            <DatePicker onChange={onChange} />
          </Space>
        </Row> */}
        <Video />
        {/*  */}
      </div>
    </>
  );
};

export default React.memo(Monitor);
