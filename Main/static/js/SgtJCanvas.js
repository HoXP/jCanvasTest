var SgtJCanvas = (function () {
    function init() {
        return {
            NodeGroupNamePlaceholder: 'G{0}',
            TextLayerNamePlaceholder: '{0}txt',
            RectLayerNamePlaceholder: '{0}rct',
            IndexLayerNamePlaceholder: 'idx_{0}',

            OriginalPosX: 50,  //初始位置X;
            OriginalPosY: 50,  //初始位置Y;
            OriginalColor: 'rgb(51, 161, 201)',  //初始颜色;

            OriginalSpacing: 10,    //初始间隔;
            SwapArrowPosYOffset: 50,   //交换箭头线偏移;
            IndexPosYOffset: 30, //索引偏移;
            ValuePosYOffset: 30, //数字偏移;

            //矩形区域的四个参数;
            RectXPos: 0,
            RectYPos: 0,
            RectWidth: 0,
            RectHeight: 0,

            //Function
            GetCanvasWidth: function () {//画布宽度;
                return $(cvsId).attr('width');
            },
            GetCanvasHeight: function () {//画布高度;
                return $(cvsId).attr('height');
            },
            GetNodeGroupNameById: function (id) {//根据id获取节点的组名;
                return this.NodeGroupNamePlaceholder.format(id);
            },
            GetNodeTextLayerNameById: function (id) {//根据id获取节点文本层名;
                return this.TextLayerNamePlaceholder.format(this.NodeGroupNamePlaceholder.format(id));
            },
            GetNodeRectLayerNameById: function (id) {//根据id获取节点矩形层名;
                return this.RectLayerNamePlaceholder.format(this.NodeGroupNamePlaceholder.format(id));
            },
            InitRect: function (xPos, yPos, maxWidth, maxHeight) {
                this.RectXPos = xPos;
                this.RectYPos = yPos;
                this.RectWidth = maxWidth;
                this.RectHeight = maxHeight;
            },
            InitNodeXYWH: function (startIdx, nodeCount) {//初始化各个节点的位置宽高;

                var offset = 0 - startIdx;
                var itemWidth = this.GetItemWidthByItemCount(nodeCount);
                for (var i = startIdx; i < nodeCount; i++) {
                    var id = i;
                    var groupName = this.GetNodeGroupNameById(id);
                    var group = $(cvsId).getLayerGroup(groupName);
                    if (group != null) {//获取到组，就清除之;
                        $(cvsId).removeLayerGroup(groupName);
                    }
                    var itemX = this.RectXPos + (id + offset) * (itemWidth + this.OriginalSpacing);
                    //添加组;
                    $(cvsId).drawText({
                        groups: [groupName],
                        layer: true,
                        name: this.GetNodeTextLayerNameById(id),
                        fromCenter: false,
                        fillStyle: this.OriginalColor,
                        x: itemX,
                        y: this.RectYPos,
                        fontSize: 24,
                        text: '--'
                    }).drawRect({
                        groups: [groupName],
                        layer: true,
                        name: this.GetNodeRectLayerNameById(id),
                        fromCenter: false,
                        fillStyle: this.OriginalColor,
                        x: itemX,
                        y: this.RectYPos + this.ValuePosYOffset,   //矩形在文本下;
                        width: itemWidth,
                        height: this.RectHeight
                    });
                }
            },
            SetNodeGroup: function (id, val, isAnim, callback) {//设置结点矩形;
                var textName = this.GetNodeTextLayerNameById(id);
                var rectName = this.GetNodeRectLayerNameById(id);
                $(cvsId).setLayer(textName, {
                    text: val
                }).drawLayers();
                if (isAnim == true) {
                    $(cvsId)
                        .animateLayer(rectName, {
                            height: this.GetItemHeightByValue(val),
                        }, 500, function (layer) {
                            if (callback != null) {
                                callback(true);
                            }
                        });
                } else {
                    $(cvsId).setLayer(rectName, {
                        height: this.GetItemHeightByValue(val)
                    }).drawLayers();
                }
            },
            GetGroupPosXById: function (id) {
                var layerName = this.GetNodeTextLayerNameById(id);
                var l1 = $(cvsId).getLayer(layerName);
                return l1.x;
            },
            GetValuePosY: function () {
                return this.OriginalPosY + this.SwapArrowPosYOffset + this.IndexPosYOffset;
            },
            GetItemWidthByItemCount: function (numCount) {
                var validWidth = this.RectWidth - (numCount - 1) * this.OriginalSpacing;
                if (validWidth <= 0) {
                    alert('invalid numCount.too large');
                    return;
                }
                var width = validWidth / numCount; //刨去(N-1)个间隔，再除以N;
                return width;
            },
            GetItemHeightByValue: function (val) {
                var height = val / SgtTools.Instance().MaxNumber * this.RectHeight;
                return height;
            },
            GetItemPosY: function () {//矩形的偏移=交换线+索引区+数字区;
                return this.OriginalPosY + this.SwapArrowPosYOffset + this.IndexPosYOffset + this.ValuePosYOffset;
            },
            UpdateIndexLayer: function (name, val) {//更新索引文本;
                var layerName = this.IndexLayerNamePlaceholder.format(name);
                var layerText = '{0}={1}'.format(name, val);
                var layer = $(cvsId).getLayer(layerName);
                if (layer != null) {
                    $(cvsId).setLayer(layerName, {
                        text: layerText
                    }).drawLayers();
                } else {
                    $(cvsId).addLayer({
                        type: 'text',
                        name: layerName,
                        fromCenter: false,
                        fillStyle: '#04f',
                        fontSize: 24,
                        x: this.OriginalPosY + 100 * SgtTools.Instance().GetDictStepIndexByKey(name),
                        y: this.OriginalPosY,
                        text: layerText
                    }).drawLayers();
                }
            },
            PingPongNodeColor: function (id, callback) {//闪烁结点;
                var groupName = this.GetNodeGroupNameById(id);
                var time = 100;
                $(cvsId).animateLayerGroup(groupName, {
                    fillStyle: 'rgb(204, 51, 51)'
                }, time, function () {
                    $(this).animateLayerGroup(groupName, {
                        fillStyle: SgtJCanvas.Instance().OriginalColor,
                        complete: function (layer) {
                            if (callback != null) {
                                if (layer.name == SgtJCanvas.Instance().GetNodeRectLayerNameById(id)) {
                                    callback(true);
                                }
                            }
                        }
                    }, 'slow', 'swing');
                });
            },
            SwapNodeGroupById: function (id1, id2, callback) {//交换;
                var g1Name = this.GetNodeGroupNameById(id1);
                var g2Name = this.GetNodeGroupNameById(id2);
                var g1pos = this.GetGroupPosXById(id1);
                var g2pos = this.GetGroupPosXById(id2);
                var time = 500;
                $(cvsId)
                    .animateLayerGroup(g1Name, {
                        x: g2pos
                    }, time)
                    .animateLayerGroup(g2Name, {
                        x: g1pos,
                        complete: function (layer) {
                            var l2 = $(cvsId).getLayer(SgtJCanvas.Instance().GetNodeRectLayerNameById(id2));
                            if (layer.name == l2.name) {
                                callback(true);
                            }
                        }
                    }, time);
            },
            SetNodeGroupValue: function (id, Value, callback) {
                var gName = this.GetNodeGroupNameById(id);
                var time = 500;
                $(cvsId)
                    .animateLayerGroup(g2Name, {
                        height: Value,
                        complete: function (layer) {
                            var l2 = $(cvsId).getLayer(SgtJCanvas.Instance().GetNodeRectLayerNameById(id2));
                            if (layer.name == l2.name) {
                                callback(true);
                            }
                        }
                    }, time);
            }
        }
    }
    var instance = null;
    return {
        Instance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    }
})();