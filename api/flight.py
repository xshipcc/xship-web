# coding=utf-8
import struct
import ctypes
import time 
#import crc16
import datetime


mCRC16_Tables = [0, 4129, 8258, 12387, 16516, 20645, 24774, 28903, 33032, 37161, 41290, 45419, 49548, 53677, 57806,
                 61935, 4657, 528, 12915, 8786, 21173, 17044, 29431, 25302, 37689, 33560, 45947, 41818, 54205, 50076,
                 62463, 58334, 9314, 13379, 1056, 5121, 25830, 29895, 17572, 21637, 42346, 46411, 34088, 38153, 58862,
                 62927, 50604, 54669, 13907, 9842, 5649, 1584, 30423, 26358, 22165, 18100, 46939, 42874, 38681, 34616,
                 63455, 59390, 55197, 51132, 18628, 22757, 26758, 30887, 2112, 6241, 10242, 14371, 51660, 55789, 59790,
                 63919, 35144, 39273, 43274, 47403, 23285, 19156, 31415, 27286, 6769, 2640, 14899, 10770, 56317, 52188,
                 64447, 60318, 39801, 35672, 47931, 43802, 27814, 31879, 19684, 23749, 11298, 15363, 3168, 7233, 60846,
                 64911, 52716, 56781, 44330, 48395, 36200, 40265, 32407, 28342, 24277, 20212, 15891, 11826, 7761, 3696,
                 65439, 61374, 57309, 53244, 48923, 44858, 40793, 36728, 37256, 33193, 45514, 41451, 53516, 49453,
                 61774, 57711, 4224, 161, 12482, 8419, 20484, 16421, 28742, 24679, 33721, 37784, 41979, 46042, 49981,
                 54044, 58239, 62302, 689, 4752, 8947, 13010, 16949, 21012, 25207, 29270, 46570, 42443, 38312, 34185,
                 62830, 58703, 54572, 50445, 13538, 9411, 5280, 1153, 29798, 25671, 21540, 17413, 42971, 47098, 34713,
                 38840, 59231, 63358, 50973, 55100, 9939, 14066, 1681, 5808, 26199, 30326, 17941, 22068, 55628, 51565,
                 63758, 59695, 39368, 35305, 47498, 43435, 22596, 18533, 30726, 26663, 6336, 2273, 14466, 10403, 52093,
                 56156, 60223, 64286, 35833, 39896, 43963, 48026, 19061, 23124, 27191, 31254, 2801, 6864, 10931, 14994,
                 64814, 60687, 56684, 52557, 48554, 44427, 40424, 36297, 31782, 27655, 23652, 19525, 15522, 11395, 7392,
                 3265, 61215, 65342, 53085, 57212, 44955, 49082, 36825, 40952, 28183, 32310, 20053, 24180, 11923,
                 16050, 3793, 7920]

def crc16_direct(bytestr):
    '''
    crc16直接计算法
    :param bytestr: bytes字符串
    :return: int16类型
    '''
    crc = 0
    if len(bytestr) == 0:
        return 0
    for i in range(len(bytestr)):
        R = bytestr[i]
        for j in range(8):
            if R > 127:
                k = 1
            else:
                k = 0
                
            R = (R << 1) & 0xff
            if crc > 0x7fff:
                m = 1
            else:
                m = 0
 
            if k + m == 1:
                k = 1
            else:
                k = 0
 
            crc = (crc << 1) & 0xffff
            if k == 1:
                crc ^= 0x1021  # 多项式为 0x1021
    return crc


def init_crc16_tables(poly):
    re_crc16 = []
    for i in range(256):
        accum = (i << 8) & 0xFFFF
        for j in range(7, -1, -1):
            if (accum & 0x8000) != 0:
                accum = ((accum << 1) & 0xFFFF) ^ poly
            else:
                accum = accum << 1
        re_crc16.append(accum)
    return re_crc16
 
#crc16_table = init_crc16_tables(0x1021)


def crc16_table(bytestr):
    '''
    crc16查表法
    :param bytestr: bytes字符串
    :return: int16类型
    '''
    crc = 0x0000
    data = bytearray(bytestr)
    len1 = len(bytestr)
    for i in range(len1):
        cp = (crc >> 8) ^ data[i]
        crc = ((crc << 8) & 0xFFFF) ^ mCRC16_Tables[cp]
    return crc



def bcc(data):
    bcc = 0
    for i in range(len(data)):
        bcc ^= data[i]
    return bcc



#无人机飞行实时数据
class Flight_Struct(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head
        ('head2', ctypes.c_ubyte),#head2
        ('length', ctypes.c_ubyte),#长度
        ('cmd', ctypes.c_ubyte),#命令
        ('s_cmd', ctypes.c_ubyte),#子命令
        ('temp', ctypes.c_ubyte),#温度
        ('eng',ctypes.c_ubyte),#功耗
        ('v', ctypes.c_short),#电压
        ('a', ctypes.c_short),#电流
        ('PWM1', ctypes.c_short),
        ('PWM2', ctypes.c_short),
        ('PWM3', ctypes.c_short),
        ('PWM4', ctypes.c_short),
        ('PWM5', ctypes.c_short),
        ('PWM6', ctypes.c_short),
        ('PWM7', ctypes.c_short),
        ('PWM8', ctypes.c_short),
        ('PWM9', ctypes.c_short),
        ('PWM10', ctypes.c_short),
        ('offset_staus', ctypes.c_ubyte),#差分状态
        ('lat', ctypes.c_float),#纬度
        ('lon', ctypes.c_float),#经度
        ('height', ctypes.c_short),#GPS高度
        ('rel_height', ctypes.c_short),#相对原点高度x10
        ('real_height', ctypes.c_short),#实时距地高度x10
        ('target_speed', ctypes.c_short),#目标速度x100
        ('speed', ctypes.c_short),#地速x100
        ('gps_speed', ctypes.c_short),#组合导航向速度X100
        ('trajectory', ctypes.c_short),#轨迹角X10
        ('pitch', ctypes.c_short),#俯仰角X100
        ('roll_angle', ctypes.c_short),#横滚角角X100
        ('fu_wing', ctypes.c_ushort),#副翼
        ('updown', ctypes.c_ushort),#升降
        ('speedup', ctypes.c_ushort),#油门
        ('toward', ctypes.c_ushort),#方向
        ('lock',ctypes.c_ubyte),#锁定
        ('toward_angle',ctypes.c_short),#机头指向角
        ('fly_ctl',ctypes.c_ubyte),#飞行控制模式
        ('staus',ctypes.c_ushort),#状态
        ('fly_status',ctypes.c_ubyte),#飞行阶段
        ('gps_lost',ctypes.c_ubyte),#GPS丢星时间
        ('link_lost',ctypes.c_ubyte),#链路中断时间
        ('area',ctypes.c_ushort),#飞行区域
        ('turns_done',ctypes.c_ubyte),#已飞行圈数
        ('turns_todo',ctypes.c_ubyte),#等待飞行圈数
        ('fly_distance',ctypes.c_ushort),#飞行点距离
        ('fly_time',ctypes.c_ushort),#飞行时间
        ('target_point',ctypes.c_ubyte),#目标航点
        ('target_height',ctypes.c_ushort),#目标高度
        ('target_angle',ctypes.c_ushort),#目标航向
        ('stay_time',ctypes.c_ubyte),#悬停时间
        ('flyctl_v',ctypes.c_ushort),#飞控电压
        ('engine_v',ctypes.c_ushort),#动力电压
        ('gps_stars',ctypes.c_ubyte),#GPS星数
        ('HDOP',ctypes.c_ubyte),#水平精度HDOP
        ('VDOP',ctypes.c_ubyte),#垂直精度VDOP
        ('SDOP',ctypes.c_ubyte),#速度精度SDOP
        ('year',ctypes.c_ubyte),#年
        ('month',ctypes.c_ubyte),#月
        ('day',ctypes.c_ubyte),#日
        ('hour',ctypes.c_ubyte),#时
        ('min',ctypes.c_ubyte),#分
        ('sec',ctypes.c_ubyte),#秒
        ('flyctl_temp',ctypes.c_ubyte),#飞控温度
        ('offset_dist',ctypes.c_ushort),#侧偏距
        ('channel_1',ctypes.c_ushort),
        ('channel_2',ctypes.c_ushort),
        ('channel_3',ctypes.c_ushort),
        ('channel_4',ctypes.c_ushort),
        ('channel_5',ctypes.c_ushort),
        ('channel_6',ctypes.c_ushort),
        ('height_cm',ctypes.c_ushort),#高度厘米位
        ('ms',ctypes.c_ushort),
        ('cmd_back1',ctypes.c_ubyte),#指令返回值1
        ('cmd_back2',ctypes.c_ubyte),#指令返回值2
        ('crc',ctypes.c_ushort),#crc16
        ('end',ctypes.c_ubyte),#0xaa
        ('aa',ctypes.c_ubyte),#0xaa
        ('bb',ctypes.c_ubyte),#0xaa
    ]


