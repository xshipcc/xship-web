/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-22 14:51:44
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-30 08:59:52
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Monitor\component\video\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ProList } from '@ant-design/pro-components';
import { Button, Card, List, Space, Tag } from 'antd';
import request from 'umi-request';
import styles from './index.less';
import Player from '@/components/VideoFlv';
import Title from '@/pages/dashboard/component/common/Title';
import { queryAlert } from '@/pages/AIalert/service';

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
      grid={{ gutter: 24, column: 3 }}
      renderItem={(item) => (
        <List.Item>
          <div>
            <Title title={'监控画面'} />
            <div className={styles.video}>
              <Player url={'demo'} height={'25'} width={'100'} />
            </div>
          </div>
        </List.Item>
      )}
      search={{
        defaultCollapsed: false,
      }}
      rowKey="name"
      request={async (params = {}) => {
        console.log('request={ -> params:', params);
        // @ts-ignore
        const res = await queryAlert(params);
        console.log('request={ -> res:', res);
        return res;
      }}
      pagination={{
        pageSize: 6,
      }}
      showActions="hover"
      metas={{
        date: {
          title: '时间',
          valueType: 'date',
        },
        type: {
          // 自己扩展的字段，主要用于筛选，不在列表中显示
          title: '状态',
          valueType: 'select',
          valueEnum: {
            all: { text: '全部', status: 'Default' },
            online: {
              text: '在线',
              status: 'Processing',
            },
            offline: {
              text: '未在线',
              status: 'Success',
            },
            breakdown: {
              text: '故障',
              status: 'Error',
            },
          },
        },
      }}
    />
  </div>
);
