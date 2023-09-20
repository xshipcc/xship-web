// @ts-nocheck

import React, { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import styles from './index.less';
import 'cesium/Source/Widgets/widgets.css';
// import TIFFImageryProvider from 'tiff-imagery-provider';
// import CesiumNavigation from 'cesium-navigation-es6';

const Map: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file dashboard.tsx
   *  @time 2023/09/13
   * @category :cesium相关功能
   * @function :
   */
  const divRef = useRef<HTMLDivElement>(null);

  // const addTiffImageryLayer = async (viewerInstance: Cesium.Viewer, url: string): Promise<void> => {
  //   try {
  //     const provider: any = await TIFFImageryProvider.fromUrl(url, {
  //       enablePickFeatures: true,
  //       projFunc: (code) => {
  //         if (![4326, 3857, 900913].includes(code)) {
  //           try {
  //             const prj = proj4('EPSG:4326', `EPSG:${code}`);
  //             if (prj)
  //               return {
  //                 project: prj.forward,
  //                 unproject: prj.inverse,
  //               };
  //           } catch (e) {
  //             console.error(e);
  //           }
  //         }
  //         return undefined;
  //       },
  //     });

  //     const imageryLayer = viewerInstance.imageryLayers.addImageryProvider(provider);
  //     await viewerInstance.flyTo(imageryLayer, {
  //       duration: 1,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  useEffect(() => {
    const viewer = new Cesium.Viewer(divRef.current as Element, {
      animation: false, //是否显示动画控件

      baseLayerPicker: true, //是否显示图层选择控件

      geocoder: true,

      timeline: false,

      sceneModePicker: true,

      navigationHelpButton: false,

      infoBox: true,

      imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: 'http://localhost:8080/luquantiles/{z}/{x}/{y}.png',
        fileExtension: 'png',
      }),
    });
    // var viewer = new Cesium.Viewer('cesiumContainer');
    // viewer._cesiumWidget._creditContainer.style.display = 'none';

    // tiff数据加载
    // addTiffImageryLayer(viewer, '/srctiff');

    // viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
    //   url: ' http://localhost:8080/terrain38', // 地址记得换成自己的地形数据地址
    //   requestWaterMask: true, // 开启法向量
    //   requestVertexNormals: true, // 开启水面特效
    // });
    // const targetPosition = Cesium.Cartesian3.fromDegrees(114.7586, 38.97852);
    // viewer.camera.flyTo({
    //   destination: targetPosition,
    // });
    //无人机实体
    // const dronePromise = Cesium.CzmlDataSource.load(' /czml');
    // // console.log('onMounted -> dronePromise:', dronePromise);
    // dronePromise.then((dataSource) => {
    //   viewer.dataSources.add(dataSource);
    //   const drone = dataSource.entities.getById('Aircraft/Aircraft1');
    //   // console.log('dronePromise.then -> drone:', drone);
    //   drone.model = {
    //     uri: 'src/assets/SampleData/Models/CesiumDrone.gltf',
    //     minimumPixelSize: 128,
    //     maximumScale: 1000,
    //     silhouetteColor: Cesium.Color.WHITE,
    //     silhouetteSize: 2,
    //   };
    //   console.log('dronePromise.then ->  drone.model:', drone.model);
    //   drone.orientation = new Cesium.VelocityOrientationProperty(drone.position);
    //   drone.viewFrom = new Cesium.Cartesian3(0, -30, 30);
    //   viewer.clock.shouldAnimate = true;
    // });
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
      <div ref={divRef} className={styles.map} id="cesiumContainer" />
    </>
  );
};

export default Map;
