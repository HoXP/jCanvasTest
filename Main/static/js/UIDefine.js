function Vector2(pX, pY) {//自定义Vec;
    //var arr = new Array();
    //arr.append(pX);
    //arr.append(pY);
    //this.x = arr[0];
    //this.y = arr[1];
    this.x = pX;
    this.y = pY;
}

//base
function UIWidget(gId, name, pos, color) {
    Prefix = 'wgt';
    Class = 'Widget';

    this.GroupId = gId;
    this.GetName = function () {
        if (name != null) {
            return '{0}{1}'.format(Prefix, name);
        }
        return 'Widget';
    }
    this.Name = this.GetName();
    this.Pos = pos || new Vector2(0, 0);
    this.Color = color || 'rgb(51, 161, 201)';
}

//Label↓
function UILabel(gId, name, pos, color, val) {
    Prefix = 'txt';
    Class = 'Label';
    UIWidget.call(this, gId, name, pos, color);
    this.Text = val;
    this.FontSize = 24;

    this.Flush = function () {
        $(cvsId).drawText({
            groups: [gId],
            layer: true,
            name: this.Name,
            fromCenter: false,
            fillStyle: this.Color,
            x: this.Pos.x,
            y: this.Pos.y,
            fontSize: this.FontSize,
            text: this.Text
        });
    }
}
(function () {
    var Super = function () { };
    Super.prototype = UIWidget.prototype;
    UILabel.prototype = new Super();
})();
//Label↑

//UIRect↓
function UIRect(gId, name, pos, color, size) {
    Prefix = 'rct';
    Class = 'Rect';
    UIWidget.call(this, gId, name, pos, color);
    this.Size = size || new Vector2(0, 0);

    this.Flush = function () {
        $(cvsId).drawRect({
            groups: [gId],
            layer: true,
            name: this.Name,
            fromCenter: false,
            fillStyle: this.Color,
            x: this.Pos.x,
            y: this.Pos.y,
            width: this.Size.x,
            height: this.Size.y
        });
    }
}
(function () {
    var Super = function () { };
    Super.prototype = UIWidget.prototype;
    UIRect.prototype = new Super();
})();
//UIRect↑