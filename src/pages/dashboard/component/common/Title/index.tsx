//@ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-19 12:04:33
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
        <div className={styles.text}>{props.title}</div>
        {/* <div className={styles.button}>按钮</div> */}
      </div>
    </>
  );
};

export default Title;
