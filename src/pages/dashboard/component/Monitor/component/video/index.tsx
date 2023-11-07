/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-22 14:51:44
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-07 16:38:01
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Monitor\component\video\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ProList } from '@ant-design/pro-components';
import type { DatePickerProps } from 'antd';
import { Button, Card, Col, DatePicker, List, Row, Select, Space, Tag } from 'antd';
import styles from './index.less';
import Player from '@/components/VideoFlv';
import Title from '@/pages/dashboard/component/common/Title';

import { useEffect, useState } from 'react';
import type { ListCamerasData } from '@/pages/AIrecognition/camera/data';
import { queryCameras } from '@/pages/AIrecognition/camera/service';
// export interface ListCamerasData {
//   id: number;
//   name: string;
//   ip: string;
//   platform: number;
//   tunnel: number;
//   url: string;
//   lat: number;
//   lon: number;
//   alt: number;
//   status: number;
// }

export default () => {
  /**
   *  @file index.tsx
   *  @time 2023/11/02
   * @category :列表增删改查
   * @function :
   */
  //#region -------------------------------------------------------------------------
  const [reqParams, setreqParams] = useState({});
  const [currentList, setcurrentList] = useState([]);

  const getList = async (params = {}) => {
    console.log('request={ -> params:', params);
    const req = {
      ...params,
      // ...reqParams,
    };
    const res = await queryCameras(req);
    // @ts-ignore
    setcurrentList(res.data);
    console.log('currentList={ -> res:', res);
    console.log('currentList:', currentList);

    // return { data: currentList };
  };

  // 获取航线数据列表
  useEffect(() => {
    getList({ pageSize: 6, current: 1 });
  }, []);

  const onChangePicker: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    // reqParams.start_time = dateString;
    setreqParams(reqParams);
  };
  const onChangeSelector = (value: number) => {
    console.log('onChangeSelector -> value:', value);
    // reqParams.type = value;
    setreqParams(reqParams);
  };

  return (
    <div className={styles.monitorList}>
      <Row className={styles.buttonRow}>
        <Col span={3}>
          <DatePicker onChange={onChangePicker} />
        </Col>
        <Col span={3}>
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
        <Col span={3} offset={3}>
          <Button
            type="text"
            onClick={() => {
              // 默认查询结果
              setreqParams({
                type: 0,
                platform: 0,
                confirm: 0,
                start_time: '',
                end_time: '',
              });
              getList({ current: 1, pageSize: 6 });
            }}
          >
            重置
          </Button>
        </Col>
        <Col span={3}>
          <Button
            type="text"
            onClick={() => {
              getList({ current: 1, pageSize: 6 });
            }}
          >
            查询
          </Button>
        </Col>
      </Row>
      {/*  */}
      <List
        grid={{ gutter: 24, column: 3 }}
        pagination={{
          pageSize: 6,
          showSizeChanger: false,
        }}
        className={styles.list}
        dataSource={currentList}
        renderItem={(item: ListCamerasData) => (
          <List.Item>
            <div>
              <Title title={item.name} />
              <div className={styles.video}>
                <Player url={item.url} height={'25'} width={'100'} />
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};
