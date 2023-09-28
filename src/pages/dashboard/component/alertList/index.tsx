// @ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-19 16:30:18
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-27 17:35:09
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
import { Button, Drawer } from 'antd';

const socket: SocketType = io('ws://ai.javodata.com:8883/mqtt ');

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
  // useEffect(() => {
  //   dispatch({
  //     type: 'dashboardModel/fetchAlertList',
  //     payload: { name: 'dashboardInfo' },
  //   });
  // }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('initView:', initView.results);
    setData([
      {
        id: '22222',
        alert: {
          type: 'Ms',
          time: '1985-05-24 16:15:49',
          info: '增群领走子',
          coordinate: ['111', '111'],
        },
      },
      {
        id: '222',
        alert: {
          type: 'Ms',
          time: '2013-08-07 05:01:28',
          info: '术又需家',
          coordinate: ['111', '111'],
        },
      },
      {
        id: '2222',
        alert: {
          type: 'Ms',
          time: '1985-04-13 20:33:03',
          info: '色示两部',
          coordinate: ['111', '111'],
        },
      },
      {
        id: '2222',
        alert: {
          type: 'Ms',
          time: '2004-04-14 06:20:01',
          info: '光十表',
          coordinate: ['111', '111'],
        },
      },
      {
        id: '2222222222',
        alert: {
          type: 'Ms',
          time: '2016-03-19 07:33:47',
          info: '传不技动思于',
          coordinate: ['111', '111'],
        },
      },
      {
        id: '222',
        alert: {
          type: 'Ms',
          time: '1972-11-05 17:33:27',
          info: '部华算太',
          coordinate: ['111', '111'],
        },
      },
      {
        id: '22',
        alert: {
          type: 'Ms',
          time: '1978-06-07 15:31:15',
          info: '商群容其由',
          coordinate: ['111', '111'],
        },
      },
      {
        id: '22222222',
        alert: {
          type: 'Ms',
          time: '2003-06-19 18:58:04',
          info: '往展处外片',
          coordinate: ['111', '111'],
        },
      },
      {
        id: '2222',
        alert: {
          type: 'Ms',
          time: '1987-02-24 02:42:44',
          info: '定很议世权',
          coordinate: ['111', '111'],
        },
      },
      {
        id: '2222',
        alert: {
          type: 'Ms',
          time: '1982-08-19 11:03:10',
          info: '战府声论连铁',
          coordinate: ['111', '111'],
        },
      },
      {
        id: '222222222',
        alert: {
          type: 'Ms',
          time: '2015-06-16 20:46:05',
          info: '能导石青',
          coordinate: ['111', '111'],
        },
      },
      {
        id: '2222222222',
        alert: {
          type: 'Ms',
          time: '1998-11-14 23:49:59',
          info: '采引具导',
          coordinate: ['111', '111'],
        },
      },
      {
        id: '22222222',
        alert: {
          type: 'Ms',
          time: '2005-05-13 09:04:57',
          info: '自没常段需进',
          coordinate: ['111', '111'],
        },
      },
      {
        id: '22222',
        alert: {
          type: 'Ms',
          time: '2009-12-20 21:53:05',
          info: '用验条制拉看',
          coordinate: ['111', '111'],
        },
      },
      {
        id: '2222',
        alert: {
          type: 'Ms',
          time: '2005-11-08 17:45:06',
          info: '里机空至',
          coordinate: ['111', '111'],
        },
      },
    ]); //测试
    if (initView.results !== undefined) {
      // setData(initView.results);
    }
  }, [initView]);

  useEffect(() => {
    socket.on('uav', (msg) => {
      setData(data.concat(JSON.parse(msg).results));
      console.log('socket.on -> msg:', msg);

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

  /**
   *  @file index.tsx
   *  @time 2023/09/25
   * @category :详情列表
   * @function :
   */
  //#region -------------------------------------------------------------------------

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    width: 231,
    padding: 0,
    overflow: 'hidden',
    textAlign: 'center',
    // backgroundColor: 'rgba(7, 19, 28, 0.605)',
    // border: '2px solid',
    // borderRadius: '0.1vh',
    // borderImage: 'linear-gradient(to bottom, rgb(10, 22, 33), rgb(38, 96, 118)) 1',
  };

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
  return (
    // <></>
    <List className={styles.lists} bordered={false} split={false}>
      <Drawer
        style={containerStyle}
        title={' 无人机巡检告警'}
        placement="center"
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
      >
        <p>
          <Button type="text" onClick={onClose}>
            返回
          </Button>
          详情列表
        </p>
      </Drawer>
      <VirtualList data={data} height={containerHeight} itemHeight={1} itemKey="id">
        {(item: AlertType) => (
          <List.Item key={item.id} className={styles.listItem} onClick={showDrawer}>
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
