/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-23 10:41:59
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\left.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './left.less';
// import Player from '@/components/VideoReact';
import Player from '@/components/VideoFlv';
import { useSelector } from 'umi';
// import * as mqtt from 'mqtt';
import Title from '../common/Title';
import { queryDevice } from '@/pages/drone/device/service';
import { ListUavDeviceData } from '@/pages/drone/device/data';
function useForceUpdate() {
  const [value, setState] = useState(true);
  return () => setState(!value);
}

const Awareness: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file left.tsx
   *  @time 2023/09/13
   * @category :
   * @function :
   */
  const handleForceupdateMethod = useForceUpdate();

  const [droneinfo, setdroneinfo] = useState({ cam_url: '' });
  const getDroneData = async () => {
    const resp: any = await queryDevice({ pageSize: 10, current: 1 });
    console.log('getDroneData -> resp:', resp);
    // {data: [], pageSize: 10, current: 1, total:28, success: true,}
    setdroneinfo(resp.data[0]);
    handleForceupdateMethod();
  };
  useEffect(() => {
    getDroneData();
  }, []);
  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------
  return (
    <>
      <div className={styles.content}>
        <div className={styles.top}>
          {/* @ts-ignore */}
          <Title title={'无人机画面'} />
          <Row>
            <Col span={24} className={styles.video}>
              {/* @ts-ignore */}
              {console.log('droneinfo:', droneinfo)}
              <Player url={droneinfo.cam_url} height={'19'} width={'100'} />
              {/* <Player url={droneinfo.cam_url} height={'19'} width={'100'} /> */}
            </Col>
          </Row>
        </div>
        {/*  */}

        {/*  */}
      </div>
    </>
  );
};

export default Awareness;
