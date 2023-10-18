/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-18 15:51:21
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-18 16:40:44
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Analysis\component\Line\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import * as echarts from 'echarts';
import React, { useEffect } from 'react';

const LineChart = (props: any) => {
  const initChart = () => {
    const element = document.getElementById('lineDiv');
    const myChart = echarts.init(element);
    const colors = ['#3e9ffa', '#75a8ce'];
    const xData = ['14时', '15时', '16时', '17时', '18时', '19时', '20时'];
    const yData = [
      { name: 'PM2.5', data: [120, 282, 111, 234, 120, 282, 111, 234] },
      { name: 'PM10', data: [320, 132, 201, 334, 320, 132, 201, 334] },
    ];
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
            color: 'rgba(209, 239, 255, 0.65)',
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
          color: 'rgba(193, 233, 255, 0.8)',
          fontSize: 14,
        },
      },
      series: yData.map((item: { data: any }, index: string | number) => {
        return {
          name: 'PM值',
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
  }, []);
  return <div id="lineDiv" style={{ width: '100%', margin: '0 auto', height: '170px' }} />;
};
export default LineChart;
