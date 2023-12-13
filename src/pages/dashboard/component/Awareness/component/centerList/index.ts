// 面板信息加载
export const droneInfoList = [
  {
    key: `speed`,
    value: `水平速度`,
    unit: 'm/s',
  },
  {
    key: `gps_speed`,
    value: `垂直速度`,
    unit: 'm/s',
  },
  {
    key: `target_height`,
    value: `目标高度`,
    unit: 'm',
  },
  {
    key: `fly_time`,
    value: `飞行时间`,
    unit: 'h',
  },
  {
    key: `rel_height`,
    value: `飞行高度`,
    unit: 'm',
  },
];
export const droneStateList = [
  {
    key: `lon`,
    value: `经度`,
    unit: '°',
  },
  {
    key: `lat`,
    value: `维度`,
    unit: '°',
  },
  {
    key: `height`,
    value: `高度`,
    unit: 'm',
  },
  {
    key: `pitch`,
    value: `俯仰角`,
    unit: '°',
  },
  {
    key: `roll_angle`,
    value: `滚转角`,
    unit: '°',
  },
  {
    key: `trajectory`,
    value: `航向`,
    unit: '°',
  },
];
export const hangarInfoList1 = [
  {
    key: `battery_v`,
    value: `电池电压`,
    unit: 'V',
  },
  {
    key: `battery_temp`,
    value: `电池温度`,
    unit: '°C',
  },
  {
    key: `charge`,
    value: `电池状态`,
    unit: '',
  },
];
export const hangarInfoList2 = [
  // {
  //   key: `hatch`,
  //   value: `舱盖状态`,
  //   unit: '',
  // },
  {
    key: `homing`,
    value: `归位机构状态`,
    unit: ' ',
  },
  {
    key: `uavpower_status`,
    value: `无人机电源状态`,
    unit: '',
  },
];
export const monitorList = [
  {
    key: `lon`,
    value: `目标经度`,
    unit: '°',
  },
  {
    key: `lat`,
    value: `目标维度`,
    unit: '°',
  },
  {
    key: `target_height`,
    value: `目标高度`,
    unit: 'm',
  },
];
export const monitorTFList = [
  {
    key: `tf_total`,
    value: `TF总容量`,
    unit: '',
  },
  {
    key: `tf_usage`,
    value: `使用容量`,
    unit: '%',
  },
];
// 面板控制加载
export const droneButtonList1 = [
  {
    key: `check`,
    info: '自检',
    button: '自检',
    over: '自检成功',
  },
  {
    key: `unlock`,
    info: '解锁',
    button: '解锁',
    over: '解锁成功',
  },
  {
    key: `takeoff`,
    info: '起飞',
    button: '起飞',
    over: '起飞成功',
  },
  {
    key: `return`,
    info: '回家降落',
    button: '回家降落',
    over: '降落成功',
  },
  {
    key: `lock`,
    info: '加锁',
    button: '加锁',
    over: '加锁成功',
  },
];
export const droneButtonList2 = [
  {
    key: `mode`,
    info: '控制模式',
    button: '程控',
    over: '手控',
  },
  {
    key: `light`,
    info: '防撞灯',
    button: '防撞灯开',
    over: '防撞灯关',
  },
];
export const hangarButtonList1 = [
  {
    key: `charging`,
    info: '充电装置',
    button: '连接',
    over: '断开',
  },
  {
    key: `mechanism`,
    info: '归位机构',
    button: '锁定',
    over: '解锁',
  },
  // {
  //   key: `hatch`,
  //   info: '舱盖',
  //   button: '打开',
  //   over: '打开',
  // },
  // {
  //   key: `hatch`,
  //   info: '舱盖',
  //   button: '关闭',
  //   over: '关闭',
  // },
];

export const monitorButtonList1 = [
  {
    key: `tracking`,
    info: '跟踪',
    button: '跟踪',
    over: '成功',
  },
  {
    key: `positioning`,
    info: '激光定位',
    button: '激光定位',
    over: '定位取消',
  },
  {
    key: `downward`,
    info: '下视',
    button: '下视',
    over: '成功',
  },
  // {
  //   key: `centering`,
  //   info: '归中',
  //   button: '归中',
  //   over: '归中',
  // },
  {
    key: `scanning`,
    info: '扫描',
    button: '扫描',
    over: '成功',
  },
];
export const monitorButtonList2 = [
  {
    key: `photo`,
    info: '拍照',
    button: '拍照',
    over: '成功',
  },
  {
    key: `video`,
    info: '录像 ',
    button: '录像开始',
    over: '录像结束',
  },
];
