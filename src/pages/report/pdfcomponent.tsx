/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-11-21 11:23:26
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-15 15:58:16
 * @FilePath: \zero-admin-ui-master\src\pages\report\pdfcomponent.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Badge, Button, Col, DatePicker, List, Radio, Row, Select, message } from 'antd';
import type { ListAlertHistoryRespType } from './data.d';
import { queryAlert } from './service';
// import stylesLess from './pdfcomponent.less';
// @ts-ignore
import YouSheBiaoTiHei from '../../assets/font/YouSheBiaoTiHei-2.ttf';
Font.register({ family: 'FangSong', src: YouSheBiaoTiHei });

// create style
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },

  first: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'FangSong',
  },
  position: {
    fontSize: 24,
    textAlign: 'left',
    fontFamily: 'FangSong',
  },
  time: {
    fontSize: 20,
    textAlign: 'left',
    fontFamily: 'FangSong',
  },
  alert: {
    fontSize: 16,
    fontFamily: 'FangSong',
  },
});

// create document component
const MyDocument = (props: any) => {
  const [historyData, sethistoryData] = useState([]);
  console.log('MyDocument -> props:', props);
  const { currentHistory } = props;
  useEffect(() => {
    const queryData = async () => {
      // interface ListAlertHistoryReq {
      //   current?: number;
      //   pageSize?: number;
      //   type: number;
      //   start_time: string;
      //   end_time: string;
      //   platform: number;
      //   confirm: number;
      // }

      const data = {
        current: 1,
        pageSize: 3000,
        type: 0,
        history_id: currentHistory.id,
        start_time: '',
        end_time: '',
        platform: 0,
        confirm: 0,
      };
      const res: ListAlertHistoryRespType = await queryAlert(data);
      console.log('queryData -> res:', res);
      sethistoryData(res.data);
    };
    if (currentHistory?.id) {
      queryData();
    }
  }, [currentHistory]);

  console.log('MyDocument -> currentHistory:', currentHistory);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {historyData.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.first}>巡检历史{currentHistory.id} </Text>
            <Text style={styles.position}>
              无人机起飞点 经度{currentHistory.id} 维度{currentHistory.id} 高度{currentHistory.id}
            </Text>
            <Text style={styles.time}>开始时间{currentHistory.create_time}</Text>
            <Text style={styles.time}>结束时间{currentHistory.end_time}</Text>
            {historyData.map((item, index) => {
              return (
                <Text key={1} style={styles.alert}>
                  第{index}条{' '}
                  {Object.entries(item).map(([key, value]) => {
                    if (key != 'image') return ' ' + key + ':' + value + ' ';
                    return '   ';
                  })}
                </Text>
              );
            })}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default MyDocument;
