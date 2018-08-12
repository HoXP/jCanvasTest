function Func() {
    if ($(cvsId) == null) {
        alert("no canvas");
    }
    $(cvsId)
    // Draw a circle
    .drawArc({
        layer: true,
        groups: ['circles'],
        fillStyle: '#24c',
        x: 100, y: 100,
        radius: 50
    });
    $(cvsId)
    // Animate all layers in the group 'circles'
    .animateLayerGroup('circles', {
        y: 200
    }, 500);
}
$(function () {
    sessionStorage.setItem(SgtTools.Instance().MetaListKey, $('#divMetaStr').text());   //保存后台随机生成的数;
    Func();

    var lbl = new UILabel(2, 'GG', new Vector2(600, 300), 'rgb(255, 0, 0)', 'scsadfadsfdsf');
    lbl.FontSize = 50;
    lbl.Flush();

    var rct = new UIRect(2, 'ff', new Vector2(600, 350), 'rgb(0, 14, 255)', new Vector2(300, 400));
    rct.Flush();
});