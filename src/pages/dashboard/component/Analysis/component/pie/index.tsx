/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-18 15:51:21
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-23 13:22:03
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Analysis\component\pie\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import styles from './index.less';

const LineChart = (props: any) => {
  const initChart = () => {
    const element = document.getElementById('pieDiv');
    const myChart = echarts.init(element);
    const colors = ['#1879f6', '#03e0ff', '#4963ff', '#03e080'].reverse();
    const datas = [
      {
        name: '普通故障',
        value: 2,
      },
      {
        name: '轻微故障',
        value: 2,
      },
      {
        name: '严重故障',
        value: 3,
      },
      {
        name: '修复数量',
        value: 4,
      },
    ];
    const total = datas.reduce((prev, curr) => prev + curr.value, 0);
    const option = {
      // backgroundColor: '#02274A',
      color: colors,
      legend: {
        // orient: 'vertical',
        bottom: 0,
        itemGap: 10,
        itemWidth: 12,
        itemHeight: 12,
        textStyle: {
          color: '#65d5ff',
          fontSize: 12,
        },
        data: datas,
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [
        {
          name: '风险预警',
          type: 'pie',
          radius: ['20%', '55%'],
          center: ['50%', '40%'],
          roseType: 'radius',
          minShowLabelAngle: 60,
          label: {
            show: true,
            normal: {
              position: 'outside',
              fontSize: 16,
              formatter: (params) => {
                return ((params.value / total) * 100).toFixed(2) + '%';
              },
            },
          },
          labelLine: {
            length: 1,
            length2: 10,
            smooth: true,
          },
          data: datas,
        },
      ],
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    option && myChart.setOption(option);
  };
  useEffect(() => {
    initChart();
  }, []);
  return <div id="pieDiv" className={styles.line} />;
};
export default LineChart;
