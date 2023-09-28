import React, { useEffect, useState } from 'react';
import { DatePicker, DatePickerProps, Form, Input, Modal, Select } from 'antd';
import { UpdateUavFlyReqType } from '../data.d';
import moment from 'moment';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: UpdateUavFlyReqType) => void;
  updateModalVisible: boolean;
  values: Partial<UpdateUavFlyReqType>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateFlashForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { onSubmit, onCancel, updateModalVisible, values } = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (values) {
      form.setFieldsValue({
        ...values,
      });
    }
  }, [props.values]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (item: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit({ ...(item as UpdateUavFlyReqType) });
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" placeholder="请输入主键" />
        </FormItem>
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
    <Modal
      forceRender
      destroyOnClose
      title="修改航线信息"
      open={updateModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateFlashForm;
