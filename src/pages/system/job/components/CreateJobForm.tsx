/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 22:25:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-31 19:22:19
 * @FilePath: \zero-admin-ui-master\src\pages\system\job\components\CreateJobForm.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import React, { useCallback, useEffect } from 'react';
import { Form, Input, InputNumber, Modal, Select } from 'antd';
import type { JobListItem } from '../data.d';
import { debounce } from 'lodash';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: JobListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateJobForm: React.FC<CreateFormProps> = (props) => {
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

  const handleFinish = (values: JobListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="jobName"
          label="职位名称"
          rules={[{ required: true, message: '请输入职位名!' }]}
        >
          <Input id="update-jobName" placeholder={'请输入职位名'} />
        </FormItem>
        <FormItem
          name="delFlag"
          label="状态"
          initialValue={1}
          rules={[{ required: true, message: '请选择状态!' }]}
        >
          <Select id="delFlag" placeholder={'请选择状态'}>
            <Select.Option value={0}>禁用</Select.Option>
            <Select.Option value={1}>正常</Select.Option>
          </Select>
        </FormItem>
        <FormItem
          name="orderNum"
          label="排序"
          rules={[{ required: true, message: '请输入排序!' }]}
          initialValue={0}
        >
          <InputNumber style={{ width: 255 }} />
        </FormItem>
        <FormItem name="remarks" label="备注">
          <Input.TextArea rows={2} placeholder={'请输入备注'} />
        </FormItem>
      </>
    );
  };
  const load = useCallback(
    debounce(() => handleSubmit(), 500),
    [],
  );
  const modalFooter = { okText: '保存', onOk: load, onCancel };
  // const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建职位信息"
      open={createModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateJobForm;
