import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Modal, Select, Upload, UploadProps } from 'antd';
import type { UpdateCarReq } from '../data.d';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadFile } from 'antd/lib/upload';
// interface UpdateCarReq {
//   id: number;
//   name: string;
//   growth: number;
//   intergration: number;
//   type: number;
// }

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: UpdateCarReq) => void;
  updateModalVisible: boolean;
  values: Partial<UpdateCarReq>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateFlashForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  // const [startDate, setStartDate] = useState<string>('');
  // const [endDate, setEndDate] = useState<string>('');

  const { onSubmit, onCancel, updateModalVisible, values } = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (values) {
      form.setFieldsValue({
        ...values,
      });
      // setStartDate(values.startDate || '');
      // setEndDate(values.endDate || '');
    }
  }, [props.values]);

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

  const [imageURL, setimageURL] = useState('');

  // const handleFinish = (values: AddCarReq) => {
  //   console.log('handleFinish -> values:', values);
  //   values.photo = imageURL;
  //   setimageURL('');
  //   if (onSubmit) {
  //     onSubmit({ ...values });
  //     // onSubmit({ ...values, startDate, endDate });
  //   }
  // };

  const handleFinish = (item: { [key: string]: any }) => {
    item.photo = imageURL;
    console.log('handleFinish -> item:', item);

    if (onSubmit) {
      // onSubmit({ ...(item as UpdateCarReq), startDate, endDate });
      onSubmit({ ...(item as UpdateCarReq) });
    }
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
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
  // export interface UpdateCarReq {
  //   id: number;
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
        <FormItem name="id" label="主键" hidden>
          <InputNumber id="update-id" placeholder="请输入主键" />
        </FormItem>
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
            action="/api/sys/upload"
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
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改车辆信息"
      open={updateModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateFlashForm;
