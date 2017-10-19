var metaListKey = "metalist";
var metaListVal = sessionStorage.getItem(key);

function onBubbleClick(pURL) {
    window.location.href = 'http://www.baidu.com';
    var url = pURL;
    alert(url);
    $(location).attr('href', 'http://www.jb51.net');
}