#无人机导航上传
class Flight_Course_Struct(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head
        ('head2', ctypes.c_ubyte),#head2
        ('length', ctypes.c_ubyte),#长度
        ('cmd', ctypes.c_ubyte),#命令
        ('s_cmd', ctypes.c_ubyte),#子命令
        ('group', ctypes.c_ubyte),#航点组别
        ('lat', ctypes.c_float),#纬度X10^7上传
        ('lon', ctypes.c_float),#经度X10^7上传
        ('height', ctypes.c_float),#GPS高度×1000上传
        ('speed',ctypes.c_ushort),#速度×100上传
        ('stay_time',ctypes.c_ushort),#悬停时间
        ('radius',ctypes.c_ushort),#半径×10
        ('count',ctypes.c_ushort),#航点总数
        ('index',ctypes.c_ushort),#航点序号，从01开始
        ('att1',ctypes.c_ubyte),#Bit0:1:拍照0:不拍照Bit1: 1: 工作点0:降落点（待确认）(现象显示，1是降落点，0是工作点-0324)
        ('att2',ctypes.c_ubyte),#日bit0:0整条航线1单条航线bit1~2:00悬停转弯 01内切转弯1011预留--0408
        ('crc',ctypes.c_ushort),#crc16
        ('end',ctypes.c_ubyte),#0xaa
        
    ]



    def PathUpdate(self,lat,lon,height,speed,hovertime,radius,totalnum,num):
        data =bytearray(33)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x21
        data[3]=0x05
        data[4]=0x41
        data[5]
        Lat = struct.pack("i", int(lat*(10**7)))  
        data[6]=Lat[0]
        data[7]=Lat[1]
        data[8]=Lat[2]
        data[9]=Lat[3]
        Lon = struct.pack("i", int(lon*(10**7)))  
        data[10]=Lon[0]
        data[11]=Lon[1]
        data[12]=Lon[2]
        data[13]=Lon[3]
        Height = struct.pack("I", int(height*1000))  
        data[14]=Height[0]
        data[15]=Height[1]
        data[16]=Height[2]
        data[17]=Height[3]
        Speed = struct.pack("H", speed*100)
        data[18]=Speed[0]
        data[19]=Speed[1]
        Hovertime = struct.pack("H", hovertime)  
        data[20]=Hovertime[0]
        data[21]=Hovertime[1]
        Radius = struct.pack("H", radius*10)  
        data[22]=Radius[0]
        data[23]=Radius[1]
        Totalnum = struct.pack("H", totalnum)
        data[24]=Totalnum[0]
        data[25]=Totalnum[1]
        Num = struct.pack("H", num)
        data[26]=Num[0]
        data[27]=Num[1]
        crcstring = data[2:30]
        crc = crc16_table(crcstring)
        data[30]=crc&0xff
        data[31]=(crc>>8)&0xff
        data[32]=0xaa
        print(data.hex())
        return data





    # def __init__(self):
        # self.head   ='\x00'
        # self.head2  ='\x00'
        # self.length ='\0x21'
        # self.end ='\0xaa'
    def Print(self):
        print ("head :%x %x %d %x"%(self.head,self.head2,self.length,self.crc))

    # def write_to_buffer(buffer, data, offset=0):
    #     if isinstance(buffer, ctypes.POINTER(ctypes.c_byte)):
    #         print("sss")
    #         ctypes.memmove(buffer, data, len(data))
    #         return

    
    def GetSend(self):
        data =bytearray(0x21)
        # pi = ctypes.POINTER(data)
        ptr1 = (ctypes.c_ubyte *self.length ).from_buffer(data)
        self.head  =0xa5
        self.head2 =0x5a
        self.cmd =0x05
        self.s_cmd =0x41
        self.end =0xaa

        # ctypes.memmove(ctypes.addressof(data), ctypes.addressof(self), ctypes.sizeof(self))
        # ptr1 = (ctypes.c_ubyte).from_buffer(data)

        #self.write_to_buffer(ptr1,self)
        

        crc = crc16_table(data)
        self.crc = 0x11
        print ("crc %x "%crc)
        self.Print()
        ctypes.memmove(ptr1, ctypes.addressof(self), 0x21)
        print ("data %s "%data)
        #do data;


#定点导航设置
class Course_Set_Struct(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head
        ('head2', ctypes.c_ubyte),#head2
        ('length', ctypes.c_ubyte),#长度
        ('cmd', ctypes.c_ubyte),#命令
        ('s_cmd', ctypes.c_ubyte),#子命令
        ('type', ctypes.c_ubyte),#盘旋点类型
        ('lat', ctypes.c_float),#纬度X10^7上传
        ('lon', ctypes.c_float),#经度X10^7上传
        ('height', ctypes.c_ushort),#GPS高度×1000上传
        ('radius',ctypes.c_ushort),#半径×10
        ('time',ctypes.c_ubyte),#时间/圈数
        ('index',ctypes.c_ubyte),#航点序号，从01开始
        ('mode',ctypes.c_ubyte),#Bit0:1:拍照0:不拍照Bit1: 1: 工作点0:降落点（待确认）(现象显示，1是降落点，0是工作点-0324)
        ('speed',ctypes.c_ushort),#日bit0:0整条航线1单条航线bit1~2:00悬停转弯 01内切转弯1011预留--0408
        ('crc',ctypes.c_ushort),#crc16
        ('end',ctypes.c_ubyte),#0xaa
        
    ]

    #定点导航
    def point(self,lat,lon,height,radius,split_time,direction,mode,speed):
        data =bytearray(26)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x1a
        data[3]=0x05
        data[4]=0x02
        data[5]=0x00
        Lat = struct.pack("i", int(lat*(10**7)))  
        data[6]=Lat[0]
        data[7]=Lat[1]
        data[8]=Lat[2]
        data[9]=Lat[3]
        Lon = struct.pack("i", int(lon*(10**7)))  
        data[10]=Lon[0]
        data[11]=Lon[1]
        data[12]=Lon[2]
        data[13]=Lon[3]
        Height = struct.pack("H", height)  
        data[14]=Height[0]
        data[15]=Height[1]
        Radius = struct.pack("H", radius)  
        data[16]=Radius[0]
        data[17]=Radius[1]
        data[18]=struct.pack("c", split_time)
        data[19]=struct.pack("c", direction)  #0x00 逆时针 0x01 顺时针
        data[20]=struct.pack("c", mode)  #0x00 定点 0x01 环绕
        Speed = struct.pack("H", speed)
        data[21]=Speed[0]
        data[22]=Speed[1]
        crcstring = data[2:23]
        crc = crc16_table(crcstring)
        data[23]=crc&0xff
        data[24]=(crc>>8)&0xff
        data[25]=0xaa
        return data





    # def __init__(self):
        # self.head   ='\x00'
        # self.head2  ='\x00'
        # self.length ='\0x21'
        # self.end ='\0xaa'
    def Print(self):
        print ("head :%x %x %d %x"%(self.head,self.head2,self.length,self.crc))


    
    def GetSend(self,angle):

        data =bytearray(0x1A)
        # pi = ctypes.POINTER(data)
        ptr1 = (ctypes.c_ubyte *self.length ).from_buffer(data)
        self.head  =0xa5
        self.head2 =0x5a
        self.cmd =0x05
        self.s_cmd =0x02
        self.end =0xaa
        
        # ctypes.memmove(ctypes.addressof(data), ctypes.addressof(self), ctypes.sizeof(self))
        # ptr1 = (ctypes.c_ubyte).from_buffer(data)

        #self.write_to_buffer(ptr1,self)
        

        crc = crc16_table(ptr1)
        self.crc = 0x11
        print ("crc %x "%(crc))
        self.Print()

        ctypes.memmove(ptr1, ctypes.addressof(self), 0x1A)
        print ("data %s "%data)
        return data
        #do data;



