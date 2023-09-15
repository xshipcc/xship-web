// @ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-09 20:12:31
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-15 10:39:50
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
import AwarenessRight from '@/components/Awareness/right';
import Awareness from '@/components/Awareness/left';
import Analysis from '@/components/Analysis/left';
import AnalysisRight from '@/components/Analysis/right';
import AnalysisCenter from '@/components/Analysis/center';
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

    // addTiffImageryLayer(viewer, '/srctiff');

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
  }, []);

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
        return (
          <>
            <div className={styles.awarenesstimeLine} />;
            <Row className={styles.content}>
              <Col span={5} className={styles.awarenessleft}>
                <Awareness />;
              </Col>
              <Col span={5} offset={14} className={styles.right}>
                <AwarenessRight />;
              </Col>
            </Row>
          </>
        );
      case 'Monitor':
        return (
          <>
            <div className={styles.monitortimeLine} />;
            <Row>
              <Col span={24} className={styles.monitorContent}>
                <Monitor />;
              </Col>
            </Row>
          </>
        );
      case 'Routemark':
        return (
          <Row className={styles.content}>
            {/* <Col span={19} className={styles.timeline}>
            1111
          </Col> */}
            <Col span={5} offset={19} className={styles.left}>
              <Routemark />;
            </Col>
          </Row>
        );
      default:
        return (
          <Row className={styles.content}>
            <Col span={5} className={styles.left}>
              <Analysis />;
            </Col>
            <Col span={12} offset={1} className={styles.center}>
              <AnalysisCenter />;
            </Col>
            <Col span={5} offset={1} className={styles.right}>
              <AnalysisRight />;
            </Col>
          </Row>
        );
    }
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
            统计分析
          </Button>
          <Button
            type="text"
            className={styles.button}
            onClick={() => {
              ShowComponent('Awareness');
            }}
          >
            态势感知
          </Button>
          <Button
            type="text"
            className={styles.button}
            onClick={() => {
              ShowComponent('Monitor');
            }}
          >
            监控查看
          </Button>
          <Button
            type="text"
            className={styles.button}
            onClick={() => {
              ShowComponent('Routemark');
            }}
          >
            路径规划
          </Button>
        </Col>
      </Row>
      {/* header */}
      {/* content */}
      {renderComponent()}
      {/* content */}
    </div>
  );
};

export default React.memo(Dashboard);
