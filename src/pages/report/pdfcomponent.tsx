/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-11-21 11:23:26
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-24 19:21:17
 * @FilePath: \zero-admin-ui-master\src\pages\report\pdfcomponent.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
// import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Document, Page, Text, StyleSheet, View, Image, Font } from '@react-pdf/renderer';
import type { ListAlertHistoryRespType, SnapshotData } from './data.d';
import { queryAlert } from './service';
// import stylesLess from './pdfcomponent.less';
// @ts-ignore
import YouSheBiaoTiHei from '../../assets/font/YouSheBiaoTiHei-2.ttf';
import { SourceObject } from '@react-pdf/types';
Font.register({ family: 'FangSong', src: YouSheBiaoTiHei });

// 自定义字体
Font.register({
  family: 'Oswald',
  src: YouSheBiaoTiHei,
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 60,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30,
    fontFamily: 'Oswald',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  graphText: {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#000',
  },
  signImg: {
    width: '120px',
    height: '90px',
    padding: 2,
    zIndex: 2,
  },
  tables: {
    border: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingeRigft: 10,
  },
  itemleft: {
    fontSize: 15,
  },
  itemr: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  signImgr: {
    padding: 10,
  },
  item: {
    fontSize: 15,
    textDecoration: 'underline',
  },
});