#航点确认指令
class Course_Confirm(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head
        ('head2', ctypes.c_ubyte),#head2
        ('length', ctypes.c_ubyte),#长度
        ('cmd', ctypes.c_ubyte),#命令
        ('s_cmd', ctypes.c_ubyte),#子命令
        ('next', ctypes.c_ushort),#下一个需要序号
        ('total',ctypes.c_ushort),#航点总数
        ('safe',ctypes.c_ushort),#类型（保留）
        ('crc',ctypes.c_ushort),#crc16
        ('end',ctypes.c_ubyte),#0xaa
        
    ]
    # def __init__(self):
        # self.head   ='\x00'
        # self.head2  ='\x00'
        # self.length ='\0x21'
        # self.end ='\0xaa'
    def Print(self):
        print ("head :%x %x %d %x"%(self.head,self.head2,self.length,self.crc))


    
    def GetSend(self):

        data =bytearray(0x1A)
        # pi = ctypes.POINTER(data)
        ptr1 = (ctypes.c_ubyte *self.length ).from_buffer(data)
        self.head  =0xa5
        self.head2 =0x5a
        self.cmd =0x05
        self.s_cmd =0x02
        self.end =0xaa
        
        # ctypes.memmove(ctypes.addressof(data), ctypes.addressof(self), ctypes.sizeof(self))
        # ptr1 = (ctypes.c_ubyte).from_buffer(data)

        #self.write_to_buffer(ptr1,self)
        

        crc = crc16_table(ptr1)
        self.crc = 0x11
        print ("crc %x "%(crc))
        self.Print()

        ctypes.memmove(ptr1, ctypes.addressof(self), 0x1A)
        print ("data %s "%data)
        #do data;




#巡航圈数上传指令
class Flight_Circle_Struct(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head
        ('head2', ctypes.c_ubyte),#head2
        ('length', ctypes.c_ubyte),#长度
        ('cmd', ctypes.c_ubyte),#命令
        ('count', ctypes.c_ubyte),#圈数
        ('crc',ctypes.c_ushort),#crc16
        ('end',ctypes.c_ubyte),#0xaa
        
    ]

    #巡航圈数
    def turns(self,num):
        data =bytearray(8)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x08
        data[3]=0xcd
        data[4]=num&0xff  #0 表示无线循环
        crcstring = data[2:5]
        crc = crc16_table(crcstring)
        data[5]=crc&0xff
        data[6]=(crc>>8)&0xff
        data[7]=0xaa
        print(data.hex())
        return data

    # def __init__(self):
        # self.head   ='\x00'
        # self.head2  ='\x00'
        # self.length ='\0x21'
        # self.end ='\0xaa'
    def Print(self):
        print ("head :%x %x %d %x"%(self.head,self.head2,self.length,self.crc))


    
    def GetSend(self):

        data =bytearray(0x1A)
        # pi = ctypes.POINTER(data)
        ptr1 = (ctypes.c_ubyte *self.length ).from_buffer(data)
        self.head  =0xa5
        self.head2 =0x5a
        self.cmd =0x05
        self.s_cmd =0x02
        self.end =0xaa
        
        # ctypes.memmove(ctypes.addressof(data), ctypes.addressof(self), ctypes.sizeof(self))
        # ptr1 = (ctypes.c_ubyte).from_buffer(data)

        #self.write_to_buffer(ptr1,self)
        

        crc = crc16_table(ptr1)
        self.crc = 0x11
        print ("crc %x "%(crc))
        self.Print()

        ctypes.memmove(ptr1, ctypes.addressof(self), 0x1A)
        print ("data %s "%data)
        #do data;


#1.2飞行控制类
class Flight_Manage(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head
        ('head2', ctypes.c_ubyte),#head2
        ('length', ctypes.c_ubyte),#长度
        ('cmd', ctypes.c_ubyte),#命令
        ('s_cmd', ctypes.c_ubyte),#子命令
        ('ext_cmd', ctypes.c_ubyte),#命令扩展
        ('count', ctypes.c_ubyte),#盘旋点类型
        ('crc',ctypes.c_ushort),#crc16
        ('end',ctypes.c_ubyte),#0xaa
        
    ]
    # def __init__(self):
        # self.head   ='\x00'
        # self.head2  ='\x00'
        # self.length ='\0x21'
        # self.end ='\0xaa'
    def Print(self):
        print ("head :%x %x %d %x"%(self.head,self.head2,self.length,self.crc))


    
    def GetSend(self):

        data =bytearray(0x1A)
        # pi = ctypes.POINTER(data)
        ptr1 = (ctypes.c_ubyte *self.length ).from_buffer(data)
        self.head  =0xa5
        self.head2 =0x5a
        self.cmd =0xF1
        self.end =0xaa
        
        # ctypes.memmove(ctypes.addressof(data), ctypes.addressof(self), ctypes.sizeof(self))
        # ptr1 = (ctypes.c_ubyte).from_buffer(data)

        #self.write_to_buffer(ptr1,self)
        

        crc = crc16_table(ptr1)
        self.crc = 0x11
        print ("crc %x "%(crc))
        self.Print()

        ctypes.memmove(ptr1, ctypes.addressof(self), 0x1A)
        print ("data %s "%data)
        #do data;




#无人机心跳
class Flight_HeartBeat(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head
        ('head2', ctypes.c_ubyte),#head2
        ('length', ctypes.c_ubyte),#长度
        ('cmd', ctypes.c_ubyte),#命令
        ('s_cmd', ctypes.c_ubyte),#子命令
        ('crc',ctypes.c_ushort),#crc16
        ('end',ctypes.c_ubyte),#0xaa
        
    ]

    def SendHeartBeat():
        data =bytearray(8)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x08
        data[3]=0xa3
        data[4]=0xa3
        crcstring = data[2:5]
        crc = crc16_table(crcstring)
        data[5]=crc&0xff
        data[6]=(crc>>8)&0xff
        data[7]=0xaa
        return data
        
    
        



