/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-18 15:51:21
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-23 01:16:25
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Analysis\component\column\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import styles from './index.less';

const Column = (props: any) => {
  const initChart = () => {
    const element = document.getElementById('columnDiv');
    const myChart = echarts.init(element);
    /**
     *  @file index.tsx
     *  @time 2023/10/22
     * @category :
     * @function :
     */
    //#region -------------------------------------------------------------------------

    const color = ['#ff95009d', '#41a2f6', '#454c5a']; //2个以上的series就需要用到color数组

    const tooltip = {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    };
    const commonSeries = {
      type: 'bar',
      barWidth: '30%', //柱条的宽度，不设时自适应。
      itemStyle: {
        //定义柱子的样式
        opacity: 1,
        borderRadius: [0, 20, 20, 0], //柱子圆角[上右下左]，也可以统一值。
      },
      showBackground: true, //柱子是否带有背景，默认是没有的
      backgroundStyle: {
        //只有showBackground=true，设置backgroundStyle才会有效果
        color: 'rgba(180, 180, 180, .2)', //
        borderRadius: [0, 20, 20, 0],
      },
    };
    let series = [
      { name: '最多', data: [5, 11, 5, 5] },
      { name: '平均', data: [3, 9, 3, 2] },
      { name: '最少', data: [1, 3, 1, 1] },
    ];
    series = series.map((item) => ({
      ...item,
      ...commonSeries,
    }));
    const option = {
      grid: {
        top: '3%',
        left: '3%',
        right: '4%',
        bottom: '4%',
        containLabel: true,
      },
      color,
      title: false,
      legend: false,
      tooltip,
      xAxis: {
        type: 'value',
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
          show: true, //显示Y轴
        },
        axisTick: {
          show: false, //不显示小的刻度线
        },
        splitLine: {
          show: false, //不显示竖向分割线
        },
      },

      yAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
          show: true, //显示X轴
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          },
        },
        axisTick: {
          show: false, //不显示小的刻度线
        },
        splitLine: {
          show: false, //不显示横向分割线
        },
        data: ['车辆', '人脸', '入侵', '烟雾'],
      },
      series,
    };

    //#endregion -----------------------------------------------------------------------
    /**
     * @end
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    option && myChart.setOption(option);
  };
  useEffect(() => {
    initChart();
  }, []);
  return <div id="columnDiv" className={styles.line} />;
};
export default Column;
