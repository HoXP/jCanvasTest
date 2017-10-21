var iptNumbers = $('#iptNumbers');
var dgrIptNumbers = $('#dgrIptNumbers');
var strValid = false;

function OnFocusIptNumbers() {
    var iptNumbersValue = iptNumbers.val().trim();
    if (/^[\d,]*$/.test(iptNumbersValue)) {
        strValid = true;
        dgrIptNumbers.hide();
    }
    else {
        strValid = false;
        dgrIptNumbers.show();
    }
}
iptNumbers.focusout(OnFocusIptNumbers);
$('#btnGen').click(function () {
    var iptNumCountValue = parseInt(iptNumCount.val());
    iptNumbers.val("");
    var arr = new Array("");
    for (var i = 0; i < iptNumCountValue; ++i) {
        arr.push(Math.floor(Math.random() * 999 + 1));
    }
    iptNumbers.val(arr.join(",").substring(1));
    iptNumbers.focusout();
});

var iptNumCount = $('#iptNumCount');
function OnFocusIptNumCount() {
    var iptNumCountValue = parseInt(iptNumCount.val());
    var minVal = parseInt(iptNumCount.attr('min'));
    var maxVal = parseInt(iptNumCount.attr('max'));
    if (iptNumCountValue < minVal) {
        iptNumCount.val(minVal);
    }
    if (iptNumCountValue > maxVal) {
        iptNumCount.val(maxVal);
    }
}
iptNumCount.focusout(OnFocusIptNumCount);

$('#btnMinus').click(function () {
    var iptNumCountValue = parseInt(iptNumCount.val());
    if (iptNumCountValue > parseInt(iptNumCount.attr('min'))) {
        iptNumCount.val(iptNumCountValue - 1);
    }
});
$('#btnPlus').click(function () {
    var iptNumCountValue = parseInt(iptNumCount.val());
    if (iptNumCountValue < parseInt(iptNumCount.attr('max'))) {
        iptNumCount.val(iptNumCountValue + 1);
    }
});
$('#btnDone').click(function () {
    if (strValid == false)
    {
        alert('Invalid numbers.');
        return;
    }
    var iptNumbersValue = iptNumbers.val().trim();
    var key = SgtTools.Instance().MetaListKey;
    sessionStorage.setItem(key, iptNumbersValue);    //保存生成的数字列表;
    alert(sessionStorage.getItem(key));
});