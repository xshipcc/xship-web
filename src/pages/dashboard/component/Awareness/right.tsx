/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-25 01:38:47
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\right.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './right.less';
import AlertList from '@/pages/dashboard/component/alertList';
import type { DatePickerProps, TimePickerProps } from 'antd';
import { DatePicker, Select, Space, TimePicker } from 'antd';

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
        <Row>
          <Col span={2} className={styles.arrow} />
          <Col span={22} className={styles.title}>
            告警情况
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.titleLine} />
        </Row>
        {/*  */}
        <Row className={styles.buttonRow}>
          <Col span={12} className={styles.title}>
            <Button
              type="text"
              className={activeIndex === 0 ? styles.buttonActive : styles.button}
              onClick={() => {
                ShowList('analysis');
                handleClick(0);
                setType('time');
              }}
            >
              即时告警
            </Button>
          </Col>
          <Col span={12} className={styles.title}>
            <Button
              type="text"
              className={activeIndex === 1 ? styles.buttonActive : styles.button}
              onClick={() => {
                ShowList('analysis');
                handleClick(1);
                setType('date');
              }}
            >
              历史查看
            </Button>
          </Col>
        </Row>
        {/*  */}
        <div className={styles.picker}>
          <Space>
            {/* <Select value={type}>
              <Option value="time">指定时间内</Option>
              <Option value="date">选择日期内</Option>
            </Select> */}
            <PickerWithType type={type} onChange={(value) => console.log(value)} />
          </Space>
        </div>
        {/*  */}
        <Row>
          <Col span={24} className={styles.listcontent}>
            <AlertList height={400} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AwarenessRight;
