// @ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-09 20:12:31
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-13 20:57:46
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
import { Button, Col, Row } from 'antd';
import Monitor from '@/components/Monitor';
import Routemark from '@/components/Routemark';
import Awareness from '@/components/Awareness';
import Analysis from '@/components/Analysis';

const Dashboard: React.FC = () => {
  //#region    -----------------------------------------------------------------------
  /**
   *  @file dashboard.tsx
   *  @time 2023/09/13
   * @category :
   * @function :
   */

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const getNewDate = () => {
    const timeStamp = new Date();
    const year = timeStamp.getFullYear(); //年
    const month = timeStamp.getMonth() + 1; //月
    const day = timeStamp.getDate(); //日
    const hour = timeStamp.getHours(); //时
    const minutes = timeStamp.getMinutes(); //分
    const s = timeStamp.getSeconds(); //秒
    const seconds = s <= 9 ? '0' + s : s;
    const d = year + '年' + month + '月' + day + '日';
    const t = hour + ':' + minutes + ':' + seconds;
    setDate(d);
    setTime(t);
  };
  setInterval(getNewDate, 1000);

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------

  //#region    -----------------------------------------------------------------------
  /**
   *  @file dashboard.tsx
   *  @time 2023/09/13
   * @category :
   * @function :
   */
  const divRef = useRef<HTMLDivElement>(null);

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

  // useEffect(() => {
  //   addTiffImageryLayer(viewer.current as Cesium.Viewer, '/luquan.tif');
  // }, []);
  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------

  //#region    -----------------------------------------------------------------------
  /**
   *  @file dashboard.tsx
   *  @time 2023/09/13
   * @category :
   * @function :
   */
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
  const renderComponentLeft = () => {
    // switch (componets) {
    //   case 'Awareness':
    //     return <Awareness />;
    //   case 'Monitor':
    //     return <Monitor />;
    //   case 'Routemark':
    //     return <Routemark />;
    //   default:
    //     return <Analysis />;
    // }
  };

  /**
   * @end
   */
  //#endregion -----------------------------------------------------------------------

  return (
    <div className={styles.screen}>
      {/* map  */}
      <div ref={divRef} className={styles.map} />
      {/* map  */}
      {/* time */}
      <div className={styles.date}>{date}</div>
      <div className={styles.time}>{time}</div>
      {/* home */}
      <div className={styles.home} />
      <div className={styles.logo} />
      {/* time */}
      {/* header */}
      <Row className={styles.header}>
        {/* <Col span={1} className={styles.logo} /> */}
        <Col span={4} offset={1} className={styles.text}>
          {/* <div className={styles.text}> */}
          <p className={styles.textbig}>无人机自动巡检系统</p>
          <p className={styles.textsmall}>UAV Automated Inspection System</p>
          {/* </div> */}
        </Col>
        <Col span={19} className={styles.rightheader}>
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
        </Col>
      </Row>
      {/* header */}
      {/* content */}
      <Row className={styles.content} gutter={[0, 200]}>
        <Col span={5} className={styles.left}>
          {renderComponent()}
        </Col>
        <Col span={5} offset={14} className={styles.right}>
          无人机自动巡检系统
        </Col>
      </Row>
      {/* content */}
    </div>
  );
};

export default React.memo(Dashboard);
