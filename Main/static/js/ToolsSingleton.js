String.prototype.format = function () {
    if (arguments.length == 0) return this;
    for (var s = this, i = 0; i < arguments.length; i++)
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return s;
};//实现占位符;

var SgtTools = (function () {
    function init() {
        return {
            MetaListKey: "metalist"
            ,
            CurProtocolHost: function () {
                return "{0}//{1}/".format(window.location.protocol, window.location.host);
            }
            ,
            GetFullUrl: function (pathName, metaParam) {
                var ph = this.CurProtocolHost();
                return "{0}{1}?{2}={3}".format(ph, pathName, this.MetaListKey, metaParam);
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