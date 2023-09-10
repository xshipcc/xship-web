/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-09 20:08:16
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-10 17:31:17
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useCallback, useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import { Ion } from 'cesium';
import styles from './dashboard.less';
import 'cesium/Source/Widgets/widgets.css';

const Dashboard: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZDE3YTE1Ni1iYTJjLTRjYjAtYTIyYi0zMDQ0M2UwN2NlNmQiLCJpZCI6NTg3MjcsImlhdCI6MTYyMzM4OTE3NH0.PS43TPHDe7ewqpHVLZXU4rrNC9E132RWas92ql_1jPI';
  const createViewer = useCallback(() => {
    new Cesium.Viewer(divRef.current as Element, {
      animation: true, // 动画控制，默认true
    });
  }, []); // 空数组，确保副作用函数在组件挂载时执行

  useEffect(() => {
    createViewer();
  }, []); // 空数组，确保副作用函数在组件挂载时执行

  return (
    <div className={styles.map}>
      <div ref={divRef} />
    </div>
  );
};

export default React.memo(Dashboard);
