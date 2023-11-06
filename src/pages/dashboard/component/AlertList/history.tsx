/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-22 14:51:44
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-06 09:34:34
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\AlertList\history.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ProList } from '@ant-design/pro-components';
import { Button, Col, DatePicker, List, Row, Select, Space, Tag, message } from 'antd';
import styles from './history.less';
import { useState } from 'react';

import { queryHistory } from '@/pages/drone/history/service';
import type { ListUavHistoryDataType } from '@/pages/drone/history/data';

export default () => {
  const openDrawer = (data: ListUavHistoryDataType) => {
    console.log('toggleDrawer -> param2:', data);
  };
  const [reqParams, setreqParams] = useState({
    type: 0,
    platform: 0,
    confirm: 0,
    start_time: '',
    end_time: '',
  });
  const getList = async (params = {}) => {
    console.log('request={ -> params:', params);
    const req = {
      ...params,
      ...reqParams,
    };
    // @ts-ignore
    const res: ListAlertHistoryRespType = await queryAlert(req);
    console.log('request={ -> res:', res);
    return res;
  };

  const onChangePicker: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    reqParams.start_time = dateString;
    setreqParams(reqParams);
  };
  const onChangeSelector = (value: number) => {
    console.log('onChangeSelector -> value:', value);
    reqParams.type = value;
    setreqParams(reqParams);
  };

  return (
    <div className={styles.list}>
      <Row className={styles.buttonRow}>
        <Col span={10}>
          <DatePicker onChange={onChangePicker} />
        </Col>
        <Col span={10} offset={4}>
          <Select
            defaultValue={0}
            onChange={onChangeSelector}
            options={[
              { value: 0, label: '全部' },
              { value: 1, label: '巡检路线' },
              { value: 2, label: '人员告警' },
              { value: 3, label: '车辆告警' },
              { value: 4, label: '入侵告警' },
              { value: 5, label: '烟火告警' },
            ]}
          />
        </Col>
      </Row>
      <Row className={styles.buttonRow2}>
        <Col span={10}>
          <Button
            type="text"
            onClick={() => {
              // 默认查询结果
              // queryAlert({
              //   current: 1,
              //   pageSize: 7,
              //   type: 0,
              //   platform: 0,
              //   confirm: 0,
              //   start_time: '',
              //   end_time: '',
              // });
            }}
          >
            重置
          </Button>
        </Col>
        <Col span={10} offset={4}>
          <Button
            type="text"
            onClick={() => {
              getList({ current: 1, pageSize: 7 });
            }}
          >
            查询
          </Button>
        </Col>
      </Row>

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
