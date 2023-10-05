// @ts-nocheck

/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-05 02:49:02
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-06 02:35:54
 * @FilePath: \zero-admin-ui-master\src\components\VideoFlv\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useRef, useEffect } from 'react';
import flvjs from 'flv.js';

const FLVPlayer = (props) => {
  // console.log('FLVPlayer -> props:', props.url);
  const videoRef = useRef(null);
  const flvPlayerRef = useRef(null);

  useEffect(() => {
    if (flvjs.isSupported()) {
      flvPlayerRef.current = flvjs.createPlayer({
        type: 'flv',
        url: props?.url,
        isLive: true, // 是否为直播流
      });

      flvPlayerRef.current.attachMediaElement(videoRef.current);
      flvPlayerRef.current.load();
    }
    // 销毁时结束视频流
    return () => {
      if (flvPlayerRef.current) {
        flvPlayerRef.current.unload();
        flvPlayerRef.current.detachMediaElement();
        flvPlayerRef.current.destroy();
      }
    };
  }, [props?.url]);

  return (
    <div>
      <video
        ref={videoRef}
        controls
        style={{ width: props.width + '%', height: props.height + 'vh' }}
      />
    </div>
  );
};

export default FLVPlayer;
