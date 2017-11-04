from django.shortcuts import render
from django.http import JsonResponse
import json
from Main import define
from Main import utils
from Main import meta_data_mgr
#from django.views.decorators.csrf import csrf_exempt

def index(request):
    metaList = meta_data_mgr.InitMataListByRandomNums()
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
    metaList = meta_data_mgr.GetNumbersByRequest(request)
    sortList = metaList.copy()
    stepList = []
    tempId = -1;
    for outer in range(1,len(sortList)):
        stepList.append('{}:outer={}'.format(define.Step.idx.name,outer))
        temp = sortList[outer]
        stepList.append('{}:{},{}'.format(define.Step.sei.name,tempId,temp.Value))
        inner = outer
        stepList.append('{}:inner={}'.format(define.Step.idx.name,inner))
        while inner > 0 and sortList[inner - 1] > temp:
            stepList.append('{}:{},{}'.format(define.Step.cmp.name,inner - 1,tempId))
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