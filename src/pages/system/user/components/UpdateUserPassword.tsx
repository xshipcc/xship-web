/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2024-02-01 08:09:31
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-02-01 08:16:05
 * @FilePath: \zero-admin-ui-master\src\pages\system\user\components\UpdateUserPassword.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Modal, Radio, Select, TreeSelect } from 'antd';
import type { JobList, RoleList, UserListItem } from '../data';
import { querySelectAllData } from '@/pages/system/user/service';
import { tree } from '@/utils/utils';
import { debounce } from 'lodash';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: UserListItem) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<UserListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateUserForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [roleConf, setRoleConf] = useState<RoleList[]>([]);
  const [jobConf, setJobConf] = useState<JobList[]>([]);
  const [deptConf, setDeptConf] = useState<JobList[]>([]);

  const { onSubmit, onCancel, updateModalVisible, values } = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    } else {
      querySelectAllData({ pageSize: 100, current: 1 }).then((res) => {
        console.log('querySelectAllData -> res:', res);
        setRoleConf(res.roleAll);
        setJobConf(res.jobAll);
        setDeptConf(tree(res.deptAll, 0, 'parentId'));
      });
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
      onSubmit(item as UserListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" placeholder="请输入主键" />
        </FormItem>

        <FormItem name="passwd" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
          <Input id="update-name" placeholder={'请输入密码'} />
        </FormItem>
        {/* <FormItem name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}>
          <Radio.Group id="status">
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>启用</Radio>
          </Radio.Group>
        </FormItem> */}
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
    <Modal forceRender destroyOnClose title="修改用户" open={updateModalVisible} {...modalFooter}>
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateUserForm;
