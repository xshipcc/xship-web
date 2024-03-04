import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Upload,
} from 'antd';
import { ListUavPlanDataType } from '../data.d';
import moment from 'moment';
import CronPlus from 'react-cron-plus';
import CronEditor from 'cron-editor-react';

import { PlusOutlined } from '@ant-design/icons';
import { ListUavFlyReqType } from '../../routePlan/data';
import { queryFly } from '../../routePlan/service';
import { queryDevice } from '../../device/service';
import { debounce } from 'lodash';

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
  const [plan, setPlan] = useState<string>('* * * * * ? *');

  const { onSubmit, onCancel, updateModalVisible, values } = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    }
  }, [props.updateModalVisible]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [roadList, setroadList] = useState([{ value: 'demo', label: 'demo' }]);
  const [droneList, setdroneList] = useState([{ value: 'demo', label: 'demo' }]);
  const [droneid, setdroneid] = useState();
  const [roadId, setroadId] = useState();

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
      return { label: i + '日', value: i + '' };
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
    { value: '1', label: '星期一' },
    { value: '2', label: '星期二' },
    { value: '3', label: '星期三' },
    { value: '4', label: '星期四' },
    { value: '5', label: '星期五' },
    { value: '6', label: '星期六' },
    { value: '7', label: '星期日' },
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
    try {
      cornData.forEach((variable: string | any[]) => {
        if (typeof variable === 'object' && Array.isArray(variable)) {
          console.log('cornData.forEach -> variable:', variable);
          if (variable.length === 0) throw new Error('请输入正确格式');
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
    } catch (error) {
      // message.warning('请输入正确格式');
      throw new Error('请输入正确格式');
    }

    console.log('cornData.forEach -> cronExpression:', cronExpression);
    return '0 ' + cronExpression;
  };
  useEffect(() => {
    if (values?.plan) {
      console.log('日期 -> values:', values.plan);
      const data = values.plan?.split(' ');
      console.log('日期 -> data:', data);
      // @ts-ignore
      setminute(data[1]);
      // @ts-ignore
      sethour(data[2]);
      // @ts-ignore
      setday(data[3]);
      // @ts-ignore
      setweek(data[5]);
      // @ts-ignore
      setmonth(data[4]);
      form.setFieldsValue({
        ...values,
      });
    }
  }, [props.values]);

  const handleFinish = (item: { [key: string]: any }) => {
    if (onSubmit) {
      console.log('handleFinish -> values.uav_id:', values.uav_id);

      // const newStr = '0' + plan.substring(1, plan.length - 1);

      item.uav_name = droneList.find((subItem: any) => subItem.value === item.uav_id)?.label;
      console.log(
        'handleFinish -> droneList.find((subItem: any) => subItem.value === values.uav_id)?.label:',
        droneList.find((subItem: any) => subItem.value === item.uav_id)?.label,
      );

      item.fly_name = roadList.find((subItem: any) => subItem.value === item.fly_id)?.label;

      console.log('handleFin路线sh -> item:', roadList, item);

      console.log('onChangeminute -> time:', minute, hour, day, week, month, showweek);
      console.log('setTimeout -> plan:', plan);
      const cronDataInfo = [];
      let planData = '';
      try {
        if (showweek) {
          cronDataInfo.push(minute, hour, '*', month, week);
          planData = processVariable(cronDataInfo);
        } else {
          cronDataInfo.push(minute, hour, day, month, '*');
          planData = processVariable(cronDataInfo);
        }

        setTimeout(() => {
          if (item?.fly_name) {
            onSubmit({
              ...(item as ListUavPlanDataType),
              plan: planData,
            });
          } else {
            message.warning('路线不存在');
          }
        }, 500);
      } catch (error) {
        message.warning('请输入正确格式');
      }
    }
  };

  // interface UpdateUavPlanReqType {
  //   id: number;
  //   uav_id: number; // 无人机ID
  //   uav_icon: number; // 无人机 icon
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
          {/* <Select defaultValue="default" onChange={handleChangeDrone} options={droneList} /> */}
          <Select defaultValue="default" options={droneList} />
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
          {/* <Select defaultValue="default" onChange={handleChangeRoad} options={roadList} /> */}
          <Select defaultValue="default" options={roadList} />
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
  const load = useCallback(
    debounce(() => handleSubmit(), 500),
    [],
  );
  const modalFooter = { okText: '保存', onOk: load, onCancel };
  // const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      width={1200}
      bodyStyle={{ width: '1200px' }}
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
