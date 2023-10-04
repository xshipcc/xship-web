import { ReactFlvPlayer } from 'react-flv-player';
import React, { useEffect, useMemo, useState, Component } from 'react';
import { Button } from 'antd';

const Video: React.FC = () => {
  const [url, setUrl] = useState('');

  return (
    <div>
      <ReactFlvPlayer
        // url={url == '' ? 'http://localhost:8080/video/demo.flv' : url}
        url={'http://localhost:8080/video/demo.flv'}
        heigh="400px"
        width="300px"
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
