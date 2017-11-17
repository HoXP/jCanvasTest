var goon = false;   //是否继续;
var operator;   //操作符;

function SetGoon(boo) {
    goon = boo;
}
function GetSplitStrs(splitChar, str) {
    var strs = str.split(splitChar);
    if (strs != null && strs.length == 2) {
        return strs;
    }
}
function Flush() {
    goon = false;
    if (SgtTools.Instance().ArrStep == null || SgtTools.Instance().ArrStep.length == 0) {
        return;
    }
    var str = SgtTools.Instance().ArrStep.shift();
    if (str == null) {
        goon = true;
        return;
    }
    var stepArr = GetSplitStrs(':', str);
    var stepKey = stepArr[0];
    var stepVal = stepArr[1];
    switch (stepKey) {
        case (Step.opr):
            operator = stepVal;
            SetGoon(true);
            break;
        case (Step.idx):
            var indexArr = GetSplitStrs('=', stepVal);
            AddOrUpdateIndex(indexArr[0], parseInt(indexArr[1]));
            SetGoon(true);
            break;
        case (Step.cmp):
            var strs = GetSplitStrs(',', stepVal);
            Cmp(parseInt(strs[0]), parseInt(strs[1]));
            break;
        case (Step.swp):
            var strs = GetSplitStrs(',', stepVal);
            Swap(parseInt(strs[0]), parseInt(strs[1]));
            break;
        case (Step.set):
            var strs = GetSplitStrs(',', stepVal);
            Set(parseInt(strs[0]), parseInt(strs[1]));
            break;
        case (Step.sei):
            var strs = GetSplitStrs(',', stepVal);
            Sei(parseInt(strs[0]), parseInt(strs[1]));
            break;
        default:
            console('stepKey');
            break;
    }
}
function Update() {
    setInterval(function () {
        if (goon) {
            Flush();
        }
    }, 100);
}
$(function () {
    if ($(cvsId) == null) {
        alert("no canvas");
        return;
    }
    Init();
    Update();
});