#1.2飞行动作指令
class Flight_Action(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head
        ('head2', ctypes.c_ubyte),#head2
        ('length', ctypes.c_ubyte),#长度
        ('cmd', ctypes.c_ubyte),#命令
        ('s_cmd', ctypes.c_ubyte),#子命令
        #   0x01: 起飞
        # 0x02: 返航
        # 0x05: 返回原点/回家降落

        # 0x07: 就地降落
        # 0x09: 解锁(动力启动，保持怠速)

        # 0x12: 开启夜航灯
        # 0x13: 关闭夜航灯

        # 0x28: 关车（加锁）
        # 0x29: 悬停
        # 0xF0：切换为遥控模式
        # 0xF1：切换为增稳模式（手控）
        # 0xF2：切换为全自主模式（程控）
        # 0xF3: 切换为定高模式
        ('ext_cmd', ctypes.c_ubyte),#命令扩展
        ('count', ctypes.c_ubyte),#盘旋点类型
        ('crc',ctypes.c_ushort),#crc16
        ('end',ctypes.c_ubyte),#0xaa
        
    ]
    # def __init__(self):
        # self.head   ='\x00'
        # self.head2  ='\x00'
        # self.length ='\0x21'
        # self.end ='\0xaa'
    def Print(self):
        print ("head :%x %x %d %x"%(self.head,self.head2,self.length,self.crc))



    #解锁
    def Unlock(self):
        data =bytearray(9)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x09
        data[3]=0xf3
        data[4]=0x09
        data[5]=0x00
        crcstring = data[2:6]
        crc = crc16_table(crcstring)
        data[6]=crc&0xff
        data[7]=(crc>>8)&0xff
        data[8]=0xaa
        return data

    #起飞
    def TakeOff(self):
        data =bytearray(9)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x09
        data[3]=0xf3
        data[4]=0x01
        data[5]=0x00
        crcstring = data[2:6]
        crc = crc16_table(crcstring)
        data[6]=crc&0xff
        data[7]=(crc>>8)&0xff
        data[8]=0xaa
        return data
    
    #加锁
    def Lock(self):
        data =bytearray(9)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x09
        data[3]=0xf3
        data[4]=0x28
        data[5]=0x00
        crcstring = data[2:6]
        crc = crc16_table(crcstring)
        data[6]=crc&0xff
        data[7]=(crc>>8)&0xff
        data[8]=0xaa
        print(data.hex())
        return data
    
    #程控
    def AutomaticControl(self):
        data =bytearray(9)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x09
        data[3]=0xf3
        data[4]=0xf2
        data[5]=0x00
        crcstring = data[2:6]
        crc = crc16_table(crcstring)
        data[6]=crc&0xff
        data[7]=(crc>>8)&0xff
        data[8]=0xaa
        return data   
    
    #手控
    def ManualControl(self):
        data =bytearray(9)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x09
        data[3]=0xf3
        data[4]=0xf1
        data[5]=0x00
        crcstring = data[2:6]
        crc = crc16_table(crcstring)
        data[6]=crc&0xff
        data[7]=(crc>>8)&0xff
        data[8]=0xaa
        print(data.hex())
        return data

    #回家降落
    def Return(self):
        data =bytearray(9)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x09
        data[3]=0xf3
        data[4]=0x05
        data[5]=0x00
        crcstring = data[2:6]
        crc = crc16_table(crcstring)
        data[6]=crc&0xff
        data[7]=(crc>>8)&0xff
        data[8]=0xaa
        return data 
    
    
    #就地降落
    def Land(self):
        data =bytearray(9)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x09
        data[3]=0xf3
        data[4]=0x07
        data[5]=0x00
        crcstring = data[2:6]
        crc = crc16_table(crcstring)
        data[6]=crc&0xff
        data[7]=(crc>>8)&0xff
        data[8]=0xaa
        return data 

    #打开防撞灯
    def Anticollision_Light_On(self):
        data =bytearray(9)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x09
        data[3]=0xf3
        data[4]=0x12
        data[5]=0x00
        crcstring = data[2:6]
        crc = crc16_table(crcstring)
        data[6]=crc&0xff
        data[7]=(crc>>8)&0xff
        data[8]=0xaa
        return data 
    
    #关闭防撞灯
    def Anticollision_Light_Off(self):
        data =bytearray(9)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x09
        data[3]=0xf3
        data[4]=0x13
        data[5]=0x00
        crcstring = data[2:6]
        crc = crc16_table(crcstring)
        data[6]=crc&0xff
        data[7]=(crc>>8)&0xff
        data[8]=0xaa
        return data 
    
    #打开遥控器
    def Controller_On(self):
        data =bytearray(9)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x09
        data[3]=0xf3
        data[4]=0xe0
        data[5]=0x00
        crcstring = data[2:6]
        crc = crc16_table(crcstring)
        data[6]=crc&0xff
        data[7]=(crc>>8)&0xff
        data[8]=0xaa
        return data
    
    #关闭遥控器
    def Controller_Off(self):
        data =bytearray(9)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x09
        data[3]=0xf3
        data[4]=0xe1
        data[5]=0x00
        crcstring = data[2:6]
        crc = crc16_table(crcstring)
        data[6]=crc&0xff
        data[7]=(crc>>8)&0xff
        data[8]=0xaa
        # print ("data %s "%data.hex())
        return data
    
    #打开双天线
    def Double_Antenna_On(self):
        data =bytearray(9)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x09
        data[3]=0xf3
        data[4]=0x0A
        data[5]=0x01
        crcstring = data[2:6]
        crc = crc16_table(crcstring)
        data[6]=crc&0xff
        data[7]=(crc>>8)&0xff
        data[8]=0xaa
        return data    
    
    #关闭双天线
    def Double_Antenna_Off(self):
        data =bytearray(9)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x09
        data[3]=0xf3
        data[4]=0x0A
        data[5]=0x00
        crcstring = data[2:6]
        crc = crc16_table(crcstring)
        data[6]=crc&0xff
        data[7]=(crc>>8)&0xff
        data[8]=0xaa
        return data  

    #获取磁偏角
    def MagneticDeclination(self):
        data =bytearray(9)
        data[0]=0xa5
        data[1]=0x5a
        data[2]=0x09
        data[3]=0xf3
        data[4]=0x0D
        data[5]=0x01
        crcstring = data[2:6]
        crc = crc16_table(crcstring)
        data[6]=crc&0xff
        data[7]=(crc>>8)&0xff
        data[8]=0xaa
        return data 



    def GetSend(self):

        data =bytearray(0x1A)
        # pi = ctypes.POINTER(data)
        ptr1 = (ctypes.c_ubyte *self.length ).from_buffer(data)
        self.head  =0xa5
        self.head2 =0x5a
        self.cmd =0xF3
        self.end =0xaa
        
        # ctypes.memmove(ctypes.addressof(data), ctypes.addressof(self), ctypes.sizeof(self))
        # ptr1 = (ctypes.c_ubyte).from_buffer(data)

        #self.write_to_buffer(ptr1,self)
        

        crc = crc16_table(ptr1)
        self.crc = 0x11
        print ("crc %x "%(crc))
        self.Print()

        ctypes.memmove(ptr1, ctypes.addressof(self), 0x1A)
        print ("data %s "%data)
        #do data;


