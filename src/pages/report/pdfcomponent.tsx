/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-11-21 11:23:26
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-21 11:23:36
 * @FilePath: \zero-admin-ui-master\src\pages\report\pdfcomponent.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

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
    fontSize: 30,
    fontFamily: 'pinru',
  },
  second: {
    fontSize: 30,
    fontFamily: 'FangSong',
    lineHeight: 1.5,
  },
});

// create document component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #2</Text>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
