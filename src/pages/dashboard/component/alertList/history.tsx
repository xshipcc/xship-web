/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-22 14:51:44
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-01 23:57:33
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\AlertList\history.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ProList } from '@ant-design/pro-components';
import { Col, List, Row, Space, Tag, message } from 'antd';
import styles from './history.less';
import { useState } from 'react';

import { queryHistory } from '@/pages/drone/history/service';
import type { ListUavHistoryDataType } from '@/pages/drone/history/data';

export default () => {
  const openDrawer = (data: ListUavHistoryDataType) => {
    console.log('toggleDrawer -> param2:', data);
  };
  return (
    <div className={styles.list}>
      <ProList
        search={{
          defaultCollapsed: false,
        }}
        renderItem={(item: ListUavHistoryDataType) => (
          <List.Item>
            <div
              className={styles.listinfo}
              onClick={() => {
                openDrawer(item);
              }}
            >
              <Row>
                <Col span={6} className={styles.historyInfoTitle}>
                  巡检路线id:
                </Col>
                <Col span={6} className={styles.historyInfo}>
                  {item.fly_id}
                </Col>
                <Col span={6} className={styles.historyInfoTitle}>
                  无人机id :
                </Col>
                <Col span={6} className={styles.historyInfo}>
                  {item.uav_id}
                </Col>
              </Row>
              <Row>
                <Col span={9} className={styles.historyInfoTitle}>
                  执行时间 :
                </Col>
                <Col span={15} className={styles.historyInfo}>
                  {item.create_time + '-' + item.end_time}
                </Col>
              </Row>
              <Row>
                <Col span={9} className={styles.historyInfoTitle}>
                  操作者 :
                </Col>
                <Col span={15} className={styles.historyInfo}>
                  {item.operator}
                </Col>
              </Row>
            </div>
          </List.Item>
        )}
        rowKey="name"
        // @ts-ignore
        request={async (params = {}) => {
          console.log('request={ -> params:', params);
          //   if (params?.type) params.type = Number(params.type);
          const res = await queryHistory(params);
          console.log('request={ -> res:', res);
          return res;
        }}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
        showActions="hover"
        metas={
          {
            //   date: {
            //     dataIndex: 'date',
            //     valueType: 'date',
            //   },
            //   type: {
            //     // 自己扩展的字段，主要用于筛选，不在列表中显示
            //     //  type     '消息类型:0-发现人员 1-車輛 2-入侵 3-烟火 4-',
            //     valueType: 'select',
            //     valueEnum: {
            //       0: { text: '全部' },
            //       1: { text: '巡检路线' },
            //       2: {
            //         text: '人员告警',
            //       },
            //       3: {
            //         text: '车辆告警',
            //       },
            //       4: {
            //         text: '入侵告警',
            //       },
            //       5: {
            //         text: '烟火告警',
            //       },
            //       6: {
            //         text: '烟火告警',
            //       },
            //     },
            //   },
          }
        }
      />
    </div>
  );
};
