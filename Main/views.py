from django.shortcuts import render
from django.http import JsonResponse
import json
from Main import define
from Main import utils
from Main import meta_data_mgr

def index(request):
    return render(request, 'index.html',{'sort_list': [],'meta_list' : json.dumps(meta_data_mgr.metalist)})

def sort_bubble(request):
    sortList = meta_data_mgr.metalist
    utils.PrintList(sortList)
    i = 0
    for i_item in sortList[:-1]:	    #遍历0至N-1的列表切片；list长度为N，因为从0开始，所以需要减1，实际进行了N-1趟循环（0~N-2）
        j = 0
        for j_item in sortList[:-1-i]:  #内层循环的要点是相邻比较。当j=4的时候，就推出循环了
            if sortList[j] > sortList[j + 1]:   #如果相邻两个数，前者大，就交换
                (sortList[j],sortList[j + 1]) = (sortList[j + 1],sortList[j])
            j+=1
        i+=1
    utils.PrintList(sortList)
    return render(request, 'sort_bubble.html',{'sort_list': sortList,'meta_list' : json.dumps(meta_data_mgr.metalist)})

def ajax_tool(request):
    numberStr = request.GET['a']
    utils.PrintList(numberStr)
    InitMataListByStrs(numberStr)
    utils.PrintList(meta_data_mgr.metalist)
    return render(request, 'data.html',{'sort_list': meta_data_mgr.metalist,'meta_list' : json.dumps(meta_data_mgr.metalist)})