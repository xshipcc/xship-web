/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-05 02:49:02
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-05 03:43:16
 * @FilePath: \zero-admin-ui-master\src\components\VideoFlv\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import flvJs from 'flv.js';
import { Button } from 'antd';

function Live() {
  const [isPlay, setIsPlay] = useState(false);
  const flvRef = useRef<flvJs.Player>();
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (flvJs.isSupported()) {
      flvRef.current = flvJs.createPlayer({
        type: 'flv',
        isLive: true,
        cors: true,
        hasVideo: true,
        url: 'http://localhost:8080/video/demo.flv',
      });
      if (videoRef.current) {
        flvRef.current.attachMediaElement(videoRef.current);
        flvRef.current.load();
      }
    }
  }, []);
  const onClickPlay = useCallback(() => {
    if (flvRef.current) {
      if (isPlay) {
        flvRef.current.pause();
      } else {
        flvRef.current.play();
      }
      setIsPlay(!isPlay);
    }
  }, [isPlay]);
  return (
    <div className={'live'}>
      <div className={'video-container'}>
        <video ref={videoRef} className={'video'}>
          {`Your browser is too old which doesn't support HTML5 video.`}
        </video>
        <div className={'control'}>
          <Button type="text" onClick={onClickPlay}>
            播放
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Live;
