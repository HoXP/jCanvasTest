function Init() {
    var metaList = $('#divMeta').text();
    var nodeList = SgtTools.Instance().GetNodeListByStr(metaList);
    if (nodeList != null) {
        SgtJCanvas.Instance().InitNodeXYWH(0, nodeList.length, 
            SgtJCanvas.Instance().OriginalPosX, 
            SgtJCanvas.Instance().GetValuePosY(),
            SgtJCanvas.Instance().GetCanvasWidth() - 2 * SgtJCanvas.Instance().OriginalPosX,
            SgtJCanvas.Instance().GetCanvasHeight() - 2 * SgtJCanvas.Instance().GetItemPosY());
        for (var i = 0; i < nodeList.length; ++i) {
            var item = nodeList[i];
            SgtJCanvas.Instance().SetNodeGroup(item.Id, item.Value,false,null);
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
function Swap(id1, id2) {
    SgtJCanvas.Instance().SwapNodeGroupById(id1, id2, SetGoon);
}