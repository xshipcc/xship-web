import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
} from 'antd';
import { ListUavPlanDataType } from '../data.d';
import moment from 'moment';
import Cron from 'react-cron-antd';
import { PlusOutlined } from '@ant-design/icons';
import { ListUavFlyReqType } from '../../routePlan/data';
import { queryFly } from '../../routePlan/service';
import { queryDevice } from '../../device/service';

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
  const [plan, setPlan] = useState<string>();
  const [CronVisible, handleCronVisible] = useState<boolean>(false);

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
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
          name="uav_id"
          label="无人机id"
          rules={[{ required: true, message: '请输入无人机id!' }]}
        >
          <Select defaultValue="default" onChange={handleChange} options={droneList} />
        </FormItem>
        {/* <FormItem
          name="uav_icon"
          label="无人机图片"
          rules={[{ required: true, message: '请输入无人机图片!' }]}
        >
          <Input id="update-title" placeholder={'请输入无人机图片'} />
        </FormItem> */}
        {/* <FormItem label="无人机图片" name="uav_icon" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>上传</div>
            </div>
          </Upload>
        </FormItem> */}
        <FormItem id="plan" label="飞行计划时间">
          {/* <RangePicker onChange={onChange} /> */}
          <Button type="primary" onClick={() => handleCronVisible(true)}>
            {CronVisible ? plan + '' : '选择计划时间'}
          </Button>
          <Cron
            style={{ display: CronVisible ? 'block' : 'none', width: '370px' }}
            value="* * * * * ? *"
            onOk={(value) => {
              console.log('cron:', value);
              setPlan(value);
              handleCronVisible(false);
            }}
          />
        </FormItem>
        <FormItem
          name="fly_id"
          label="巡检路线id"
          rules={[{ required: true, message: '请输入巡检路线id!' }]}
        >
          <Select defaultValue="default" onChange={handleChange} options={roadList} />
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
