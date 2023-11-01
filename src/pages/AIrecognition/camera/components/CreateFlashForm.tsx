/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 18:10:03
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-01 10:49:41
 * @FilePath: \zero-admin-ui-master\src\pages\AIrecognition\camera\components\CreateFlashForm.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, InputNumber, Upload, Select } from 'antd';
import type { AddCamerasReq } from '../data.d';
import { PlusOutlined } from '@ant-design/icons';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: AddCamerasReq) => void;
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

  const handleFinish = (values: AddCamerasReq) => {
    if (onSubmit) {
      onSubmit({ ...values });
      // onSubmit({ ...values, startDate, endDate });
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  // export interface ListCamerasData {
  //   id: number;
  //   name: string;
  //   ip: string;
  //   platform: number; //监控的平台 '使用平台：0-全部 1-飞机 2-摄像头;3-机库;4-AI',
  //   tunnel: number;
  //   url: string;
  //   lat: number;
  //   lon: number;
  //   alt: number;
  //   status: number;
  // }

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="摄像头名称"
          rules={[{ required: true, message: '请输入摄像头名称!' }]}
        >
          <Input id="update-title" placeholder={'请输入摄像头名称'} />
        </FormItem>
        <FormItem
          name="ip"
          label="摄像头ip"
          rules={[{ required: true, message: '请输入摄像头ip!' }]}
        >
          <Input id="update-title" placeholder={'请输入摄像头ip'} />
        </FormItem>
        <FormItem
          name="platform"
          label="摄像头平台"
          rules={[{ required: true, message: '请输入摄像头平台!' }]}
        >
          <Select id="showStatus">
            <Select.Option value={0}>全部</Select.Option>
            <Select.Option value={1}>飞机</Select.Option>
            <Select.Option value={2}>摄像头</Select.Option>
            <Select.Option value={3}>机库</Select.Option>
            <Select.Option value={4}>AI</Select.Option>
          </Select>
        </FormItem>
        <FormItem
          name="tunnel"
          label="摄像头通道"
          rules={[{ required: true, message: '请输入摄像头通道!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入摄像头通道'} />
        </FormItem>
        <FormItem name="lat" label="维度" rules={[{ required: true, message: '请输入维度!' }]}>
          <InputNumber id="update-title" placeholder={'请输入维度'} />
        </FormItem>
        <FormItem name="lon" label="经度" rules={[{ required: true, message: '请输入经度!' }]}>
          <InputNumber id="update-title" placeholder={'请输入经度'} />
        </FormItem>
        <FormItem name="alt" label="高度" rules={[{ required: true, message: '请输入高度!' }]}>
          <InputNumber id="update-title" placeholder={'请输入摄像头通道'} />
        </FormItem>
        <FormItem
          name="status"
          label="摄像头状态"
          rules={[{ required: true, message: '请输入摄像头状态!' }]}
        >
          <Select id="showStatus">
            <Select.Option value={0}>禁止</Select.Option>
            <Select.Option value={1}>启用</Select.Option>
            <Select.Option value={1}>故障</Select.Option>
          </Select>
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建摄像头信息"
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
