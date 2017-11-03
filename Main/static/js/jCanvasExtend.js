$.jCanvas.extend({
    name: 'drawHeart',
    type: 'heart',
    props: {},
    fn: function (ctx, params) {
        // 保持短线
        var p = params;
        // 启用图形变换，比如说缩放和旋转
        $.jCanvas.transformShape(this, ctx, p);
        // 绘制心
        ctx.beginPath();
        ctx.moveTo(p.x, p.y + p.radius);
        // 心的左边
        ctx.quadraticCurveTo(
          p.x - (p.radius * 2),
          p.y - (p.radius * 2),
          p.x,
          p.y - (p.radius / 1.5)
        );
        // Right side of heart
        ctx.quadraticCurveTo(
          p.x + (p.radius * 2),
          p.y - (p.radius * 2),
          p.x,
          p.y + p.radius
        );
        // 调用detectEvents()函数以启用jCanvas事件
        // 确保把这些参数传递给它们
        $.jCanvas.detectEvents(this, ctx, p);
        // 调用closePath()函数以填充、描边和关闭路径
        // 该函数事启用了遮罩运行以及事件
        // 它接受和detectEvents()相同的参数
        $.jCanvas.closePath(this, ctx, p);
    }
});