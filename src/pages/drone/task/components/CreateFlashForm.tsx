/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-08 10:25:32
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-30 11:42:37
 * @FilePath: \zero-admin-ui-master\src\pages\drone\task\components\CreateFlashForm.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, DatePicker, InputNumber, Button, Upload } from 'antd';
import type { AddUavPlanReqType, FlashPromotionListItem } from '../data.d';
import Cron from 'react-cron-antd';
import { PlusOutlined } from '@ant-design/icons';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: AddUavPlanReqType) => void;
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

  const [plan, setPlan] = useState<string>();
  const [CronVisible, handleCronVisible] = useState<boolean>(false);

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

  const handleFinish = (values: AddUavPlanReqType) => {
    if (onSubmit) {
      onSubmit({ ...values, plan });
    }
  };

  //
  // interface AddUavPlanReqType {
  //   uav_id: number; // 无人机ID
  //   uav_icon: number; // 无人机 icon
  //   plan: string; // 飞行计划时间
  //   fly_id: number; // 巡检路线id
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
          name="uav_id"
          label="无人机id"
          rules={[{ required: true, message: '请输入无人机id!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入无人机名称'} />
        </FormItem>
        {/* <FormItem
          name="uav_icon"
          label="无人机图片"
          rules={[{ required: true, message: '请输入无人机图片!' }]}
        >
          <Input id="update-title" placeholder={'请输入无人机图片'} />
        </FormItem> */}
        <FormItem label="无人机图片" name="uav_icon" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>上传</div>
            </div>
          </Upload>
        </FormItem>
        <FormItem id="plan" label="飞行计划时间">
          {/* <RangePicker onChange={onChange} /> */}
          <Button type="primary" onClick={() => handleCronVisible(true)}>
            {CronVisible ? plan + '' : '选择计划时间'}
          </Button>
          <Cron
            style={{ display: CronVisible ? 'block' : 'none', width: '370px' }}
            value="* * * * * ? *"
            onOk={(value) => {
              console.log('cron:', value);
              setPlan(value);
              handleCronVisible(false);
            }}
          />
        </FormItem>
        <FormItem
          name="fly_id"
          label="巡检路线id"
          rules={[{ required: true, message: '请输入巡检路线id!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入巡检路线id'} />
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      bodyStyle={{ width: '450px' }}
      forceRender
      destroyOnClose
      title="新建巡检计划"
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
