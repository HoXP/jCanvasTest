from Main import define
import random
import string

def InitMataListByStrs(strs):
    metalist = []
    strs = numberStr.split(',')
    i = 0
    for x in strs:
        metalist.append(define.DataItem(i,string.atoi(x)))
        i+=1
    return metalist

def InitMataListByRandomNums():
    metalist = []
    for i in range(0, 10):
        metalist.append(define.DataItem(i,random.randrange(0, 999, 1)))
    return metalist