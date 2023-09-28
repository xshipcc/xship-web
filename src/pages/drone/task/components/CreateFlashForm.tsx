/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-08 10:25:32
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-28 14:35:31
 * @FilePath: \zero-admin-ui-master\src\pages\drone\task\components\CreateFlashForm.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, DatePicker } from 'antd';
import type { AddUavPlanReqType, FlashPromotionListItem } from '../data.d';

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

  const [plan, setPlan] = useState<string[]>();

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

  const onChange = (date: any, dateString: string[]) => {
    // console.log('onChange -> dateString:', dateString);
    // setStartDate(dateString[0]);
    // setEndDate(dateString[1]);
    setPlan(dateString);
  };
  //
  // interface AddUavPlanReqType {
  //   uad_id: number; // 无人机ID
  //   uad_icon: number; // 无人机 icon
  //   plan: string; // 飞行计划时间
  //   fly_id: number; // 巡检路线id
  // }

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="uad_id"
          label="无人机id"
          rules={[{ required: true, message: '请输入无人机id!' }]}
        >
          <Input id="update-title" placeholder={'请输入无人机名称'} />
        </FormItem>
        <FormItem
          name="uad_icon"
          label="巡检路线id"
          rules={[{ required: true, message: '请输入巡检路线id!' }]}
        >
          <Input id="update-title" placeholder={'请输入巡检路线id'} />
        </FormItem>
        <FormItem id="plan" label="飞行计划时间">
          <RangePicker onChange={onChange} />
        </FormItem>
        <FormItem
          name="fly_id"
          label="巡检路线id"
          rules={[{ required: true, message: '请输入巡检路线id!' }]}
        >
          <Input id="update-title" placeholder={'请输入巡检路线id'} />
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
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
