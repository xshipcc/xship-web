/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-16 18:56:46
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-25 11:44:57
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\typings.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
export interface DashboardInfoType {
  drone: {
    total: number;
    online: number;
    breakdown: number;
  };
  inspection: {
    total: number;
    complete: number;
    rate: number;
    today: number;
    breakdown: number;
    warning: number;
  };
  radar: {
    item: string;
    user: string;
    score: number;
  }[];
  bar: {
    name: string;
    value: number;
  }[];
  line: {
    type: string;
    date: number;
    value: number;
  }[];
  DualAxes: {
    histgram: {
      time: string;
      value: number;
      type: string;
    }[];
    linegram: {
      time: string;
      count: number;
      name: string;
    }[];
  };
  alarmPie: {
    title: string;
    value: number;
  }[];
}

export type DataItem = {
  id: number;
  type: number;
  lat: number;
  lon: number;
  alt: number;
};

export type TodayYesterdayData = {
  todaydata: number[];
  ydataToday: number[];
};

export type DashboardAnalysData = {
  data: DataItem[];
  week_data: number[];
  alert_total: number[];
  alert_confirms: number[];
  alert_not_confirms: number[];
  today_yesterday: TodayYesterdayData;
  total: number;
  completion: number;
  totaltime: number;
  fly_total: number;
};

export type ComponentParam = {
  name: string;
};
export interface DroneDataType {
  speed: number;
  lat: number;
  lon: number;
  height: number;
  target_angle: number;
}

export type Alert = {
  id: number;
  name: string;
  image: string;
  type: number;
  code: string;
  level: number;
  count: number;
  platform: number;
  start_time: string;
  end_time: string;
  note: string;
  lat: number;
  lon: number;
  alt: number;
  history_id: number;
  confirm: number;
};

export type Hangar = {
  hatch: boolean;
  charging: boolean;
  mechanism: boolean;
  wind_angle: string;
  rain_snow: string;
  out_temp: string;
  in_temp: string;
};
