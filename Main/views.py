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
                stepList.append('{}'.format(define.Step.swp.name))
                (sortList[inner],sortList[inner + 1]) = (sortList[inner + 1],sortList[inner])
    print('{}'.format(json.dumps(stepList)))
    return render(request, 'sort_bubble.html',{define.MetaListKey : metaList,
                                               define.SortListKey : sortList,
                                               define.StepJsonKey : json.dumps(stepList)
                                               })