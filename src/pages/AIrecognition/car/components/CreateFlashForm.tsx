/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 18:10:03
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-31 16:39:21
 * @FilePath: \zero-admin-ui-master\src\pages\AIrecognition\car\components\CreateFlashForm.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, InputNumber, Upload, Select } from 'antd';
import type { AddCarReq } from '../data.d';
import { PlusOutlined } from '@ant-design/icons';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: AddCarReq) => void;
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

  const handleFinish = (values: AddCarReq) => {
    if (onSubmit) {
      onSubmit({ ...values });
      // onSubmit({ ...values, startDate, endDate });
    }
  };

  //   export interface AddCarReq {
  //   name: string;
  //   card: string;
  //   photo: string;
  //   type: number;
  //   phone: string;
  //   agency: string;
  //   status: number;
  // }
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="车辆名称"
          rules={[{ required: true, message: '请输入车辆名称!' }]}
        >
          <Input id="update-title" placeholder={'请输入车辆名称'} />
        </FormItem>
        <FormItem name="card" label="车牌号" rules={[{ required: true, message: '请输入车牌号!' }]}>
          <Input id="update-title" placeholder={'请输入车牌号'} />
        </FormItem>
        {/* <FormItem
          name="photo"
          label="车辆照片"
          rules={[{ required: true, message: '请输入车辆照片!' }]}
        >
          <InputNumber placeholder={'请输入车辆照片'} />
        </FormItem> */}
        <FormItem label="车辆照片" name="photo" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>上传</div>
            </div>
          </Upload>
        </FormItem>
        <FormItem
          name="type"
          label="车辆等级"
          rules={[{ required: true, message: '请输入车辆等级!' }]}
        >
          <Select id="showStatus">
            <Select.Option value={0}>本部</Select.Option>
            <Select.Option value={1}>外来</Select.Option>
            <Select.Option value={2}>工程</Select.Option>
          </Select>
        </FormItem>
        <FormItem
          name="agency"
          label="所属机构"
          rules={[{ required: true, message: '请输入所属机构!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入所属机构'} />
        </FormItem>
        <FormItem
          name="status"
          label="账号状态"
          rules={[{ required: true, message: '请输入账号状态!' }]}
        >
          <Select id="showStatus">
            <Select.Option value={0}>禁止</Select.Option>
            <Select.Option value={1}>启用</Select.Option>
          </Select>
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
