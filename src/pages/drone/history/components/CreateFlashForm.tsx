/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 22:27:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-28 16:36:46
 * @FilePath: \zero-admin-ui-master\src\pages\drone\history\components\CreateFlashForm.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, DatePicker, DatePickerProps, InputNumber } from 'antd';
import type { AddUavHistoryReqType } from '../data.d';
import { queryFly } from '../../routePlan/service';
import { queryDevice } from '../../device/service';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: AddUavHistoryReqType) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const { RangePicker } = DatePicker;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateFlashForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const [create_time, setCreate_time] = useState<string>('');
  const [end_time, setEnd_time] = useState<string>('');

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

  const handleFinish = (values: AddUavHistoryReqType) => {
    if (onSubmit) {
      onSubmit({ ...values, create_time, end_time });
    }
  };

  //
  const onChangeCreate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('dateString:', dateString);
    setCreate_time(dateString);
  };
  const onChangeEnd: DatePickerProps['onChange'] = (date, dateString) => {
    setEnd_time(dateString);
  };

  const [roadList, setroadList] = useState([{ value: 'demo', label: 'demo' }]);
  const [droneList, setdroneList] = useState([{ value: 'demo', label: 'demo' }]);

  const fetchFlyData = async (params: any) => {
    try {
      const resRoad = await queryFly(params);
      console.log('fetchFlyData -> res:', resRoad);
      // JSON.parse(res.data.data);
      const road = resRoad.data.map((item: any) => {
        return { value: item.id, label: item.name };
      });
      console.log('road -> road:', road);
      setroadList(road);

      const resDrone = await queryDevice(params);
      console.log('fetchFlyData -> res:', resDrone);
      // JSON.parse(res.data.data);
      const drone = resDrone.data.map((item: any) => {
        return { value: item.id, label: item.name };
      });
      console.log('road -> road:', road);
      setdroneList(drone);
      return true;
    } catch (error) {
      console.log('fetchFlyData -> error:', error);
      return false;
    }
  };
  useEffect(() => {
    fetchFlyData({ pageSize: 10, current: 1 });
  }, []);
  const handleChange = (params: string) => {
    // setcurrentRoad(JSON.parse(params));
    console.log('handleChange -> JSON.parse(params):', JSON.parse(params));
    console.log(`handleChange ${params}`);
  };

  // export interface AddUavHistoryReqType {
  //   uav_id: number; // 无人机id
  //   fly_id: number; // 巡检路线id
  //   operator: string; // 操作者
  //   create_time: string; // 创建时间
  //   end_time: string; // 结束时间
  // }
  const renderContent = () => {
    return (
      <>
        <FormItem
          name="uav_id"
          label="无人机id"
          rules={[{ required: true, message: '请输入无人机id!' }]}
        >
          <Select defaultValue="default" onChange={handleChange} options={droneList} />
        </FormItem>
        <FormItem
          name="fly_id"
          label="巡检路线id"
          rules={[{ required: true, message: '请输入巡检路线id!' }]}
        >
          <Select defaultValue="default" onChange={handleChange} options={roadList} />
        </FormItem>
        <FormItem
          name="operator"
          label="操作者"
          rules={[{ required: true, message: '请输入操作者!' }]}
        >
          <Input id="update-title" placeholder={'请输入操作者'} />
        </FormItem>
        <FormItem label="创建时间">
          {/* @ts-ignore */}
          <DatePicker showTime onChange={onChangeCreate} />
        </FormItem>
        <FormItem label="结束时间">
          {/* @ts-ignore */}
          <DatePicker showTime onChange={onChangeEnd} />
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建无人机历史"
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
