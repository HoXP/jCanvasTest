var $cvs = $('#cvs');

function resizeCanvas() {
    //$cvs.attr("width", $(window).get(0).innerWidth);
    //$cvs.attr("height", $(window).get(0).innerHeight);
}

function Func() {
    if ($cvs == null)
    {
        alert("no canvas");
    }
    $cvs.drawPolygon({
        fillStyle: "#6c3",
        x: 100, y: 100,
        radius: 50, sides: 5
    });
}

$(window).resize(resizeCanvas);
resizeCanvas();
$(document).ready(Func);