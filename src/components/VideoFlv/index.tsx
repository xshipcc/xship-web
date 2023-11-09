// @ts-nocheck

/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-05 02:49:02
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-09 00:00:49
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
        hasAudio: true, //浏览器安全策略,关闭音频自动播放
        url: props?.url,
        isLive: true, // 是否为直播流
      });

      flvPlayerRef.current.attachMediaElement(videoRef.current);
      flvPlayerRef.current.load();
      flvPlayerRef.current.play();

      // flvPlayerRef.current.on(flvjs.Events.LOADING_COMPLETE, function () {
      // });
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
      <video ref={videoRef} controls style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default FLVPlayer;
