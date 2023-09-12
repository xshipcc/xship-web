// @ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-09 20:12:31
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-12 22:26:03
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

import Monitor from '@/components/Monitor';
import Routemark from '@/components/Routemark';
import Awareness from '@/components/Awareness';
import Analysis from '@/components/Analysis';

const Dashboard: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  // const viewer = useRef<Cesium.Viewer>();
  // const custom = new Cesium.ArcGisMapServerImageryProvider({
  //   url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
  // });
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
      // await viewerInstance.flyTo(imageryLayer, {
      //   duration: 1,
      // });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // 创建Viewer实例
    const viewer = new Cesium.Viewer(divRef.current as Element, {
      animation: true, //左下角的动画仪表盘
      baseLayerPicker: false, //右上角的图层选择按钮
      geocoder: false, //搜索框
      homeButton: false, //home按钮
      sceneModePicker: false, //模式切换按钮
      timeline: true, //底部的时间轴
      navigationHelpButton: false, //右上角的帮助按钮，
      fullscreenButton: true, //右下角的全屏按钮
      infoBox: false, //小弹窗
      selectionIndicator: true,
      zoomIndicatorContainer: false,
      terrain: Cesium.Terrain.fromWorldTerrain(),
    });

    const dronePromise = Cesium.CzmlDataSource.load(' /czml');
    console.log('onMounted -> dronePromise:', dronePromise);

    //无人机实体

    dronePromise.then((dataSource) => {
      viewer.dataSources.add(dataSource);
      const drone = dataSource.entities.getById('Aircraft/Aircraft1');
      console.log('dronePromise.then -> drone:', drone);
      drone.model = {
        uri: 'src/assets/SampleData/Models/CesiumDrone.gltf',
        minimumPixelSize: 128,
        maximumScale: 1000,
        silhouetteColor: Cesium.Color.WHITE,
        silhouetteSize: 2,
      };
      console.log('dronePromise.then ->  drone.model:', drone.model);
      drone.orientation = new Cesium.VelocityOrientationProperty(drone.position);
      drone.viewFrom = new Cesium.Cartesian3(0, -30, 30);
      viewer.clock.shouldAnimate = true;
    });

    // addTiffImageryLayer(viewer, '/srctiff');
  }, []);
  //

  //

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
        <Button
          type="text"
          className={styles.button}
          onClick={() => {
            ShowComponent('analysis');
          }}
        >
          analysis
        </Button>
        <Button
          type="text"
          className={styles.button}
          onClick={() => {
            ShowComponent('Awareness');
          }}
        >
          Awareness
        </Button>
        <Button
          type="text"
          className={styles.button}
          onClick={() => {
            ShowComponent('Monitor');
          }}
        >
          Monitor
        </Button>
        <Button
          type="text"
          className={styles.button}
          onClick={() => {
            ShowComponent('Routemark');
          }}
        >
          Routemark
        </Button>
        {/* 导航栏 end */}
        <div className={styles.close}>关闭</div>
      </div>
      {/* 头部 end */}
      {/* 组件 start */}
      <div className={styles.parentcontent}>
        <div className={styles.contentleft}>{renderComponent()}</div>
        <div className={styles.contentright}></div>
      </div>

      {/* 组件 start */}
      {/* 地图 start*/}
      <div ref={divRef} className={styles.map} />
      {/* 地图 start*/}
    </div>
  );
};

export default React.memo(Dashboard);
