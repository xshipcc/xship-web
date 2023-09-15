/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-14 13:47:37
 * @FilePath: \zero-admin-ui-master\src\components\Awareness\right.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './right.less';
import VirtualList from 'rc-virtual-list';
import { Avatar, List, message } from 'antd';

const AwarenessRight: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file right.tsx
   *  @time 2023/09/14
   * @category :
   * @function :
   */

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
  const ContainerHeight = 400;

  const AlertList = () => {
    const [data, setData] = useState<UserItem[]>([]);

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
      if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
        appendData();
      }
    };

    return (
      <List className={styles.lists}>
        <VirtualList
          data={data}
          height={ContainerHeight}
          itemHeight={60}
          itemKey="email"
          onScroll={onScroll}
        >
          {(item: UserItem) => (
            <List.Item key={item.email} className={styles.listItem}>
              <Row className={styles.listinfo}>
                <Col span={2} className={styles.alert} />
                <Col span={22} className={styles.alerttext}>
                  无人机巡检告警
                </Col>
              </Row>
              <Row>
                <Col span={24} className={styles.title}>
                  11111111
                </Col>
              </Row>
            </List.Item>
          )}
        </VirtualList>
      </List>
    );
  };

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------

  //#region    -----------------------------------------------------------------------
  /**
   *  @file right.tsx
   *  @time 2023/09/14
   * @category :
   * @function :
   */

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

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------

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
          <Button
            type="text"
            className={styles.button}
            onClick={() => {
              ShowList('analysis');
            }}
          >
            即时告警
          </Button>
          <Button
            type="text"
            className={styles.button}
            onClick={() => {
              ShowList('Awareness');
            }}
          >
            历史查看
          </Button>
        </Row>
        <Row>
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
        <Row>
          <Col span={24} className={styles.listcontent}>
            {AlertList()}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AwarenessRight;
