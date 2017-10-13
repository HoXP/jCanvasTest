from django.shortcuts import render
from django.http import JsonResponse
from Main import define
from Main import utils
import json

def index(request):
    return render(request, 'index.html')

def sort_bubble(request):
    list = [define.DataItem(0,32),define.DataItem(1,4),define.DataItem(2,231)]
    utils.PrintList(list)
    i = 0
    for i_item in list[:-1]:	    #遍历0至N-1的列表切片；list长度为N，因为从0开始，所以需要减1，实际进行了N-1趟循环（0~N-2）
        j = 0
        for j_item in list[:-1-i]:  #内层循环的要点是相邻比较。当j=4的时候，就推出循环了
            if list[j] > list[j + 1]:   #如果相邻两个数，前者大，就交换
                (list[j],list[j + 1]) = (list[j + 1],list[j])
            j+=1
        i+=1
    utils.PrintList(list)
    return render(request, 'sort_bubble.html',{'list': list})

def ajax_tool(request):
    numberStr = request.GET['a']
    strs = numberStr.split(',')
    print(strs)
    list = []
    i = 0
    for x in strs:
        list.append(define.DataItem(i,x))
        i+=1
    utils.PrintList(list)
    return render(request, 'data.html',{'list': list})