import json
from enum import Enum

MetaListKey = 'metalist'
SortListKey = 'sortlist'
StepJsonKey = 'stepjson'

class DataItem(object):
    #StaticFeild = 0 #定义在类之内__init__方法之外的为类字段，即静态变量
    def __init__(self,id,val):
    	self.Id = id        #数据的ID，确保唯一
    	self.Value = val    #数据的值

    def __lt__(self,val):    #X < Y
        return self.Value < val
    def __gt__(self,val):    #X > Y
        return self.Value > val
    def __le__(self,val):    #X <= Y
        return self.Value <= val
    def __ge__(self,val):    #X >= Y
        return self.Value >= val
    def __eq__(self,val):    #X == Y
        return self.Value == val
    def __ne__(self,val):    #X != Y
        return self.Value != val

    def __str__(self):
        return '{}:{}'.format(self.Id,self.Value)

class DataItemEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, DataItem):
            return '{}_{}'.format(obj.Id, obj.Value)
        return json.JSONEncoder.default(self, obj)
    
#Step相关类;
class Step(Enum):
    opr = 1
    idx = 2
    cmp = 3
    swp = 4

class StepBase(object):
    def __init__(self,enm):
    	self.StepType = enm

class StepOpertor(StepBase):
    def __init__(self,op):
        StepBase.__init__(self,Step.opr)
        self.Operator = op
    def __str__(self):
        return '{}:{}'.format(self.StepType.name ,self.Operator)
class StepOpertorEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, StepOpertor):
            return str(obj)
        return json.JSONEncoder.default(self, obj)

class StepIndex(StepBase):
    def __init__(self,name,val):
        StepBase.__init__(self,Step.idx)
        self.Name = name
        self.Value = val
class StepIndextorEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, StepIndex):
            return '{}:{},{}'.format(obj.StepType.name,obj.Name,obj.Value)
        return json.JSONEncoder.default(self, obj)

class StepCompare(StepBase):
    def __init__(self,v1,v2):
        StepBase.__init__(self,Step.cmp)
        self.Value1 = v1
        self.Value2 = v2
class StepCompareEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, StepCompare):
            return '{}:{},{}'.format(obj.StepType.name,obj.Value1,obj.Value2)
        return json.JSONEncoder.default(self, obj)

class StepSwap(StepBase):
    def __init__(self):
        StepBase.__init__(self,Step.swp)
class StepSwapEncoder(json.JSONEncoder):
    def default(self,obj):
        if isinstance(obj, StepSwap):
            return '{}'.format(obj.StepType.name)
        return json.JSONEncoder.default(self,obj)