/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 22:27:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-28 11:26:52
 * @FilePath: \zero-admin-ui-master\src\pages\drone\history\components\CreateFlashForm.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, DatePicker } from 'antd';
import type { AddUavHistoryReqType } from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: AddUavHistoryReqType) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const { RangePicker } = DatePicker;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateFlashForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const [createTime, setcreateTime] = useState<string>('');
  const [endTime, setendTime] = useState<string>('');

  const { onSubmit, onCancel, createModalVisible } = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();
    }
  }, [props.createModalVisible]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: AddUavHistoryReqType) => {
    if (onSubmit) {
      onSubmit({ ...values, createTime, endTime });
    }
  };

  const onChange = (date: any, dateString: string[]) => {
    setcreateTime(dateString[0]);
    setendTime(dateString[1]);
  };
  //

  // export interface AddUavHistoryReqType {
  //   uavId: number; // 无人机id
  //   flyId: number; // 巡检路线id
  //   operator: string; // 操作者
  //   createTime: string; // 创建时间
  //   endTime: string; // 结束时间
  // }
  const renderContent = () => {
    return (
      <>
        <FormItem
          name="uavId"
          label="无人机id"
          rules={[{ required: true, message: '请输入无人机id!' }]}
        >
          <Input id="update-title" placeholder={'请输入无人机名称'} />
        </FormItem>
        <FormItem
          name="flyId"
          label="巡检路线id"
          rules={[{ required: true, message: '请输入巡检路线id!' }]}
        >
          <Input id="update-title" placeholder={'请输入巡检路线id'} />
        </FormItem>
        <FormItem
          name="operator"
          label="操作者"
          rules={[{ required: true, message: '请输入操作者!' }]}
        >
          <Input id="update-title" placeholder={'请输入操作者'} />
        </FormItem>
        <FormItem label="巡检历史时间">
          <RangePicker onChange={onChange} />
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建无人机历史"
      open={createModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateFlashForm;
