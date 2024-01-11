/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 18:10:03
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-10 20:21:59
 * @FilePath: \zero-admin-ui-master\src\pages\drone\device\components\CreateFlashForm.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, InputNumber, DatePickerProps, DatePicker, Select } from 'antd';
import type { AddUavDeviceReqType } from '../data.d';
import moment from 'moment';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: AddUavDeviceReqType) => void;
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

  const [enableTime, setEnableTime] = useState<string>('');

  const handleFinish = (values: AddUavDeviceReqType) => {
    console.log('handleFinish -> values:', values);
    if (onSubmit) {
      // onSubmit({ ...values });
      onSubmit({ ...values });
      console.log('handleFinish -> enableTime:', enableTime);
    }
  };
  // export interface ListUavDeviceData {
  //   id: number; // 无人机id
  //   name: string; // 无人机名称
  //   ip: string; // 无人机IP
  //   port: number; // 无人机port
  //   uav_zubo: number; // 无人机组播
  //   r_port: number; // 无人机接收端口port
  //   hangar_ip: string; // 无人机机库IP
  //   hangar_port: number; // 无人机机库port
  //   hangar_zubo: number; // 无人机机库组播
  //   hangar_rport: number; // 无人机机库接收port
  //   cam_ip: string; // 摄像头IP
  //   cam_port: number; // 摄像头port
  //   cam_zubo: number; // 摄像头组播
  //   cam_url: string; // 摄像头rtsp 地址
  //   create_time: Date; // 创建时间
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
          label="无人机端口号"
          rules={[{ required: true, message: '请输入无人机端口号!' }]}
        >
          <InputNumber placeholder={'请输入端口号'} />
        </FormItem>
        <FormItem
          name="r_port"
          label="无人机接收端口号"
          rules={[{ required: true, message: '请输入无人机接收端口号!' }]}
        >
          <InputNumber placeholder={'请输入无人机接收端口号'} />
        </FormItem>

        <FormItem name="uav_zubo" label="无人机通讯方式" initialValue={0}>
          <Select id="showStatus" defaultValue={0}>
            <Select.Option value={0}>单播</Select.Option>
            <Select.Option value={1}>组播</Select.Option>
          </Select>
        </FormItem>
        <FormItem
          name="network"
          label="网卡名"
          rules={[{ required: true, message: '请输入网卡名称!' }]}
        >
          <Input id="update-title" placeholder={'请输入网卡名称'} />
        </FormItem>
        <FormItem
          name="joystick"
          label="手柄信息"
          rules={[{ required: true, message: '请输入手柄信息!' }]}
        >
          <Input id="update-title" placeholder={'请输入手柄信息'} />
        </FormItem>
        <FormItem
          name="hangar_ip"
          label="机库ip地址"
          rules={[{ required: true, message: '请输入机库ip地址!' }]}
        >
          <Input id="update-title" placeholder={'请输入机库ip地址'} />
        </FormItem>
        <FormItem
          name="hangar_port"
          label="机库端口"
          rules={[{ required: true, message: '请输入机库端口!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入机库端口'} />
        </FormItem>
        <FormItem
          name="hangar_rport"
          label="机库接收端口"
          rules={[{ required: true, message: '请输入机库接收端口!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入机库接收端口'} />
        </FormItem>

        <FormItem hidden name="hangar_zubo" label="机库通讯方式" initialValue={0}>
          <Select id="showStatus" defaultValue={0}>
            <Select.Option value={0}>单播</Select.Option>
            <Select.Option value={1}>组播</Select.Option>
          </Select>
        </FormItem>

        <FormItem
          name="cam_ip"
          label="摄像头ip"
          rules={[{ required: true, message: '请输入摄像头ip!' }]}
        >
          <Input id="update-title" placeholder={'请输入摄像头ip'} />
        </FormItem>
        <FormItem
          name="cam_port"
          label="摄像头端口"
          rules={[{ required: true, message: '请输入机库接收端口!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入机库接收端口'} />
        </FormItem>
        <FormItem
          name="cam_url"
          label="摄像头地址"
          rules={[{ required: true, message: '请输入摄像头地址!' }]}
        >
          <Input id="update-title" placeholder={'请输入摄像头地址'} />
        </FormItem>
        <FormItem hidden name="cam_zubo" label="摄像头通讯方式" initialValue={0}>
          <Select id="showStatus" defaultValue={0}>
            <Select.Option value={0}>单播</Select.Option>
            <Select.Option value={1}>组播</Select.Option>
          </Select>
        </FormItem>
        <FormItem name="status" label="设备状态" initialValue={0}>
          <Select id="showStatus" defaultValue={0}>
            <Select.Option value={0}>启动</Select.Option>
            <Select.Option value={1}>禁用</Select.Option>
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
