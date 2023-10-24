/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-22 14:51:44
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-24 08:55:01
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\AlertList\demo.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ProList } from '@ant-design/pro-components';
import { Button, List, Space, Tag } from 'antd';
import request from 'umi-request';
import styles from './demo.less';
import { useState } from 'react';
import Title from '@/pages/dashboard/component/common/Title';

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
        renderItem={(item) => (
          <List.Item>
            <div>
              {console.log(item, 'item')}
              <Title title={'监控画面'} />
            </div>
          </List.Item>
        )}
        rowKey="name"
        request={async (params = {}) => {
          console.log('request={ -> params:', params);
          request<{
            data: GithubIssueItem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
          });
        }}
        pagination={{
          pageSize: 8,
        }}
        showActions="hover"
        metas={{
          title: {
            dataIndex: 'user',
            title: '用户',
            valueType: 'dateTime',
          },
          avatar: {
            dataIndex: 'avatar',
            search: false,
          },
          description: {
            dataIndex: 'title',
            search: false,
          },
          status: {
            // 自己扩展的字段，主要用于筛选，不在列表中显示
            //  type     '消息类型:0-发现人员 1-車輛 2-入侵 3-烟火 4-',
            //
            title: '状态',
            valueType: 'type',
            valueEnum: {
              all: { text: '全部', status: 'Default' },
              open: {
                text: '未解决',
                status: 'Error',
              },
              closed: {
                text: '已解决',
                status: 'Success',
              },
              processing: {
                text: '解决中',
                status: 'Processing',
              },
            },
          },
        }}
      />
    </div>
  );
};
