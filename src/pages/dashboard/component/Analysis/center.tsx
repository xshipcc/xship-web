/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-18 15:51:21
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-22 01:06:11
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Analysis\center.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect } from 'react';
import styles from './center.less';
import Title from '@/pages/dashboard/component/common/Title';
import CenterLine from './component/centerLine';

const AwarenessCenter = (props: any) => {
  const initChart = () => {
    /**
     *  @file center.tsx
     *  @time 2023/10/22
     * @category :
     * @function :
     */
    //#region -------------------------------------------------------------------------
    //#endregion -----------------------------------------------------------------------
    /**
     * @end
     */
  };
  useEffect(() => {
    initChart();
  }, []);
  return (
    <div className={styles.content}>
      <Title title={'近日巡检对比'} />
      <CenterLine />
    </div>
  );
};
export default AwarenessCenter;
