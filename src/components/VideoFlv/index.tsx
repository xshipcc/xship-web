// @ts-nocheck

/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-05 02:49:02
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-09 14:22:27
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
        hasAudio: false, //浏览器安全策略,关闭音频自动播放
        url: props?.url,
        isLive: true, // 是否为直播流
        enableWorker: true,
        enableStashBuffer: false,
        stashInitialSize: 128,
      });

      flvPlayerRef.current.attachMediaElement(videoRef.current);
      flvPlayerRef.current.load();
      flvPlayerRef.current.play();
      setInterval(function () {
        const delayTime = flvPlayerRef.current.buffered.end(0) - flvPlayerRef.current.currentTime;
        console.log('delayTime.current.currentTime:', flvPlayerRef.current.currentTime);
        console.log('delayTime.current.buffered:', flvPlayerRef.current.buffered);
        console.log('delayTime.current.buffered:', videoRef.current.buffered);
        console.log('delayTime:', delayTime);
        // if (videoRef.current.buffered.length > 0) {
        //   console.log('delayTime.current.buffered:', videoRef.current.buffered);

        //   if (flvPlayerRef.current.buffered.end(0) - flvPlayerRef.current.currentTime > 2) {
        //     // flvPlayerRef.current.currentTime = flvPlayerRef.current.buffered.end(0.1);
        //   }
        // }
      }, 1000);

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
