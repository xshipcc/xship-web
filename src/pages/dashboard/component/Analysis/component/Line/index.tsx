/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-18 15:51:21
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-21 10:55:05
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Analysis\component\Line\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { DashboardAnalysData } from '@/pages/dashboard/typings';
import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import { useSelector } from 'umi';
import styles from './index.less';

const LineChart = (props: any) => {
  const analysisInfo: DashboardAnalysData = useSelector(
    (state: any) => state.dashboardModel.analysisInfo,
  );
  const getPreviousDates = (numDays: number) => {
    function formatDate(date: Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    const previousDates = [];
    for (let i = numDays - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = formatDate(date);
      previousDates.push(formattedDate);
    }
    // @ts-ignore
    previousDates.sort((a, b) => new Date(a) - new Date(b));

    return previousDates;
  };
  const initChart = () => {
    const element = document.getElementById('lineDiv');
    const myChart = echarts.init(element);
    const colors = ['#3e9ffa', '#75a8ce'];
    // const xData = ['14时', '15时', '16时', '17时', '18时', '19时', '20时'];
    const xData = getPreviousDates(analysisInfo.week_data.length);
    console.log('initChart -> xData:', xData);
    const yData = [{ name: '近日告警总数', data: analysisInfo.week_data }];
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      grid: {
        left: '20px',
        top: '30px',
        right: '20px',
        bottom: '0',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: xData,
          show: true,
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#65d5ff',
            fontSize: 14,
          },
        },
      ],
      yAxis: {
        type: 'value',
        show: true,
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#65d5ff',
          fontSize: 14,
        },
      },
      series: yData.map((item: { data: any }, index: string | number) => {
        return {
          smooth: true, // 设置为 true，使折线图线段圆滑
          name: '告警总数',
          data: item.data,
          type: 'line',
          stack: 'Total',
          lineStyle: {
            width: 2,
            color: colors[index],
          },
          showSymbol: false,
          emphasis: {
            focus: 'series',
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colors[index],
              },
              {
                offset: 1,
                color: 'rgba(1, 1, 1, 0.8)',
              },
            ]),
          },
        };
      }),
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    option && myChart.setOption(option);
  };
  useEffect(() => {
    initChart();
  }, [analysisInfo]);
  return <div id="lineDiv" className={styles.line} />;
};
export default LineChart;
