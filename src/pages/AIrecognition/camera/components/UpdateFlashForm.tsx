import React, { useEffect, useState } from 'react';
import { DatePicker, DatePickerProps, Form, Input, InputNumber, Modal, Select } from 'antd';
import { ListUavNetworkDataType } from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: ListUavNetworkDataType) => void;
  updateModalVisible: boolean;
  values: Partial<ListUavNetworkDataType>;
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
      // onSubmit({ ...(item as ListUavNetworkDataType), startDate, endDate });
      onSubmit({ ...(item as ListUavNetworkDataType) });
    }
  };

  // export interface ListUavNetworkDataType {
  //   id: number;
  //   name: string; // 频段名称
  //   band: number; // 频段号
  //   type: number; // 频段类型
  // }
  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <InputNumber id="update-id" placeholder="请输入主键" />
        </FormItem>
        <FormItem
          name="name"
          label="频段名称"
          rules={[{ required: true, message: '请输入频段名称!' }]}
        >
          <Input id="update-title" placeholder={'请输入频段名称'} />
        </FormItem>
        <FormItem
          name="band"
          label="无人机频段"
          rules={[{ required: true, message: '请输入无人机频段!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入无人机频段'} />
        </FormItem>
        <FormItem
          name="type"
          label="无人机频段类型"
          rules={[{ required: true, message: '请输入无人机频段类型!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入无人机频段类型'} />
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改无人机频段信息"
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
