function Init() {
    var metaList = $('#divMeta').text();
    var nodeList = SgtTools.Instance().GetNodeListByStr(metaList);
    if (nodeList != null) {
        var tmpWidth = 30;
        SgtJCanvas.Instance().InitNodeXYWH(-1, 1,//-1为temp
            SgtJCanvas.Instance().OriginalPosX,
            SgtJCanvas.Instance().GetValuePosY(),
            tmpWidth,
            SgtJCanvas.Instance().GetCanvasHeight() - 2 * SgtJCanvas.Instance().GetItemPosY());
        SgtJCanvas.Instance().InitNodeXYWH(0, nodeList.length,
            SgtJCanvas.Instance().OriginalPosX + tmpWidth + 20,
            SgtJCanvas.Instance().GetValuePosY(),
            SgtJCanvas.Instance().GetCanvasWidth() - 2 * SgtJCanvas.Instance().OriginalPosX - tmpWidth - 20,
            SgtJCanvas.Instance().GetCanvasHeight() - 2 * SgtJCanvas.Instance().GetItemPosY());
        for (var i = 0; i < nodeList.length; ++i) {
            var item = nodeList[i];
            SgtJCanvas.Instance().SetNodeGroup(item.Id, item.Value, false, null);
        }
    }

    var stepStr = $('#divStepStr').text();
    SgtTools.Instance().ArrStep = JSON.parse(stepStr);

    SetGoon(true);
}
function AddOrUpdateIndex(name, value) {
    SgtTools.Instance().DictStepIndex[name] = value;
    SgtJCanvas.Instance().UpdateIndexLayer(name, value);
}
function Cmp(id1, id2) {
    SgtJCanvas.Instance().PingPongNodeColor(id1, null);
    SgtJCanvas.Instance().PingPongNodeColor(id2, SetGoon);
}
function Set(id, val) {
    SgtJCanvas.Instance().SetNodeGroup(id, val, true, SetGoon);
}