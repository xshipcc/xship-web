/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 18:10:03
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-09 12:57:50
 * @FilePath: \zero-admin-ui-master\src\pages\AIrecognition\people\components\CreateFlashForm.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, InputNumber, Upload, Select, DatePicker, DatePickerProps } from 'antd';
import type { AddPeopleReq } from '../data.d';
import { PlusOutlined } from '@ant-design/icons';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: AddPeopleReq) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateFlashForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [create_time, setCreate_time] = useState<string>('');

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

  const handleFinish = (values: AddPeopleReq) => {
    if (onSubmit) {
      onSubmit({ ...values, create_time });
    }
  };

  const normFile = (e: any) => {
    console.log('normFile -> e:', e.fileList);

    if (Array.isArray(e)) {
      return e;
    }
    const fileName: any[] = [];
    e.fileList.forEach((item: any) => {
      console.log('normFile -> item:', item);
      fileName.push(item.name);
    });
    console.log('normFile -> fileName:', fileName);

    return JSON.stringify(fileName);
  };

  const onChangeCreate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('dateString:', dateString);
    setCreate_time(dateString);
  };
  // export interface ListPeopleData {
  //   id: number;
  //   level: number;
  //   username: string;
  //   phone: string;
  //   status: number;
  //   icon: string;
  //   gender: number;
  //   create_time: string;
  // }

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="username"
          label="用户名称"
          rules={[{ required: true, message: '请输入用户名称!' }]}
        >
          <Input id="update-title" placeholder={'请输入用户名称'} />
        </FormItem>
        <FormItem label="用户头像" name="icon" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>上传</div>
            </div>
          </Upload>
        </FormItem>
        <FormItem
          name="level"
          label="人员等级"
          rules={[{ required: true, message: '请输入人员等级!' }]}
        >
          <Select id="showStatus">
            <Select.Option value={0}>本部</Select.Option>
            <Select.Option value={1}>外来</Select.Option>
            <Select.Option value={2}>工程</Select.Option>
          </Select>
        </FormItem>
        <FormItem
          name="phone"
          label="手机号码"
          rules={[{ required: true, message: '请输入手机号码!' }]}
        >
          <Input id="update-title" placeholder={'请输入手机号码'} />
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
        <FormItem
          name="gender"
          label="账号状态"
          rules={[{ required: true, message: '请输入账号状态!' }]}
        >
          <Select id="showStatus">
            <Select.Option value={0}>未知</Select.Option>
            <Select.Option value={1}>男</Select.Option>
            <Select.Option value={2}>女</Select.Option>
          </Select>
        </FormItem>
        <FormItem label="创建时间">
          <DatePicker showTime onChange={onChangeCreate} />
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建人员信息"
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
