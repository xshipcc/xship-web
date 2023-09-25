/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-25 10:26:40
 * @FilePath: \zero-admin-ui-master\config\defaultSettings.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Settings as LayoutSettings } from '@ant-design/pro-layout';
// import logo from '../src/assets/logo.png'
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#2b3a45',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '无人机巡检系统',
  pwa: false,
  logo: 'http://localhost:8000/logo',
  iconfontUrl: '',
};

export default Settings;
