/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-25 13:06:33
 * @FilePath: \zero-admin-ui-master\config\proxy.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
  '/api': {
    // 要代理的地址
    target: 'http://47.243.162.50/',
    // 配置了这个可以从 http 代理到 https
    // 依赖 origin 的功能可能需要这个，比如 cookie
    changeOrigin: true,
    // pathRewrite: { '^': '' },
  },

  // test: {
  //   '/api/': {
  //     // 要代理的地址
  //     target: 'http://47.243.162.50/',
  //     // 配置了这个可以从 http 代理到 https
  //     // 依赖 origin 的功能可能需要这个，比如 cookie
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
  // },
  // pre: {
  //   '/api/': {
  //     // 要代理的地址
  //     target: 'http://47.243.162.50/',
  //     // 配置了这个可以从 http 代理到 https
  //     // 依赖 origin 的功能可能需要这个，比如 cookie
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
  // },
};
