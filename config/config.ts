/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-20 12:52:20
 * @FilePath: \zero-admin-ui-master\config\config.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';

import defaultSettings from './defaultSettings';
// import proxy from './proxy';
import routes from './routes';
import path from 'path';
import px2vw from 'postcss-px-to-viewport';
const { REACT_APP_ENV } = process.env;
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

export default defineConfig({
  // 配置额外的 postcss 插件(px 转 vw|vh)
  extraPostCSSPlugins: [
    px2vw({
      viewportWidth: 1920, // 视窗的宽度，可根据自己的需求调整（这里是以PC端为例）
      viewportHeight: 1080, // 视窗的高度
      unitPrecision: 6, // 转换后的精度，即小数点位数
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
    }),
  ],
  stylelint: false, // 禁用 stylelint

  antd: {},
  copy: [
    { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
    { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
    { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
  ],

  define: {
    CESIUM_BASE_URL: '/', //cesium默认路径地址配置，没改好,这个地址相对于路由
    // 部署端
    MAP_TERRAIN_URL: '/terrain',
    MAP_TILES_URL: '/luquantile/{z}/{x}/{y}.png',
    WS_MQTT_URL: 'ws://192.168.2.105:8083/mqtt', //远程机器部署地址
    VIDEO_URL: 'http://localhost:8080/live/test.live.flv',
    BASE_IMAGE_URL: 'http://ai.javodata.com', //图片路径地址

    // 本地测试端
    // VIDEO_URL: 'http://127.0.0.1:8880/live/test.live.flv',
    // MAP_TERRAIN_URL: 'http://ai.javodata.com/terrain',
    // MAP_TILES_URL: 'http://ai.javodata.com/luquantile/{z}/{x}/{y}.png',
    // WS_MQTT_URL: 'ws://127.0.0.1:8083/mqtt', //本地测试
    // BASE_IMAGE_URL: 'http://ai.javodata.com', //图片路径地址

    // WS_MQTT_URL: 'ws://ai.javodata.com:8883/mqtt', //远程测试
  },
  hash: true,

  dva: {
    hmr: true,
    immer: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: {
    '/api': {
      target: 'http://47.243.162.50:8888',
      changeOrigin: true,
      // "pathRewrite": { "^/api": "" }
    },
  },
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: { type: 'none' },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
