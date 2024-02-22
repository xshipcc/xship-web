/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-14 08:59:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-02-22 15:32:57
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\component\button\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Col, Row } from 'antd';

import React, { useState } from 'react';
import styles from './index.less';
import { LoadingOutlined } from '@ant-design/icons';
const AwarenessButton: React.FC = (props: any) => {
  const { name, over, url, disable } = props;
  // @ts-ignore

  const [activeIndex, setActiveIndex] = useState(0);

  /**
   *
   *
   * @param {number} index 0正常 1等待 2完成
   */
  const handleClick = (index: number) => {
    setActiveIndex(1);
    setTimeout(() => {
      setActiveIndex(2);
    }, 2000);
  };
  //#region    -----------------------------------------------------------------------
  /**
   *  @file index.tsx
   *  @time 2023/09/13
   * @category :
   * @function :
   */

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------
  if (name === '自检' || name === '自检成功') {
    return (
      <button
        className={styles.botao}
        // onClick={() => {
        //   handleClick(1);
        //   console.log('messagedemo', 1111);
        // }}
      >
        <div className={styles.icon}>
          <LoadingOutlined rev={undefined} />
        </div>
        <span className={styles.texto}>{name}</span>
      </button>
    );
  } else {
    return (
      <button
        className={disable ? styles.botaodisabale : styles.botao}
        // onClick={() => {
        //   handleClick(1);
        //   console.log('messagedemo', 1111);
        // }}
      >
        <div className={styles.icon}>
          <LoadingOutlined rev={undefined} />
        </div>
        <span className={styles.texto}>{name}</span>
      </button>
    );
  }
};

export default AwarenessButton;
