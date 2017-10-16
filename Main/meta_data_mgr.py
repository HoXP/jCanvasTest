from Main import define
import random
import string

metalist = []

def InitMataListByStrs(strs):
    strs = numberStr.split(',')
    i = 0
    for x in strs:
        metalist.append(define.DataItem(i,string.atoi(x)))
        i+=1

def InitMataListByRandomNums():
    for i in range(0, 10):
        metalist.append(define.DataItem(i,random.randrange(0, 999, 1)))

InitMataListByRandomNums();