/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-25 11:18:49
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\right.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './right.less';
import AlertList from '@/pages/dashboard/component/AlertList/demo';
import type { DatePickerProps, TimePickerProps } from 'antd';
import { DatePicker, Select, Space, TimePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Title from '../common/Title';
import AwarenessButton from './component/button';
import TimeLine from './component/timeLine';

type PickerType = 'time' | 'date';

const PickerWithType = ({
  type,
  onChange,
}: {
  type: PickerType;
  onChange: TimePickerProps['onChange'] | DatePickerProps['onChange'];
}) => {
  if (type === 'time') return <TimePicker onChange={onChange} />;
  if (type === 'date') return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
};
const AwarenessRight: React.FC = () => {
  /**
   *  @file right.tsx
   *  @time 2023/09/19
   * @category :
   * @function :
   */
  //#region -------------------------------------------------------------------------

  const [AlertLists, setAlertLists] = useState<string>('analysis');
  const [activeIndex, setActiveIndex] = useState(0);
  //
  const { Option } = Select;
  const [type, setType] = useState<PickerType>('time');

  const ShowList = (name: string) => {
    setAlertLists(name);
  };

  const renderLisit = () => {
    // switch (AlertLists) {
    //   case 'Awareness':
    //     return <Awareness />;
    //   default:
    //     return <Analysis />;
    // }
  };
  const handleClick = (index) => {
    setActiveIndex(index);
  };
  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */

  return (
    <>
      <div className={styles.content}>
        <div className={styles.top}>
          <Title title={'当前航线进度'} />
          <Row className={styles.timeLine}>
            <Col span={24}>
              <TimeLine />
            </Col>
          </Row>
        </div>
        {/*  */}
        <div className={styles.middle}>
          <Title title={'告警情况'} />
          {/* <Row gutter={[32, 0]} className={styles.buttonRow}>
            <Col span={12}> */}
          {/* <Button
                type="text"
                className={activeIndex === 0 ? styles.buttonActive : styles.button}
                onClick={() => {
                  ShowList('analysis');
                  handleClick(0);
                  setType('time');
                }}
              >
                即时告警
              </Button> */}
          {/* <AwarenessButton name={'及时告警'} over={'查看历史'} url={'/demo'} />
            </Col>
            <Col span={12}> */}
          {/* <Button
                type="text"
                className={activeIndex === 1 ? styles.buttonActive : styles.button}
                onClick={() => {
                  ShowList('analysis');
                  handleClick(1);
                  setType('date');
                }}
              >
                历史查看
              </Button> */}
          {/* <AwarenessButton name={'查看历史'} over={'查看历史'} url={'/demo'} />
            </Col>
          </Row> */}
          {/*  */}
          {/* <div className={styles.picker}>
            <Row>
              <Col span={15}>
                <Space>
                  <PickerWithType type={type} onChange={(value) => console.log(value)} />
                </Space>
              </Col>
              <Col className={styles.pickerTitle} span={8}>
                <SearchOutlined />
                搜索
              </Col>
            </Row>
          </div> */}
          <AlertList />
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default AwarenessRight;
