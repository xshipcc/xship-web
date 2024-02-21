/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-13 22:00:39
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-02-21 09:02:14
 * @FilePath: \zero-admin-ui-master\src\utils\js\measure\measureTool.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import MeasureSpaceDistance from './measureSpaceDistance';
import MeasureHeight from './measureHeight';
import MeasureLnglat from './measureLnglat';
import * as Cesium from 'cesium';
import util from '../util';

/**
 * 量算控制类
 * @description 量算控制类，通过此类对象，可进行不同类型的量算操作，而不用多次new 不同类型的量算对象。
 * @class
 */
class MeasureTool {
  /**
   * @param {Cesium.viewer} viewer 地图viewer对象
   * @param {Object} obj 基础配置
   */
  constructor(viewer, obj) {
    console.log('MeasureTool -> constructor -> viewer:', viewer);

    if (!viewer) {
      console.warn('缺少必要参数！--viewer');
      return;
    }
    obj = obj || {};
    this.viewer = viewer;
    console.log('MeasureTool -> constructor -> viewer:', viewer);
    /**
     * @property {Object} nowDrawMeasureObj 当前测量对象
     */
    this.nowDrawMeasureObj = null;

    /**
     * @property {Array} measureObjArr 测量对象数组
     */
    this.measureObjArr = [];
    this.nowEditMeasureObj = null;
    this.handler = null;

    /**
     * @property {Boolean} [canEdit=true] 测量对象是否可编辑
     */
    this.canEdit = obj.canEdit == undefined ? true : obj.canEdit;

    /**
     * @property {Boolean} [intoEdit=true] 绘制完成后，是否进入编辑状态（当canEdit==true，才起作用）
     */
    this.intoEdit = obj.intoEdit == undefined ? true : obj.intoEdit;
    this.bindEdit();

    /**
     * @property {Object} nowDrawMeasureObj 当前绘制对象，绘制完成后为undifined
     */
    this.nowDrawMeasureObj = undefined;

    /**
     * @property {Object} nowEditMeasureObj 当前编辑对象，编辑完成后为undifined
     */
    this.nowEditMeasureObj = undefined;
    /**
     * @property {Object} trackPosition 路径数据存储对象
     */
    this.trackPosition = [];
  }

