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
    for i in range(len(sortList[:-1])): #外层循环：i=0至N-2（N-1趟）；
        stepList.append('{}:i={}'.format(define.Step.idx.name,i))
        for j in range(len(sortList[:-1 - i])):   #内层循环：j=0至N-2-i（N-1-i趟）；
            stepList.append('{}:j={}'.format(define.Step.idx.name,j))
            stepList.append('{}:{},{}'.format(define.Step.cmp.name,sortList[j].Id,sortList[j + 1].Id))
            if sortList[j] > sortList[j + 1]:   #相邻比较，前者大就交换；
                stepList.append('{}'.format(define.Step.swp.name))
                (sortList[j],sortList[j + 1]) = (sortList[j + 1],sortList[j])
    print('{}'.format(json.dumps(stepList)))
    return render(request, 'sort_bubble.html',{define.MetaListKey : metaList,
                                               define.SortListKey : sortList,
                                               define.StepJsonKey : json.dumps(stepList)
                                               })