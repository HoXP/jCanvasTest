from django.shortcuts import render
from django.http import JsonResponse
import json
from Main import define
from Main import utils
from Main import meta_data_mgr
#from django.views.decorators.csrf import csrf_exempt

def index(request):
    metaList = meta_data_mgr.GetRandomMataList()
    return render(request, 'index.html',{define.MetaListKey : metaList})

def sort_bubble(request):
    metaList = meta_data_mgr.GetNumbersByRequest(request)
    sortList = metaList.copy()
    stepList = []
    stepList.append('{}:{}'.format(define.Step.opr.name, 'gt'))
    for outer in range(len(sortList) - 1,0,-1): #外层循环：倒序，递减；[N-1,0)【N-1趟】；
        stepList.append('{}:outer={}'.format(define.Step.idx.name,outer))
        for inner in range(outer):   #内层循环：正序，递增；[0,outer)【outer趟】；
            stepList.append('{}:inner={}'.format(define.Step.idx.name,inner))
            stepList.append('{}:{},{}'.format(define.Step.cmp.name,sortList[inner].Id,sortList[inner + 1].Id))
            if sortList[inner] > sortList[inner + 1]:   #相邻比较，前者大就交换；
                stepList.append('{}:{},{}'.format(define.Step.swp.name,sortList[inner].Id,sortList[inner + 1].Id))
                (sortList[inner],sortList[inner + 1]) = (sortList[inner + 1],sortList[inner])
    print('{}'.format(json.dumps(stepList)))
    return render(request, 'sort_bubble.html',{define.MetaListKey : metaList,
                                               define.SortListKey : sortList,
                                               define.StepJsonKey : json.dumps(stepList)
                                               })

def sort_selection(request):
    metaList = meta_data_mgr.GetNumbersByRequest(request)
    sortList = metaList.copy()
    stepList = []
    stepList.append('{}:{}'.format(define.Step.opr.name, 'lt'))
    min = 0
    for outer in range(len(sortList)): #外层循环：正序，递增；[0,N)【N趟】；
        stepList.append('{}:outer={}'.format(define.Step.idx.name,outer))
        min = outer
        stepList.append('{}:min={}'.format(define.Step.idx.name,min))
        for inner in range(outer + 1,len(sortList)):   #内层循环：正序，递增；[outer + 1,N)【N-outer-1趟】；
            stepList.append('{}:inner={}'.format(define.Step.idx.name,inner))
            stepList.append('{}:{},{}'.format(define.Step.cmp.name,sortList[inner].Id,sortList[min].Id))
            if sortList[inner] < sortList[min]:
                min = inner
                stepList.append('{}:min={}'.format(define.Step.idx.name,min))
        stepList.append('{}:{},{}'.format(define.Step.swp.name,sortList[outer].Id,sortList[min].Id))
        (sortList[outer],sortList[min]) = (sortList[min],sortList[outer])
    utils.PrintList(sortList)
    return render(request, 'sort_selection.html',{define.MetaListKey : metaList,
                                               define.SortListKey : sortList,
                                               define.StepJsonKey : json.dumps(stepList)
                                               })

def sort_insertion(request):
    stepList = []
    metaList = meta_data_mgr.GetNumbersByRequest(request)
    sortList = metaList.copy()
    for outer in range(1,len(sortList)):
        stepList.append('{}:outer={}'.format(define.Step.idx.name,outer))
        temp = sortList[outer]
        stepList.append('{}:{},{}'.format(define.Step.sei.name,define.TempId,temp.Value))
        inner = outer
        stepList.append('{}:inner={}'.format(define.Step.idx.name,inner))
        while inner > 0 and sortList[inner - 1] > temp:
            stepList.append('{}:{},{}'.format(define.Step.cmp.name,inner - 1,define.TempId))
            sortList[inner] = sortList[inner - 1]
            stepList.append('{}:{},{}'.format(define.Step.sei.name,inner,sortList[inner].Value))
            inner -= 1
            stepList.append('{}:inner={}'.format(define.Step.idx.name,inner))
        sortList[inner] = temp
        stepList.append('{}:{},{}'.format(define.Step.sei.name,inner,sortList[inner].Value))
    return render(request, 'sort_insertion.html',{define.MetaListKey : metaList,
                                               define.SortListKey : sortList,
                                               define.StepJsonKey : json.dumps(stepList)
                                               })

def search_binary(request):
    stepList = []
    metaList = meta_data_mgr.GetNumbersByRequest(request)
    sortList = meta_data_mgr.GetSortedListByMetaList(metaList,True)
    target = meta_data_mgr.GetTargetByRequest(request)
    stepList.append('{}:{},{}'.format(define.Step.sei.name,define.TempId,target))
    ret = -1;
    stepList.append('{}:ret={}'.format(define.Step.idx.name,ret))
    upper = len(sortList) - 1
    stepList.append('{}:upper={}'.format(define.Step.idx.name,upper))
    lower = 0
    stepList.append('{}:lower={}'.format(define.Step.idx.name,lower))
    mid = 0
    stepList.append('{}:mid={}'.format(define.Step.idx.name,mid))
    while lower <= upper:
        stepList.append('{}:{},{}'.format(define.Step.cmp.name,lower,upper))
        mid = (upper + lower) / 2
        stepList.append('{}:mid={}'.format(define.Step.idx.name,mid))
        mid = int(mid)
        stepList.append('{}:mid={}'.format(define.Step.idx.name,mid))
        stepList.append('{}:{},{}'.format(define.Step.cmp.name,mid,define.TempId))
        if sortList[mid] == target:
            ret = mid
            stepList.append('{}:ret={}'.format(define.Step.idx.name,ret))
            break
        else:
            if (target < sortList[mid]):
                upper = mid - 1
                stepList.append('{}:upper={}'.format(define.Step.idx.name,upper))
            else:
                lower = mid + 1
                stepList.append('{}:lower={}'.format(define.Step.idx.name,lower))
    return render(request, 'sort_insertion.html',{define.MetaListKey : sortList,
                                                  define.StepJsonKey : json.dumps(stepList)})

def search_binary_recursion(request):
    stepList = []
    metaList = meta_data_mgr.GetNumbersByRequest(request)
    sortList = meta_data_mgr.GetSortedListByMetaList(metaList,True)
    target = meta_data_mgr.GetTargetByRequest(request)
    stepList.append('{}:{},{}'.format(define.Step.sei.name,define.TempId,target))
    upper = len(sortList) - 1
    stepList.append('{}:upper={}'.format(define.Step.idx.name,upper))
    lower = 0
    stepList.append('{}:lower={}'.format(define.Step.idx.name,lower))
    ret = RBinarySearch(sortList,target,lower,upper)
    stepList.append('{}:ret={}'.format(define.Step.idx.name,ret))
    return render(request, 'sort_insertion.html',{define.MetaListKey : sortList,
                                                  define.StepJsonKey : json.dumps(stepList)})

def RBinarySearch(list,value, lower, upper):
    if lower > upper:
        return -1
    else:
        mid = int((upper + lower) / 2)
        stepList.append('{}:mid={}'.format(define.Step.idx.name,mid))
        stepList.append('{}:{},{}'.format(define.Step.cmp.name,mid,define.TempId))
        if value < list[mid]:
            return RBinarySearch(list,value, lower, mid - 1)
        elif value == list[mid]:
            return mid
        else:
            return RBinarySearch(list,value, mid + 1, upper)
