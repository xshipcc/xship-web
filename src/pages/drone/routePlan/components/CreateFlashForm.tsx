import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, DatePicker } from 'antd';
import type { AddUavFlyReqType } from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: AddUavFlyReqType) => void;
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

  const handleFinish = (values: AddUavFlyReqType) => {
    if (onSubmit) {
      onSubmit({ ...values });
    }
  };

  //
  // export interface AddUavFlyReqType {
  //   name: string;
  //   data: string;
  //   create_time: string;
  //   creator: string;
  // }
  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="航线名称"
          rules={[{ required: true, message: '请输入航线名称!' }]}
        >
          <Input id="update-title" placeholder={'请输入航线名称'} />
        </FormItem>
        <FormItem
          name="data"
          label="航线数据"
          rules={[{ required: true, message: '请输入航线数据!' }]}
        >
          <Input id="update-title" placeholder={'请输入航线数据'} />
        </FormItem>
        <FormItem name="create_time" label="创建时间">
          <DatePicker showTime />
        </FormItem>
        <FormItem
          name="creator"
          label="操作者"
          rules={[{ required: true, message: '请输入操作者!' }]}
        >
          <Input id="update-title" placeholder={'请输入操作者'} />
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal forceRender destroyOnClose title="新建航线" open={createModalVisible} {...modalFooter}>
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateFlashForm;
