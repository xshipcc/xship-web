// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react';
import * as Cesium from 'cesium';
import styles from './index.less';
import 'cesium/Source/Widgets/widgets.css';
import type { Alert } from '../../typings';
import * as mqtt from 'mqtt';
// import Track from '../../../../utils/js/track';
import Road from '../../../../utils/js/road';
import Tool from '@/utils/js/measure/measureTool';
import { useSelector, useDispatch } from 'umi';
import { message } from 'antd';
import type { ListAlertHistoryData } from '@/pages/AIalert/data';

const clientId = 'mapAlert' + Math.random().toString(16).substring(2, 8);
const username = 'emqx_test';
const password = 'emqx_test';
// const url = window.location.href;
const url = window.location.href;
const startIndex = url.indexOf('://') + 3;
const endIndex =
  url.indexOf(':', startIndex) !== -1 ? url.indexOf(':', startIndex) : url.indexOf('/', startIndex);
const extractedUrl = url.substring(startIndex, endIndex);

//TODO   替换
// const mqttUrl = 'ws://' + '192.168.2.213' + ':' + MQTT_PORT;
const mqttUrl = 'ws://' + extractedUrl + ':' + MQTT_PORT;

// console.log('location:', mqttUrl);
console.log('location.herf:', window.location.href);

const client = mqtt.connect(mqttUrl, {
  clientId,
  username,
  password,
});
const mqttSub = (subscription: { topic: any; qos: any }) => {
  if (client) {
    const { topic, qos } = subscription;
    client.subscribe(topic, { qos }, (error) => {
      if (error) {
        console.log('Subscribe to topics error', error);
        return;
      }
      console.log(`Subscribe to topics: ${topic}`);
    });
  }
};

mqttSub({ topic: 'alert', qos: 0 });
setTimeout(() => {
  mqttSub({ topic: 'info', qos: 0 });
}, 2000);

