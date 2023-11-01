/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-22 14:51:44
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-02 00:41:46
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\AlertList\demo.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ProList } from '@ant-design/pro-components';
import type { DatePickerProps, RadioChangeEvent } from 'antd';
import { Badge, Button, Col, DatePicker, List, Radio, Row, Select, message } from 'antd';
import styles from './demo.less';
import { useState } from 'react';
import { queryAlert, upadtaAlert } from '@/pages/AIalert/service';
import type { ListAlertHistoryData, ListAlertHistoryRespType } from '@/pages/AIalert/data';
import { Divider, Image } from 'antd';
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';

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
    lan: 0,
    lon: 0,
    altitude: 0,
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
      const success = await upadtaAlert({
        confirm: drawerData.confirm,
        id: drawerData.id,
      });
      console.log('onClick={ -> success:', success);
      message.success('更新成功');
      setShowDrawer(false);
    } catch (error) {
      hide();
      message.error('更新失败请重试！');
    }
  };
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

  /**
   *  @file demo.tsx
   *  @time 2023/11/02
   * @category :列表增删改查
   * @function :
   */
  //#region -------------------------------------------------------------------------
  const getList = async (params = {}) => {
    console.log('request={ -> params:', params);
    // if (params?.type) params.type = Number(params.type);
    // @ts-ignore
    const res: ListAlertHistoryRespType = await queryAlert(params);
    console.log('request={ -> res:', res);
    return res;
  };
  const ChangeComponent = async (params = {}) => {
    console.log('request={ -> params:', params);
  };
  const onChangePicker: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChangeSelector = (value: string) => {
    console.log('onChangeSelector -> value:', value);
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
            <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
              发现时间
            </Col>
            <Col span={12} style={{ color: 'white' }}>
              {drawerData.start_time}
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
              告警类型
            </Col>
            <Col span={12} style={{ color: 'white' }}>
              {drawerData.type}
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
              告警等级
            </Col>
            <Col span={12} style={{ color: 'white' }}>
              {drawerData.level}
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
              告警计数
            </Col>
            <Col span={12} style={{ color: 'white' }}>
              {drawerData.count}
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
              告警平台
            </Col>
            <Col span={12} style={{ color: 'white' }}>
              {drawerData.platform}
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
              坐标
            </Col>
            <Col span={12} style={{ color: 'white' }}>
              {('[' + drawerData.lon + ',' + drawerData.lan, ',' + drawerData.altitude + ']')}
            </Col>
          </Row>
          <Divider style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>备注信息</Divider>
          <div style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>{drawerData.note}</div>
          <Row>
            <Col span={12} style={{ color: 'white', fontFamily: 'YouSheBiaoTiHei' }}>
              告警确认
            </Col>
            <Col span={12} style={{ color: 'white' }}>
              <Radio.Group onChange={onChange} value={drawerData.confirm}>
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
                defaultValue="lucy"
                onChange={onChangeSelector}
                options={[
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
                  ChangeComponent('Awareness');
                }}
              >
                重置
              </Button>
            </Col>
            <Col span={10} offset={4}>
              <Button
                type="text"
                onClick={() => {
                  ChangeComponent('Awareness');
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
            // @ts-ignore
            renderItem={(item: ListAlertHistoryData) => (
              <List.Item>
                <Row
                  className={styles.listinfo}
                  onClick={() => {
                    openDrawer(item);
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
