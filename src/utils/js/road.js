/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-27 14:41:11
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-29 21:32:38
 * @FilePath: \zero-admin-ui-master\src\utils\js\road.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import * as Cesium from 'cesium';
class Road {
  constructor(viewer, options) {
    this.viewer = viewer;
    this.Lines = options.Lines;
    this.dataSource;
    // this.RoamingSpeed
  }
  createLabel(c, text) {
    // if (!c) return;
    // console.log('BaseMeasure -> createLabel -> c:', c);
    // this.viewer.entities.add({
    //   position: c,
    //   billboard: {
    //     image: '/poi.png', // 指定图片的路径
    //     scale: 0.2, // 图片的缩放比例，默认为 1.0
    //     disableDepthTestDistance: Number.POSITIVE_INFINITY, // 确保图像在其他对象之上
    //     verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 设置垂直对齐方式，使图像底部与 position 对应
    //     pixelOffset: new Cesium.Cartesian2(0, -40), // 可选，指定像素偏移量
    //   },
    // });
    return this.viewer.entities.add({
      position: c,
      label: {
        text: text || '',
        font: '18px Helvetica',
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        pixelOffset: new Cesium.Cartesian2(0, -20),
      },
    });
  }

  TrackPath(Lines) {
    console.log('Track -> TrackPath -> Lines:', Lines);
    var lins = [];
    this.dataSource = new Cesium.CustomDataSource('TrackPath');
    for (let i = 0; i < Lines.length; i++) {
      let LinesIndex = new Cesium.Cartesian3.fromDegrees(
        Lines[i].aircraftLongitude,
        Lines[i].aircraftLatitude,
        Lines[i].aircraftAltitude,
      );
      this.dataSource.entities.add({
        position: LinesIndex,
        point: {
          pixelSize: 8,
          color: Cesium.Color.RED,
        },
      });
      lins.push(Lines[i].aircraftLongitude);
      lins.push(Lines[i].aircraftLatitude);
      lins.push(Lines[i].aircraftAltitude);
    }

    this.dataSource.entities.add({
      polyline: {
        positions: new Cesium.Cartesian3.fromDegreesArrayHeights(lins),
        width: 2,
        material: Cesium.Color.YELLOW,
      },
    });

    this.viewer.dataSources.add(this.dataSource);
  }
  getLength(c1, c2) {
    if (!c1 || !c2) return 0;
    return Cesium.Cartesian3.distance(c1, c2) || 0;
  }
  formateLength(val, dw) {
    if (val == undefined) return;
    dw = dw || 'm';
    let dwStr = '';
    if (dw == 'km' || dw == '千米') {
      dwStr += (Number(val) / 1000).toFixed(2) + 'km';
    } else if (dw == 'm' || dw == '米') {
      dwStr += Number(val).toFixed(2) + 'm';
    } else {
    }
    return dwStr;
  }
  cartesianToLnglat(cartesian, viewer) {
    if (!cartesian) return [];
    viewer = viewer || window.viewer;
    var lnglat = Cesium.Cartographic.fromCartesian(cartesian);
    var lat = Cesium.Math.toDegrees(lnglat.latitude);
    var lng = Cesium.Math.toDegrees(lnglat.longitude);
    var hei = lnglat.height;
    return [lng, lat, hei];
  }
}
export default Road;