#飞机参数下传
class Flight_Param(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head
        ('head2', ctypes.c_ubyte),#head2
        ('length', ctypes.c_ubyte),#长度
        ('cmd', ctypes.c_ubyte),#命令
        ('s_cmd', ctypes.c_ubyte),#子命令
        ('mode', ctypes.c_ubyte),#缺省工作模式
        ('type', ctypes.c_ubyte),#机型类别标示
        ('subtype', ctypes.c_ubyte),#机型类别子标示
        ('param', ctypes.c_ushort),#机型参数
        ('max_height',ctypes.c_ushort),#最大工作高度
        ('normal_height',ctypes.c_ushort),#正常工作高度
        ('min_height',ctypes.c_ubyte),#最小工作高度
        ('parachute_height',ctypes.c_ubyte),#开伞高度
        ('parachute_height_safe',ctypes.c_ubyte),#开伞保护高度
        ('height',ctypes.c_ubyte),#离地高度
        ('safe_height',ctypes.c_ubyte),#起飞安全高度
        ('time',ctypes.c_ushort),#巡航时间
        ('parachute_open',ctypes.c_ubyte),#停车开伞时间
        ('two-wheeled_speed',ctypes.c_ushort),#两轮滑跑速度
        ('off_land_speed',ctypes.c_ushort),#离地速度
        ('off_land_speed',ctypes.c_ushort),#离地速度
        ('cruise_speed',ctypes.c_ushort),#巡航速度
        ('stall_speed',ctypes.c_ushort),#失速速度
        ('parachute_open_speed',ctypes.c_ushort),#开伞最大速度
        ('land_speed',ctypes.c_ushort),#降落下降速度
        ('Landing_speed',ctypes.c_ushort),#降落着陆速度
        ('max_climbing_angle',ctypes.c_ubyte),#最大爬升角
        ('max_dive_angle',ctypes.c_ubyte),#最大俯冲角
        ('max_roll_angle',ctypes.c_ubyte),#最大横滚角
        ('min_turn_angle',ctypes.c_ubyte),#最小转弯角
        ('throttle_mode',ctypes.c_ubyte),#油门控制方式
        # 0x00 直接控制
        # 0x01 转速控制
        # 0x02 空速控制
        ('throttle_takeoff',ctypes.c_ubyte),#起飞油门
        ('throttle_cruise',ctypes.c_ubyte),#巡航油门
        ('throttle_protect',ctypes.c_ubyte),#保护油门
        ('takeoff_mode',ctypes.c_ubyte),#起飞模式
        ('takeoff_param',ctypes.c_ubyte),#起飞参数
        ('takeoff_param2',ctypes.c_ushort),#起飞参数2
        ('landing_mode',ctypes.c_ubyte),#降落模式
        ('landing_param',ctypes.c_ubyte),#降落参数1
        ('landing_param2',ctypes.c_ubyte),#降落参数2
        ('landing_param2',ctypes.c_ushort),#降落航线长度
        ('landing_param2',ctypes.c_ushort),#降落航线宽度
        ('landing_param2',ctypes.c_ushort),#无动力滑行系数
        ('crc',ctypes.c_ushort),#crc16
        ('end',ctypes.c_ubyte),#0xaa
        
    ]
    # def __init__(self):
        # self.head   ='\x00'
        # self.head2  ='\x00'
        # self.length ='\0x21'
        # self.end ='\0xaa'
    def Print(self):
        print ("head :%x %x %d %x"%(self.head,self.head2,self.length,self.crc))


    
    def GetSend(self):

        data =bytearray(0x1A)
        # pi = ctypes.POINTER(data)
        ptr1 = (ctypes.c_ubyte *self.length ).from_buffer(data)
        self.head  =0xa5
        self.head2 =0x5a
        self.cmd =0x05
        self.s_cmd =0x02
        self.end =0xaa
        
        # ctypes.memmove(ctypes.addressof(data), ctypes.addressof(self), ctypes.sizeof(self))
        # ptr1 = (ct5a09f30900edf3aaypes.c_ubyte).from_buffer(data)

        #self.write_to_buffer(ptr1,self)
        

        crc = crc16_table(ptr1)
        self.crc = 0x11
        print ("crc %x "%(crc))
        self.Print()

        ctypes.memmove(ptr1, ctypes.addressof(self), 0x1A)
        print ("data %s "%data)
        #do data;


#吊舱系统
#2吊舱发送至软件命令帧
class Pod_Receive(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head
        ('head2', ctypes.c_ubyte),#head2
        ('type', ctypes.c_ubyte),#载荷
# 1：白光  2：红外  
# 3：双光  4：三光
        ('check', ctypes.c_ubyte),#自检结果
#Bit0：红外机芯：   置1正常，0异常。
# Bit1：可见光机芯： 置1正常，0异常。
# Bit2：陀螺仪数据： 置1正常，0异常。
# Bit3：角度传感器： 置1正常，0异常。
# Bit4：驱动板：     置1正常，0异常。
# Bit5：压缩存储：   置1正常，0异常。
# Bit6：综合处理：   置1正常，0异常。
# Bit7：吊舱准备状态：置1载荷准备好，置0载荷未准备好
        ('pod_1', ctypes.c_ushort),#吊舱1
# Bit0：0：备用；
# Bit1：0：未视频抓图，1：正在视频抓图；
# Bit2：0：备用；
# Bit3：0：未视频连续抓图，1：正在视频连续抓图；
# Bit4：0：未开始录像，1：正在录像；
# Bit5：备用；
# Bit6：1：TF卡已插卡，0：TF卡未插卡；
# Bit7: 超温报警状态：0-未超温，1-超温；（测温红外）
# Bit8：备用；
# Bit9: 备用；
# Bit10～Bit13: 红外图像增强0~7；
# Bit14～Bit15: 图像显示模式；
        ('pod_2', ctypes.c_ushort),#吊舱2
# Bit0：备用
# Bit1：0：跟踪源为红外，1：跟踪源为可见光；
# Bit2~ Bit8：红外电子变倍倍数x10；
# Bit9：备用；
# Bit10~Bit11：可见光电子放大0-1 x; 1-2 x; 2-4x；
# Bit12～Bit15:色带；
        ('servo', ctypes.c_ubyte),#伺服状态
# 0x01：载荷关
# 0x02: 手动
# 0x03: 收藏    bytestr = b'This is test string.'
# 0x07: 跟踪
# 0x08: 垂直下视
# 0x09:陀螺自动较漂
# 0x0A:陀螺温度较漂
# 0x0B:航向随动
# 0x0C:归中
# 0x0F:姿态指引
        ('pod_dir_angle', ctypes.c_ushort),#吊舱框架方位角×100倍
        ('pod_pitch', ctypes.c_ushort), #吊舱框架俯仰角×100倍
        ('pod_roll',ctypes.c_ushort),   #吊舱框架横滚角×100倍
        ('version',ctypes.c_ubyte),     #当前载荷版本号A、B
        ('infrared_angle',ctypes.c_ushort),#红外视场角×10倍
        ('tf_usage',ctypes.c_ubyte),     #TF使用容量百分比
        ('visual_angle',ctypes.c_ushort),#可见光视场角×10倍
        ('tf_total',ctypes.c_ushort),   #TF卡总容量×10倍
        ('infrared_focal_length',ctypes.c_ushort),  #红外焦距×10倍
        ('visual_focalcrcstring = self.crc = 0x11_length',ctypes.c_ushort),    #白光焦距×10倍
        ('infrared_distance',ctypes.c_ushort),      #激光测距距离×10倍
        ('lon', ctypes.c_float),#目标经度
        ('lat', ctypes.c_float),#目标纬度
        ('target_height',ctypes.c_ushort),#目标海拔高度
        ('temp',ctypes.c_ushort),#温度×10倍
        ('bak1',ctypes.c_ushort),#×100倍
        ('bak2',ctypes.c_ushort),#×100倍
        ('bak3',ctypes.c_ushort),#×100倍
        ('cur_image_type',ctypes.c_ushort),#当前显示图像反馈0：红外；1：可见光；
        ('cmd_recv',ctypes.c_ushort),#接收到的命令字反馈
        ('gest_recv',ctypes.c_ushort),#姿态指示完成反馈0x12：姿态指示中 0x13：姿态指示完成
        ('bak_s1',ctypes.c_ushort),#备用
        ('bak_s2',ctypes.c_ushort),#备用
        ('bak_s3',ctypes.c_ushort),#备用
        ('bak_s4',ctypes.c_ushort),#备用
        ('bak_s5',ctypes.c_ushort),#备用
        ('bak_s6',ctypes.c_ushort),#预留默认0
        ('crc',ctypes.c_ubyte),#3～62字节异或校验低8位 
        ('end',ctypes.c_ubyte),
        # self.crc = 0x11c_ubyte),#0xaa
        
    ]
    # def __init__(self):
        # self.head   ='\x00'
        # self.head2  ='\x00'
        # self.length ='\0x21'
        # self.end ='\0xaa'
    def Print(self):
        print ("head :%x %x %d %x"%(self.head,self.head2,self.length,self.crc))


    
    def GetSend(self):

        data =bytearray(0x1A)
        # pi = ctypes.POINTER(data)
        ptr1 = (ctypes.c_ubyte *self.length ).from_buffer(data)
        self.head  =0xa5
        self.head2 =0x5a
        self.cmd =0x05
        self.s_cmd =0x02
        self.end =0xaa
        
        # ctypes.memmove(ctypes.addressof(data), ctypes.addressof(self), ctypes.sizeof(self))
        # ptr1 = (ctypes.c_ubyte).from_buffer(data)

        #self.write_to_buffer(ptr1,self)
        

        crc = crc16_table(ptr1)
        self.crc = 0x11
        print ("crc %x "%(crc))
        self.Print()

        ctypes.memmove(ptr1, ctypes.addressof(self), 0x1A)
        print ("data %s "%data)
        #do data;




