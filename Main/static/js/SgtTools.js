//实现占位符;
String.prototype.format = function () {
    if (arguments.length == 0) return this;
    for (var s = this, i = 0; i < arguments.length; i++)
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return s;
};

//Step枚举;
if (typeof Step == "undefined") {
    var Step = {
        opr: 'opr',
        idx: 'idx',
        cmp: 'cmp',
        swp: 'swp'
    }
}

//工具单例;
var SgtTools = (function () {
    function init() {
        return {
            MetaListKey: "metalist",    //元数据键字符串;
            NumMaxCount: 1000, //数字最多个数;

            OriginalPosX: 50,  //初始位置X;
            OriginalPosY: 50,  //初始位置Y;
            OriginalColor: 'rgb(51, 161, 201)',  //初始颜色;

            OriginalSpacing: 10,    //初始间隔;
            SwapArrowPosYOffset: 50,   //交换箭头线偏移;
            IndexPosYOffset: 30, //索引偏移;
            ValuePosYOffset: 30, //数字偏移;

            MaxValue: 0,   //最大的数

            ArrStep: new Array(),    //分步数组;

            //DictStepIndex: new Array(), //索引集合
            DictStepIndex: {}, //索引集合
            
            //Function
            CurProtocolHost: function () {  //当前协议名+主机名端口号字符串（http://localhost:00000）
                return "{0}//{1}/".format(window.location.protocol, window.location.host);
            }
            ,
            GetFullUrl: function (pathName, metaParam) {    //获取全URL;
                var ph = this.CurProtocolHost();
                return "{0}{1}?{2}={3}".format(ph, pathName, this.MetaListKey, metaParam);
            },
            GetMetaListStr: function () {   //获取元数据字串（N1,N2,...,Nn）;
                return sessionStorage.getItem(this.MetaListKey);
            },
            //参数：Id1:N1,Id2:N2,...,IdN,Nn
            //返回：Node类型数组;
            GetNodeListByStr: function (str) {
                var stepArr = str.split(',');
                var nodeArr = new Array();
                if (stepArr != null) {
                    var numCount = stepArr.length;
                    for (var i = 0; i < numCount; ++i) {
                        node = new Node(stepArr[i]);
                        nodeArr.push(node);
                        if (node.Value > this.MaxValue) {//记录最大值;
                            this.MaxValue = node.Value;
                        }
                    }
                }
                return nodeArr;
            },
            GetItemPosY: function () {//矩形的偏移=交换线+索引区+数字区;
                return this.OriginalPosY + this.SwapArrowPosYOffset + this.IndexPosYOffset + this.ValuePosYOffset;
            },
            GetItemWidthByItemCount: function (numCount) {
                var canvasW = $(cvsId).attr('width'); //画布宽度;
                var width = canvasW - this.OriginalPosX * 2; //刨去左右两端的空白;
                width = (width - (numCount - 1) * this.OriginalSpacing) / numCount; //刨去(N-1)个间隔，再除以N;
                return width;
            }
            ,
            GetItemHeightByValue: function (val) {
                var canvasH = $(cvsId).attr('height');//画布高度;
                var height = canvasH - this.GetItemPosY();
                height = val / this.NumMaxCount * height;
                return height;
            },
            GetValuePosY: function (){
                return this.OriginalPosY + this.SwapArrowPosYOffset + this.IndexPosYOffset;
            },
            GetDictStepIndexByKey: function (key) {//根据键字符串获取该键的索引;
                if (this.DictStepIndex != null) {
                    var i = 0;
                    for (var item in this.DictStepIndex) {
                        if (item == key) {
                            return i;
                        }
                        i++;
                    }
                }
                return -1;
            }
        }
    }
    var instance = null;
    return {
        Instance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    }
})();

function Node(str)//构造函数
{
    //---------Field---------
    //Public;
    this.Id;
    this.Value;
    var strArr = str.split(':');
    if (strArr != null && strArr.length == 2) {
        this.Id = parseInt($.trim(strArr[0]));
        this.Value = parseInt($.trim(strArr[1]));
    }
    //---------Function---------
    //Private;
    //function priMethod() {
    //}
    //Public;
    //Node.prototype.PubFunc = function () {
    //}
}
var cvsId = '#cvs';