const Map: React.FC = () => {
  const dispatch = useDispatch();
  const divRef = useRef<HTMLDivElement>(null);
  const viewer = useRef(null);
  const MeasureTools = useRef(null);

  // 场景初始化
  useEffect(() => {
    viewer.current = new Cesium.Viewer(divRef.current as Element, {
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
      terrainProvider: new Cesium.CesiumTerrainProvider({
        // url: 'http://ai.javodata.com/terrain',
        url: MAP_TERRAIN_URL, // 地址记得换成自己的地形数据地址
        requestWaterMask: true, // 开启法向量
        requestVertexNormals: true, // 开启水面特效
      }),
      imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: MAP_TILES_URL,
        // url: 'http://ai.javodata.com/luquantile/{z}/{x}/{y}.png',
        fileExtension: 'png',
      }),
    });

    viewer.current.scene.screenSpaceCameraController.maximumZoomDistance = 20000;
    viewer.current.scene.screenSpaceCameraController.minimumZoomDistance = 100;
    viewer.current.scene.screenSpaceCameraController._minimumZoomRate = 5000; // 设置相机缩小时的速率
    viewer.current.scene.screenSpaceCameraController._maximumZoomRate = 5000; //设置相机放大时的速率
    viewer.current._cesiumWidget._creditContainer.style.display = 'none';
    MeasureTools.current = new Tool(viewer.current);

    /**
     *  @file index.tsx
     *  @time 2023/09/21
     * @category :
     * @function :
     */
    //#region -------------------------------------------------------------------------
  }, []);

  /**
   *  @file index.tsx
   *  @time 2023/10/27
   * @category :航线编辑和展示
   * @function :
   */
  //#region -------------------------------------------------------------------------
  const editRoadSignal = useSelector((state: any) => state.dashboardModel.editRoadSignal);
  const editPointSignal = useSelector((state: any) => state.dashboardModel.editPointSignal);
  // 编辑路线
  useEffect(() => {
    const start = (item: any) => {
      console.log('start -> item:', item);
      if (!MeasureTools.current) return;
      if (MeasureTools.current.nowDrawMeasureObj || MeasureTools.current.nowEditMeasureObj) {
        alert('请结束当前量算');
        return;
      }
      // 开始量算
      MeasureTools.current
        .start({
          type: item.type,
        })
        .then((trackPosition) => {
          if (trackPosition.length == 1) {
            console.log('.then -> trackPosition:', trackPosition);
            const currentPoint = {
              coord: trackPosition[0],
              speed: 5,
              time: 10,
              radius: 25,
              mode: '00', // "00=定点;01=环绕",
              direction: '00', //"00=逆时针;01=顺时针"
            };
            // currentPoint.coord = trackPosition[0];
            console.log('.then -> currentPoint:', currentPoint);
            dispatch({
              type: 'dashboardModel/saveCurrentPoint',
              payload: currentPoint,
            });
            // 结束编辑 坐标点
            dispatch({
              type: 'dashboardModel/changeEditPointSignal',
              payload: '2',
            });
          }
          if (trackPosition.length > 1) {
            trackPosition.splice(-2, 1);
            console.log('.then -> trackPosition:', trackPosition);
            dispatch({
              type: 'dashboardModel/saveCurrentRoad',
              payload: trackPosition,
            });
            dispatch({
              type: 'dashboardModel/changeEditRoadSignal',
              payload: false,
            });
            // dispatch({
            //   type: 'dashboardModel/changeEditRoadSignal',
            //   payload: false,
            // });
          }
        })
        .catch((error) => {
          console.error('发生错误:', error);
          // 在这里处理错误
        });

      return null;
    };
    // 路径绘制
    if (editRoadSignal) {
      viewer.current.entities.removeAll();
      viewer.current.dataSources.removeAll();
      // 调用
      start({
        name: '空间距离',
        type: '1',
        unitType: 'dis',
      });
      console.log('useEffect -> editPointSignal:', editPointSignal);
    }
    // 坐标点绘制
    if (editPointSignal == '1') {
      start({
        name: '坐标测量',
        type: '6',
        unitType: 'm',
      });
    }
  }, [editRoadSignal, editPointSignal]);

  // 路线展示

  /** @type {number[][]} 当前路线数据*/
  const roadData: number[][] = useSelector((state: any) => state.dashboardModel.currentRoad);
  const currentFlyingRoad: number[][] = useSelector(
    (state: any) => state.dashboardModel.currentFlyingRoad,
  );

  function isArrayWithSpecificFormat(arr) {
    if (!Array.isArray(arr)) {
      message.success('加载失败' + arr + '不是数组');

      // throw new Error('Input is not an array', arr);
      return false;
    }

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (typeof item !== 'object' || item === null) {
        message.success('加载失败' + item + '结构不正确');

        // throw new Error(`Item at index ${i} is not an object`, item);
        return false;
      }
      if (!item.hasOwnProperty('name') || !item.hasOwnProperty('coord')) {
        // throw new Error(`Item at index ${i} does not have "name" or "coord" properties`, item);
        message.success('加载失败' + item + '结构不正确');

        return false;
      }
      if (Array.isArray(item.coord) && item.coord.length === 3) {
        return true;
      }
    }
  }

  useEffect(() => {
    console.log('roadData:', roadData);
    console.log('currentFlyingRoad:', currentFlyingRoad);

    if (currentFlyingRoad?.length > 0) {
      const roaming = new Road(viewer.current, {
        // Lines: currentFlyingRoad,
      });
      if (isArrayWithSpecificFormat(currentFlyingRoad)) {
        viewer.current.dataSources.removeAll();
        roaming.TrackPath(currentFlyingRoad);
        message.success('加载成功');
      }
    }
    // 绘制飞行路径
  }, [currentFlyingRoad]);

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */

  // 菜单相关信号切换
  const currentComponent = useSelector((state: any) => state.dashboardModel.currentComponent);
  useEffect(() => {
    console.log('currentComponent:', currentComponent);
    viewer.current.scene.camera.setView({
      destination: new Cesium.Cartesian3.fromDegrees(
        114.33919146 + 0.0057,
        38.07525226 + 0.0011,
        1033.45,
      ), // 目标位置
      orientation: {
        heading: 0, // 水平角度，正东方向为0
        pitch: -0.3, // 俯仰角度
        roll: 0, // 翻滚角度
      },
    });
    if (currentComponent == 'Awareness') {
      console.log('useEffect -> currentComponent:', currentComponent);
      viewer.current.entities.removeAll();
      viewer.current.dataSources.removeAll();
    }
  }, [currentComponent]);
  // 视角归中
  const centering = useSelector((state: any) => state.dashboardModel.centering);
  useEffect(() => {
    console.log('currentComponent:', currentComponent);
    viewer.current.scene.camera.setView({
      destination: new Cesium.Cartesian3.fromDegrees(
        114.33919146 + 0.0057,
        38.07525226 + 0.0011,
        1033.45,
      ), // 目标位置
      orientation: {
        heading: 0, // 水平角度，正东方向为0
        pitch: -0.3, // 俯仰角度
        roll: 0, // 翻滚角度
      },
    });
  }, [centering]);

  const destoryTackSignal = useSelector((state: any) => state.dashboardModel.destoryTackSignal);
  useEffect(() => {
    viewer.current.entities.removeAll();
    viewer.current.dataSources.removeAll();
  }, [destoryTackSignal]);
  // 添加告警信息到场景
  useEffect(() => {
    // const alert = {
    //   id: 1,
    //   name: 'Alert Name',
    //   image: 'alert.jpg',
    //   type: 2,
    //   code: 'AL001',
    //   level: 3,
    //   count: 10,
    //   platform: 1,
    //   start_time: '2023-11-06 09:00:00',
    //   end_time: '2023-11-07 18:00:00',
    //   note: 'This is an alert',
    //   lat: 38.0865966192828,
    //   lon: 114.33264199360657,
    //   alt: 97.20427051352851,
    //   history_id: 101,
    //   confirm: 0,
    // };
    // console.log('useEffect -> alert:', JSON.stringify(alert));
    client.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'alert') {
        const demo: Alert = JSON.parse(mqttMessage);
        console.log('useEffect.on -> demo:', demo);
        let image;
        switch (demo.type) {
          case 0:
            image = '/alert/people.png';
            break;
          case 1:
            image = '/alert/bike.png';
            break;
          case 2:
            image = '/alert/car.png';
            break;
          case 3:
            image = '/alert/truck.png';
            break;
          case 4:
            image = '/alert/kache.png';
            break;
          case 5:
            image = '/alert/sanlun.png';
            break;
          case 6:
            image = '/alert/bus.png';
            break;
          case 7:
            image = '/alert/moto.png';
            break;
          case 8:
            image = '/alert/fire.png';
            break;
          case 9:
            image = '/alert/smoke.png';
            break;
          default:
            image = '/alert/alert.png';
            break;
        }

        const billboard = new Cesium.Entity({
          position: Cesium.Cartesian3.fromDegrees(demo.lon, demo.lat, demo.alt),
          // position: Cesium.Cartesian3.fromDegrees(114.40856, 38.03867, 2000.56),
          billboard: {
            image: image,
            width: 30, //图片宽度,单位px
            height: 30, //图片高度，单位px
            eyeOffset: new Cesium.Cartesian3(0, 0, -10), //与坐标位置的偏移距离
            scale: 1, //缩放比例
          },
          // billboard: {
          //   image: "/alertBackground.png",
          //   width: 30, //图片宽度,单位px
          //   height: 30, //图片高度，单位px
          //   eyeOffset: new Cesium.Cartesian3(0, 0, -10), //与坐标位置的偏移距离
          //   color: Cesium.Color.RED, //颜色
          //   scale: 1, //缩放比例
          // },
          label: {
            //文字标签
            text:
              '[' +
              demo.lat.toFixed(2) +
              ',' +
              demo.lon.toFixed(2) +
              ',' +
              demo.alt.toFixed(2) +
              ']',
            font: '800 25px sans-serif', // 15pt monospace
            scale: 0.5,
            style: Cesium.LabelStyle.FILL,
            fillColor: Cesium.Color.WHITE,
            pixelOffset: new Cesium.Cartesian2(0, 20), //偏移量
            showBackground: false,
            // backgroundColor: new this.Cesium.Color(26 / 255, 196 / 255, 228 / 255, 1.0)   //背景顔色
          },
        });

        viewer.current.entities.add(billboard);
      }
    });

    // viewer.current.entities.add(billboard);
    // setTimeout(() => {
    // util.setCameraView(
    //   {
    //     x: demo.lon,
    //     y: demo.lat,
    //     z: demo.alt,
    //     heading: 270.31730998394744,
    //     pitch: -20.72609786048885,
    //     roll: 0.97907544797624,
    //     duration: 0,
    //   },
    //   viewer.current,
    // );
    // viewer.current.entities.add(billboard);
    // }, 10000);
  }, []);

  const alertData: ListAlertHistoryData = useSelector(
    (state: any) => state.dashboardModel.alertData,
  );
  // 显示告警信息位置
  useEffect(() => {
    if (alertData.lon != 0 || alertData.lat != 0 || alertData.alt != 0) {
      const destination = Cesium.Cartesian3.fromDegrees(
        alertData.lon,
        alertData.lat,
        alertData.alt,
      );
      console.log('useEffect -> destination:', destination);
      // 设置导航模式为导航到指定位置
      viewer.current.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          alertData.lon,
          alertData.lat,
          alertData.alt + 500,
        ),
        maximumHeight: 2000,
        orientation: {
          // 指向
          heading: Cesium.Math.toRadians(90, 0),
          // 视角
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0,
        },
        duration: 1,
        // duration: 1000, // 导航持续时间,单位为毫秒
        // elevation: 1000, // 导航过程中相机的高度
        // heading: 0, // 导航过程中相机的主向量角度
        // pitch: 0, // 导航过程中相机的天向量角度
      });
    }
  }, [alertData]);
  const queryAlertData: ListAlertHistoryData = useSelector(
    (state: any) => state.dashboardModel.queryAlertData,
  );
  // 显示告警信息位置
  useEffect(() => {
    console.log('useEffect -> queryAlertData:', queryAlertData);
    //  { value: -1, label: '全部' },
    //     { value: 0, label: '行人' },
    //     { value: 1, label: '自行车' },
    //     { value: 2, label: '车辆' },
    //     { value: 3, label: '货车' },
    //     { value: 4, label: '卡车' },
    //     { value: 5, label: '三轮车' },
    //     { value: 6, label: '公交车' },
    //     { value: 7, label: '摩托车' },
    //     { value: 8, label: '火警' },
    //     { value: 9, label: '烟雾' },
    if (queryAlertData?.length > 0) {
      queryAlertData.forEach((element) => {
        let image;
        switch (element.type) {
          case 0:
            image = '/alert/people.png';
            break;
          case 1:
            image = '/alert/bike.png';
            break;
          case 2:
            image = '/alert/car.png';
            break;
          case 3:
            image = '/alert/truck.png';
            break;
          case 4:
            image = '/alert/kache.png';
            break;
          case 5:
            image = '/alert/sanlun.png';
            break;
          case 6:
            image = '/alert/bus.png';
            break;
          case 7:
            image = '/alert/moto.png';
            break;
          case 8:
            image = '/alert/fire.png';
            break;
          case 9:
            image = '/alert/smoke.png';
            break;
          default:
            image = '/alert/alert.png';
            break;
        }
        const billboard = new Cesium.Entity({
          name: 'alert', // 设置实体的唯一ID
          position: Cesium.Cartesian3.fromDegrees(element.lon, element.lat, element.alt),
          // position: Cesium.Cartesian3.fromDegrees(114.40856, 38.03867, 2000.56),
          billboard: {
            image: image,
            width: 30, //图片宽度,单位px
            height: 30, //图片高度，单位px
            eyeOffset: new Cesium.Cartesian3(0, 0, -10), //与坐标位置的偏移距离
            scale: 1, //缩放比例
          },
          // billboard: {
          //   image: "/alertBackground.png",
          //   width: 30, //图片宽度,单位px
          //   height: 30, //图片高度，单位px
          //   eyeOffset: new Cesium.Cartesian3(0, 0, -10), //与坐标位置的偏移距离
          //   color: Cesium.Color.RED, //颜色
          //   scale: 1, //缩放比例
          // },
          label: {
            //文字标签
            text:
              '[' +
              element.lat.toFixed(2) +
              ',' +
              element.lon.toFixed(2) +
              ',' +
              element.alt.toFixed(2) +
              ']',
            font: '800 25px sans-serif', // 15pt monospace
            scale: 0.5,
            style: Cesium.LabelStyle.FILL,
            fillColor: Cesium.Color.WHITE,
            pixelOffset: new Cesium.Cartesian2(0, 20), //偏移量
            showBackground: false,
            // backgroundColor: new this.Cesium.Color(26 / 255, 196 / 255, 228 / 255, 1.0)   //背景顔色
          },
        });
        viewer.current.entities.add(billboard);
      });
    }
    // 删除指定名称的实体
    const entities = viewer.current.entities.values;
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      if (entity.name === 'alert') {
        viewer.current.entities.remove(entity);
      }
    }
    // viewer.current.entities.removeById('alert');
  }, [queryAlertData]);

  const [showPlane, setShowPlane] = useState(false);

  // 无人机位置实时更新
  useEffect(() => {
    console.log(
      'useEffect -> viewer:',
      viewer.current.scene.camera.heading,
      viewer.current.scene.camera.pitch,
      viewer.current.scene.camera.roll,
    );
    // viewer.current.scene.camera.setView({
    //   destination: new Cesium.Cartesian3.fromDegrees(
    //     114.33919146 + 0.0057,
    //     38.07525226 + 0.0011,
    //     1033.45,
    //   ), // 目标位置
    //   orientation: {
    //     heading: 0, // 水平角度，正东方向为0
    //     pitch: -0.3, // 俯仰角度
    //     roll: 0, // 翻滚角度
    //   },
    // });

    if (currentComponent == 'Awareness' && showPlane) {
      console.log('useEffect -> currentComponent:', currentComponent);
      const point = new Cesium.Entity({
        position: Cesium.Cartesian3.fromDegrees(
          114.33919146 + 0.0057,
          38.07525226 + 0.0011,
          133.45,
        ),
        // point: point_options,
        model: {
          // 模型路径
          uri: '/air.glb',
          // 模型最小刻度
          minimumPixelSize: 64,
          maximumSize: 128,
          // 设置模型最大放大大小
          maximumScale: 100,
          // 模型是否可见
          show: true,
          // 仅用于调试，显示魔仙绘制时的线框
          debugWireframe: false,
          // 仅用于调试。显示模型绘制时的边界球。
          debugShowBoundingVolume: false,
          scale: 10000,
          runAnimations: false, // 是否运行模型中的动画效果(由于我的模型是不会动所以就很呆哈哈哈)
        },
      });

      viewer.current.entities.add(point);

      viewer.current.trackedEntity = point;

      //     heading: 270.31730998394744,
      // pitch: -20.72609786048885,
      // roll: 0.97907544797624,
      const originPosition = point._position.getValue(viewer.current.clock.currentTime);
      console.log('useEffect -> originPosition:', originPosition);
      function updatePosition(coord) {
        console.log('updatePosition -> coord:', coord);
        const Degrees = Cesium.Cartesian3.fromDegrees(
          coord.lon + 0.0062,
          coord.lat + 0.0019,
          coord.height,
        );
        console.log('updatePosition -> Degrees:', Degrees);
        originPosition.x = Degrees.x;
        originPosition.y = Degrees.y;
        originPosition.z = Degrees.z;
      }

      point._position = new Cesium.CallbackProperty(function () {
        return originPosition;
      }, false);

      client.on('message', (topic: string, mqttMessage: any) => {
        if (topic === 'info') {
          // 只有mqtt数据推送才实例化飞机
          if (showPlane!) {
            setShowPlane(true);
          }
          const jsonObject = JSON.parse(mqttMessage);
          console.log('1jsonObject:', jsonObject);
          if (jsonObject.type != 'drone') return;
          console.log('1jsonObject:', jsonObject);
          updatePosition(jsonObject.data);
        }
      });
    }
    client.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'info') {
        // 只有mqtt数据推送才实例化飞机
        setShowPlane(true);
      }
    });
  }, [currentComponent, editRoadSignal, showPlane]);

  return (
    <>
      <div ref={divRef} className={styles.map} id="cesiumContainer" />
    </>
  );
};

export default Map;
