/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-02 04:50:58
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-02 05:17:04
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\video.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useMemo, useState } from 'react';
import videojs from 'video.js';
import videozhCN from 'video.js/dist/lang/zh-CN.json'; //播放器中文，不能使用.js文件
import 'video.js/dist/video-js.css'; //样式文件注意要加上
import 'videojs-flash'; //如果要播放RTMP要使用flash 需要先npm i videojs-flash
// //样式文件注意要加上
import 'video.js/dist/video-js.css';

const VideoPlayer: React.FC<any> = (props) => {
  const [videoNode, setVideoNode] = useState<any>();
  const [player, setPlayer] = useState<any>();

  const url = 'rtmp://58.200.131.2:1935/livetv/hunantv';

  // rtmp播放
  useMemo(() => {
    if (videoNode) {
      const videoJsOptions = {
        autoplay: true, // 自动播放
        language: 'zh-CN',
        preload: 'auto', // 自动加载
        errorDisplay: true, // 错误展示
        width: 260, // 宽
        height: 160,
        flash: {
          swf: '/video-js.swf',
        },
        sources: [
          {
            src: url,
            type: 'rtmp/flv', // 类型可加可不加，目前未看到影响
          },
        ],
      };
      const videoPlayer = videojs(videoNode, videoJsOptions);
      setPlayer(videoPlayer);
    }
  }, [videoNode]);

  useEffect(() => {
    return () => {
      if (player) player.dispose();
    };
  }, []);

  return (
    <>
      <div style={{}}>
        <video
          ref={(node) => {
            setVideoNode(node);
          }}
          id="videoPlay"
          className="video-js vjs-default-skin vjs-big-play-centered"
          width="100%"
          height="100%"
        >
          <track kind="captions" />
          <p className="vjs-no-js">您的浏览器不支持HTML5，请升级浏览器。</p>
        </video>
      </div>
    </>
  );
};

export default VideoPlayer;
