import React, { useCallback, useEffect, useState } from 'react';
import { DatePicker, DatePickerProps, Form, Input, InputNumber, Modal, Select } from 'antd';
import type { UpdateUavDeviceReqType } from '../data.d';
import moment from 'moment';
import { debounce } from 'lodash';

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
      onSubmit({ ...item });
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
          label="地面端口号"
          rules={[{ required: true, message: '请输入地面端口号!' }]}
        >
          <InputNumber placeholder={'请输入端口号'} />
        </FormItem>
        <FormItem
          name="r_port"
          label="无人机端口号"
          rules={[{ required: true, message: '请输入无人机端口号!' }]}
        >
          <InputNumber placeholder={'请输入无人机端口号'} />
        </FormItem>

        <FormItem name="uav_zubo" label="无人机通讯方式" initialValue={0}>
          <Select id="showStatus" defaultValue={0}>
            <Select.Option value={0}>单播</Select.Option>
            <Select.Option value={1}>组播</Select.Option>
          </Select>
        </FormItem>
        <FormItem
          name="network"
          label="网卡名"
          rules={[{ required: true, message: '请输入网卡名称!' }]}
        >
          <Input id="update-title" placeholder={'请输入网卡名称'} />
        </FormItem>
        <FormItem
          name="joystick"
          label="手柄信息"
          rules={[{ required: true, message: '请输入手柄信息!' }]}
        >
          <Input id="update-title" placeholder={'请输入手柄信息'} />
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

        <FormItem hidden name="hangar_zubo" label="机库通讯方式" initialValue={0}>
          <Select id="showStatus" defaultValue={0}>
            <Select.Option value={0}>单播</Select.Option>
            <Select.Option value={1}>组播</Select.Option>
          </Select>
        </FormItem>

        <FormItem name="close_door" label="舱盖设置" initialValue={0}>
          <Select id="showStatus" defaultValue={0}>
            <Select.Option value={0}>关舱</Select.Option>
            <Select.Option value={1}>开舱</Select.Option>
          </Select>
        </FormItem>
        <FormItem name="lon" label="经度" rules={[{ required: true, message: '经度!' }]}>
          <InputNumber id="update-title" placeholder={'经度'} />
        </FormItem>
        <FormItem name="lat" label="纬度" rules={[{ required: true, message: '纬度!' }]}>
          <InputNumber id="update-title" placeholder={'纬度'} />
        </FormItem>
        <FormItem name="alt" label="高度" rules={[{ required: true, message: '高度!' }]}>
          <InputNumber id="update-title" placeholder={'高度'} />
        </FormItem>

        <FormItem
          name="cam_ip"
          label="摄像头ip"
          rules={[{ required: true, message: '请输入摄像头ip!' }]}
        >
          <Input id="update-title" placeholder={'请输入摄像头ip'} />
        </FormItem>
        <FormItem
          name="cam_port"
          label="摄像头端口"
          rules={[{ required: true, message: '请输入机库接收端口!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入机库接收端口'} />
        </FormItem>
        <FormItem
          name="cam_url"
          label="摄像头地址"
          rules={[{ required: true, message: '请输入摄像头地址!' }]}
        >
          <Input id="update-title" placeholder={'请输入摄像头地址'} />
        </FormItem>
        <FormItem hidden name="cam_zubo" label="摄像头通讯方式" initialValue={0}>
          <Select id="showStatus" defaultValue={0}>
            <Select.Option value={0}>单播</Select.Option>
            <Select.Option value={1}>组播</Select.Option>
          </Select>
        </FormItem>
        <FormItem name="status" label="设备状态" initialValue={0}>
          <Select id="showStatus" defaultValue={0}>
            <Select.Option value={1}>启动</Select.Option>
            <Select.Option value={0}>禁用</Select.Option>
          </Select>
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
