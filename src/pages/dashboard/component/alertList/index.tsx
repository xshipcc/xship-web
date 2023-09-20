// @ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-19 16:30:18
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-20 19:08:50
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\alertList\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import VirtualList from 'rc-virtual-list';
import { List } from 'antd';
import { io } from 'socket.io-client';
import type { SocketType } from './socket';
import { useSelector, useDispatch, useModel } from 'umi';

const socket: SocketType = io('http://localhost:3000');

interface AlertType {
  id: number;
  alert: {
    type: string;
    time: string;
    info: string;
    coordinate: [number, number];
  };
}

interface AlertListType {
  height: number;
}
/**
 *  @file index.tsx
 *  @time 2023/09/19
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */

const AlertList: React.FC<AlertListType> = (props: AlertListType) => {
  /**
   *  @file index.tsx
   *  @time 2023/09/19
   * @category :
   * @function :
   */
  //#region -------------------------------------------------------------------------
  // @ts-ignore
  const [containerHeight] = useState(props.height);
  const initView = useSelector((state: any) => state.dashboardModel.alertList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'dashboardModel/fetchAlertList',
      payload: { name: 'dashboardInfo' },
    });
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('initView:', initView.results);
    if (initView.results !== undefined) {
      setData(initView.results);
    }
  }, [initView]);

  useEffect(() => {
    socket.on('alert_msg', (msg) => {
      setData(data.concat(JSON.parse(msg).results));
      // console.log('socket.on -> msg:', JSON.parse(msg).results);
    });
    // 错误处理
    socket.on('error', (error) => {
      console.error('Socket error:', error);
      // 处理错误，比如记录日志或执行其他操作
    });
    // 监听断开连接事件
    socket.on('disconnect', () => {
      console.log('与服务器的连接已断开');
    });
  }, []);

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */

  return (
    // <></>
    <List className={styles.lists} bordered={false} split={false}>
      <VirtualList data={data} height={containerHeight} itemHeight={1} itemKey="id">
        {(item: AlertType) => (
          <List.Item key={item.id} className={styles.listItem}>
            <Row className={styles.listinfo}>
              <Col span={2} offset={2} className={styles.alert} />
              <Col span={19} offset={1} className={styles.alerttext}>
                无人机巡检告警{item.id}
              </Col>
            </Row>
            <Row className={styles.textInfo}>
              <Col span={7}>巡检时间:</Col>
              <Col span={17}>{item.alert.time}</Col>
            </Row>
            <Row className={styles.textInfo}>
              <Col span={7}>报警内容:</Col>
              <Col span={17}>{item.alert.info}</Col>
            </Row>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
export default AlertList;
