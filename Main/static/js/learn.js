var cvsId = '#cvs';

function Func() {
    if ($(cvsId) == null)
    {
        alert("no canvas");
    }
    alert("canvas");
    $(cvsId).drawPolygon({
        fillStyle: "#6c3",
        x: 100, y: 100,
        radius: 50, sides: 5
    });
}

$(document).ready(Func);