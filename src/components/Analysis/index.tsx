/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-12 08:35:27
 * @FilePath: \zero-admin-ui-master\src\components\Analysis\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { Area } from '@ant-design/plots';
const Analysis: React.FC = () => {
  const [data, setData] = useState([]);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/b21e7336-0b3e-486c-9070-612ede49284e.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'country',
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  return (
    <div>
      <Area {...config} />
    </div>
  );
};

export default Analysis;
