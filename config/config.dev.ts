/*
 * @Author: JavoData
 * @Date: 2021-12-23 09:22:44
 * @LastEditors: JavoData
 * @LastEditTime: 2022-02-16 11:08:26
 * @Description: description
 * @FilePath: /ai-monitor-ui/config/config.dev.ts
 */
// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  fastRefresh: {},
});
