/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-22 14:51:44
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-25 11:23:14
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\AlertList\demo.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ProList } from '@ant-design/pro-components';
import { Badge, Button, Col, List, Row, Space, Tag } from 'antd';
import styles from './demo.less';
import { useState } from 'react';
import Title from '@/pages/dashboard/component/common/Title';
import { queryAlert } from '@/pages/AIalert/service';
import { ListAlertHistoryData, ListAlertHistoryRespType } from '@/pages/AIalert/data';
import { Drawer, Divider, Image } from 'antd';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

export default () => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.list}>
      {/* <div className={styles.drawercontent} style={{ zIndex: open ? 1 : -1 }}></div> */}
      <ProList<GithubIssueItem>
        search={{
          defaultCollapsed: false,
        }}
        // @ts-ignore
        renderItem={(item: ListAlertHistoryData) => (
          <List.Item>
            <Row className={styles.listinfo}>
              <Col span={5} className={styles.alertImage}>
                <Image preview={false} src={item.image} />
              </Col>
              <Col span={19} className={styles.alertcontent}>
                <p className={styles.alertTitle}>
                  <Badge
                    status={item.confirm ? 'success' : 'error'}
                    text={'无人机巡检告警' + item.id}
                  />
                </p>
                <Row>
                  <Col span={9} className={styles.alertInfoTitle}>
                    发现时间 :
                  </Col>
                  <Col span={15} className={styles.alertInfo}>
                    {item.start_time}
                  </Col>
                </Row>
                <Row>
                  <Col span={9} className={styles.alertInfoTitle}>
                    报警内容 :
                  </Col>
                  <Col span={15} className={styles.alertInfo}>
                    {item.name}
                  </Col>
                </Row>
              </Col>
            </Row>
          </List.Item>
        )}
        rowKey="name"
        // @ts-ignore
        request={async (params = {}) => {
          // @ts-ignore
          const res: ListAlertHistoryRespType = await queryAlert(params);
          console.log('request={ -> res:', res);
          return res;
        }}
        pagination={{
          pageSize: 8,
        }}
        showActions="hover"
        metas={{
          date: {
            dataIndex: 'date',
            valueType: 'dateRange',
          },
          type: {
            // 自己扩展的字段，主要用于筛选，不在列表中显示
            //  type     '消息类型:0-发现人员 1-車輛 2-入侵 3-烟火 4-',
            //
            valueType: 'select',
            valueEnum: {
              all: { text: '全部', type: 'Default' },
              people: {
                text: '人员告警',
                type: '0',
              },
              car: {
                text: '车辆告警',
                type: '1',
              },
              invade: {
                text: '入侵告警',
                type: '2',
              },
              smoke: {
                text: '烟火告警',
                type: '2',
              },
            },
          },
        }}
      />
    </div>
  );
};
