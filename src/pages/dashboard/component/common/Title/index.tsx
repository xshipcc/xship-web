//@ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-16 15:07:50
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\common\Title\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import styles from './index.less';

const Title = (props) => {
  return (
    <>
      <div className={styles.commonTitle}>
        <div>{props.title}</div>
      </div>
    </>
  );
};

export default Title;
