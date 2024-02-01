/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 22:25:18
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-31 19:23:25
 * @FilePath: \zero-admin-ui-master\src\pages\system\role\components\CreateRoleForm.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import React, { useCallback, useEffect } from 'react';
import { Form, Input, Modal, Radio } from 'antd';
import type { RoleListItem } from '../data.d';
import { debounce } from 'lodash';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: RoleListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateRoleForm: React.FC<CreateFormProps> = (props) => {
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

  const handleFinish = (values: RoleListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="name" label="名称" rules={[{ required: true, message: '请输入角色名称' }]}>
          <Input id="update-name" placeholder={'请输入角色名称'} />
        </FormItem>
        <FormItem
          name="status"
          label="状态"
          initialValue={1}
          rules={[{ required: true, message: '请选择状态' }]}
        >
          <Radio.Group id="status">
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>启用</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem name="remark" label="备注">
          <Input.TextArea id="update-remark" placeholder={'请输入备注'} rows={2} />
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
    <Modal forceRender destroyOnClose title="新建角色" open={createModalVisible} {...modalFooter}>
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateRoleForm;
