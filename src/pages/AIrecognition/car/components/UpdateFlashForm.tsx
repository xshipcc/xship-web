import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Modal, Select, Upload } from 'antd';
import type { UpdateCarReq } from '../data.d';
import { PlusOutlined } from '@ant-design/icons';
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

  const handleFinish = (item: { [key: string]: any }) => {
    if (onSubmit) {
      // onSubmit({ ...(item as UpdateCarReq), startDate, endDate });
      onSubmit({ ...(item as UpdateCarReq) });
    }
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
        {/* <FormItem
          name="photo"
          label="车辆照片"
          rules={[{ required: true, message: '请输入车辆照片!' }]}
        >
          <InputNumber placeholder={'请输入车辆照片'} />
        </FormItem> */}
        <FormItem label="车辆照片" name="photo" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>上传</div>
            </div>
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
          <InputNumber id="update-title" placeholder={'请输入所属机构'} />
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
