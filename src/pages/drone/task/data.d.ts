export interface FlashPromotionListItem {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}

export interface FlashPromotionListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface FlashPromotionListData {
  list: FlashPromotionListItem[];
  pagination: Partial<FlashPromotionListPagination>;
}

export interface FlashPromotionListParams {
  title?: string;
  status?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

/**
 *  @file data.d.ts
 *  @time 2023/09/27
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

interface AddUavPlanReqType {
  uav_id: number; // 无人机ID
  uav_icon: number; // 无人机 icon
  plan: string; // 飞行计划时间
  fly_id: number; // 巡检路线id
}

interface AddUavPlanRespType {
  code: string;
  message: string;
}

interface ListUavPlanReqType {
  current: number;
  pageSize: number;
}

interface ListUavPlanDataType {
  id: number;
  uav_id: number; // 无人机ID
  uav_icon: number; // 无人机 icon
  plan: string; // 飞行计划时间
  fly_id: number; // 巡检路线id
}

interface ListUavPlanRespType {
  code: string;
  message: string;
  current: number;
  data: ListUavPlanDataType[];
  pageSize: number;
  success: boolean;
  total: number;
}

interface UpdateUavPlanReqType {
  id: number;
  uav_id: number; // 无人机ID
  uav_icon: number; // 无人机 icon
  plan: string; // 飞行计划时间
  fly_id: number; // 巡检路线id
}

interface UpdateUavPlanRespType {
  code: string;
  message: string;
}

interface DeleteUavPlanReqType {
  ids: number[];
}

interface DeleteUavPlanRespType {
  code: string;
  message: string;
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */
