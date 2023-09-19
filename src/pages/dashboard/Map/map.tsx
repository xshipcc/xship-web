// @ts-nocheck

import React, { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import styles from './map.less';
import 'cesium/Source/Widgets/widgets.css';
import TIFFImageryProvider from 'tiff-imagery-provider';

const Map: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file dashboard.tsx
   *  @time 2023/09/13
   * @category :cesium相关功能
   * @function :
   */
  const divRef = useRef<HTMLDivElement>(null);

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
    // 创建Viewer实例
    const viewer = new Cesium.Viewer(divRef.current as Element, {
      animation: false, //左下角的动画仪表盘
      baseLayerPicker: false, //右上角的图层选择按钮
      geocoder: false, //搜索框
      homeButton: false, //home按钮
      sceneModePicker: false, //模式切换按钮
      timeline: false, //底部的时间轴
      navigationHelpButton: false, //右上角的帮助按钮，
      fullscreenButton: false, //右下角的全屏按钮
      infoBox: false, //小弹窗
      selectionIndicator: true,
      zoomIndicatorContainer: false,
      terrain: Cesium.Terrain.fromWorldTerrain(),
    });
    viewer._cesiumWidget._creditContainer.style.display = 'none';
    // addTiffImageryLayer(viewer, '/srctiff');

    const dronePromise = Cesium.CzmlDataSource.load(' /czml');
    // console.log('onMounted -> dronePromise:', dronePromise);

    //无人机实体

    dronePromise.then((dataSource) => {
      viewer.dataSources.add(dataSource);
      const drone = dataSource.entities.getById('Aircraft/Aircraft1');
      // console.log('dronePromise.then -> drone:', drone);
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
  }, []);

  // useEffect(() => {
  //   addTiffImageryLayer(viewer.current as Cesium.Viewer, '/luquan.tif');
  // }, []);
  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------

  return (
    <>
      <div ref={divRef} className={styles.map} />
    </>
  );
};

export default Map;
