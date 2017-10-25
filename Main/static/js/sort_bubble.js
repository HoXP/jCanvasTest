var goon = false;   //是否继续;
var operator;   //操作符;
var curGroupIds = new Array();  //当前比较的组ID的数组;

function Init() {
    var metaList = $('#divMeta').text();
    var nodeList = SgtTools.Instance().GetNodeListByStr(metaList);
    if (nodeList != null) {
        var rectW = SgtTools.Instance().GetItemWidthByItemCount(nodeList.length);
        var valPosY = SgtTools.Instance().GetValuePosY();
        var itemPosY = SgtTools.Instance().GetItemPosY();
        for (var i = 0; i < nodeList.length; ++i) {
            var item = nodeList[i];
            var xPos = SgtTools.Instance().OriginalPosX + i * (rectW + SgtTools.Instance().OriginalSpacing);
            var groupName = 'G{0}'.format(item.Id);
            $(cvsId).drawText({
                layer: true,
                groups: [groupName],
                name: 'txt{0}'.format(item.Id),
                fromCenter: false,
                fillStyle: SgtTools.Instance().OriginalColor,
                x: xPos,
                y: valPosY,
                fontSize: 24,
                text: '{0}'.format(item.Value)
            }).drawRect({
                layer: true,
                groups: [groupName],
                name: 'rct{0}'.format(item.Id),
                fromCenter: false,
                fillStyle: SgtTools.Instance().OriginalColor,
                x: xPos,
                y: itemPosY,
                width: rectW,
                height: SgtTools.Instance().GetItemHeightByValue(item.Value)
            });
        }
    }

    var stepStr = $('#divStepStr').text();
    SgtTools.Instance().ArrStep = JSON.parse(stepStr);
    goon = true;
}
function AddOrUpdateIndex(name, value) {
    SgtTools.Instance().DictStepIndex[name] = value;
    var layerName = 'idx_{0}'.format(name);
    var layerText = '{0}={1}'.format(name, value);
    var layer = $(cvsId).getLayer(layerName);
    if (layer != null) {
        $(cvsId).setLayer(layerName, {
            text: layerText
        }).drawLayers();
    } else {
        $(cvsId).addLayer({
            type: 'text',
            name: layerName,
            fromCenter: false,
            fillStyle: '#04f',
            fontSize: 24,
            x: SgtTools.Instance().OriginalPosY + 100 * SgtTools.Instance().GetDictStepIndexByKey(name),
            y: SgtTools.Instance().OriginalPosY,
            text: layerText
        }).drawLayers();
    }
    goon = true;
}
function Cmp(id1, id2) {
    curGroupIds[0] = 'G{0}'.format(id1);
    curGroupIds[1] = 'G{0}'.format(id2);
    var time = 100;
    $(cvsId).animateLayerGroup(curGroupIds[0], {
        fillStyle: 'rgb(204, 51, 51)'
    }, time, function (layer) {
        $(this).animateLayerGroup(curGroupIds[0], {
            fillStyle: SgtTools.Instance().OriginalColor
        },
        'slow',
        'swing');
    });
    $(cvsId).animateLayerGroup(curGroupIds[1], {
        fillStyle: 'rgb(204, 51, 51)'
    }, time, function (lg) {
        $(this).animateLayerGroup(curGroupIds[1], {
            fillStyle: SgtTools.Instance().OriginalColor,
            complete: function (layer) {
                if (layer.name == 'rct{0}'.format(id2)) {
                    goon = true;
                }
            }
        },'slow','swing');
    });
}
function Swap() {
    var l1 = $(cvsId).getLayerGroup(curGroupIds[0]);
    var l2 = $(cvsId).getLayerGroup(curGroupIds[1]);
    if (l1 == null) {
        alert('l1 == null');
    }
    var g1pos = l1[0].x;
    var g2pos = l2[0].x;
    var time = 500;
    $(cvsId).animateLayerGroup(curGroupIds[0], {
        x: g2pos
    }, time);
    $(cvsId).animateLayerGroup(curGroupIds[1], {
        x: g1pos,
        complete: function (layer) {
            if (layer.name == l2[1].name) {
                goon = true;
            }
        }
    }, time);
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
                goon = true;
                break;
            case (Step.idx):
                var indexArr = stepVal.split('=');
                if(indexArr!= null && indexArr.length == 2){
                    var indexName = indexArr[0];
                    var indexValue = parseInt(indexArr[1]);
                    AddOrUpdateIndex(indexName, indexValue);
                }
                break;
            case (Step.cmp):
                var ids = stepVal.split(',');
                if(ids!=null && ids.length == 2){
                    var id1 = parseInt(ids[0]);
                    var id2 = parseInt(ids[1]);
                    Cmp(id1, id2);
                }
                break;
            case (Step.swp):
                Swap();
                break;
            default:
                console('stepKey');
                break;
        }
    }

}
function Update()
{
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