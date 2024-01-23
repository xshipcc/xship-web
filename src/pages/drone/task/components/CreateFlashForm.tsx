/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-08 10:25:32
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-22 23:27:00
 * @FilePath: \zero-admin-ui-master\src\pages\drone\task\components\CreateFlashForm.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, DatePicker, InputNumber, Button, Upload } from 'antd';
import type { AddUavPlanReqType, FlashPromotionListItem } from '../data.d';
// import Cron from 'react-cron-antd';
import { PlusOutlined } from '@ant-design/icons';
import { queryFly } from '../../routePlan/service';
import { ListUavFlyReqType } from '../../routePlan/data';
import { queryDevice } from '../../device/service';
// import Cron from 'antd-cron';
import CronPlus from 'react-cron-plus';
import CronEditor from 'cron-editor-react';
export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: AddUavPlanReqType) => void;
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

  const [plan, setPlan] = useState<string>('* * * * * ? *');

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

  //
  // interface AddUavPlanReqType {
  //   uav_id: number; // 无人机ID
  //   uav_icon: number; // 无人机 icon
  //   plan: string; // 飞行计划时间
  //   fly_id: number; // 巡检路线id
  // }

  const [roadList, setroadList] = useState([{ value: 'demo', label: 'demo' }]);
  const [droneList, setdroneList] = useState([{ value: 'demo', label: 'demo' }]);

  const handleFinish = (values: AddUavPlanReqType) => {
    if (onSubmit) {
      console.log('setTimeout -> plan:', plan);
      const newStr = '0' + plan.substring(1, plan.length - 1);
      console.log(
        'handleFinish -> newStr:',
        droneList.find((item: any) => item.value === values.uav_id)?.label,
      );
      // const newStr = str.slice(0, -1); // 去除最后一个字符
      setTimeout(() => {
        onSubmit({
          ...values,
          plan: newStr,
          uav_name: droneList.find((item: any) => item.value === values.uav_id)?.label,
          fly_name: roadList.find((item: any) => item.value === values.fly_id)?.label,
        });
      }, 500);
    }
  };

  const fetchFlyData = async (params: ListUavFlyReqType) => {
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
  const handleCronChange = (cronExpression: React.SetStateAction<string>) => {
    setPlan(cronExpression);
    console.log(cronExpression); //0 0 0 * * ?
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="巡检计划名称"
          rules={[{ required: true, message: '请输入巡检计划名称!' }]}
        >
          <Input id="update-title" placeholder={'请输入巡检计划名称'} />
        </FormItem>
        <FormItem
          name="uav_id"
          label="无人机id"
          rules={[{ required: true, message: '请输入无人机id!' }]}
        >
          <Select defaultValue="default" onChange={handleChange} options={droneList} />
          {/* <InputNumber id="update-title" placeholder={'请输入无人机名称'} /> */}
        </FormItem>
        <FormItem id="plan" label="飞行计划时间">
          {/* @ts-ignore */}
          <CronEditor onChange={handleCronChange} tabType="card" showCrontab={true} value={plan} />
        </FormItem>
        <FormItem
          name="fly_id"
          label="巡检路线id"
          rules={[{ required: true, message: '请输入巡检路线id!' }]}
        >
          <Select defaultValue="default" onChange={handleChange} options={roadList} />
        </FormItem>
        <FormItem
          name="status"
          label="路线状态"
          rules={[{ required: true, message: '请输入路线状态!' }]}
        >
          <Select id="showStatus">
            <Select.Option value={0}>禁用</Select.Option>
            <Select.Option value={1}>启动</Select.Option>
          </Select>
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      width={800}
      bodyStyle={{ width: '800px' }}
      forceRender
      destroyOnClose
      title="新建巡检计划"
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
