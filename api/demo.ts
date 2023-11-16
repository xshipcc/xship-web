/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-11-01 10:34:48
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-01 10:34:57
 * @FilePath: \api\demo.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
/**
 *  @file data.d.ts
 *  @time 2023/10/31
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

export interface AddCamerasReq {
    name: string;
    ip: string;
    platform: number;
    tunnel: number;
    url: string;
    lat: number;
    lon: number;
    alt: number;
    status: number;
}

export interface AddCamerasResp {
    code: string;
    message: string;
}

export interface ListCamerasReq {
    current?: number;
    pageSize?: number;
}

export interface ListCamerasData {
    id: number;
    name: string;
    ip: string;
    platform: number;
    tunnel: number;
    url: string;
    lat: number;
    lon: number;
    alt: number;
    status: number;
}

export interface ListCamerasResp {
    code: string;
    message: string;
    current: number;
    data: ListCamerasData[];
    pageSize: number;
    success: boolean;
    total: number;
}

export interface UpdateCamerasReq {
    id: number;
    name: string;
    ip: string;
    platform: number;
    tunnel: number;
    url: string;
    lat: number;
    lon: number;
    alt: number;
    status: number;
}

export interface UpdateCamerasResp {
    code: string;
    message: string;
}

export interface DeleteCamerasReq {
    ids: number[];
}

export interface DeleteCamerasResp {
    code: string;
    message: string;
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */
