/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 22:25:18
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-31 19:23:59
 * @FilePath: \zero-admin-ui-master\src\pages\system\role\components\UpdateRoleForm.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import React, { useCallback, useEffect } from 'react';
import { Form, Input, Modal, Radio } from 'antd';
import type { RoleListItem } from '../data.d';
import { debounce } from 'lodash';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: RoleListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<RoleListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateRoleForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { onSubmit, onCancel, updateModalVisible, currentData } = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        ...currentData,
      });
    }
  }, [props.currentData]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as RoleListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" placeholder="请输入主键" />
        </FormItem>
        <FormItem name="name" label="名称" rules={[{ required: true, message: '请输入角色名称' }]}>
          <Input id="update-name" placeholder={'请输入角色名称'} />
        </FormItem>
        <FormItem name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}>
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
    <Modal
      forceRender
      destroyOnClose
      title="修改角色信息"
      open={updateModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateRoleForm;
