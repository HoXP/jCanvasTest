var cvsId = '#cvs';
function ResizeCanvas() {
    RedrawCvs();
    var $prt = $('#parent');
    $(cvsId).attr("width", $prt.width);
    $(cvsId).attr("height", $prt.height);
}
function RedrawCvs() {//重绘Canvas;
    var imageData = $(cvsId).getImageData(0, 0, $(cvsId).width, $(cvsId).height);// 保存当前图像
    $(cvsId).height = height;
    $(cvsId).width = width;
    $(cvsId).putImageData(imageData, 0, 0); //重绘大小改变前保存的图像
}
$(window).resize(ResizeCanvas);
$(document).ready(Draw);