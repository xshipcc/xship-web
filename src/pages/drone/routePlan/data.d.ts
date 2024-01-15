/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-27 10:33:29
 * @FilePath: \zero-admin-ui-master\src\pages\drone\routePlan\data.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

/**
 *  @file data.d.ts
 *  @time 2023/09/27
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

export interface AddUavFlyReqType {
  name: string | undefined;
  data: { name: string; coord: string }[] | undefined;
  create_time: string | undefined;
  creator: string | undefined;
}

export interface AddUavFlyRespType {
  code: string;
  message: string;
}

export interface ListUavFlyReqType {
  current?: number;
  pageSize?: number;
  uav_id?: number;
}
// 序号--水平---垂直轴--停留时间
// 航线节点的数据
// export interface NodeDataType {
//   key: number;
//   horizontal: number;
//   vertical: number;
//   stayTime: number;
// }

// 航线节点
export interface NodeType {
  coord: number[];
  name: string;
  speed: number;
  hovertime: number;
  radius: number;
  photo: string;
  heightmode: string;
  turning: string;
  // nodeData: NodeDataType[];
}
// 航线数据
export interface ListUavFlyDataType {
  id: number;
  name: string;
  data: NodeType[];
  create_time: string;
  creator: string;
}

export interface ListUavFlyRespType {
  current: number;
  data: ListUavFlyDataType[];
  pageSize: number;
  success: boolean;
  total: number;
  code: string;
  message: string;
}

export interface UpdateUavFlyReqType {
  id: number;
  name: string;
  data: string;
  create_time: string;
  creator: string;
}

export interface UpdateUavFlyRespType {
  code: string;
  message: string;
}

export interface DeleteUavFlyReqType {
  ids: number[];
}

export interface DeleteUavFlyRespType {
  code: string;
  message: string;
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */
