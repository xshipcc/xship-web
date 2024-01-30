/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-25 18:21:18
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Timer\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

const Timer: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file left.tsx
   *  @time 2023/09/13
   * @category :
   * @function :
   */

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const getNewDate = () => {
    const timeStamp = new Date();
    const year = timeStamp.getFullYear(); //年
    const month = timeStamp.getMonth() + 1; //月
    const day = timeStamp.getDate(); //日
    const hour = timeStamp.getHours(); //时
    const minutes = timeStamp.getMinutes(); //分
    const s = timeStamp.getSeconds(); //秒
    const seconds = s <= 9 ? '0' + s : s;
    const d = year + '年' + month + '月' + day + '日';
    const t = hour + ':' + minutes + ':' + seconds;
    const formattedTime = moment().format('YYYYMMDDHHmmss');
    const newDate = formattedTime.replace(
      /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
      '$1-$2-$3 $4:$5:$6',
    );
    // setDate(d);
    setTime(newDate);
  };
  useEffect(() => {
    const timer = setInterval(getNewDate, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------
  return (
    <>
      {/* <div className={styles.date}>{date}</div> */}

      <div className={styles.time}>{time}</div>
    </>
  );
};

export default Timer;
