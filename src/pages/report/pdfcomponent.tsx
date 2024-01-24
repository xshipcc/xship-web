/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-11-21 11:23:26
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-24 10:52:52
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
  const ImageList = new Array(10).fill(null).map((_, i) => {
    return (
      <Text style={styles.signImgr}>
        <Image style={styles.signImg} src="https://i.loli.net/2021/04/14/nNly8EdXJ2aHYTe.jpg" />
      </Text>
    );
  });
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

            <Text style={styles.itemr}>行人 : {ImageList}</Text>
            <Text style={styles.itemr}>自行车 : {ImageList}</Text>
            <Text style={styles.itemr}>汽车 : {ImageList}</Text>
            <Text style={styles.itemr}>货车 : {ImageList}</Text>
            <Text style={styles.itemr}>卡车 : {ImageList}</Text>
            <Text style={styles.itemr}>三轮车 : {ImageList}</Text>
            <Text style={styles.itemr}>公交车 : {ImageList}</Text>
            <Text style={styles.itemr}>摩托车 : {ImageList}</Text>
            <Text style={styles.itemr}>火警 : {ImageList}</Text>
            <Text style={styles.itemr}>烟雾 : {ImageList}</Text>
          </Page>
        </Document>
      )}
    </>
  );
};

export default Content;
