/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-27 14:41:11
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-06 13:44:35
 * @FilePath: \zero-admin-ui-master\src\utils\js\road.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import * as Cesium from 'cesium';
class Road {
  constructor(viewer, options) {
    this.viewer = viewer;
    // this.Lines = options.Lines;
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
  drawCanvas(img, text, ratio) {
    // width height
    var canvas = document.createElement('canvas'); //创建canvas标签
    var ctx = canvas.getContext('2d');

    var width = 40,
      height = 20;

    canvas.style.opacity = 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    //然后将画布缩放，将图像放大ratio倍画到画布上 目的 使图片文字更加清晰
    ctx.scale(ratio, ratio);
    var image = new Image();
    image.src = img;
    // 图片创建是异步操作，需要在图片完成之后，再写入文字，能保证文字在图片上方。
    // 如果不在里面，会出现图片覆盖文字
    image.onload = function () {
      ctx.drawImage(image, 0, 0, width, height);
      // 名称文字
      ctx.fillStyle = '#ff0000';
      ctx.font = '8px';
      ctx.fillText(text, 8, height / 2 + 2);
    };

    return canvas;
  }
  TrackPath(Lines) {
    console.log('Track -> TrackPath -> Lines:', Lines);
    var lins = [];

    this.dataSource = new Cesium.CustomDataSource('TrackPath');
    for (let i = 0; i < Lines.length; i++) {
      let LinesIndex = new Cesium.Cartesian3.fromDegrees(
        Lines[i].coord[0],
        Lines[i].coord[1],
        Lines[i].coord[2],
      );
      // 添加标签
      this.dataSource.entities.add({
        position: LinesIndex,
        label: {
          //文字标签
          text: Lines[i].name,
          font: 'bold 30px sans-serif', // 15pt monospace
          scale: 0.5,
          style: Cesium.LabelStyle.FILL,
          fillColor: Cesium.Color.WHITE,
          pixelOffset: new Cesium.Cartesian2(0, -65), //偏移量
          showBackground: false,
          // backgroundColor: new this.Cesium.Color(26 / 255, 196 / 255, 228 / 255, 1.0)   //背景顔色
        },
        billboard: {
          //图标
          image: '/poi.png',
          width: 95,
          height: 130,
          pixelOffset: new Cesium.Cartesian2(0, -60), //偏移量
        },
      });
      //添加点
      this.dataSource.entities.add({
        position: LinesIndex,
        label: {
          //文字标签
          text:
            '[' +
            Lines[i].coord[0].toFixed(2) +
            ',' +
            Lines[i].coord[1].toFixed(2) +
            ',' +
            Lines[i].coord[2].toFixed(2) +
            ']',
          font: '800 25px sans-serif', // 15pt monospace
          scale: 0.5,
          style: Cesium.LabelStyle.FILL,
          fillColor: Cesium.Color.WHITE,
          pixelOffset: new Cesium.Cartesian2(0, 20), //偏移量
          showBackground: false,
          // backgroundColor: new this.Cesium.Color(26 / 255, 196 / 255, 228 / 255, 1.0)   //背景顔色
        },
        point: {
          pixelSize: 5,
          color: Cesium.Color.fromCssColorString('#3163ec'),
        },
      });
      lins.push(Lines[i].coord[0]);
      lins.push(Lines[i].coord[1]);
      lins.push(Lines[i].coord[2]);
    }
    // 添加线
    this.dataSource.entities.add({
      polyline: {
        material: new Cesium.PolylineOutlineMaterialProperty({
          color: Cesium.Color.fromCssColorString('#4daefc'),
          outlineWidth: 1,
          outlineColor: Cesium.Color.BLACK,
        }),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        width: 6,
        // 不带箭头的直线
        positions: new Cesium.Cartesian3.fromDegreesArrayHeights(lins),
        // material: Cesium.Color.YELLOW,
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
