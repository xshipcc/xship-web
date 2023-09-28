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
// 查询
interface ListUavDeviceReqType {
  current?: number;
  pageSize?: number;
}

interface ListUavDeviceData {
  id: number;
  name: string;
  ip: string;
  port: number;
  hangarIp: string;
  hangarPort: number;
}

interface ListUavDeviceRespType {
  code: string;
  message: string;
  current: number;
  data: ListUavDeviceData[];
  pageSize: number;
  success: boolean;
  total: number;
}
// 添加
interface AddUavDeviceReqType {
  name: string;
  ip: string;
  port: number;
  hangarIp: string;
  hangarPort: number;
}

interface AddUavDeviceRespType {
  code: string;
  message: string;
}

// 更新
interface UpdateUavDeviceReqType {
  id: number;
  name: string;
  ip: string;
  port: number;
  hangarIp: string;
  hangarPort: number;
}

interface UpdateUavDeviceRespType {
  code: string;
  message: string;
}

interface DeleteUavDeviceReqType {
  ids: number[];
}

interface DeleteUavDeviceRespType {
  code: string;
  message: string;
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */
