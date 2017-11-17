//base
function UIWidget(id, gId) {
    this.Id = id || 0;
    this.GroupId = gId || 0;
    this.sleep = function () {
        console.log(this.name);
    }
}

//Label↓
function UILabel(id, gId) {
    UIWidget.call(this);

    TextLayerNamePlaceholder = '{0}txt',
    this.GetNodeTextLayerName = function () {
        return TextLayerNamePlaceholder.format(SgtJCanvas.Instance().NodeGroupNamePlaceholder.format(id));
    }
    $(cvsId).drawText({
        groups: [groupName],
        layer: true,
        name: this.GetNodeTextLayerName(),
        fromCenter: false,
        fillStyle: this.OriginalColor,
        x: itemX,
        y: this.RectYPos,
        fontSize: 24,
        text: '--'
    });
}
(function () {
    var Super = function () { };
    Super.prototype = UIWidget.prototype;
    UILabel.prototype = new Super();
})();
//Label↑

// Test
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal);
console.log(cat instanceof Cat);