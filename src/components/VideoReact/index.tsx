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
      <Button
        type="text"
        onClick={() => {
          setUrl('http://localhost:8080/video/demo.flv');
        }}
      >
        播放
      </Button>
    </div>
  );
};

export default Video;
