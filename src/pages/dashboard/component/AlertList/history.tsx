/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-22 14:51:44
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-07 15:54:27
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\AlertList\history.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ProList } from '@ant-design/pro-components';
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  List,
  Row,
  Select,
  Space,
  Tag,
  message,
} from 'antd';
import styles from './history.less';
import { useEffect, useState } from 'react';

import { queryHistory } from '@/pages/drone/history/service';
import type { ListUavHistoryDataType } from '@/pages/drone/history/data';

export default () => {
  const openDrawer = (data: ListUavHistoryDataType) => {
    console.log('toggleDrawer -> param2:', data);
  };
  const [currentList, setcurrentList] = useState([]);
  // Current    int64  `json:"current,default=1"`
  // PageSize   int64  `json:"pageSize,default=20"`
  // CreateTime string `json:"create_time"` //创建时间
  // EndTime    string `json:"end_time"`    //结束时间
  // Operator   string `json:"operator"`    //操作者
  // UavId      int64  `json:"uav_id"`      //无人机id
  // FlyID      int64  `json:"fly_id"`      // 巡检路线id
  const [reqParams, setreqParams] = useState({
    platform: 0,
    confirm: 0,
    create_time: '',
    end_time: '',
    uav_id: '',
    fly_id: '',
    operator: '',
  });
  const getList = async (params = {}) => {
    console.log('request={ -> params:', params);
    const req = {
      ...params,
      ...reqParams,
    };
    // @ts-ignore
    const res = await queryHistory(req);
    setcurrentList(res.data);
  };
  useEffect(() => {
    getList({ pageSize: 5, current: 1 });
  }, []);
  const onChangePicker: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    reqParams.create_time = dateString;
    setreqParams(reqParams);
  };
  const onChangeSelector = (value: string) => {
    console.log('onChangeSelector -> value:', value);
    reqParams.operator = value;
    setreqParams(reqParams);
  };

  const showAlertPosition = (item: any) => {
    console.log('onChangeSelector -> value:', item);
  };

  return (
    <div className={styles.historyList}>
      <Row className={styles.buttonRow}>
        <Col span={10}>
          <DatePicker onChange={onChangePicker} />
        </Col>
        <Col span={10} offset={3}>
          <Select
            defaultValue={'0'}
            onChange={onChangeSelector}
            options={[
              { value: '0', label: 'admin' },
              { value: '1', label: '测试' },
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
              setreqParams({
                platform: 0,
                confirm: 0,
                create_time: '',
                end_time: '',
                uav_id: '',
                fly_id: '',
                operator: '',
              });
              getList({ current: 1, pageSize: 7 });
            }}
          >
            重置
          </Button>
        </Col>
        <Col span={10} offset={3}>
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
      {/*  */}
      <List
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
        className={styles.list}
        dataSource={currentList}
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
      />
    </div>
  );
};
