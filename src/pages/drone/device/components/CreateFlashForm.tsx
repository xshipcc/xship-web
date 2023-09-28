/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 18:10:03
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-28 08:21:56
 * @FilePath: \zero-admin-ui-master\src\pages\drone\device\components\CreateFlashForm.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, DatePicker, InputNumber } from 'antd';
import type { AddUavDeviceReqType, FlashPromotionListItem } from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: AddUavDeviceReqType) => void;
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

  // const [startDate, setStartDate] = useState<string>('');
  // const [endDate, setEndDate] = useState<string>('');

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

  const handleFinish = (values: AddUavDeviceReqType) => {
    if (onSubmit) {
      onSubmit({ ...values });
      // onSubmit({ ...values, startDate, endDate });
    }
  };

  // const onChange = (date: any, dateString: string[]) => {
  //   setStartDate(dateString[0]);
  //   setEndDate(dateString[1]);
  // };
  //
  // interface AddUavDeviceReqType {
  //   name: string;
  //   ip: string;
  //   port: number;
  //   hangarIp: string;
  //   hangarPort: number;
  // }
  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="无人机名称"
          rules={[{ required: true, message: '请输入无人机名称!' }]}
        >
          <Input id="update-title" placeholder={'请输入无人机名称'} />
        </FormItem>
        <FormItem
          name="ip"
          label="无人机ip地址"
          rules={[{ required: true, message: '请输入无人机ip地址!' }]}
        >
          <Input id="update-title" placeholder={'请输入无人机ip地址'} />
        </FormItem>
        <FormItem
          name="port"
          label="端口号"
          rules={[{ required: true, message: '请输入无人机端口号!' }]}
        >
          <InputNumber placeholder={'请输入端口号'} />
        </FormItem>
        <FormItem
          name="hangarIp"
          label="机库ip地址"
          rules={[{ required: true, message: '请输入机库ip地址!' }]}
        >
          <Input id="update-title" placeholder={'请输入机库ip地址'} />
        </FormItem>
        <FormItem
          name="hangarPort"
          label="无人机ip地址"
          rules={[{ required: true, message: '请输入无人机ip地址!' }]}
        >
          <Input id="update-title" placeholder={'请输入无人机ip地址'} />
        </FormItem>
        {/* <FormItem name="rangeDate" label="活动日期">
          <RangePicker onChange={onChange} />
        </FormItem>
        <FormItem name="status" label="上下线状态" initialValue={1}>
          <Select id="status" placeholder={'请选择状态'}>
            <Option value={0}>停用</Option>
            <Option value={1}>启用</Option>
          </Select>
        </FormItem> */}
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建无人机信息"
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
