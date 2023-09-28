import React, { useEffect, useState } from 'react';
import { DatePicker, DatePickerProps, Form, Input, InputNumber, Modal, Select } from 'antd';
import { ListUavPlanDataType } from '../data.d';
import moment from 'moment';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: ListUavPlanDataType) => void;
  updateModalVisible: boolean;
  values: Partial<ListUavPlanDataType>;
}
const { RangePicker } = DatePicker;

const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateFlashForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [plan, setPlan] = useState<string[]>();

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
    }
  }, [props.values]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (item: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit({ ...(item as ListUavPlanDataType), plan });
    }
  };

  const onChange = (date: any, dateString: string[]) => {
    // console.log('onChange -> dateString:', dateString);
    // setStartDate(dateString[0]);
    // setEndDate(dateString[1]);
    setPlan(dateString);
  };
  // interface UpdateUavPlanReqType {
  //   id: number;
  //   uad_id: number; // 无人机ID
  //   uad_icon: number; // 无人机 icon
  //   plan: string[] | undefined; // 飞行计划时间
  //   fly_id: number; // 巡检路线id
  // }
  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <InputNumber id="update-id" placeholder="请输入主键" />
        </FormItem>
        <FormItem
          name="uad_id"
          label="无人机id"
          rules={[{ required: true, message: '请输入无人机id!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入无人机名称'} />
        </FormItem>
        <FormItem
          name="uad_icon"
          label="巡检路线id"
          rules={[{ required: true, message: '请输入巡检路线id!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入巡检路线id'} />
        </FormItem>
        <FormItem id="plan" label="飞行计划时间">
          <RangePicker onChange={onChange} />
        </FormItem>
        <FormItem
          name="fly_id"
          label="巡检路线id"
          rules={[{ required: true, message: '请输入巡检路线id!' }]}
        >
          <InputNumber id="update-title" placeholder={'请输入巡检路线id'} />
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改巡检计划信息"
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
