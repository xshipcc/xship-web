/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-22 14:51:44
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-03-07 18:29:35
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\AlertList\history.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { DatePickerProps, message } from 'antd';
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
    console.log('历史 -> param2:', data);
    dispatch({
      type: 'dashboardModel/changeshowDetail',
      payload: false,
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
    status: -1,
    create_time: '',
  });
  const [currentListInfo, setcurrentListInfo] = useState({ total: 10, current: 1, pageSize: 5 });
  const [showElement, setShowElement] = useState(false);

  const getList = async (params: any) => {
    console.log('request={ -> params:', params);
    const req = {
      ...params,
      ...reqParams,
    };
    // @ts-ignore
    const res: ListAlertHistoryRespType = await queryHistory(req);
    console.log('requestres:', res);
    if (res?.data) {
      setShowElement(false);

      // @ts-ignore
      setcurrentListInfo((info) => {
        info.current = params.current;
        info.total = res.total;
        return info;
      });
      // @ts-ignore
      setcurrentList(res.data);

      setTimeout(() => {
        setShowElement(true);
      }, 100);
    } else {
      setShowElement(false);

      // @ts-ignore
      setcurrentList([]);
      setcurrentListInfo((info) => {
        info.current = 1;
        info.total = 0;
        return info;
      });
      setTimeout(() => {
        setShowElement(true);
      }, 100);
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
    reqParams.status = Number(value);
    setreqParams(reqParams);
  };
  const [buttonShow, setbuttonShow] = useState(true);

  return (
    <div className={styles.historyList}>
      <Row className={styles.buttonRow}>
        <Col span={10}>{buttonShow && <DatePicker onChange={onChangePicker} />}</Col>
        <Col span={10} offset={3}>
          {buttonShow && (
            <Select
              defaultValue={'-1'}
              onChange={onChangeSelector}
              options={[
                { value: '-1', label: '全部' },
                { value: '0', label: '正在巡检' },
                { value: '1', label: '正常完成' },
                { value: '2', label: '飞行异常' },
                { value: '3', label: '无法起飞' },
              ]}
            />
          )}
        </Col>
      </Row>
      <Row className={styles.buttonRow2}>
        <Col span={10}>
          <Button
            type="text"
            onClick={() => {
              // setbuttonShow(false);
              // 默认查询结果
              setreqParams({
                create_time: '',
                status: 0,
              });
              // setTimeout(() => {
              //   setbuttonShow(true);
              // }, 100);
              message.success('双击重置');
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
          current: currentListInfo.current,
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
                <Col span={6} className={styles.historyInfo}>
                  历史编号:{item.id}
                </Col>
                <Col span={6} className={styles.historyInfoTitle}>
                  巡检路线id:
                </Col>
                <Col span={3} className={styles.historyInfo}>
                  {item.fly_id}
                </Col>
                <Col span={6} className={styles.historyInfoTitle}>
                  无人机id:
                </Col>
                <Col span={3} className={styles.historyInfo}>
                  {item.uav_id}
                </Col>
              </Row>
              <Row>
                <Col span={6} className={styles.historyInfoTitle}>
                  执行时间:
                </Col>
                <Col span={18} className={styles.historyInfo}>
                  {item.create_time + '-' + item.end_time}
                </Col>
              </Row>
              {/* <Row>
                  <Col span={9} className={styles.historyInfoTitle}>
                    操作者 :
                  </Col>
                  <Col span={15} className={styles.historyInfo}>
                    {item.operator}
                  </Col>
                </Row> */}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};
