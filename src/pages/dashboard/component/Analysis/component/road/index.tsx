import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import styles from './index.less';
import 'echarts-gl';
import { useSelector } from 'umi';
import { DashboardAnalysData } from '@/pages/dashboard/typings';
const RadarChart = (props: any) => {
  const analysisInfo: DashboardAnalysData = useSelector(
    (state: any) => state.dashboardModel.analysisInfo,
  );
  const initChart = () => {
    const element = document.getElementById('roadDiv');
    const myChart = echarts.init(element);
    const PointsData = analysisInfo.data?.map((item) => {
      return [item.lon, item.lat, item.alt];
    });
    //////////////////////
    myChart.setOption({
      //  grid3D
      grid3D: {
        show: true,
        boxWidth: 200,
        boxHeight: 100,
        boxDepth: 100,
        axisLine: {
          lineStyle: {
            color: '#65d5ff',
          },
        },
        axisPointer: {
          show: true,
        },
        splitLine: {
          lineStyle: {
            color: '#65d5ff',
          },
          show: true,
        },

        viewControl: {
          distance: 250,
          alpha: 10,
          beta: 30,
          animation: true,
        },
      },

      // 三维坐标轴
      xAxis3D: {
        name: '经度',
        max: 100,
      },
      yAxis3D: {
        name: '维度',
        max: 100,
      },
      zAxis3D: {
        max: 100,
        name: '高度',
      },
      axisLine: {
        //坐标轴轴线(线)控制
        show: true, //该参数需设为true
        // interval:200,//x,y坐标轴刻度标签的显示间隔，在类目轴中有效。
        lineStyle: {
          //坐标轴样式

          opacity: 1, //(单个刻度不会受影响)
          width: 2, //线条宽度
        },
      },
      tooltip: {},
      series: [
        {
          type: 'scatter3D',
          dimensions: [
            'x',
            'y',
            'z', //悬浮到点时弹出的显示框信息
          ],
          // encode: {
          // x: [3, 1, 5],      // 表示维度 3、1、5 映射到 x 轴。
          // y: 1,              // 表示维度 2 映射到 y 轴。
          // z: 3,
          // tooltip:['a','c','b'], // 表示维度 3、2、4 会在 tooltip 中显示。
          // label: 'a'           // 表示 label 使用维度 3。
          // },
          data: PointsData,
          symbolSize: 5, //点的大小
          // symbol: 'triangle',
          itemStyle: {
            // borderWidth: 1,
            color: '#87f0e5',
            // borderColor: 'rgba(255,255,255,0.8)'//边框样式
          },
          emphasis: {
            itemStyle: {
              color: '#ccc', //高亮
            },
          },
          // itemStyle: {
          //     color: "#87f0e5"
          // }
        },
      ],
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    // option && myChart.setOption(option);
  };
  useEffect(() => {
    initChart();
  }, [analysisInfo]);
  return <div id="roadDiv" className={styles.box} />;
};
export default RadarChart;
