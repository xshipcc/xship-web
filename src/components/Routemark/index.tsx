/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-11 14:00:38
 * @FilePath: \zero-admin-ui-master\src\pages\Welcome.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const Routemark: React.FC = () => (
  <Result
    status="404"
    title="Routemark"
    subTitle="Routemark"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Back Home
      </Button>
    }
  />
);

export default Routemark;
