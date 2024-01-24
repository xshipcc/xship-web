/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-08 10:25:32
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-23 15:58:18
 * @FilePath: \zero-admin-ui-master\src\pages\drone\task\components\CreateFlashForm.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useRef, useState } from 'react';
import {
  Form,
  Input,
  Modal,
  Select,
  DatePicker,
  InputNumber,
  Button,
  Upload,
  Divider,
  Space,
  InputRef,
  TimePicker,
  Row,
  Col,
} from 'antd';
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

  const monthList = [
    { value: '*', label: '不指定' },
    { value: '1', label: '一月' },
    { value: '2', label: '二月' },
    { value: '3', label: '三月' },
    { value: '4', label: '四月' },
    { value: '5', label: '五月' },
    { value: '6', label: '六月' },
    { value: '7', label: '七月' },
    { value: '8', label: '八月' },
    { value: '9', label: '九月' },
    { value: '10', label: '十月' },
    { value: '11', label: '十一月' },
    { value: '12', label: '十二月' },
  ];
  const dateType = [
    { value: true, label: '每周' },
    { value: false, label: '每日' },
  ];
  const dayList = new Array(32).fill(null).map((_, i) => {
    if (i === 0) {
      return { label: '不指定', value: '*' };
    } else {
      return { label: i + '号', value: i + '' };
    }
  });
  const hourList = new Array(25).fill(null).map((_, i) => {
    if (i === 24) {
      return { label: '不指定', value: '*' };
    } else {
      return { label: i + '时', value: i + '' };
    }
  });
  const minuteList = new Array(61).fill(null).map((_, i) => {
    if (i === 60) {
      return { label: '不指定', value: '*' };
    } else {
      return { label: i + '分', value: i + '' };
    }
  });
  const weekList = [
    { value: '*', label: '不指定' },
    { value: '1', label: '周一' },
    { value: '2', label: '周二' },
    { value: '3', label: '周三' },
    { value: '4', label: '周四' },
    { value: '5', label: '周五' },
    { value: '6', label: '周六' },
    { value: '7', label: '周天' },
  ];

  const [minute, setminute] = useState('0');
  const [hour, sethour] = useState('*');
  const [day, setday] = useState('*');
  const [week, setweek] = useState('*');
  const [month, setmonth] = useState('*');
  const [showweek, setshowweek] = useState(false);

  const onChangeminute = (time: any) => {
    console.log('onChangeminute -> time:', time);
    // 多选情况
    if (typeof time === 'object' && Array.isArray(time)) {
      if (time[time.length - 1] == '*') {
        //选中了不指定
        setminute('*');
      } else {
        // 选择了其他的数
        // @ts-ignore
        setminute(time.filter((item) => item !== '*'));
      }
    } else {
      setminute(time);
    }
  };
  const onChangehour = (time: any) => {
    console.log('onChangeminute -> time:', time);
    // 多选情况
    if (typeof time === 'object' && Array.isArray(time)) {
      if (time[time.length - 1] == '*') {
        //选中了不指定
        sethour('*');
      } else {
        // 选择了其他的数
        // @ts-ignore
        sethour(time.filter((item) => item !== '*'));
      }
    } else {
      sethour(time);
    }
  };
  const onChangeday = (time: any) => {
    console.log('onChangeminute -> time:', time);
    // 多选情况
    if (typeof time === 'object' && Array.isArray(time)) {
      if (time[time.length - 1] == '*') {
        //选中了不指定
        setday('*');
      } else {
        // 选择了其他的数
        // @ts-ignore
        setday(time.filter((item) => item !== '*'));
      }
    } else {
      setday(time);
    }
  };
  const onChangeweek = (time: any) => {
    console.log('onChangeminute -> time:', time);
    // 多选情况
    if (typeof time === 'object' && Array.isArray(time)) {
      if (time[time.length - 1] == '*') {
        //选中了不指定
        setweek('*');
      } else {
        // 选择了其他的数
        // @ts-ignore
        setweek(time.filter((item) => item !== '*'));
      }
    } else {
      setweek(time);
    }
  };
  const onChangeweekmonth = (time: any) => {
    console.log('onChangeminute -> time:', time);
    // 多选情况
    if (typeof time === 'object' && Array.isArray(time)) {
      if (time[time.length - 1] == '*') {
        //选中了不指定
        setmonth('*');
      } else {
        // 选择了其他的数
        // @ts-ignore
        setmonth(time.filter((item) => item !== '*'));
      }
    } else {
      setmonth(time);
    }
  };
  const onChangeshowweek = (time: any) => {
    setshowweek(time);
  };

  const processVariable = (cornData: any[]) => {
    console.log('processVariable -> cornData:', cornData);
    let cronExpression = '';
    cornData.forEach((variable: string | any[]) => {
      if (typeof variable === 'object' && Array.isArray(cornData)) {
        for (let i = 0; i < variable.length; i++) {
          if (i === variable.length - 1) {
            cronExpression = cronExpression + variable[i] + ' ';
          } else {
            cronExpression = cronExpression + variable[i] + ',';
          }
        }
      } else {
        cronExpression = cronExpression + variable + ' ';
      }
    });
    console.log('cornData.forEach -> cronExpression:', cronExpression);
    return '0 ' + cronExpression;
  };
  const handleFinish = (values: AddUavPlanReqType) => {
    if (onSubmit) {
      console.log('onChangeminute -> time:', minute, hour, day, week, month, showweek);
      console.log('setTimeout -> plan:', plan);
      const cronDataInfo = [];
      let planData = '';
      if (showweek) {
        cronDataInfo.push(minute, hour, '*', month, week);
        planData = processVariable(cronDataInfo);
      } else {
        cronDataInfo.push(minute, hour, day, month, '*');
        planData = processVariable(cronDataInfo);
      }
      // const newStr = '0' + plan.substring(1, plan.length - 1);
      // const newStr = str.slice(0, -1); // 去除最后一个字符
      setTimeout(() => {
        onSubmit({
          ...values,
          plan: planData,
          uav_name: droneList.find((item: any) => item.value === values.uav_id)?.label,
          fly_name: roadList.find((item: any) => item.value === values.fly_id)?.label,
        });
      }, 500);
    }
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
          {/* <CronEditor onChange={handleCronChange} tabType="card" showCrontab={true} value={plan} /> */}
          <Row>
            <Col span={4}>
              <Select
                value={month}
                mode="multiple"
                options={monthList}
                onChange={onChangeweekmonth}
              />
            </Col>
            <Col span={4}>
              <Select
                allowClear
                defaultValue={false}
                // onChange={handleChange}
                options={dateType}
                onChange={onChangeshowweek}
              />
            </Col>
            {showweek ? (
              <Col span={4}>
                <Select
                  value={week}
                  mode="multiple"
                  allowClear
                  placeholder="请选择周"
                  // onChange={handleChange}
                  options={weekList}
                  onChange={onChangeweek}
                />
              </Col>
            ) : (
              <Col span={4}>
                <Select
                  value={day}
                  mode="multiple"
                  allowClear
                  placeholder="请选择天"
                  // onChange={handleChange}
                  options={dayList}
                  onChange={onChangeday}
                />
              </Col>
            )}

            <Col span={6}>
              <Select
                mode="multiple"
                allowClear
                value={hour}
                // onChange={handleChange}
                options={hourList}
                onChange={onChangehour}
              />
            </Col>
            <Col span={6}>
              <Select
                value={minute}
                mode="multiple"
                allowClear
                // onChange={handleChange}
                options={minuteList}
                onChange={onChangeminute}
              />
            </Col>
          </Row>
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
      width={1200}
      bodyStyle={{ width: '1200px' }}
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
