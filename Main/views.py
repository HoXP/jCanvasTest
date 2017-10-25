from django.shortcuts import render
from django.http import JsonResponse
import json
from Main import define
from Main import utils
from Main import meta_data_mgr
#from django.views.decorators.csrf import csrf_exempt
def index(request):
    dict = {}
    dict['ss'] = 0
    dict['aa'] = 1
    dict['ss'] = 1
    print(json.dumps(dict))

    metaList = meta_data_mgr.InitMataListByRandomNums()
    return render(request, 'index.html',{define.MetaListKey : metaList})

#def sort_bubble(request):
#    metaList = meta_data_mgr.GetNumbersByRequest(request)
#    sortList = metaList.copy()
#    stepList = []
#    stepList.append(Dump(define.StepOpertor('gt'),define.StepOpertorEncoder))
#    #stepString ='opr:%s;'%('gt')
#    for i in range(len(sortList[:-1])): #外层循环：遍历0至N-1的列表切片；list长度为N，因为从0开始，所以需要减1，实际进行了N-1趟循环（0~N-2）
#        stepList.append(Dump(define.StepIndex('i',i),define.StepIndextorEncoder))
#        #stepString+='idx:i=%d;'%(i)
#        for j in range(len(sortList[:-1 - i])):   #内层循环的要点是相邻比较；当j=4的时候，就退出循环了
#            stepList.append(Dump(define.StepIndex('j',j),define.StepIndextorEncoder))
#            #stepString+='idx:j=%d;'%(j)
#            stepList.append(Dump(define.StepCompare(sortList[j].Id,sortList[j + 1].Id),define.StepCompareEncoder))
#            #stepString+='cmp:%d,%d;'%(sortList[j].Id,sortList[j + 1].Id)
#            if sortList[j] > sortList[j + 1]:   #相邻两数，前者大就交换
#                stepList.append(Dump(define.StepSwap(),define.StepSwapEncoder))
#                #stepString+='swp;'
#                (sortList[j],sortList[j + 1]) = (sortList[j + 1],sortList[j])
#    #print('{}'.format(json.dumps(stepList)))
#    return render(request, 'sort_bubble.html',{define.MetaListKey : metaList,
#                                               define.SortListKey : sortList,
#                                               define.StepDictKey : stepList
#                                               })

#def Dump(obj,encoder):
#     return json.dumps(obj,cls=encoder).strip('"')

def sort_bubble(request):
    metaList = meta_data_mgr.GetNumbersByRequest(request)
    sortList = metaList.copy()
    stepList = []
    stepList.append('{}:{}'.format(define.Step.opr.name, 'gt'))
    for i in range(len(sortList[:-1])): #外层循环：遍历0至N-1的列表切片；list长度为N，因为从0开始，所以需要减1，实际进行了N-1趟循环（0~N-2）
        stepList.append('{}:i={}'.format(define.Step.idx.name,i))
        for j in range(len(sortList[:-1 - i])):   #内层循环的要点是相邻比较；当j=4的时候，就退出循环了
            stepList.append('{}:j={}'.format(define.Step.idx.name,j))
            stepList.append('{}:{},{}'.format(define.Step.cmp.name,sortList[j].Id,sortList[j + 1].Id))
            if sortList[j] > sortList[j + 1]:   #相邻两数，前者大就交换
                stepList.append('{}'.format(define.Step.swp.name))
                (sortList[j],sortList[j + 1]) = (sortList[j + 1],sortList[j])
    print('{}'.format(json.dumps(stepList)))
    return render(request, 'sort_bubble.html',{define.MetaListKey : metaList,
                                               define.SortListKey : sortList,
                                               define.StepJsonKey : json.dumps(stepList)
                                               })