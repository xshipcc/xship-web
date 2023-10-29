// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react';
import * as Cesium from 'cesium';
import styles from './index.less';
import 'cesium/Source/Widgets/widgets.css';
import type { Alert } from '../../typings';
import * as mqtt from 'mqtt';
import Track from '../../../../utils/js/track';
import Tool from '@/utils/js/measure/measureTool';
import { useSelector, useDispatch } from 'umi';

const clientId = 'mapAlert' + Math.random().toString(16).substring(2, 8);
const username = 'emqx_test';
const password = 'emqx_test';

const client = mqtt.connect(WS_MQTT_URL, {
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
  mqttSub({ topic: 'uav', qos: 0 });
}, 2000);

const Map: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const viewer = useRef(null);
  const trackCahe = useRef(null);
  const [DroneData, setDroneData] = useState([
    {
      speed: 0,
      lat: 0,
      lon: 0,
      height: 0,
      target_angle: 0,
    },
  ]);
  const MeasureTools = useRef(null);
  const dispatch = useDispatch();
  const trackList = useSelector((state: any) => state.trackModel.trackList);
  const editSignal = useSelector((state: any) => state.trackModel.editSignal);
  const destoryTackSignal = useSelector((state: any) => state.trackModel.destoryTackSignal);
  // const alertData: ListAlertHistoryData = useSelector((state: any) => state.trackModel.alertData);
  const initFlyData = useSelector((state: any) => state.dashboardModel.currentFlyData);
  const [coords, setCoords] = useState(null);

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
    // MeasureTools.current = new S_Measure(viewer); //测量类
    MeasureTools.current = new Tool(viewer.current);
    // util.setCameraView(
    //   {
    //     x: 114.40856,
    //     y: 38.03867,
    //     z: 2000.56,
    //     heading: 270.31730998394744,
    //     pitch: -20.72609786048885,
    //     roll: 0.97907544797624,
    //     duration: 0,
    //   },
    //   viewer.current,
    // );
    // // tiff数据加载
    // // addTiffImageryLayer(viewer, '/srctiff');
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
  useEffect(() => {
    if (editRoadSignal) {
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
            console.log('.then -> trackPosition:', trackPosition);
            // dispatch({
            //   type: 'trackModel/saveTrackList',
            //   payload: trackPosition,
            // });
            // TODO 设置当前路径
            dispatch({
              type: 'dashboardModel/saveCurrentRoad',
              payload: trackPosition,
            });
          })
          .catch((error) => {
            console.error('发生错误:', error);
            // 在这里处理错误
          });

        return null;
      };
      // 调用
      start({
        name: '空间距离',
        type: '1',
        unitType: 'dis',
      });
    }

    // if (!editRoadSignal) {
    //   MeasureTools.current.clear();
    // }
  }, [editRoadSignal]);

  // 路线展示

  /** @type {*} 当前路线数据*/
  const roadData = useSelector((state: any) => state.dashboardModel.currentRoad);

  useEffect(() => {
    console.log('roadData:', roadData);
    if (roadData?.length > 0) {
    }

    // 飞行模拟数据
  }, [roadData]);

  //#endregion -----------------------------------------------------------------------
  /**
   * @end
   */

  // 菜单相关信号切换
  useEffect(() => {
    viewer.current.entities.removeAll();
    viewer.current.dataSources.removeAll();
  }, [destoryTackSignal]);
  useEffect(() => {
    if (editSignal[0]) {
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
            dispatch({
              type: 'trackModel/saveTrackList',
              payload: trackPosition,
            });
            // console.log('trackPosition:', trackPosition);
            // 在这里处理 trackPosition 的值
            dispatch({
              type: 'trackModel/saveEntities',
              payload: viewer.current.entities,
            });
          })
          .catch((error) => {
            console.error('发生错误:', error);
            // 在这里处理错误
          });
        console.log(
          'start -> MeasureTools.current.trackPosition:',
          MeasureTools.current.trackPosition,
        );
        return MeasureTools.current.trackPosition;
      };
      // 调用
      start({
        name: '空间距离',
        type: '1',
        unitType: 'dis',
      });
    }
    if (editSignal[1]) {
      MeasureTools.current.clear();
    }
  }, [editSignal]);
  // 添加告警信息到场景
  useEffect(() => {
    client.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'alert') {
        const demo: Alert = JSON.parse(mqttMessage);
        let image;
        switch (demo.type) {
          case 0:
            image = '/alert/alert.png';
            break;
          case 1:
            image = '/alert/animal.png';
            break;
          case 2:
            image = '/alert/car.png';
            break;
          case 3:
            image = '/alert/group.png';
            break;
          case 4:
            image = '/alert/invade.png';
            break;
          case 5:
            image = '/alert/people.png';
            break;
          default:
            image = '/alert/alert.png';
            break;
        }
        //绘制图片
        const billboard = new Cesium.Entity({
          position: Cesium.Cartesian3.fromDegrees(demo.lon, demo.lat, demo.alt),
          // position: Cesium.Cartesian3.fromDegrees(114.40856, 38.03867, 2000.56),
          billboard: {
            image: image,
            width: 30, //图片宽度,单位px
            height: 30, //图片高度，单位px
            eyeOffset: new Cesium.Cartesian3(0, 0, -10), //与坐标位置的偏移距离
            color: Cesium.Color.RED, //颜色
            scale: 1, //缩放比例
          },
        });
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
        viewer.current.entities.add(billboard);
      }
    });

    // viewer.current.entities.add(billboard);
    // setTimeout(() => {
    //   util.setCameraView(
    //     {
    //       x: demo.lon,
    //       y: demo.lat,
    //       z: demo.alt,
    //       heading: 270.31730998394744,
    //       pitch: -20.72609786048885,
    //       roll: 0.97907544797624,
    //       duration: 0,
    //     },
    //     viewer.current,
    //   );
    //   viewer.current.entities.add(billboard);
    // }, 10000);
  }, []);
  // 无人机位置实时更新
  useEffect(() => {
    const point = new Cesium.Entity({
      position: Cesium.Cartesian3.fromDegrees(114.33919146 + 0.0057, 38.07525226 + 0.0011, 133.45),
      // point: point_options,
      model: {
        // 模型路径
        uri: '/air.glb',
        // 模型最小刻度
        minimumPixelSize: 64,
        maximumSize: 128,
        // 设置模型最大放大大小
        maximumScale: 200,
        // 模型是否可见
        show: true,
        // 模型轮廓颜色
        silhouetteColor: Cesium.Color.WHITE,
        // 模型颜色  ，这里可以设置颜色的变化
        // color: color,
        // 仅用于调试，显示魔仙绘制时的线框
        debugWireframe: false,
        // 仅用于调试。显示模型绘制时的边界球。
        debugShowBoundingVolume: false,
        scale: 200,
        runAnimations: false, // 是否运行模型中的动画效果(由于我的模型是不会动所以就很呆哈哈哈)
      },
    });

    viewer.current.entities.add(point);
    // viewer.current.scene.camera.setView({
    //   destination: new Cesium.Cartesian3.fromDegrees(114.40856, 38.03867, 20.56), // 目标位置
    //   orientation: {
    //     heading: 180, // 水平角度，正东方向为0
    //     pitch: 0, // 俯仰角度
    //     roll: 0, // 翻滚角度
    //   },
    // });
    // 创建一个距离变换

    viewer.current.trackedEntity = point;

    //     heading: 270.31730998394744,
    // pitch: -20.72609786048885,
    // roll: 0.97907544797624,
    const originPosition = point._position.getValue(viewer.current.clock.currentTime);
    console.log('useEffect -> originPosition:', originPosition);
    function updatePosition(coord) {
      // console.log('updatePosition -> coord:', coord);
      // console.log('updatePosition -> originPosition:', originPosition);
      const Degrees = Cesium.Cartesian3.fromDegrees(
        coord.lon + 0.0062,
        coord.lat + 0.0019,
        coord.height,
      );
      console.log('updatePosition -> Degrees:', Degrees);
      originPosition.x = Degrees.x;
      originPosition.y = Degrees.y;
      originPosition.z = Degrees.z;
      // originPosition.x += 10;
      // originPosition.y += 10;
      // originPosition.z = Degrees.z;
    }
    // function updatePosition(coord) {
    //   originPosition.x += 10;
    //   originPosition.y += 10;
    //   originPosition.z += 10;
    // }

    point._position = new Cesium.CallbackProperty(function () {
      return originPosition;
    }, false);

    // setInterval(() => {
    //   updatePosition();
    // }, 200);

    client.on('message', (topic: string, mqttMessage: any) => {
      if (topic === 'uav') {
        // const jsonObject = JSON.parse(mqttMessage);
        const jsonObject = JSON.parse(mqttMessage);
        console.log('client.111 -> jsonObject:', jsonObject);
        if (jsonObject?.lat && jsonObject?.lon && jsonObject?.height) {
          updatePosition(jsonObject);
        }
        if (trackCahe.current) {
          setDroneData([...trackCahe.current, JSON.parse(mqttMessage)]);
        }
      }
    });
  }, []);
  useEffect(() => {
    if (editSignal[1]) {
      const coordsTemp = initFlyData?.data.map((item, index) => {
        // 解析 coord 字符串为数组
        const coordArray = JSON.parse(item.coord);
        return {
          shootId: index,
          aircraftAltitude: coordArray[2],
          aircraftLatitude: coordArray[1],
          aircraftLongitude: coordArray[0],
          gimbalPitchValue: -34.86589, // 无人机云台俯仰角
          gimbalYawValue: -143.699,
          isShoot: false,
        };
      });
      setCoords(coordsTemp);
      trackCahe.current = coordsTemp;
      dispatch({
        type: 'trackModel/changeEditSignal',
        payload: [false, false],
      });
    }
  }, [initFlyData]);
  useEffect(() => {
    /**
     * @param {*} viewer
     * @param {*} options.speed 速度m/s
     * @param {*} options.stayTime 拍摄点等待时间
     * @param {*} options.Lines  点集合
     * @param {*} options.frustumFar  视锥长度
     * @param {*} options.shootCallback  拍摄点回调函数返回isShoot为true的shootId
     * @memberof Track
     */
    if (coords?.length > 0) {
      const roaming = new Track(viewer.current, {
        rt: false,
        Lines: coords,
        stayTime: 1,
        speed: 3,
        frustumFar: 10,
        shootCallback: function (shootId) {
          console.log(shootId);
        },
      });
      setTimeout(function () {
        /**
         *航迹模拟开始飞行
         * @memberof roaming.StartFlying()
         */
        setCoords([]);
        const b = [
          {
            shootId: 1, // 拍摄点ID
            aircraftAltitude: 294.4321622812281, // 无人机高度
            aircraftLatitude: 29.332291372123606, // 无人机纬度
            aircraftLongitude: 106.3275423851136, // 无人机经度
            gimbalPitchValue: -34.86589098646805, // 无人机云台俯仰角
            gimbalYawValue: -141.52559172027878, // 无人机云台偏航角
            isShoot: false, // 是否为拍摄点
          },
          {
            shootId: 2,
            aircraftAltitude: 296.4321622812281,
            aircraftLatitude: 29.33218636728018,
            aircraftLongitude: 106.3274449132526,
            gimbalPitchValue: -29.77056379217234,
            gimbalYawValue: -141.52559171972544,
            isShoot: true,
          },
          {
            shootId: 3,
            aircraftAltitude: 296.4321622812281,
            aircraftLatitude: 29.332086291515342,
            aircraftLongitude: 106.32743456106668,
            gimbalPitchValue: -49.79999923706055,
            gimbalYawValue: -143.6999969482422,
            isShoot: true,
          },
          {
            shootId: 4,
            aircraftAltitude: 273.1146622812281,
            aircraftLatitude: 29.3320829466482,
            aircraftLongitude: 106.32743569795478,
            gimbalPitchValue: 0,
            gimbalYawValue: -96.52559172238325,
            isShoot: true,
          },
        ];

        roaming.StartFlying();
        roaming.TrackPath(coords, false);
        // setTimeout(() => {
        //   // roaming.StartFlying(b);
        //   // roaming.TrackPath([...coords, ...b], true);
        //   // console.log(1111111);
        // }, 3000);
        /**
         *航迹模拟的暂停和继续
         *
         * @param {*} state bool类型 false为暂停，ture为继续
         * @memberof roaming.PauseOrContinue(state)
         */
        //roaming.PauseOrContinue(true)//false为暂停，ture为继续
        /**
         *改变飞行的速度
         *
         * @param {*} value  整数类型 建议（1-20）
         * @memberof roaming.ChangeRoamingSpeed(value)
         */
        roaming.ChangeRoamingSpeed(4);
        /**
         * 改变观看角度
         *
         * @param {*} name string
         *
         * ViewTopDown:顶视图
         * ViewSide ：正视图
         * trackedEntity：跟随模型
         *
         * @memberof ChangePerspective(name)
         */
        // roaming.ChangePerspective('trackedEntity');
        /**
         *取消航迹模拟
         *
         * @memberof roaming.EndRoaming()
         */
        // roaming.EndRoaming();
      }, 1000);
    }

    // 飞行模拟数据
  }, [coords]);

  return (
    <>
      <div ref={divRef} className={styles.map} id="cesiumContainer" />
    </>
  );
};

export default Map;