const Content = (props: { data: any }) => {
  const { data } = props;
  const [currentRow, setCurrentRow] = useState<SnapshotData>();
  const [ImageList, setImageList] = useState<any>(null);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setCurrentRow(data);
      handleUpdateModalVisible(true);

      // setStartDate(values.startDate || '');
      // setEndDate(values.endDate || '');
    }
    // handleUpdateModalVisible(false);
  }, [props.data]);

  // id: number;
  // total: number;
  // person: number;
  // car: number;
  // bicycle: number;
  // bus: number;
  // truck: number;
  // box_truck: number;
  // tricycle: number;
  // motorcycle: number;
  // smoke: number;
  // fire: number;
  // remark: string;
  // snapshots: SnapshotImages;
  // create_time: string;
  // 行人;
  // 自行车;
  // 车辆;
  // 货车;
  // 卡车;
  // 三轮车;
  // 公交车;
  // 摩托车;
  // 火警;
  // 烟雾;
  const [personList, setpersonList] = useState<any>(null);
  const [bicycleList, setbicycleList] = useState<any>(null);
  const [boxtruckList, setboxtruckList] = useState<any>(null);
  const [busList, setbusList] = useState<any>(null);
  const [carList, setcarList] = useState<any>(null);
  const [fireList, setfireList] = useState<any>(null);
  const [motorcycleList, setmotorcycleList] = useState<any>(null);
  const [smokeList, setsmokeList] = useState<any>(null);
  const [tricycleList, settricycleList] = useState<any>(null);
  const [truckList, settruckList] = useState<any>(null);

  const ImageListRender = (listData: any) => {
    if (listData.length > 0) {
      const url = window.location.href;
      const startIndex = url.indexOf('://') + 3;
      const endIndex =
        url.indexOf(':', startIndex) !== -1
          ? url.indexOf(':', startIndex)
          : url.indexOf('/', startIndex);
      const extractedUrl = url.substring(startIndex, endIndex);

      const listdata = listData.map((item: any, i: any) => {
        return (
          <Text style={styles.signImgr} key={i}>
            {/* <Image style={styles.signImg} src="https://i.loli.net/2021/04/14/nNly8EdXJ2aHYTe.jpg" /> */}
            <Image style={styles.signImg} src={'http://' + extractedUrl + '/' + item} />
          </Text>
        );
      });
      console.log('listdata -> listdata:', listdata);
      return listdata;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (currentRow?.snapshots) {
      const snapData: any = JSON.parse(currentRow?.snapshots);
      const person = ImageListRender(snapData.person);
      if (person) {
        setpersonList(person);
      }
      const bicycle = ImageListRender(snapData.bicycle);
      if (bicycle) {
        setbicycleList(bicycle);
      }
      const boxtruck = ImageListRender(snapData.boxtruck);
      if (boxtruck) {
        setboxtruckList(boxtruck);
      }
      const bus = ImageListRender(snapData.bus);
      if (bus) {
        setbusList(bus);
      }
      const car = ImageListRender(snapData.car);
      if (car) {
        setcarList(car);
      }
      const fire = ImageListRender(snapData.fire);
      if (fire) {
        setfireList(fire);
      }
      const motorcycle = ImageListRender(snapData.motorcycle);
      if (motorcycle) {
        setmotorcycleList(motorcycle);
      }
      const smoke = ImageListRender(snapData.smoke);
      if (smoke) {
        setsmokeList(smoke);
      }
      const tricycle = ImageListRender(snapData.tricycle);
      if (tricycle) {
        settricycleList(tricycle);
      }
      const truck = ImageListRender(snapData.truck);
      if (truck) {
        settruckList(truck);
      }
    }
  }, [currentRow]);

  return (
    <>
      {updateModalVisible && (
        <Document>
          <Page size="A4" style={styles.body}>
            <Text style={styles.title}>巡检报表-{currentRow?.create_time}</Text>
            <Text style={styles.subtitle}>告警数据总数 :{currentRow?.total} 个</Text>
            <Text style={styles.tables}>
              <Text style={styles.itemleft}>行人 : </Text>
              <Text style={styles.item}>{currentRow?.person} 个</Text>
              <Text style={styles.itemleft}>自行车 : </Text>
              <Text style={styles.item}>{currentRow?.bicycle} 个</Text>
              <Text style={styles.itemleft}>汽车 : </Text>
              <Text style={styles.item}>{currentRow?.car} 个</Text>
              <Text style={styles.itemleft}>货车 : </Text>
              <Text style={styles.item}>{currentRow?.box_truck} 个</Text>
              <Text style={styles.itemleft}>卡车 : </Text>
              <Text style={styles.item}>{currentRow?.truck} 个</Text>
            </Text>
            <Text style={styles.tables}>
              <Text style={styles.itemleft}>三轮车 : </Text>
              <Text style={styles.item}>{currentRow?.tricycle} 个</Text>
              <Text style={styles.itemleft}>公交车 : </Text>
              <Text style={styles.item}>{currentRow?.bus} 个</Text>
              <Text style={styles.itemleft}>摩托车 : </Text>
              <Text style={styles.item}>{currentRow?.motorcycle} 个</Text>
              <Text style={styles.itemleft}>火警 : </Text>
              <Text style={styles.item}>{currentRow?.fire} 个</Text>
              <Text style={styles.itemleft}>烟雾 : </Text>
              <Text style={styles.item}>{currentRow?.smoke} 个</Text>
            </Text>
            <Text style={styles.subtitle}>告警数据详情</Text>

            {/* <Text style={styles.graph}>
          <Text style={styles.graphText}>加粗文案 </Text>
          <Text>当前文案在一行内</Text>
        </Text> */}
            {/* {personList && <Text style={styles.itemr}>行人 : {personList}</Text>} */}
            <Text style={styles.itemr}>行人 : {personList}</Text>
            <Text style={styles.itemr}>自行车 : {bicycleList}</Text>
            <Text style={styles.itemr}>汽车 : {boxtruckList}</Text>
            <Text style={styles.itemr}>货车 : {busList}</Text>
            <Text style={styles.itemr}>卡车 : {carList}</Text>
            <Text style={styles.itemr}>三轮车 : {fireList}</Text>
            <Text style={styles.itemr}>公交车 : {motorcycleList}</Text>
            <Text style={styles.itemr}>摩托车 : {smokeList}</Text>
            <Text style={styles.itemr}>火警 : {tricycleList}</Text>
            <Text style={styles.itemr}>烟雾 : {truckList}</Text>
          </Page>
        </Document>
      )}
    </>
  );
};

export default Content;
