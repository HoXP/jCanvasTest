﻿class DataItem(object):
    def __init__(self,id,val):
    	self.Id = id        #数据的ID，确保唯一
    	self.Value = val    #数据的值StaticFeild = 0 #定义在类之内__init__方法之外的为类字段，即静态变量