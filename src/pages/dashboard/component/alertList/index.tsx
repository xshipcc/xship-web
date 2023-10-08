/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-19 16:30:18
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-08 17:29:43
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\alertList\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import type { RadioChangeEvent } from 'antd';
import { Badge, Col, Radio, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import VirtualList from 'rc-virtual-list';
import { List } from 'antd';
import { useSelector, useDispatch } from 'umi';
import { Drawer, Divider, Image } from 'antd';
import { queryAlert, upadtaAlert } from '@/pages/AIalert/service';
import type { ListAlertHistoryData } from '@/pages/AIalert/data';
import { CheckOutlined, ClockCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import * as mqtt from 'mqtt';

interface AlertListType {
  height: number;
}
const clientId = 'alertList' + Math.random().toString(16).substring(2, 8);
const username = 'emqx_test';
const password = 'emqx_test';

const client = mqtt.connect(WS_MQTT_URL, {
  clientId,
  username,
  password,
  // ...other options
});
const mqttSub = (subscription: { topic: any; qos: any }) => {
  if (client) {
    const { topic, qos } = subscription;
    client.subscribe(topic, { qos }, (error) => {
      if (error) {
        console.log('Subscribe to topics error', error);
        return;
      }
      console.log(`Subscribe to topics: ${topic}`);
    });
  }
};

setTimeout(() => {
  mqttSub({ topic: 'alert', qos: 0 });
}, 1000);

const AlertList: React.FC<AlertListType> = (props: AlertListType) => {
  /**
   *  @file index.tsx
   *  @time 2023/09/19
   * @category :
   * @function :
   */
  //#region -------------------------------------------------------------------------
  // @ts-ignore
  const [containerHeight] = useState(props.height);
  const initView = useSelector((state: any) => state.dashboardModel.alertList);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch({
  //     type: 'dashboardModel/fetchAlertList',
  //     payload: { name: 'dashboardInfo' },
  //   });
  // }, []);

  // Topic: uavQoS: 0
  // {"speed": 27648, "lat": -3.0635518035181046e-19, "lon": -1.703710237260978e+38, "height": 20223, "target_angle": 10753}
  interface DroneDataType {
    speed: number;
    lat: number;
    lon: number;
    height: number;
    target_angle: number;
  }
  const [data, setData] = useState<ListAlertHistoryData[]>([]);
  // id: number;
  // name: string;
  // image: string;
  // type: number;
  // code: string;
  // level: number;
  // count: number;
  // platform: number;
  // start_time: string;
  // end_time: string;
  // note: string;
  // lan: number;
  // lon: number;
  // altitude: number;
  // confirm: number;
  const [drawerData, setdrawerData] = useState<ListAlertHistoryData>({
    id: 1,
    name: '',
    image: '',
    type: 0,
    code: '',
    level: 0,
    count: 0,
    platform: 0,
    start_time: '',
    end_time: '',
    note: '',
    lan: 0,
    lon: 0,
    altitude: 0,
    confirm: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        //   current?: number;
        //   pageSize?: number;
        //   type: number;
        //   start_time: string;
        //   end_time: string;
        //   platform: number;
        //   confirm: number;
        const response = await queryAlert({
          current: 1,
          pageSize: 50,
          type: 0,
          start_time: '',
          end_time: '',
          platform: 0,
          confirm: 0,
        });
        console.log('fetchData -> response:', response);
        const alertData: ListAlertHistoryData[] = response.data;
        setData(alertData); // 在异步操作完成后更新数据状态
      } catch (error) {
        // 处理错误
      }
    };
    fetchData();
    console.log('initView:', initView.results);

    if (initView.results !== undefined) {
      setData(initView.results);
    }
  }, [initView]);

  useEffect(() => {
    client.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'alert' && data.length !== 0) {
        // const jsonObject = JSON.parse(mqttMessage);
        // const jsonObject = JSON.parse(mqttMessage);
        // console.log('client.on -> jsonObject:', jsonObject);

        const demo = JSON.parse(mqttMessage);
        demo.id = data.length;
        demo.name = data.length;
        setData([...data, demo]);
        dispatch({
          type: 'dashboardModel/saveAlertData',
          payload: demo,
        });
      }
    });
  }, [data]);

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */

  /**
   *  @file index.tsx
   *  @time 2023/09/25
   * @category :详情列表
   * @function :
   */
  //#region -------------------------------------------------------------------------

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  // 单选框

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setdrawerData({
      ...drawerData,
      confirm: e.target.value,
    });
    console.log('onChange -> drawerData:', drawerData);
  };
  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
  const vhToPx = (vh: number) => {
    const windowHeight = window.innerHeight;
    return (vh / 100) * windowHeight;
  };

  // 示例用法
  const containerHeightInVh = 65;

  const [containerHeightInPx, setContainerHeightInPx] = useState(vhToPx(containerHeightInVh));
  window.addEventListener('resize', () => {
    setContainerHeightInPx(vhToPx(containerHeightInVh));
  });
  return (
    // <></>
    <List className={styles.lists} bordered={false} split={false}>
      <div className={styles.drawercontent} style={{ zIndex: open ? 1 : -1 }}>
        <Drawer
          title={drawerData.name}
          // @ts-ignore
          placement="center"
          closable={false}
          onClose={onClose}
          className={styles.drawer}
          open={open}
          getContainer={false}
        >
          <Image
            className={styles.drawerImage}
            src={
              drawerData.image === ''
                ? 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                : drawerData.image
            }
          />
          <Divider style={{ color: 'white' }}>告警列表详情</Divider>
          <Badge
            status={
              drawerData.type === 0
                ? 'success'
                : drawerData.type === 1
                ? 'error'
                : drawerData.type === 2
                ? 'default'
                : 'warning'
            }
            text={
              drawerData.type === 0
                ? '发现人员'
                : drawerData.type === 1
                ? '发现车辆'
                : drawerData.type === 2
                ? '发现入侵'
                : '发现烟火'
            }
          />
          <Divider type="vertical" />
          <Badge
            status={
              drawerData.platform === 0
                ? 'success'
                : drawerData.platform === 1
                ? 'error'
                : drawerData.platform === 2
                ? 'default'
                : drawerData.platform === 3
                ? 'processing'
                : 'warning'
            }
            text={
              drawerData.platform === 0
                ? '全部'
                : drawerData.platform === 1
                ? '飞机'
                : drawerData.platform === 2
                ? '摄像头'
                : drawerData.platform === 3
                ? '机库'
                : 'AI'
            }
          />
          <Row>
            <Col span={8} className={styles.text}>
              系统分类
            </Col>
            <Col span={8} className={styles.text}>
              预警等级
            </Col>
            <Col span={8} className={styles.text}>
              报警数量
            </Col>
          </Row>
          <Row>
            <Col span={8} className={styles.textnumbergreen}>
              {drawerData.code}
            </Col>
            <Col span={8} className={styles.textnumberyellow}>
              {drawerData.level}
            </Col>
            <Col span={8} className={styles.textRed}>
              {drawerData.count}
            </Col>
          </Row>
          <Row>
            <Col span={2}>
              <ClockCircleOutlined />
            </Col>
            <Col span={21} offset={1}>
              {drawerData.start_time}
            </Col>
          </Row>
          <Row>
            <Col className={styles.note} span={24}>
              {drawerData.note}
            </Col>
          </Row>

          <Divider style={{ color: 'white' }}>检查确认</Divider>
          <Row>
            <Col span={24}>
              <Radio.Group onChange={onChange} value={drawerData.confirm}>
                <Radio style={{ color: 'white' }} value={1}>
                  是
                </Radio>
                <Divider type="vertical" />
                <Divider type="vertical" />
                <Divider type="vertical" />
                <Divider type="vertical" />
                <Divider type="vertical" />
                <Radio style={{ color: 'white' }} value={0}>
                  否
                </Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Divider style={{ color: 'white' }} />
          <Row>
            <Col
              className={styles.button}
              span={8}
              onClick={() => {
                setOpen(false);
              }}
            >
              <RollbackOutlined />
              返回
            </Col>
            <Col
              className={styles.button}
              span={8}
              offset={8}
              onClick={async () => {
                {
                  const hide = message.loading('正在更新');
                  try {
                    const success = await upadtaAlert({
                      confirm: drawerData.confirm,
                      id: drawerData.id,
                    });
                    console.log('onClick={ -> success:', success);

                    message.success('更新成功');
                    return true;
                  } catch (error) {
                    hide();
                    message.error('更新失败请重试！');
                    return false;
                  }
                }
              }}
            >
              <CheckOutlined />
              确认
            </Col>
          </Row>
        </Drawer>
      </div>
      <VirtualList data={data} height={containerHeightInPx} itemHeight={1} itemKey="id">
        {(item: ListAlertHistoryData) => (
          <List.Item
            key={item.id}
            className={styles.listItem}
            onClick={() => {
              console.log('item:', data);
              setdrawerData(item);
              setOpen(true);
            }}
          >
            <Row className={styles.listinfo}>
              <Col span={7} className={styles.alertImage}>
                <Image
                  width={70}
                  height={60}
                  preview={false}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </Col>
              <Col span={17} className={styles.alertcontent}>
                <p className={styles.alertTitle}>
                  <Badge
                    status={item.confirm ? 'success' : 'error'}
                    text={'无人机巡检告警' + item.id}
                  />
                </p>
                <Row>
                  <Col span={9} className={styles.alertInfoTitle}>
                    巡检时间 :
                  </Col>
                  <Col span={15} className={styles.alertInfo}>
                    {item.start_time}
                  </Col>
                </Row>
                <Row>
                  <Col span={9} className={styles.alertInfoTitle}>
                    报警标题 :
                  </Col>
                  <Col span={15} className={styles.alertInfo}>
                    {item.name}
                  </Col>
                </Row>
              </Col>
            </Row>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
export default AlertList;