#吊舱控制指令return data
#2吊舱发送至软件命令帧
class Pod_Send(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head FB
        ('head2', ctypes.c_ubyte),#head2 2A
        ('param1', ctypes.c_ubyte*2),#参数A
        ('param2', ctypes.c_ubyte*2),#参数B
        ('data', ctypes.c_ubyte*30),#经常是飞控遥测参数
        ('ctl',ctypes.c_ushort),#云台摇杆指令
        ('ctl_param1',ctypes.c_ushort),#云台摇杆控制参数
        ('ctl_param1',ctypes.c_ushort),#云台摇杆控制参数
    ]
    # def __init__(self):
        # self.head   ='\x00'
        # self.head2  ='\x00'
        # self.length ='\0x21'
        # self.end ='\0xaa'
    def Print(self):
        print ("head :%x %x "%(self.head,self.head2))

    #视场上移  
    def FieldUp(self):
        data =bytearray(44)
        gtime = time.localtime() 
        data[0]=0xfb
        data[1]=0x2c
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec    
        data[37]=0x70
        data[40]=0x14
        data[41]=0x00         
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        print(data)
        return data
    
    def test(self):
        data =bytearray(44)
        gtime = time.localtime() 
        data[0]=0xfb
        data[1]=0x2c
        data[7] =0x32
        data[9] =0x32
        data[11] =0x32
        data[13] =0x17
        data[14] =0x04
        data[15] =0x03
        data[16] =0x14
        data[17] =0x02
        data[18] =0x2b
        data[19] =0x23
        data[37]=0x70
        data[40]=0xfa
        data[41]=0xff
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        print(data.hex())
        return data
        
    
    #视场下移  
    def FieldDown(self):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[37]=0x70
        data[40]=0xec
        data[41]=0xff         
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data
    
    #视场左移  
    def FieldLeft(self):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[37]=0x70
        data[38]=0xec
        data[39]=0xff        
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data
    
    #视场右移  
    def FieldRight(self):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[37]=0x70
        data[38]=0x14
        data[39]=0x00        
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data
    
    #摄像头归中
    def Centering(self):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[3]=0x71
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data
    
    #拍照 
    def Photo(self):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[2]=0x34
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data
    
    #录像
    def Video(self):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[2]=0x33
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data

    #视场放大
    def LargenField(self):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[2]=0x45
        data[3]=0x01
        data[4]=0x07
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data
    
    #视场减小
    def ReduceField(self):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[2]=0x45
        data[3]=0x02
        data[4]=0x07
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data
    
    #焦距+
    def FocusUp(self):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[2]=0x45
        data[3]=0x03
        data[4]=0x03
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data

    #焦距-
    def FocusDown(self):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[2]=0x45
        data[3]=0x04
        data[4]=0x03
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data

    #开启激光测距
    def OpenLaser(self):
        gtime = time.localtime()
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[2]=0x3e
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data
    
    #关闭激光测距
    def CloseLaser(self):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[2]=0x3f
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data

    #跟踪
    def Tracking(self):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[2]=0x3a
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data
    
    #收藏
    def Collect(self):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[2]=0x74
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data

    #下视
    def Downward(self):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[2]=0x73
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data
    
    #扫描
    def Scanning(self):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[2]=0x79
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data
    
    #图像切换
    def ImageSwitch(self):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[2]=0x31
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data
    
    #清零
    def Cambeat(self,a,b,c,d,e,f,g,h):
        gtime = time.localtime() 
        data =bytearray(44)
        data[0]=0xfb
        data[1]=0x2c
        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec  
        #俯仰角
        str = struct.pack("h", a)
        data[7]=str[0]
        data[8]=str[1]
        #滚转角
        str1 = struct.pack("h", b)  
        data[9]=str1[0]
        data[10]=str1[1]
        #航向角
        str2 = struct.pack("h", c)  
        data[11]=str2[0]
        data[12]=str2[1]
        #经度
        str3 = struct.pack("f", d)  
        data[20]=str3[0]
        data[21]=str3[1]
        data[22]=str3[2]
        data[23]=str3[3]
        #纬度
        str4 = struct.pack("f", e)  
        data[24]=str4[0]
        data[25]=str4[1]
        data[26]=str4[2]
        data[27]=str4[3]

        #gps高度
        str5 = struct.pack("H", f)  
        data[29]=str5[0]
        data[30]=str5[1]
        #gps地速
        str6 = struct.pack("H", g)  
        data[31]=str6[0]
        data[32]=str6[1]
        #空速
        data[33]=str6[0]
        data[34]=str6[1]
        #相对大地高度
        str7 = struct.pack("H", h)  
        data[35]=str7[0]
        data[36]=str7[1]
        data[37]=0x60
        data[42]=bcc(data[2:42])
        data[43]=0xf0
        return data

    

    def GetSend(self):

        data =bytearray(44)
        # pi = ctypes.POINTER(data)
        # ptr1 = (ctypes.c_ubyte *42).from_buffer(data)
        # ptr1 = (ctypes.POINTER(ctypes.c_char)).from_address(ctypes.addressof(data)+2)
        # tmp = (ctypes.POINTER(ctypes.c_char)).from_address(ctypes.addressof(self)+2)
        gtime = time.gmtime() 
        data[0]=0xfb
        data[1]=0x2c
        data[2] =0x12
        # ctypes.memmove(ptr1, ctypes.addressof(self), 40)
        # ctypes.memmove(pif SelfCheck ==1 and Fight.Airport_Receive.battery_v < 44:



        data[13] =gtime.tm_year%100
        data[14] =gtime.tm_mon 
        data[15] =gtime.tm_mday
        data[16] =gtime.tm_hour
        data[17] =gtime.tm_min 
        data[18] =gtime.tm_sec

         
        # self.crc = 0x11
        #print ("str %s %x %d %d %d %d %d %d"%(crcstring,crc,gtime.tm_year,gtime.tm_mon,gtime.tm_mday,gtime.tm_hour,gtime.tm_min,gtime.tm_sec))
        #crc = crc16_table(crcstring)
        data[42]=bcc(data[2:42])
        data[43]=0xf0

        print ("data %s "%data)
        #do data;



