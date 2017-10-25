function Init() {
    if ($(cvsId) == null) {
        alert("no canvas");
    }
    $(cvsId)
    // Draw a circle
    .drawArc({
        layer: true,
        groups: ['circles'],
        fillStyle: '#c33',
        x: 100, y: 100,
        radius: 50
    })
    // Draw another circle
    .drawArc({
        layer: true,
        groups: ['circles'],
        fillStyle: '#36c',
        x: 220, y: 100,
        radius: 50
    });
}
function Func() {
    if ($(cvsId) == null) {
        alert("no canvas");
    }
    $(cvsId)
    // Animate all layers in the group 'circles'
    .animateLayerGroup('circles', {
        y: 200,
        complete: function (layer) {
            if (layer.fillStyle == '#36c') {
            }
        }
    }, 500);
}
$(function () {
    sessionStorage.setItem(SgtTools.Instance().MetaListKey, $('#divMetaStr').text());   //保存后台随机生成的数;
    Init();
    Func();
});