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
import { Form, Input, Modal, InputNumber } from 'antd';
import type { AddUavNetworkReqType } from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: AddUavNetworkReqType) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateFlashForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

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

  const handleFinish = (values: AddUavNetworkReqType) => {
    if (onSubmit) {
      onSubmit({ ...values });
      // onSubmit({ ...values, startDate, endDate });
    }
  };

  // export interface AddUavNetworkReqType {
  //   name: string; // 频段名称
  //   band: number; // 频段号
  //   type: number; // 频段类型
  // }
  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="频段名称"
          rules={[{ required: true, message: '请输入频段名称!' }]}
        >
          <Input id="update-title" placeholder={'请输入频段名称'} />
        </FormItem>
        <FormItem
          name="band"
          label="无人机频段"
          rules={[{ required: true, message: '请输入无人机频段!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入无人机频段'} />
        </FormItem>
        <FormItem
          name="type"
          label="无人机频段类型"
          rules={[{ required: true, message: '请输入无人机频段类型!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入无人机频段类型'} />
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建无人机频段"
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