#机场下传协议 0xc1
class Airport_Receive(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head aa
        ('head2', ctypes.c_ubyte),#head2 c1
        ('length', ctypes.c_ubyte),#length
        ('battery_v', ctypes.c_ubyte),#电池电压
        ('battery_temp', ctypes.c_ubyte),#电池温度
        ('wind_angle', ctypes.c_ubyte),#风向
        #7	6	5	4	3	2	1	0
        #北风	东北风	东风	东南风	南风	西南风	西风	西北风
        ('rain_snow', ctypes.c_ubyte),#雨雪传感器  1在下雨 0不在下雨
        ('out_temp', ctypes.c_float),#舱外温度
        ('out_humidity', ctypes.c_float),#舱外湿度
        ('in_temp', ctypes.c_float),#舱内温度
        ('in_humidity', ctypes.c_float),#舱内湿度
        ('warehouse_status', ctypes.c_ubyte),#舱盖状态 0舱盖关闭 1正在打开 2已打开
        ('warehouse_angle', ctypes.c_ubyte),#舱盖打开角度
        ('homing_status', ctypes.c_ubyte),#归位机构状态 0锁定 1正在锁定 2打开 3正在打开
        ('battery_status', ctypes.c_ubyte),#充电机状态  0电源断开 1电源打开
        ('uavpower_status', ctypes.c_float),#无人机电源状态 0无人机下电 1无人机上电
        ('bak1', ctypes.c_float),#预留
        ('bak2', ctypes.c_float),#预留
        ('bak3', ctypes.c_float),#预留
        ('bak4', ctypes.c_ubyte),#预留
        ('crc',ctypes.c_ushort),#crc16
        ('end',ctypes.c_ubyte),#0xaa
        
    ]
    # def __init__(self):
        # self.head   ='\x00'
        # self.head2  ='\x00'
        # self.length ='\0x21'
        # self.end ='\0xaa'
    def Print(self):
        print ("head :%x %x %d %x"%(self.head,self.head2,self.length,self.crc))


    
    def GetSend(self):

        data =bytearray(0x1A)
        # pi = ctypes.POINTER(data)
        ptr1 = (ctypes.c_ubyte *self.length ).from_buffer(data)
        self.head  =0xa5
        self.head2 =0x5a
        self.cmd =0x05
        self.s_cmd =0x02
        self.end =0xaa
        
        # ctypes.memmove(ctypes.addressof(data), ctypes.addressof(self), ctypes.sizeof(self))
        # ptr1 = (ctypes.c_ubyte).from_buffer(data)

        #self.write_to_buffer(ptr1,self)
        

        crc = crc16_table(ptr1)
        self.crc = 0x11
        print ("crc %x "%(crc))
        self.Print()

        ctypes.memmove(ptr1, ctypes.addressof(self), 0x1A)
        print ("data %s "%data)
        #do data;


#机场环境数据
class Airport_status(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head aa
        ('head2', ctypes.c_ubyte),#head2 c2
        ('length', ctypes.c_ubyte),#length
        ('wind_speed', ctypes.c_ushort),#风速x1000
        ('wind_angle', ctypes.c_ubyte),#风向
        #7	6	5	4	3	2	1	0
        #北风	东北风	东风	东南风	南风	西南风	西风	西北风
        ('rain_snow', ctypes.c_ubyte),#雨雪传感器
        ('out_temp', ctypes.c_float),#舱外温度
        #7	6	5	4	3	2	1	0
        #1温度为正值
        #0温度为负值	温度数据
        ('out_humidity', ctypes.c_float),#舱外湿度
        ('in_temp', ctypes.c_float),#舱内温度
        ('in_humidity', ctypes.c_float),#舱内湿度
        ('bak1', ctypes.c_float),#预留
        ('bak2', ctypes.c_float),#预留
        ('crc',ctypes.c_ubyte),#3～62字节异或校验低8位 
        ('end',ctypes.c_ubyte),#0xaa
        
    ]
    # def __init__(self):
        # self.head   ='\x00'
        # self.head2  ='\x00'
        # self.length ='\0x21'
        # self.end ='\0xaa'
    def Print(self):
        print ("head :%x %x %d %x"%(self.head,self.head2,self.length,self.crc))


    
    def GetSend(self):

        data =bytearray(0x1A)
        # pi = ctypes.POINTER(data)
        ptr1 = (ctypes.c_ubyte *self.length ).from_buffer(data)
        self.head  =0xa5
        self.head2 =0x5a
        self.cmd =0x05
        self.s_cmd =0x02
        self.end =0xaa
        
        # ctypes.memmove(ctypes.addressof(data), ctypes.addressof(self), ctypes.sizeof(self))
        # ptr1 = (ctypes.c_ubyte).from_buffer(data)

        #self.write_to_buffer(ptr1,self)
        

        crc = crc16_table(ptr1)
        self.crc = 0x11
        print ("crc %x "%(crc))
        self.Print()

        ctypes.memmove(ptr1, ctypes.addressof(self), 0x1A)
        print ("data %s "%data)
        #do data;


#1.4机场传感器数据-0xC4
class Airport_sensor(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head aa
        ('head2', ctypes.c_ubyte),#head2 c2
        ('length', ctypes.c_ubyte),#length
        ('x_val', ctypes.c_ushort),#X轴归位杆数据
        ('y_val', ctypes.c_ubyte),#Y轴归位数据
        ('ab_val', ctypes.c_ubyte),#A-B电动推杆数据
        ('cd_val', ctypes.c_ubyte),#A-C-D电动推杆数据
        ('x_pos', ctypes.c_float),#X轴归位杆所在位置
        ('y_pos', ctypes.c_float),#Y轴归位杆所在位置
        ('a_pos', ctypes.c_float),#A电动推杆所在位置
        ('b_pos', ctypes.c_float),#B电动推杆所在位置
        ('c_pos', ctypes.c_float),#C电动推杆所在位置
        ('d_pos', ctypes.c_float),#D电动推杆所在位置
        ('bak1', ctypes.c_float),#预留
        ('bak2', ctypes.c_float),#预留
        ('crc',ctypes.c_ubyte),#3～62字节异或校验低8位 
        ('end',ctypes.c_ubyte),#0xaa
        
    ]
    # def __init__(self):
        # self.head   ='\x00'
        # self.head2  ='\x00'
        # self.length ='\0x21'
        # self.end ='\0xaa'
    def Print(self):
        print ("head :%x %x %d %x"%(self.head,self.head2,self.length,self.crc))


    
    def GetSend(self):

        data =bytearray(0x1A)
        # pi = ctypes.POINTER(data)
        ptr1 = (ctypes.c_ubyte *self.length ).from_buffer(data)
        self.head  =0xa5
        self.head2 =0x5a
        self.cmd =0x05
        self.s_cmd =0x02
        self.end =0xaa
        
        # ctypes.memmove(ctypes.addressof(data), ctypes.addressof(self), ctypes.sizeof(self))
        # ptr1 = (ctypes.c_ubyte).from_buffer(data)

        #self.write_to_buffer(ptr1,self)
        

        crc = crc16_table(ptr1)
        self.crc = 0x11
        print ("crc %x "%(crc))
        self.Print()

        ctypes.memmove(ptr1, ctypes.addressof(self), 0x1A)
        print ("data %s "%data)
        #do data;

#机场运行心跳数据
class Airport_heartbeat(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head aa
        ('head2', ctypes.c_ubyte),#head2 c2
        ('length', ctypes.c_ubyte),#length
        ('warehouse_status', ctypes.c_ubyte),#舱盖状态
        ('warehouse_angle', ctypes.c_ubyte),#舱盖打开角度
        ('homing_status', ctypes.c_ubyte),#归位机构状态
        ('battery_status', ctypes.c_ubyte),#充电机状态
        ('uav_status', ctypes.c_float),#无人机状态
        ('bak1', ctypes.c_float),#预留
        ('bak2', ctypes.c_float),#预留
        ('crc',ctypes.c_ubyte),#3～62字节异或校验低8位 
        ('end',ctypes.c_ubyte),#0xaa
        
    ]
    # def __init__(self):
        # self.head   ='\x00'
        # self.head2  ='\x00'
        # self.length ='\0x21'
        # self.end ='\0xaa'
    def Print(self):
        print ("head :%x %x %d %x"%(self.head,self.head2,self.length,self.crc))


    
    def GetSend(self):

        data =bytearray(0x1A)
        # pi = ctypes.POINTER(data)
        ptr1 = (ctypes.c_ubyte *self.length ).from_buffer(data)
        self.head  =0xa5
        self.head2 =0x5a
        self.cmd =0x05
        self.s_cmd =0x02
        self.end =0xaa
        
        # ctypes.memmove(ctypes.addressof(data), ctypes.addressof(self), ctypes.sizeof(self))
        # ptr1 = (ctypes.c_ubyte).from_buffer(data)

        #self.write_to_buffer(ptr1,self)
        

        crc = crc16_table(ptr1)
        self.crc = 0x11
        print ("crc %x "%(crc))
        self.Print()

        ctypes.memmove(ptr1, ctypes.addressof(self), 0x1A)
        print ("data %s "%data)
        #do data;



