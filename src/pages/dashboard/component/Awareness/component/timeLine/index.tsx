//@ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-18 15:51:21
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-22 17:10:52
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\component\timeLine\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import styles from './index.less';

const LineChart = (props: any) => {
  const initChart = () => {
    const element = document.getElementById('lineDiv');
    const myChart = echarts.init(element);
    const data: { name: string; value: (string | number)[] }[] = [];
    let now = +new Date(1997, 9, 3);
    const oneDay = 24 * 3600 * 1000;
    let value = Math.random() * 10;

    function randomData() {
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
          Math.round(value),
        ],
      };
    }
    for (let i = 0; i < 1000; i++) {
      data.push(randomData());
    }
    const option = {
      tooltip: {
        title: {
          show: false, // 隐藏标题
        },
        trigger: 'axis',
        formatter: function (params: any[]) {
          // eslint-disable-next-line no-param-reassign
          params = params[0];
          const date = new Date(params.name);
          return (
            date.getDate() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getFullYear() +
            ' : ' +
            params.value[1]
          );
        },
        axisPointer: {
          animation: false,
        },
      },
      //   axisLine: {
      //     lineStyle: {
      //       color: '#050c12',
      //       opacity: 1,
      //     },
      //     show: true,
      //   },
      //   splitLine: {
      //     lineStyle: {
      //       color: '#050c12',
      //       opacity: 1,
      //     },
      //     show: true,
      //   },

      dataZoom: [
        {
          type: 'slider',
          show: true,
          height: 25,
          top: 85,
          //   bottom: 10,
          borderColor: 'transparent',
          backgroundColor: '#28679d',
          // 拖拽手柄样式 svg 路径
          handleIcon:
            'M512 512m-208 0a6.5 6.5 0 1 0 416 0 6.5 6.5 0 1 0-416 0Z M512 192C335.264 192 192 335.264 192 512c0 176.736 143.264 320 320 320s320-143.264 320-320C832 335.264 688.736 192 512 192zM512 800c-159.072 0-288-128.928-288-288 0-159.072 128.928-288 288-288s288 128.928 288 288C800 671.072 671.072 800 512 800z',
          handleColor: '#aab6c6',
          handleSize: 20,
          handleStyle: {
            borderColor: '#aab6c6',
            shadowBlur: 4,
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            shadowColor: '#e5e5e5',
          },
          start: 0,
          end: 100,
        },
      ],
      grid: {
        top: '3%',
        left: '3%',
        right: '4%',
        bottom: '25%',
        containLabel: true,
      },
      xAxis: {
        type: 'time',
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          },
        },
        // splitLine: {
        //   show: false,
        // },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          },
        },
        // splitLine: {
        //   show: false,
        // },
      },
      series: [
        {
          name: '模拟数据',
          type: 'line',
          data: data,
        },
      ],
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    option && myChart.setOption(option);
    setInterval(function () {
      for (let i = 0; i < 4; i++) {
        data.shift();
        data.push(randomData());
      }

      myChart.setOption({
        series: [
          {
            data: data,
          },
        ],
      });
    }, 1000);
  };

  useEffect(() => {
    initChart();
  }, []);
  return <div id="lineDiv" className={styles.timeLine} />;
};
export default LineChart;
