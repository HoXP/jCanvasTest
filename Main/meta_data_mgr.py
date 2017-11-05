from Main import define
import random

#根据request获取元数据;
def GetNumbersByRequest(request):
    numberStr = request.GET[define.MetaListKey]
    if (numberStr == 'undefined' or numberStr == 'null'):
        numberStr = '0'
    return GetMataListByStrs(numberStr)

#根据request获取target;
def GetTargetByRequest(request):
    target = request.GET[define.TargetKey]
    if (target == 'undefined' or target == 'null'):
        target = '-1'
    return int(target)

#根据字串获取元数据列表;
def GetMataListByStrs(str):
    metalist = []
    strs = str.split(',')
    i = 0
    for x in strs:
        metalist.append(define.DataItem(i,int(x)))
        i+=1
    return metalist

#获取随机元数据列表;
def GetRandomMataList():
    metalist = []
    for i in range(0, 10):
        metalist.append(define.DataItem(i,random.randrange(0, 999, 1)))
    return metalist

#获取已排好序（升序）的列表;
def GetSortedListByMetaList(metaList,isIdSorted = False):
    list = metaList.copy()
    BubbleSort(list)
    if(isIdSorted): #列表条目的ID也是有序的
        for i in range(0,len(list)):
            list[i].Id = i
    return list

def BubbleSort(list):
    for outer in range(len(list) - 1,0,-1):
        for inner in range(outer):
            if list[inner] > list[inner + 1]:
                (list[inner],list[inner + 1]) = (list[inner + 1],list[inner])