  /**
   * 事件绑定
   * @param {String} type 事件类型（startEdit 开始编辑时 / endEdit 编辑结束时 / end 创建完成后）
   * @param {Function} fun 绑定函数
   */
  on(type, fun) {
    if (type == 'endCreate') {
      this.endCreateFun = fun;
    }

    if (type == 'startEdit') {
      this.startEditFun = fun;
    }

    if (type == 'endEdit') {
      this.endEditFun = fun;
    }
  }
  createLabelObstacle(c, text) {
    if (!c) return;
    console.log('BaseMeasure -> createLabel -> c:', c);
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
        font: '15px Helvetica',
        fillColor: Cesium.Color.BLACK,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 5,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        pixelOffset: new Cesium.Cartesian2(0, 20),
      },
      point: {
        pixelSize: 15,
        color: Cesium.Color.fromCssColorString('#ff7a7a'),
      },
    });
  }
  doVisibility(trackPosition) {
    let that = this;
    console.log('路线编辑数据', trackPosition);
    // 笛卡尔坐标数组
    const cartesianCoordinates = [];

    // 遍历原始经纬度数组，转换为笛卡尔坐标并存储
    for (let i = 0; i < trackPosition.length; i++) {
      const coord = trackPosition[i];
      const cartesianCoord = Cesium.Cartesian3.fromDegrees(coord[0], coord[1], coord[2]);
      cartesianCoordinates.push(cartesianCoord);
    }
    console.log('MeasureSpaceDistance -> 路线:', cartesianCoordinates);
    //////////////////获取绘制完成的线段坐标
    // cartesianCoordinates.pop(); //去除末尾重复
    // console.log('MeasureSpaceDistance -> 路线去除:', cartesianCoordinates);

    let ObstacleIndex = 1;
    cartesianCoordinates.reduce((previousElement, currentElement) => {
      console.log('当前路线元素:', currentElement);
      console.log('上一个路线元素:', previousElement);
      // 计算射线的方向
      let direction = Cesium.Cartesian3.normalize(
        Cesium.Cartesian3.subtract(currentElement, previousElement, new Cesium.Cartesian3()),
        new Cesium.Cartesian3(),
      );
      console.log('路线法向量', direction);
      // 建立射线
      let ray = new Cesium.Ray(previousElement, direction);
      // 计算交互点，返回第一个
      let result = that.viewer.scene.pickFromRay(ray);
      if (result?.position) {
        console.log('路线有阻挡:', result);
        that.viewer.entities.add({
          polyline: {
            positions: [result.position, previousElement],
            material: new Cesium.PolylineOutlineMaterialProperty({
              color: Cesium.Color.fromCssColorString('#419975'),
              outlineWidth: 2,
              outlineColor: Cesium.Color.fromCssColorString('#4975d4'),
            }),
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            width: 5,
          },
        });
        that.viewer.entities.add({
          polyline: {
            positions: [result.position, currentElement],
            width: 5,
            material: Cesium.Color.RED,
            depthFailMaterial: Cesium.Color.RED,
          },
        });
        var lnglat = util.cartesianToLnglat(result.position, that.viewer);
        var plngLat =
          lnglat[0].toFixed(6) + ',' + lnglat[1].toFixed(6) + ',' + lnglat[2].toFixed(2);
        that.createLabelObstacle(result.position, '阻挡点' + ObstacleIndex++ + '\n' + plngLat);
      } else {
        console.log('路线没有阻挡:', result);
        that.viewer.entities.add({
          polyline: {
            positions: [previousElement, currentElement],
            material: new Cesium.PolylineOutlineMaterialProperty({
              color: Cesium.Color.fromCssColorString('#fff'),
              outlineWidth: 2,
              outlineColor: Cesium.Color.fromCssColorString('#4975d4'),
            }),
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            width: 5,
          },
        });
        console.log('不在模型上');
      }
      return currentElement;
    });
  }
  /**
   * 开始量算
   * @param {Object} opt
   * @param {Number} opt.type 量算类型（1~空间距离测量/2~贴地距离测量/3~空间面积测量/4~高度测量/5~三角测量/6~坐标量算/7~方位角测量/8~剖面测量/9~单点坡度）
   */
  start(opt) {
    return new Promise((resolve, reject) => {
      opt = opt || {};
      if (!opt.type) {
        reject('opt.type 不存在');
        return;
      }

      let ms;
      this.endEdit();
      if (
        this.nowDrawMeasureObj &&
        this.nowDrawMeasureObj.state != 'endCreate' &&
        this.nowDrawMeasureObj.state != 'endEdit' &&
        this.nowDrawMeasureObj.state != 'no'
      ) {
        reject('当前操作尚未完成');
        return;
      }

      switch (Number(opt.type)) {
        case 1: // 空间距离测量
          ms = new MeasureSpaceDistance(this.viewer, opt);
          break;
        case 2: // 贴地距离测量
          ms = new MeasureGroundDistance(this.viewer, opt);
          break;
        case 3: // 空间面积测量
          ms = new MeasureSpaceArea(this.viewer, opt);
          break;
        case 4: // 高度测量
          ms = new MeasureHeight(this.viewer, opt);
          break;
        case 5: // 三角测量
          ms = new MeasureTriangle(this.viewer, opt);
          break;
        case 6: // 坐标量算
          new MeasureLnglat(this.viewer, opt);
          break;
        case 7: // 方位角测量
          ms = new MeasureAzimutht(this.viewer, opt);
          break;
        case 8: // 剖面测量
          ms = new MeasureSection(this.viewer, opt);
          break;
      }

      this.nowDrawMeasureObj = ms;
      let that = this;

      if (ms) {
        this.changeCursor(true);
        ms.start(function (res) {
          that.changeCursor(false);
          if (that.intoEdit) {
            ms.startEdit();
            if (that.startEditFun) that.startEditFun(ms);
          }
          if (opt.success) opt.success(ms, res);
          if (that.endCreateFun) that.endCreateFun(ms, res);
          that.nowDrawMeasureObj = undefined;
          that.measureObjArr.push(ms);
          console.log('MeasureTool -> that路线原始数据未去除:', ms.trackPosition);
          ms.trackPosition.pop();
          console.log('MeasureTool ->  that路线原始数据:', ms.trackPosition);
          that.doVisibility(ms.trackPosition);
          resolve(ms.trackPosition);
        });
      } else {
        reject('无效的 opt.type');
      }
    });
  }

  /**
   * 绑定编辑
   */
  bindEdit() {
    let that = this;
    // 如果是线 面 则需要先选中
    if (!this.handler) this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    this.handler.setInputAction(function (evt) {
      if (!that.canEdit) return;
      // 若当前正在绘制 则无法进行编辑操作
      if (that.nowDrawMeasureObj) return;
      let pick = that.viewer.scene.pick(evt.position);
      if (Cesium.defined(pick) && pick.id && pick.id.objId) {
        // 选中实体
        for (let i = 0; i < that.measureObjArr.length; i++) {
          if (
            pick.id.objId == that.measureObjArr[i].objId &&
            (that.measureObjArr[i].state == 'endCreate' || that.measureObjArr[i].state == 'endEdit')
          ) {
            // 结束上一个编辑
            if (that.nowEditMeasureObj) {
              // 结束除当前选中实体的所有编辑操作
              that.nowEditMeasureObj.endEdit();
              if (that.endEditFun) that.endEditFun(that.nowEditMeasureObj);
              that.nowEditMeasureObj = undefined;
            }
            // 开始当前编辑
            that.measureObjArr[i].startEdit();
            that.nowEditMeasureObj = that.measureObjArr[i];
            if (that.startEditFun) that.startEditFun(that.nowEditMeasureObj); // 开始编辑
            break;
          }
        }
      } else {
        // 未选中实体 则结束编辑
        if (that.nowEditMeasureObj) {
          that.nowEditMeasureObj.endEdit();
          if (that.endEditFun) that.endEditFun(that.nowEditMeasureObj); // 结束事件
          that.nowEditMeasureObj = undefined;
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  /**
   * 结束的当前操作
   */
  done() {
    if (this.nowEditMeasureObj) {
      console.log(
        'MeasureTool -> done ->    this.nowEditMeasureObj.trackPosition:',
        this.nowEditMeasureObj.trackPosition,
      );
      this.nowEditMeasureObj.done();
      if (this.endEditFun) this.endEditFun(this.nowEditMeasureObj);
      this.nowEditMeasureObj = undefined;
    }

    if (this.nowDrawMeasureObj) {
      this.nowDrawMeasureObj.done();
      this.measureObjArr.push(this.nowDrawMeasureObj);
      if (this.endCreateFun) this.endCreateFun(this.nowDrawMeasureObj);
      this.nowDrawMeasureObj = undefined;
    }
  }

  /**
   * 结束编辑
   */
  endEdit() {
    if (this.nowEditMeasureObj) {
      // 结束除当前选中实体的所有编辑操作
      this.nowEditMeasureObj.endEdit();
      if (this.endEditFun) this.endEditFun(this.nowEditMeasureObj); // 结束事件
      this.nowEditMeasureObj = null;
    }
    for (let i = 0; i < this.measureObjArr.length; i++) {
      this.measureObjArr[i].endEdit();
    }
  }

  /**
   * 清除
   */
  clear() {
    for (var i = 0; i < this.measureObjArr.length; i++) {
      if (this.measureObjArr[i]) {
        this.measureObjArr[i].endEdit();
        this.measureObjArr[i].destroy();
      }
    }
    this.measureObjArr = [];
    if (this.nowDrawMeasureObj) {
      this.nowDrawMeasureObj.destroy();
      this.nowDrawMeasureObj = null; // 当前编辑对象
    }
    this.changeCursor(false);
  }

  /**
   * 销毁
   */
  destroy() {
    this.clear();
    if (this.handler) {
      this.handler.destroy();
      this.handler = null;
    }
  }

  /**
   * 设置单位
   */
  setUnit(unit) {
    if (!unit) return;
    this.nowDrawMeasureObj.setUnit(unit);
  }

  /**
   * 修改鼠标样式
   * @param {Boolean} isopen false为默认鼠标样式
   */
  changeCursor(isopen) {
    let body = document.getElementsByTagName('body');
    console.log('MeasureTool -> changeCursor -> body:', body);
    body[0].style.cursor = isopen ? 'crosshair' : 'default';
  }

  /**
   * 根据id获取量算对象
   * @param {*} id
   * @returns {Object} measureObj为图层对象，index为图层对象在数组中位置
   */
  getMeasureObjById(id) {
    if (!id) return;
    let res = {};
    for (let i = 0; i < this.measureObjArr.length; i++) {
      if (this.measureObjArr[i].attr.id == id) {
        res = {
          measureObj: this.measureObjArr[i],
          index: i,
        };
        break;
      }
    }
    return res;
  }

  /**
   * 根据objId获取量算对象
   * @param {*} id
   * @returns {Object} measureObj为图层对象，index为图层对象在数组中位置
   */
  getMeasureObjByObjId(id) {
    if (!id) return;
    let res = {};
    for (let i = 0; i < this.measureObjArr.length; i++) {
      if (this.measureObjArr[i].objId == id) {
        res = {
          measureObj: this.measureObjArr[i],
          index: i,
        };
        break;
      }
    }
    return res;
  }

  /**
   * 删除单个量算对象
   * @param {Object} measureObj
   */
  removeOne(measureObj) {
    if (!measureObj) return;
    let res = this.getMeasureObjByObjId(measureObj.objId);
    if (res.measureObj) {
      this.measureObjArr.splice(res.index, 1);
      res.measureObj.destroy();
    }
  }
}

export default MeasureTool;
