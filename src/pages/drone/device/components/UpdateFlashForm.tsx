import React, { useEffect, useState } from 'react';
import { DatePicker, DatePickerProps, Form, Input, InputNumber, Modal } from 'antd';
import type { UpdateUavDeviceReqType } from '../data.d';
import moment from 'moment';

// interface UpdateUavDeviceReqType {
//   id: number;
//   name: string;
//   growth: number;
//   intergration: number;
//   type: number;
// }

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: UpdateUavDeviceReqType) => void;
  updateModalVisible: boolean;
  values: Partial<UpdateUavDeviceReqType>;
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

  const [enableTime, setEnableTime] = useState<string>('');

  const onChange: DatePickerProps['onChange'] = (
    date: any,
    dateString: React.SetStateAction<string>,
  ) => {
    console.log('date:', date);
    console.log('dateString:', dateString);
    setEnableTime(dateString);
  };

  const handleFinish = (item: { [key: string]: any }) => {
    if (onSubmit) {
      // onSubmit({ ...(item as UpdateUavDeviceReqType), startDate, endDate });
      //@ts-ignore
      onSubmit({ ...item, create_time: enableTime });
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <InputNumber id="update-id" placeholder="请输入主键" />
        </FormItem>
        <FormItem
          name="name"
          label="无人机名称"
          rules={[{ required: true, message: '请输入无人机名称!' }]}
        >
          <Input id="update-title" placeholder={'请输入无人机名称'} />
        </FormItem>
        <FormItem
          name="ip"
          label="无人机ip地址"
          rules={[{ required: true, message: '请输入无人机ip地址!' }]}
        >
          <Input id="update-title" placeholder={'请输入无人机ip地址'} />
        </FormItem>
        <FormItem
          name="port"
          label="无人机端口号"
          rules={[{ required: true, message: '请输入无人机端口号!' }]}
        >
          <InputNumber placeholder={'请输入端口号'} />
        </FormItem>
        <FormItem
          name="r_port"
          label="无人机接收端口号"
          rules={[{ required: true, message: '请输入无人机接收端口号!' }]}
        >
          <InputNumber placeholder={'请输入无人机接收端口号'} />
        </FormItem>
        <FormItem
          name="hangar_ip"
          label="机库ip地址"
          rules={[{ required: true, message: '请输入机库ip地址!' }]}
        >
          <Input id="update-title" placeholder={'请输入机库ip地址'} />
        </FormItem>
        <FormItem
          name="hangar_port"
          label="机库端口"
          rules={[{ required: true, message: '请输入机库端口!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入机库端口'} />
        </FormItem>
        <FormItem
          name="hangar_rport"
          label="机库接收端口"
          rules={[{ required: true, message: '请输入机库接收端口!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入机库接收端口'} />
        </FormItem>
        <FormItem
          // name="create_time"
          label="创建时间日期"
        >
          <DatePicker onChange={onChange} />
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改无人机信息"
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
