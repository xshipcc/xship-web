/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-22 14:51:44
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-22 16:18:15
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\AlertList\demo.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ProList } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import request from 'umi-request';
import styles from './demo.less';

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

export default () => (
  <div className={styles.list}>
    <ProList<GithubIssueItem>
      search={{
        defaultCollapsed: false,
      }}
      rowKey="name"
      request={async (params = {}) =>
        request<{
          data: GithubIssueItem[];
        }>('https://proapi.azurewebsites.net/github/issues', {
          params,
        })
      }
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
          title: '状态',
          valueType: 'select',
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
