// @ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 11:45:31
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-23 09:31:53
 * @FilePath: \zero-admin-ui-master\src\app.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import type { Settings as LayoutSettings, MenuDataItem } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import defaultSettings from '../config/defaultSettings';
import { tree } from '@/utils/utils';
import {
  SmileOutlined,
  HeartOutlined,
  SettingOutlined,
  LaptopOutlined,
  BarsOutlined,
  OneToOneOutlined,
  DeleteOutlined,
  FrownOutlined,
  GiftOutlined,
  DollarCircleOutlined,
  FundOutlined,
  FileSearchOutlined,
  AlertOutlined,
} from '@ant-design/icons';
import type { RequestConfig } from '@@/plugin-request/request';
import type { RequestInterceptor, RequestOptionsInit } from 'umi-request';
import { notification } from 'antd';

const IconMap = {
  FileSearchOutlined: <FileSearchOutlined />,
  LaptopOutlined: <LaptopOutlined />,
  FundOutlined: <FundOutlined />,
  BarsOutlined: <BarsOutlined />,
  OneToOneOutlined: <OneToOneOutlined />,
  SmileOutlined: <SmileOutlined />,
  HeartOutlined: <HeartOutlined />,
  SettingOutlined: <SettingOutlined />,
  DeleteOutlined: <DeleteOutlined />,
  FrownOutlined: <FrownOutlined />,
  GiftOutlined: <GiftOutlined />,
  DollarCircleOutlined: <DollarCircleOutlined />,
  AlertOutlined: <AlertOutlined />,
};

const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      console.log('fetchUserInfo -> msg:', msg);
      localStorage.setItem('menuTree', JSON.stringify(msg.menuTree));
      return msg;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      settings: defaultSettings,
      fetchUserInfo,
      currentUser,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

const loopMenuItem = (menus: any[]): MenuDataItem[] =>
  menus.map(({ icon, children, ...item }) => {
    return {
      ...item,
      icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children),
    };
  });

const menuDataRender: any = () => {
  const item = localStorage.getItem('menuTree') + '';

  // console.log(loopMenuItem(tree(JSON.parse(item), 0, 'parentId')));

  console.log(tree(JSON.parse(item), 0, 'parentId'));
  return loopMenuItem(tree(JSON.parse(item), 0, 'parentId'));

  // return tree(JSON.parse(item), 0, "parent_id");
};

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,

    menuDataRender: () => menuDataRender(),
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menu: {
      locale: false,
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: any) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

const addToken: RequestInterceptor = (url: string, options: RequestOptionsInit) => {
  options.headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  return {
    url,
    options,
  };
};

export const request: RequestConfig = {
  errorHandler,
  requestInterceptors: [addToken],
};
