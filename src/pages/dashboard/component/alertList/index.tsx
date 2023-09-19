/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-19 16:30:18
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-19 21:31:23
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

const socket: SocketType = io('http://localhost:3000');

// 执行十遍
function executeTenTimes(fn: () => void) {
  let count = 0;
  const intervalId = setInterval(() => {
    fn();
    count++;
    if (count === 100) {
      clearInterval(intervalId);
    }
  }, 1000);
}
const test = () => {
  socket.emit('alert_msg', '11111');

  socket.on('alert_msg', (msg) => {
    console.log(`received message: ${msg}`);
  });
  // 监听断开连接事件
  socket.on('disconnect', () => {
    console.log('与服务器的连接已断开');
  });
};

executeTenTimes(test);

interface UserItem {
  email: string;
  gender: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
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

  const [data, setData] = useState<UserItem[]>([]);
  // @ts-ignore
  const [containerHeight, setContainerHeight] = useState(props.height);

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        // message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === containerHeight) {
      appendData();
    }
  };

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */

  return (
    <List className={styles.lists} bordered={false} split={false}>
      <VirtualList
        data={data}
        height={containerHeight}
        itemHeight={1}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item: UserItem) => (
          <List.Item key={item.email} className={styles.listItem}>
            <Row className={styles.listinfo}>
              <Col span={2} offset={2} className={styles.alert} />
              <Col span={19} offset={1} className={styles.alerttext}>
                无人机巡检告警
              </Col>
            </Row>
            <div className={styles.textlist}>{item.gender}</div>
            <div className={styles.textlist}>{item.nat}</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
export default AlertList;
