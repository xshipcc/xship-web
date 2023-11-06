/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-22 14:51:44
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-06 15:08:52
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\AlertList\demo.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ProList } from '@ant-design/pro-components';
import type { DatePickerProps, RadioChangeEvent } from 'antd';
import { Badge, Button, Col, DatePicker, List, Radio, Row, Select, message } from 'antd';
import styles from './demo.less';
import { useEffect, useRef, useState } from 'react';
import { queryAlert, upadtaAlert } from '@/pages/AIalert/service';
import type { ListAlertHistoryData, ListAlertHistoryRespType } from '@/pages/AIalert/data';
import { Divider, Image } from 'antd';
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import * as mqtt from 'mqtt';

export default () => {
  /**
   *  @file demo.tsx
   *  @time 2023/11/02
   * @category :详情信息的查看
   * @function :
   */
  //#region -------------------------------------------------------------------------

  const [showDrawer, setShowDrawer] = useState(false);
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
    lat: 0,
    lon: 0,
    alt: 0,
    confirm: 0,
  });
  const openDrawer = (data: ListAlertHistoryData) => {
    setdrawerData(data);
    console.log('toggleDrawer -> param2:', data);
    setShowDrawer(true);
  };
  const closeDrawer = async (data: any) => {
    setShowDrawer(false);
  };
  const saveDrawer = async (data: any) => {
    console.log('saveDrawer -> data:', data);
    const hide = message.loading('正在更新');
    try {
      const response = await upadtaAlert({
        confirm: drawerData.confirm,
        id: drawerData.id,
      });
      const { code, result } = response;
      console.log('getData', code);
      if (code === '000000') {
        message.success(result);
        setShowDrawer(false);
      }
    } catch (error) {
      hide();
      message.error('更新失败请重试！');
    }
  };
  const onChangeConfirm = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setdrawerData({
      ...drawerData,
      confirm: e.target.value,
    });
  };

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */

  /**
   *  @file demo.tsx
   *  @time 2023/11/06
   * @category :mqtt数据接收
   * @function :
   */
  //#region -------------------------------------------------------------------------
  const def: any = '';
  const client = useRef(def);

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
  /**
   *  @file demo.tsx
   *  @time 2023/11/02
   * @category :列表增删改查
   * @function :
   */
  //#region -------------------------------------------------------------------------
  const [reqParams, setreqParams] = useState({
    type: 0,
    platform: 0,
    confirm: 0,
    start_time: '',
    end_time: '',
  });
  const [currentList, setcurrentList] = useState([]);

  const getList = async (params = {}) => {
    console.log('request={ -> params:', params);
    const req = {
      ...params,
      ...reqParams,
    };
    // @ts-ignore
    const res: ListAlertHistoryRespType = await queryAlert(req);
    // @ts-ignore
    setcurrentList(res.data);
    console.log('currentList={ -> res:', res);
    console.log('currentList:', currentList);

    // return { data: currentList };
  };
  // 告警列表添加
  // useEffect(() => {
  //   getList({ current: 1, pageSize: 7 });
  // }, [currentList]);
  // 实时增加告警信息
  useEffect(() => {
    const clientId = 'alertList' + Math.random().toString(16).substring(2, 8);
    const username = 'emqx_test';
    const password = 'emqx_test';
    client.current = mqtt.connect(WS_MQTT_URL, {
      clientId,
      username,
      password,
      // ...other options
    });
    const mqttSub = (subscription: { topic: any; qos: any }) => {
      if (client) {
        const { topic, qos } = subscription;
        client.current.subscribe(topic, { qos }, (error: any) => {
          if (error) {
            console.log('Subscribe to topics error', error);
            return;
          }
          console.log(`Subscribe to topics: ${topic}`);
        });
      }
    };
    mqttSub({ topic: 'alert', qos: 0 });
    setTimeout(() => {
      mqttSub({ topic: 'control', qos: 0 });
    }, 1000);

    client.current.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'alert') {
        // const jsonObject = JSON.parse(mqttMessage);
        // const jsonObject = JSON.parse(mqttMessage);
        const demo = JSON.parse(mqttMessage);
        console.log('client.current.on -> demo:', demo);
        demo.id = currentList.length;
        demo.name = currentList.length;
        // @ts-ignore
        setcurrentList([...currentList, demo]);
      }
    });

    return () => {
      if (client.current) client.current.end();
    };
  }, []);
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

  const showAlertPosition = (item: any) => {
    console.log('onChangeSelector -> value:', item);
  };
  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */
  return (
    <div className={styles.list}>
      {/* <div className={styles.drawercontent} style={{ zIndex: open ? 1 : -1 }}></div> */}
      {showDrawer ? (
        <div className={styles.drawer}>
          {/*  */}
          <Row>
            <Col
              span={7}
              className={styles.title}
              onClick={() => {
                closeDrawer(drawerData);
              }}
            >
              <RollbackOutlined /> 返回
            </Col>
            <Col span={10}>
              <div className={styles.title}>{drawerData.name}</div>
            </Col>
            <Col
              span={7}
              className={styles.title}
              onClick={() => {
                saveDrawer(drawerData);
              }}
            >
              <CheckOutlined />
              保存
            </Col>
          </Row>
          {/*  */}
          <Divider style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>告警详情</Divider>
          <Row>
            <Col span={24}>
              <Image className={styles.drawerImage} src={drawerData.image} />
            </Col>
          </Row>
          <Row>
            <Col span={11} offset={1} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
              发现时间
            </Col>
            <Col span={12} style={{ color: 'white' }}>
              {drawerData.start_time}
            </Col>
          </Row>
          <Row>
            <Col span={11} offset={1} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
              告警类型
            </Col>
            <Col span={12} style={{ color: 'white' }}>
              {drawerData.type}
            </Col>
          </Row>
          <Row>
            <Col span={11} offset={1} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
              告警等级
            </Col>
            <Col span={11} offset={1} style={{ color: 'white' }}>
              {drawerData.level}
            </Col>
          </Row>
          <Row>
            <Col span={11} offset={1} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
              告警计数
            </Col>
            <Col span={12} style={{ color: 'white' }}>
              {drawerData.count}
            </Col>
          </Row>
          <Row>
            <Col span={11} offset={1} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
              告警平台
            </Col>
            <Col span={12} style={{ color: 'white' }}>
              {drawerData.platform}
            </Col>
          </Row>
          <Row>
            <Col span={11} offset={1} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
              经度
            </Col>
            <Col span={12} style={{ color: 'white' }}>
              {drawerData.lon}
              {console.log('ChangeComponent -> drawerData:', drawerData)}
            </Col>
          </Row>
          <Row>
            <Col span={11} offset={1} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
              维度
            </Col>
            <Col span={12} style={{ color: 'white' }}>
              {drawerData.lat}
            </Col>
          </Row>
          <Row>
            <Col span={11} offset={1} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
              高度
            </Col>
            <Col span={12} style={{ color: 'white' }}>
              {drawerData.alt}
            </Col>
          </Row>
          <Divider style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>备注信息</Divider>
          <div>
            <Row>
              <Col span={22} offset={1} style={{ color: 'white' }}>
                {drawerData.note}
              </Col>
            </Row>
          </div>
          <Row>
            <Col span={11} offset={1} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
              告警确认
            </Col>
            <Col span={12} style={{ color: 'white' }}>
              <Radio.Group onChange={onChangeConfirm} value={drawerData.confirm}>
                <Radio style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }} value={1}>
                  是
                </Radio>
                <Radio style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }} value={0}>
                  否
                </Radio>
              </Radio.Group>
            </Col>
          </Row>

          {/*  */}
        </div>
      ) : (
        <div>
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
                  queryAlert({
                    current: 1,
                    pageSize: 7,
                    type: 0,
                    platform: 0,
                    confirm: 0,
                    start_time: '',
                    end_time: '',
                  });
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
            dataSource={currentList}
            // @ts-ignore
            renderItem={(item: ListAlertHistoryData) => (
              <List.Item>
                <Row
                  className={styles.listinfo}
                  onClick={() => {
                    openDrawer(item);
                    showAlertPosition(item);
                  }}
                >
                  <Col span={7} className={styles.alertImage}>
                    <Image preview={false} src={item.image} />
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
              return getList(params);
            }}
            pagination={{
              pageSize: 7,
              showSizeChanger: false,
            }}
            showActions="hover"
            metas={
              {
                // date: {
                //   dataIndex: 'date',
                //   valueType: 'date',
                // },
                // type: {
                //   // 自己扩展的字段，主要用于筛选，不在列表中显示
                //   //  type     '消息类型:0-发现人员 1-車輛 2-入侵 3-烟火 4-',
                //   valueType: 'select',
                //   valueEnum: {
                //     0: { text: '全部' },
                //     1: { text: '巡检路线' },
                //     2: {
                //       text: '人员告警',
                //     },
                //     3: {
                //       text: '车辆告警',
                //     },
                //     4: {
                //       text: '入侵告警',
                //     },
                //     5: {
                //       text: '烟火告警',
                //     },
                //     6: {
                //       text: '烟火告警',
                //     },
                //   },
                // },
              }
            }
          />
        </div>
      )}
    </div>
  );
};
