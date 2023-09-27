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

interface AddUavDeviceReqType {
  name: string;
  ip: string;
  port: number;
  hangar_ip: string;
  hangar_port: number;
}

interface AddUavDeviceRespType {
  code: string;
  message: string;
}

interface ListUavDeviceReqType {
  current: number;
  pageSize: number;
}

interface ListUavDeviceData {
  id: number;
  name: string;
  ip: string;
  port: number;
  hangar_ip: string;
  hangar_port: number;
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

interface UpdateUavDeviceReqType {
  id: number;
  name: string;
  growth: number;
  intergration: number;
  type: number;
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
