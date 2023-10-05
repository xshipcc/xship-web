/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-05 03:02:03
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-06 01:44:49
 * @FilePath: \zero-admin-ui-master\src\components\VideoReact\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ReactFlvPlayer } from 'react-flv-player';
import React, { useEffect, useMemo, useState, Component } from 'react';
import { Button } from 'antd';

const Video: React.FC = (props) => {
  console.log('props:', props);
  const [url, setUrl] = useState('');
  console.log('VIDEO_URL:', VIDEO_URL);

  return (
    <div>
      <ReactFlvPlayer
        // url={url == '' ? 'http://localhost:8080/video/demo.flv' : url}
        url={VIDEO_URL}
        heigh={props.height}
        width={props.width}
        isMuted={true}
      />
    </div>
  );
};

export default Video;
