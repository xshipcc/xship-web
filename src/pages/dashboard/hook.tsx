/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-17 22:32:11
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-17 22:37:41
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\hook.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'umi';

const useDashboardComponent = (componentName: string) => {
  const initView = useSelector((state: any) => state.dashboardModel.dashboardInfo);
  const dispatch = useDispatch();
  dispatch({ type: 'dashboardModel/fetchDashboardInfo', payload: { name: componentName } });
  const [data, setData] = React.useState(initView ?? []);

  //   setData(componentName);

  useEffect(() => {
    console.log('useCompany -> data:', data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return React.useMemo(() => data, [data]);
};

export default useDashboardComponent;
