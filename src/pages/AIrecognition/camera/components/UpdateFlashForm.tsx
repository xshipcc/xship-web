import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Modal, Select, Upload } from 'antd';
import type { UpdateCamerasReq } from '../data.d';
import { PlusOutlined } from '@ant-design/icons';
// interface UpdateCamerasReq {
//   id: number;
//   name: string;
//   growth: number;
//   intergration: number;
//   type: number;
// }

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: UpdateCamerasReq) => void;
  updateModalVisible: boolean;
  values: Partial<UpdateCamerasReq>;
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
      // onSubmit({ ...(item as UpdateCamerasReq), startDate, endDate });
      onSubmit({ ...(item as UpdateCamerasReq) });
    }
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  // export interface UpdateCamerasReq {
  //   id: number;
  //   name: string;
  //   camerad: string;
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
          label="摄像头名称"
          rules={[{ required: true, message: '请输入摄像头名称!' }]}
        >
          <Input id="update-title" placeholder={'请输入摄像头名称'} />
        </FormItem>
        <FormItem
          name="ip"
          label="摄像头ip"
          rules={[{ required: true, message: '请输入摄像头ip!' }]}
        >
          <Input id="update-title" placeholder={'请输入摄像头ip'} />
        </FormItem>

        <FormItem
          name="platform"
          label="摄像头平台"
          rules={[{ required: true, message: '请输入摄像头平台!' }]}
        >
          <Select id="showStatus">
            <Select.Option value={0}>全部</Select.Option>
            <Select.Option value={1}>飞机</Select.Option>
            <Select.Option value={2}>摄像头</Select.Option>
            <Select.Option value={3}>机库</Select.Option>
            <Select.Option value={4}>AI</Select.Option>
          </Select>
        </FormItem>
        <FormItem
          name="tunnel"
          label="摄像头通道"
          rules={[{ required: true, message: '请输入摄像头通道!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入摄像头通道'} />
        </FormItem>
        <FormItem name="lat" label="维度" rules={[{ required: true, message: '请输入维度!' }]}>
          <InputNumber id="update-title" placeholder={'请输入维度'} />
        </FormItem>
        <FormItem name="lon" label="经度" rules={[{ required: true, message: '请输入经度!' }]}>
          <InputNumber id="update-title" placeholder={'请输入经度'} />
        </FormItem>
        <FormItem name="alt" label="高度" rules={[{ required: true, message: '请输入高度!' }]}>
          <InputNumber id="update-title" placeholder={'请输入摄像头通道'} />
        </FormItem>
        <FormItem
          name="status"
          label="摄像头状态"
          rules={[{ required: true, message: '请输入摄像头状态!' }]}
        >
          <Select id="showStatus">
            <Select.Option value={0}>禁止</Select.Option>
            <Select.Option value={1}>启用</Select.Option>
            <Select.Option value={1}>故障</Select.Option>
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
      title="修改摄像头信息"
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
