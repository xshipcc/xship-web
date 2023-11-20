/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 18:10:03
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-20 13:58:32
 * @FilePath: \zero-admin-ui-master\src\pages\AIrecognition\car\components\CreateFlashForm.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import type { UploadProps, UploadFile } from 'antd';
import { Form, Input, Modal, Upload, Select } from 'antd';
import type { AddCarReq } from '../data.d';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/lib/upload';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: AddCarReq) => void;
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
  const [imageURL, setimageURL] = useState('');

  const handleFinish = (values: AddCarReq) => {
    console.log('handleFinish -> values:', values);
    values.photo = imageURL;
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
  //   export interface AddCarReq {
  //   name: string;
  //   card: string;
  //   photo: string;
  //   type: number;
  //   phone: string;
  //   agency: string;
  //   status: number;
  // }
  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="车辆名称"
          rules={[{ required: true, message: '请输入车辆名称!' }]}
        >
          <Input id="update-title" placeholder={'请输入车辆名称'} />
        </FormItem>
        <FormItem name="card" label="车牌号" rules={[{ required: true, message: '请输入车牌号!' }]}>
          <Input id="update-title" placeholder={'请输入车牌号'} />
        </FormItem>
        <FormItem
          name="phone"
          label="手机号"
          rules={[{ required: true, message: '请输入手机号!' }]}
        >
          <Input id="update-title" placeholder={'请输入手机号'} />
        </FormItem>
        {/* <FormItem
          name="photo"
          label="车辆照片"
          rules={[{ required: true, message: '请输入车辆照片!' }]}
        >
          <InputNumber placeholder={'请输入车辆照片'} />
        </FormItem> */}
        <FormItem label="车辆照片" name="photo">
          <Upload
            action="/api/sys/uploadcar"
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
          name="type"
          label="车辆等级"
          rules={[{ required: true, message: '请输入车辆等级!' }]}
        >
          <Select id="showStatus">
            <Select.Option value={0}>本部</Select.Option>
            <Select.Option value={1}>外来</Select.Option>
            <Select.Option value={2}>工程</Select.Option>
          </Select>
        </FormItem>
        <FormItem
          name="agency"
          label="所属机构"
          rules={[{ required: true, message: '请输入所属机构!' }]}
        >
          <Input id="update-title" placeholder={'请输入所属机构'} />
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
        {/* <FormItem name="rangeDate" label="活动日期">
          <RangePicker onChange={onChange} />
        </FormItem>
        <FormItem name="status" label="上下线状态" initialValue={1}>
          <Select id="status" placeholder={'请选择状态'}>
            <Option value={0}>停用</Option>
            <Option value={1}>启用</Option>
          </Select>
        </FormItem> */}
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建车辆信息"
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
