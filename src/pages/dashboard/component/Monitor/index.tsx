/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-19 22:19:16
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-02 05:23:08
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
import Player from './video';

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
  const videoJsOptions = {
    autoplay: true, //自动播放
    language: 'zh-CN',
    controls: true, //控制条
    preload: 'auto', //自动加载
    errorDisplay: true, //错误展示
    width: 500, //宽
    height: 300, //高
    // fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
    // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
    // textTrackDisplay: false,  // 不渲染字幕相关DOM
    userActions: {
      hotkeys: true, //是否支持热键
    },
    sources: [
      {
        src: 'rtmp://live.hkstv.hk.lxdns.com/live/hks1',
        type: 'rtmp/flv', //类型可加可不加，目前未看到影响
        // type: 'video/mp4',
      },
    ],
  };
  return (
    <>
      <div className={styles.content}>
        {/*  */}
        <Row>{/* <Col span={24}>{VideoList()}</Col> */}</Row>
        {/*  */}
        <div className={styles.container}>
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
                  <Player />
                </Col>
              </div>{' '}
            </div>
          ))}
        </div>

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
