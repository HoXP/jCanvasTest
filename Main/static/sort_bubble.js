function Func() {
    var $myCanvas = $('#cvs');
    $myCanvas.width = window.innerWidth;
    $myCanvas.height = window.innerHeight;
    $myCanvas.drawRect({
        fillStyle: 'steelblue',
        strokeStyle: 'blue',
        strokeWidth: 4,
        x: 150, y: 100,
        fromCenter: false,
        width: 200,
        height: 100
    });
}
$(document).ready(Func);