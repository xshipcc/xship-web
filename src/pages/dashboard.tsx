/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-09 20:12:31
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-12 00:38:43
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useRef, useState } from 'react';
import * as Cesium from 'cesium';
import styles from './dashboard.less';
import 'cesium/Source/Widgets/widgets.css';
import TIFFImageryProvider from 'tiff-imagery-provider';
import proj4 from 'proj4-fully-loaded';
import { Button } from 'antd';
import { Layout, Menu } from 'antd';
import { Link } from 'umi';

import Monitor from '@/components/Monitor';
import Routemark from '@/components/Routemark';
import Awareness from '@/components/Awareness';
import Analysis from './analysis';

const Dashboard: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const viewer = useRef<Cesium.Viewer>();
  //
  useEffect(() => {
    // 创建Viewer实例
    viewer.current = new Cesium.Viewer(divRef.current as Element, {
      baseLayerPicker: false,
      animation: false,
      fullscreenButton: true,
      geocoder: false,
      homeButton: false,
      selectionIndicator: false,
      timeline: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      shouldAnimate: false,
      useBrowserRecommendedResolution: false,
      orderIndependentTranslucency: false,
    });
  }, []);
  //
  const addTiffImageryLayer = async (viewerInstance: Cesium.Viewer, url: string): Promise<void> => {
    try {
      const provider: any = await TIFFImageryProvider.fromUrl(url, {
        enablePickFeatures: true,
        projFunc: (code) => {
          if (![4326, 3857, 900913].includes(code)) {
            try {
              const prj = proj4('EPSG:4326', `EPSG:${code}`);
              if (prj)
                return {
                  project: prj.forward,
                  unproject: prj.inverse,
                };
            } catch (e) {
              console.error(e);
            }
          }
          return undefined;
        },
      });

      const imageryLayer = viewerInstance.imageryLayers.addImageryProvider(provider);
      await viewerInstance.flyTo(imageryLayer, {
        duration: 1,
      });
    } catch (error) {
      console.error(error);
    }
  };
  //
  const [componets, setComponets] = useState<string>('analysis');

  const ShowComponent = (name: string) => {
    setComponets(name);
  };

  const renderComponent = () => {
    switch (componets) {
      case 'Awareness':
        return <Awareness />;
      case 'Monitor':
        return <Monitor />;
      case 'Routemark':
        return <Routemark />;
      default:
        return <Analysis />;
    }
  };

  // useEffect(() => {
  //   addTiffImageryLayer(viewer.current as Cesium.Viewer, '/luquan.tif');
  // }, []);

  return (
    <div className={styles.screen}>
      {/* 头部 start*/}
      <div className={styles.screen_header}>
        {/* 标题 start */}
        <div className={styles.title}>
          <div className={styles.image} />
          <div className={styles.text}>
            <p className={styles.textbig}>无人机自动巡检系统</p>
            <p className={styles.textsmall}>UAV Automated Inspection System</p>
          </div>
        </div>
        {/* 标题 start */}
        {/* 导航栏 start */}
        <Button type="text" className={styles.button}>
          Text Button
        </Button>
        <Button type="text" className={styles.button}>
          Text Button
        </Button>
        <Button type="text" className={styles.button}>
          Text Button
        </Button>
        <Button type="text" className={styles.button}>
          Text Button
        </Button>
        {/* 导航栏 end */}
        <div className={styles.close}>关闭</div>
      </div>
      {/* 头部 end */}
      {/* 组件 start */}
      <div className={styles.parentcontent}>
        <div className={styles.contentleft}>111</div>
        <div className={styles.contentright}>12211</div>
      </div>

      {/* 组件 start */}
      {/* 地图 start*/}
      <div ref={divRef} className={styles.map} />
      {/* 地图 start*/}
    </div>
  );
};

export default React.memo(Dashboard);
