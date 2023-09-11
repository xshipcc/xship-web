/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-09 20:12:31
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-11 13:34:59
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import styles from './dashboard.less';
import 'cesium/Source/Widgets/widgets.css';
import TIFFImageryProvider from 'tiff-imagery-provider';
import proj4 from 'proj4-fully-loaded';
import { Link } from 'umi';

const Dashboard: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const viewer = useRef<Cesium.Viewer>();
  useEffect(() => {
    // 创建Viewer实例
    viewer.current = new Cesium.Viewer(divRef.current as Element, {
      baseLayerPicker: true,
      animation: true,
      fullscreenButton: true,
      geocoder: true,
      homeButton: true,
      selectionIndicator: true,
      timeline: true,
      navigationHelpButton: true,
      shouldAnimate: true,
      useBrowserRecommendedResolution: true,
      orderIndependentTranslucency: true,
    });
  }, []);

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

  useEffect(() => {
    addTiffImageryLayer(viewer.current as Cesium.Viewer, '/luquan.tif');
  }, []);

  return <div className={styles.map} ref={divRef}></div>;
};

export default React.memo(Dashboard);
