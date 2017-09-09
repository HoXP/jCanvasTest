from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def sort_bubble(request):
    list = [34,7856,2,546,89,90,21]
    print('开始：{}'.format(list))
    i = 0
    for i_item in list[:-1]:	    #遍历0至N-1的列表切片；list长度为N，因为从0开始，所以需要减1，实际进行了N-1趟循环（0~N-2）
        j = 0
        for j_item in list[:-1-i]:  #内层循环的要点是相邻比较。当j=4的时候，就推出循环了
            if list[j] > list[j + 1]:   #如果相邻两个数，前者大，就交换
                (list[j],list[j + 1]) = (list[j + 1],list[j])
            j+=1
        i+=1
    print('结果：{}'.format(list))
    return render(request, 'sort_bubble.html',{'list': list})