/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-09 15:48:58
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-09 20:01:38
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ArcGisMapServerImageryProvider, Viewer } from 'cesium';

import TIFFImageryProvider from 'tiff-imagery-provider';
import proj4 from 'proj4-fully-loaded';

const viewer = new Viewer('cesiumContainer', {
  baseLayerPicker: true,
  animation: true,
  fullscreenButton: true,
  geocoder: true,
  homeButton: true,
  selectionIndicator: true,
  timeline: true,
  navigationHelpButton: true,
  shouldAnimate: true,
  useBrowserRecommendedResolution: true,
  orderIndependentTranslucency: true,
});

ArcGisMapServerImageryProvider.fromUrl(
  'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
  {
    enablePickFeatures: false,
  },
).then(async (imageryProvider) => {
  viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
  viewer.imageryLayers.addImageryProvider(imageryProvider);
  const provider: any = await TIFFImageryProvider.fromUrl('/cogtif.tif', {
    enablePickFeatures: true,
    projFunc: (code) => {
      if (![4326, 3857, 900913].includes(code)) {
        {
          try {
            const prj = proj4('EPSG:4326', `EPSG:${code}`);
            if (prj)
              return {
                project: prj.forward,
                unproject: prj.inverse,
              };
          } catch (e) {
            console.error(e);
          }
        }
      }
      return undefined;
    },
  });

  const imageryLayer = viewer.imageryLayers.addImageryProvider(provider);
  viewer.flyTo(imageryLayer, {
    duration: 1,
  });
});
