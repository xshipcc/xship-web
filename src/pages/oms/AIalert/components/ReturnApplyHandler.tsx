import React from 'react';
import { Col, Row } from 'antd';
import type { ReturnApplyListItem } from '../data.d';
import '../index.less';

export interface ReturnApplyProductProps {
  currentData: ReturnApplyListItem;
}

const ReturnApplyHandler: React.FC<ReturnApplyProductProps> = (props) => {
  const item = props.currentData;
  return (
    <>
      <Row>
        <Col span={6} className={'Col'}>
          处理人员
        </Col>
        <Col span={18} className={'Col'}>
          {item.handleMan}
        </Col>
      </Row>
      <Row>
        <Col span={6} className={'Col'}>
          处理时间
        </Col>
        <Col span={18} className={'Col'}>
          {item.handleTime}
        </Col>
      </Row>
      <Row>
        <Col span={6} className={'Col'}>
          处理备注
        </Col>
        <Col span={18} className={'Col'}>
          {item.handleNote}
        </Col>
      </Row>
    </>
  );
};

export default ReturnApplyHandler;
