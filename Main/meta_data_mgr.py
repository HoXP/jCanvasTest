from Main import define
import random

def GetNumbersByRequest(request):
    numberStr = request.GET[define.MetaListKey]
    if (numberStr == 'undefined' or numberStr == 'null'):
        numberStr = '0'
    return GetMataListByStrs(numberStr)

def GetMataListByStrs(str):
    metalist = []
    strs = str.split(',')
    i = 0
    for x in strs:
        metalist.append(define.DataItem(i,int(x)))
        i+=1
    return metalist

def InitMataListByRandomNums():
    metalist = []
    for i in range(0, 10):
        metalist.append(define.DataItem(i,random.randrange(0, 999, 1)))
    return metalist