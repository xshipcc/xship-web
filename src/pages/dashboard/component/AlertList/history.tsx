/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-22 14:51:44
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-25 15:04:37
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\AlertList\history.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import type { DatePickerProps } from 'antd';
import { Button, Col, DatePicker, List, Row, Select } from 'antd';
import styles from './history.less';
import { useEffect, useState } from 'react';

import { queryHistory } from '@/pages/drone/history/service';
import type { ListUavHistoryDataType } from '@/pages/drone/history/data';
import { useDispatch, useSelector } from 'umi';

export default () => {
  const dispatch = useDispatch();

  const showDetail = useSelector((state: any) => state.dashboardModel.showDetail);

  const openDrawer = (data: ListUavHistoryDataType) => {
    console.log('toggleDrawer -> param2:', data);
    dispatch({
      type: 'dashboardModel/changeshowDetail',
      payload: !showDetail,
    });
    dispatch({
      type: 'dashboardModel/changecurrentFlyingid',
      payload: data.id,
    });
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
    uav_id: 0,
    fly_id: -1,
    history_id: -1,
    operator: '',
  });
  const [currentListInfo, setcurrentListInfo] = useState({ total: 10, current: 1, pageSize: 5 });
  const [showElement, setShowElement] = useState(false);

  // const getList = async (params = {}) => {
  //   console.log('request={ -> params:', params);
  //   const req = {
  //     ...params,
  //     ...reqParams,
  //   };
  //   // @ts-ignore
  //   const res = await queryHistory(req);
  //   if (res?.data) setcurrentList(res.data);
  // };

  const getList = async (params = {}) => {
    console.log('request={ -> params:', params);
    const req = {
      ...params,
      ...reqParams,
    };
    // @ts-ignore
    const res: ListAlertHistoryRespType = await queryHistory(req);
    console.log('requestres:', res);
    if (res?.data) {
      // @ts-ignore
      setcurrentList(res.data);
      // @ts-ignore
      setcurrentListInfo((info) => {
        info.total = res.total;
        return info;
      });
      setShowElement(true);
    }
    console.log('currentList={ -> res:', res);
    console.log('currentList:', currentList);

    // return { data: currentList };
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
                uav_id: 0,
                fly_id: 0,
                history_id: -1,
                operator: '',
              });
              getList({ current: 1, pageSize: 5 });
            }}
          >
            重置
          </Button>
        </Col>
        <Col span={10} offset={3}>
          <Button
            type="text"
            onClick={() => {
              getList({ current: 1, pageSize: 5 });
            }}
          >
            查询
          </Button>
        </Col>
      </Row>
      {/*  */}
      {showElement && (
        <List
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            defaultCurrent: 1,
            onChange: (param) => {
              console.log('param:', param);
              getList({ pageSize: 5, current: param });
            },
            total: currentListInfo.total,
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
      )}
    </div>
  );
};
