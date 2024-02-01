/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 18:10:03
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-10 00:26:09
 * @FilePath: \zero-admin-ui-master\src\pages\AIrecognition\people\components\CreateFlashForm.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Form,
  Input,
  Modal,
  InputNumber,
  Upload,
  Select,
  DatePicker,
  DatePickerProps,
  UploadFile,
} from 'antd';
import type { AddPeopleReq } from '../data.d';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadProps } from 'antd/lib/upload';
import { debounce } from 'lodash';

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
  const [imageURL, setimageURL] = useState('');

  const handleFinish = (values: any) => {
    console.log('handleFinish -> values:', values);
    values.icon = imageURL;
    setimageURL('');
    if (onSubmit) {
      onSubmit({ ...values });
      // onSubmit({ ...values, startDate, endDate });
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    console.log('newFileList:', newFileList);
    setFileList(newFileList);
    //获取上传的图片url
    const url = newFileList
      .filter((x) => x.status === 'done')
      .map((x) => {
        if (x.response) {
          return x.response.data;
        } else {
          return x.url;
        }
      })
      .join(',');
    console.log('url:', url);
    setimageURL(url);
    // props.onChangeProductParams({ pic: url, albumPics: url });
  };
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

        <FormItem label="用户头像" name="icon">
          <Upload
            action="/api/sys/uploadpeople"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            headers={{ Authorization: 'Bearer ' + localStorage.getItem('token') }}
          >
            {fileList.length >= 3 ? null : uploadButton}
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