#机场上传协议
# 舱盖控制-0xd1
class Hatch_control(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head aa
        ('head2', ctypes.c_ubyte),#head2 d1
        ('length', ctypes.c_ubyte),#length
        ('warehouse_status', ctypes.c_ubyte),#舱盖状态  0关闭舱盖 1打开舱盖
        # ('homing_status', ctypes.c_ubyte),#归位机构控制  0锁定 1解锁
        # ('charge_ctl', ctypes.c_ubyte),#充电状态控制  0充电 1断开充电
        ('bak1', ctypes.c_float),#预留
        ('bak2', ctypes.c_float),#预留
        ('bak3', ctypes.c_float),#预留
        ('bak4', ctypes.c_float),#预留
        ('bak5', ctypes.c_float),#预留
        ('bak6', ctypes.c_float),#预留
        ('bak7', ctypes.c_ubyte),#预留
        ('crc',ctypes.c_ushort),#3～28字节异或校验低8位 
        ('end',ctypes.c_ubyte),#0xaa    
    ]
    # def __init__(self):
        # self.head   ='\x00'
        # self.head2  ='\x00'
        # self.length ='\0x21'
        # self.end ='\0xaa'
    def Print(self):
        print ("head :%x %x %d %x"%(self.head,self.head2,self.length,self.crc))

    # 关闭舱盖
    def CloseHatch(self):
        data =bytearray(32)
        data[0]=0xaa
        data[1]=0xd1
        data[2]=0x20
        data[3]=0x00
        crcstring = data[2:29]
        crc = crc16_table(crcstring)
        data[29]=crc&0xff
        data[30]=(crc>>8)&0xff
        data[31]=0xaa
        return data   
    
    # 打开舱盖
    def OpenHatch(self):
        data =bytearray(32)
        data[0]=0xaa
        data[1]=0xd1
        data[2]=0x20
        data[3]=0x01
        crcstring = data[2:29]
        crc = crc16_table(crcstring)
        data[29]=crc&0xff
        data[30]=(crc>>8)&0xff
        data[31]=0xaa
        return data
    

#归位机构控制-0xd2
class Homing_control(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head aa
        ('head2', ctypes.c_ubyte),#head2 d1
        ('length', ctypes.c_ubyte),#length
        #('warehouse_status', ctypes.c_ubyte),#舱盖状态  0关闭舱盖 1打开舱盖
        ('homing_status', ctypes.c_ubyte),#归位机构控制  0锁定 1解锁
        # ('charge_ctl', ctypes.c_ubyte),#充电状态控制  0充电 1断开充电
        ('bak1', ctypes.c_float),#预留
        ('bak2', ctypes.c_float),#预留
        ('bak3', ctypes.c_float),#预留
        ('bak4', ctypes.c_float),#预留
        ('bak5', ctypes.c_float),#预留
        ('bak6', ctypes.c_float),#预留
        ('bak7', ctypes.c_ubyte),#预留
        ('crc',ctypes.c_ushort),#3～28字节异或校验低8位 
        ('end',ctypes.c_ubyte),#0xaa    
    ]
    # 归位锁定
    def HomeLock(self):
        data =bytearray(32)
        data[0]=0xaa
        data[1]=0xd2
        data[2]=0x20
        data[4]=0x00
        crcstring = data[2:29]
        crc = crc16_table(crcstring)
        data[29]=crc&0xff
        data[30]=(crc>>8)&0xff
        data[31]=0xaa
        return data    

    # 归位解锁
    def HomeUnlock(self):
        data =bytearray(32)
        data[0]=0xaa
        data[1]=0xd2
        data[2]=0x20
        data[4]=0x01
        crcstring = data[2:29]
        crc = crc16_table(crcstring)
        data[29]=crc&0xff
        data[30]=(crc>>8)&0xff
        data[31]=0xaa
        return data 


#充电控制-0xd3
class Charge_control(ctypes.LittleEndianStructure):
    _fields_=[
        ('head', ctypes.c_ubyte),#head aa
        ('head2', ctypes.c_ubyte),#head2 d1
        ('length', ctypes.c_ubyte),#length
        #('warehouse_status', ctypes.c_ubyte),#舱盖状态  0关闭舱盖 1打开舱盖
        #('homing_status', ctypes.c_ubyte),#归位机构控制  0锁定 1解锁
        ('charge_ctl', ctypes.c_ubyte),#充电状态控制  0充电 1断开充电
        ('bak1', ctypes.c_float),#预留
        ('bak2', ctypes.c_float),#预留
        ('bak3', ctypes.c_float),#预留
        ('bak4', ctypes.c_float),#预留
        ('bak5', ctypes.c_float),#预留
        ('bak6', ctypes.c_float),#预留
        ('bak7', ctypes.c_ubyte),#预留
        ('crc',ctypes.c_ushort),#3～28字节异或校验低8位 
        ('end',ctypes.c_ubyte),#0xaa    
    ]
    # 充电
    def Charge(self):
        data =bytearray(32)
        data[0]=0xaa
        data[1]=0xd3
        data[2]=0x20
        data[5]=0x00
        crcstring = data[2:29]
        crc = crc16_table(crcstring)
        data[29]=crc&0xff
        data[30]=(crc>>8)&0xff
        data[31]=0xaa
        return data

    # 断开充电
    def ChargeOff(self):
        data =bytearray(32)
        data[0]=0xaa
        data[1]=0xd3
        data[2]=0x20
        data[5]=0x01
        crcstring = data[2:29]
        crc = crc16_table(crcstring)
        data[29]=crc&0xff
        data[30]=(crc>>8)&0xff
        data[31]=0xaa
        return data     


    
    def GetSend(self):

        data =bytearray(0x1A)
        # pi = ctypes.POINTER(data)
        ptr1 = (ctypes.c_ubyte *self.length ).from_buffer(data)
        self.head  =0xa5
        self.head2 =0x5a
        self.cmd =0x05
        self.s_cmd =0x02
        self.end =0xaa
        
        # ctypes.memmove(ctypes.addressof(data), ctypes.addressof(self), ctypes.sizeof(self))
        # ptr1 = (ctypes.c_ubyte).from_buffer(data)

        #self.write_to_buffer(ptr1,self)
        

        crc = crc16_table(ptr1)
        self.crc = 0x11
        print ("crc %x "%(crc))
        self.Print()

        ctypes.memmove(ptr1, ctypes.addressof(self), 0x1A)
        print ("data %s "%data)
        #do data;


#测试指令数据

if __name__ == "__main__":    
    send = Flight_Course_Struct()
    print (">>>: %s "%(send.__class__.__name__ ))

    # send.GetSend()
    

    send = Course_Set_Struct()
    print (">>>: %s "%(send.__class__.__name__ ))
    # send.GetSend()
    
    send = Flight_Course_Struct()
    print (">>>: %s "%(send.__class__.__name__ ))
    send.PathUpdate(20.83764,14.3554,10.2,2,10,10,10,1)
    
    tr1 = (ctypes.c_ubyte *self.length ).from_buffer(data)
        self.head  =0xa5
        self.head2 =0x5a
        self.cmd =0x05
        self.s_cmd =0x02
        self.end =0xaa
        
        # ctypes.memmove(ctypes.addressof(data), ctypes.addressof(self), 