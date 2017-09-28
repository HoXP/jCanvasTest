var cvsId = '#cvs';
//function ResizeCanvas() {
//    var imageData = $(cvsId).getImageData(0, 0, $(cvsId).width, $(cvsId).height);// 保存当前图像
//    $(cvsId).height = height;
//    $(cvsId).width = width;
//    $(cvsId).putImageData(imageData, 0, 0);
//}
//$(window).resize(ResizeCanvas);
function Draw()
{
    Flush();
}
$(document).ready(Draw);