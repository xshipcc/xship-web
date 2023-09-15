/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-14 16:26:25
 * @FilePath: \zero-admin-ui-master\src\components\Routemark\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Pie } from '@ant-design/plots';
import VirtualList from 'rc-virtual-list';
import { Avatar, List, message } from 'antd';

const AnalysisRight: React.FC = () => {
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
  return (
    <>
      <div className={styles.content}>
        <Row>
          <Col span={2} className={styles.arrow} />
          <Col span={22} className={styles.title}>
            巡检数
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.titleLine} />
        </Row>
        {/*  */}
        <Row>
          <Col span={8} className={styles.text}>
            今日巡逻
          </Col>
          <Col span={8} className={styles.text}>
            异常次数
          </Col>
          <Col span={8} className={styles.text}>
            告警次数
          </Col>
        </Row>
        <Row>
          <Col span={8} className={styles.text}>
            11111
          </Col>
          <Col span={8} className={styles.text}>
            1111
          </Col>
          <Col span={8} className={styles.textRed}>
            111
          </Col>
        </Row>
        {/*  */}
        <Row>
          <Col span={2} className={styles.arrow} />
          <Col span={22} className={styles.title}>
            智能巡检
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.titleLine} />
        </Row>
        {/*  */}
        <Row>
          <Col span={24}>{AlertList()}</Col>
        </Row>
      </div>
    </>
  );
};

export default AnalysisRight;
