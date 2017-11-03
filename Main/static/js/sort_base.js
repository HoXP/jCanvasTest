var goon = false;   //是否继续;
var operator;   //操作符;

function SetGoon(boo) {
    goon = boo;
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
    var stepArr = str.split(':');
    if (stepArr != null && stepArr.length > 0) {
        var stepKey = stepArr[0];
        var stepVal = stepArr[1];
        switch (stepKey) {
            case (Step.opr):
                operator = stepVal;
                SetGoon(true);
                break;
            case (Step.idx):
                var indexArr = stepVal.split('=');
                if (indexArr != null && indexArr.length == 2) {
                    var indexName = indexArr[0];
                    var indexValue = parseInt(indexArr[1]);
                    AddOrUpdateIndex(indexName, indexValue);
                    SetGoon(true);
                }
                break;
            case (Step.cmp):
                var ids = stepVal.split(',');
                if (ids != null && ids.length == 2) {
                    var id1 = parseInt(ids[0]);
                    var id2 = parseInt(ids[1]);
                    Cmp(id1, id2);
                }
                break;
            case (Step.swp):
                var ids = stepVal.split(',');
                if (ids != null && ids.length == 2) {
                    var id1 = parseInt(ids[0]);
                    var id2 = parseInt(ids[1]);
                    Swap(id1, id2);
                }
                break;
            case (Step.set):
                var ids = stepVal.split(',');
                if (ids != null && ids.length == 2) {
                    var id = parseInt(ids[0]);
                    var val = parseInt(ids[1]);
                    Set(id, val);
                }
                break;
            default:
                console('stepKey');
                break;
        }
    }
}
function Update() {
    setInterval(function () {
        if (goon) {
            Flush();
        }
    }, 1000);
}
$(function () {
    if ($(cvsId) == null) {
        alert("no canvas");
        return;
    }
    Init();
    Update();
});