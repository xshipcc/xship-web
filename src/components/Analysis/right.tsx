/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-15 19:07:07
 * @FilePath: \zero-admin-ui-master\src\components\Analysis\right.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './right.less';
import { Pie } from '@ant-design/plots';
import VirtualList from 'rc-virtual-list';
import { Avatar, List, message } from 'antd';

const AnalysisRight: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file index.tsx
   *  @time 2023/09/13
   * @category :
   * @function :
   */

  const DemoPie = () => {
    const data = [
      {
        type: '分类一',
        value: 27,
      },
      {
        type: '分类二',
        value: 25,
      },
      {
        type: '分类三',
        value: 18,
      },
      {
        type: '分类四',
        value: 15,
      },
      {
        type: '分类五',
        value: 10,
      },
      {
        type: '其他',
        value: 5,
      },
    ];
    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      label: {
        type: 'outer',
        content: '{name} {percentage}',
      },
      interactions: [
        {
          type: 'pie-legend-active',
        },
        {
          type: 'element-active',
        },
      ],
    };
    return <Pie {...config} />;
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
  const ContainerHeight = 160;

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
      <List className={styles.lists} bordered={false} split={false}>
        <VirtualList
          data={data}
          height={ContainerHeight}
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
            今日巡检
          </Col>
          <Col span={8} className={styles.text}>
            异常次数
          </Col>
          <Col span={8} className={styles.text}>
            告警次数
          </Col>
        </Row>
        <Row>
          <Col span={8} className={styles.textnumber}>
            66
          </Col>
          <Col span={8} className={styles.textnumber}>
            77
          </Col>
          <Col span={8} className={styles.textRed}>
            88
          </Col>
        </Row>
        {/*  */}
        <Row>
          <Col span={2} className={styles.arrow} />
          <Col span={22} className={styles.title}>
            即时告警
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.titleLine} />
        </Row>
        {/*  */}
        <Row>
          <Col span={11} offset={1} className={styles.timepicker}>
            <Row>
              <Col span={3} offset={7} className={styles.calendar} />
              <Col span={14} className={styles.calendartext}>
                全部
              </Col>
            </Row>
          </Col>
          <Col span={11} offset={1} className={styles.timepicker}>
            <Row>
              <Col span={3} offset={7} className={styles.calendar} />
              <Col span={14} className={styles.calendartext}>
                30分钟内
              </Col>
            </Row>
          </Col>
        </Row>
        {/*  */}
        <Row>
          <Col span={24}>{AlertList()}</Col>
        </Row>
        {/*  */}
        <Row>
          <Col span={2} className={styles.arrow} />
          <Col span={22} className={styles.title}>
            严重报警比例
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.titleLine} />
        </Row>
        {/*  */}
        <Row>
          <Col span={24} className={styles.chart}>
            {DemoPie()}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AnalysisRight;
