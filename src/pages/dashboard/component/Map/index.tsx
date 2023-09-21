// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react';
import * as Cesium from 'cesium';
import styles from './index.less';
import 'cesium/Source/Widgets/widgets.css';
import { Button } from 'antd';
import util from '@/utils/js/util';
import Track from '../../../../utils/js/track';
import TIFFImageryProvider from 'tiff-imagery-provider';
import Tool from '@/utils/js/measure/measureTool';
import S_Measure from '@/utils/js/measure';
const Map: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file dashboard.tsx
   *  @time 2023/09/13
   * @category :cesium相关功能
   * @function :
   */
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
  const divRef = useRef<HTMLDivElement>(null);
  const MeasureTools = useRef(null);

  useEffect(() => {
    // const viewer = new Cesium.Viewer(divRef.current as Element, {
    //   imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
    //     url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
    //   }),
    //   terrainProvider: new Cesium.CesiumTerrainProvider({
    //     url: 'http://data.marsgis.cn/terrain',
    //   }),
    //   animation: false, // 设置动画小组件关闭展示
    //   timeline: false, // 时间轴关闭展示
    //   infoBox: false, // 信息盒子关闭展示
    //   geocoder: false, // 地理编码搜索关闭展示
    //   baseLayerPicker: false, // 基础图层选择器关闭展示
    //   sceneModePicker: false, // 场景选择器关闭展示
    //   fullscreenButton: false, // 全屏按钮关闭展示
    //   navigationInstructionsInitiallyVisible: false, // 导航说明是否最初展示
    //   navigationHelpButton: false, // 导航帮助按钮关闭展示
    //   homeButton: false,
    // });

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
      animation: false, //是否显示动画控
      imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: 'http://localhost:8080/luquan17/{z}/{x}/{y}.png',
        fileExtension: 'png',
      }),
      terrainProvider: new Cesium.CesiumTerrainProvider({
        url: 'http://localhost:8080/terrain38', // 地址记得换成自己的地形数据地址
        requestWaterMask: true, // 开启法向量
        requestVertexNormals: true, // 开启水面特效
      }),
    });
    viewer.scene.screenSpaceCameraController.maximumZoomDistance = 20000;
    viewer.scene.screenSpaceCameraController.minimumZoomDistance = 100;
    viewer.scene.screenSpaceCameraController._minimumZoomRate = 5000; // 设置相机缩小时的速率
    viewer.scene.screenSpaceCameraController._maximumZoomRate = 5000; //设置相机放大时的速率
    viewer._cesiumWidget._creditContainer.style.display = 'none';
    MeasureTools.current = new S_Measure(viewer); //测量类

    // 测量
    util.setCameraView(
      {
        x: 114.2937,
        y: 38.06337,
        z: 55533.08874146516,
        heading: 359.31730998394744,
        pitch: -55.72609786048885,
        roll: 359.97907544797624,
        duration: 0,
      },
      viewer,
    );

    // // tiff数据加载
    // // addTiffImageryLayer(viewer, '/srctiff');

    /**
     *  @file index.tsx
     *  @time 2023/09/21
     * @category :
     * @function :
     */
    //#region -------------------------------------------------------------------------

    // const b = [
    //   {
    //     shootId: 1, // 拍摄点ID
    //     aircraftAltitude: 294.4321622812281, // 无人机高度
    //     aircraftLatitude: 38.06337, // 无人机纬度
    //     aircraftLongitude: 114.2937, // 无人机经度
    //     gimbalPitchValue: -34.86589098646805, // 无人机云台俯仰角
    //     gimbalYawValue: -141.52559172027878, // 无人机云台偏航角
    //     isShoot: false, // 是否为拍摄点
    //   },
    //   {
    //     shootId: 2,
    //     aircraftAltitude: 296.4321622812281,
    //     aircraftLatitude: 38.073379,
    //     aircraftLongitude: 114.39379,
    //     gimbalPitchValue: -29.77056379217234,
    //     gimbalYawValue: -141.52559171972544,
    //     isShoot: false,
    //   },
    //   {
    //     shootId: 3,
    //     aircraftAltitude: 296.4321622812281,
    //     aircraftLatitude: 38.0633799,
    //     aircraftLongitude: 114.293799,
    //     gimbalPitchValue: -49.79999923706055,
    //     gimbalYawValue: -143.6999969482422,
    //     isShoot: true,
    //   },
    //   {
    //     shootId: 4,
    //     aircraftAltitude: 273.1146622812281,
    //     aircraftLatitude: 38.06337999,
    //     aircraftLongitude: 114.2937999,
    //     gimbalPitchValue: 0,
    //     gimbalYawValue: -96.52559172238325,
    //     isShoot: true,
    //   },
    // ];

    // /**
    //  * @param {*} viewer
    //  * @param {*} options.speed 速度m/s
    //  * @param {*} options.stayTime 拍摄点等待时间
    //  * @param {*} options.Lines  点集合
    //  * @param {*} options.frustumFar  视锥长度
    //  * @param {*} options.shootCallback  拍摄点回调函数返回isShoot为true的shootId
    //  * @memberof Track
    //  */
    // const roaming = new Track(viewer, {
    //   Lines: b,
    //   stayTime: 1,
    //   speed: 3,
    //   frustumFar: 10,
    //   shootCallback: function (shootId) {
    //     console.log(shootId);
    //   },
    // });

    // setTimeout(function () {
    //   /**
    //    *航迹模拟开始飞行
    //    * @memberof roaming.StartFlying()
    //    */

    //   roaming.StartFlying();

    //   /**
    //    *航迹模拟的暂停和继续
    //    *
    //    * @param {*} state bool类型 false为暂停，ture为继续
    //    * @memberof roaming.PauseOrContinue(state)
    //    */

    //   //roaming.PauseOrContinue(true)//false为暂停，ture为继续

    //   /**
    //    *改变飞行的速度
    //    *
    //    * @param {*} value  整数类型 建议（1-20）
    //    * @memberof roaming.ChangeRoamingSpeed(value)
    //    */

    //   roaming.ChangeRoamingSpeed(5);

    //   /**
    //    * 改变观看角度
    //    *
    //    * @param {*} name string
    //    *
    //    * ViewTopDown:顶视图
    //    * ViewSide ：正视图
    //    * trackedEntity：跟随模型
    //    *
    //    * @memberof ChangePerspective(name)
    //    */

    //   // roaming.ChangePerspective('trackedEntity');

    //   /**
    //    *取消航迹模拟
    //    *
    //    * @memberof roaming.EndRoaming()
    //    */

    //   // roaming.EndRoaming();
    // }, 10000);

    //#endregion -----------------------------------------------------------------------
    /**
     * @end
     */
  }, []);

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------

  return (
    <>
      <Button
        className={styles.button}
        type="text"
        onClick={() => {
          MeasureTools.current.measurePolyLine(function () {
            //测量完成回调函数
          }); //直线距离量测
        }}
      >
        空间距离
      </Button>
      <Button
        type="text"
        className={styles.button1}
        onClick={() => {
          MeasureTools.current.measureHeight(function () {
            //测量完成回调函数
          }); //直线距离量测
        }}
      >
        高度
      </Button>
      <Button
        type="text"
        className={styles.button2}
        onClick={() => {
          MeasureTools.current.measurePolyLine(function () {
            //测量完成回调函数
          }); //直线距离量测
        }}
      >
        三角测量
      </Button>
      <Button
        className={styles.button3}
        type="text"
        onClick={() => {
          MeasureTools.current.measurePolygon(function () {
            //测量完成回调函数
          }); //直线距离量测
        }}
      >
        面积测量
      </Button>
      <Button
        className={styles.button4}
        type="text"
        onClick={() => {
          MeasureTools.current.destroy(function () {
            //测量完成回调函数
          }); //清除量算结果
        }}
      >
        清除
      </Button>
      <div ref={divRef} className={styles.map} id="cesiumContainer" />
    </>
  );
};

export default Map;
