function OnBubbleClick() {
    var key = SgtTools.Instance().MetaListKey;
    var metaListVal = sessionStorage.getItem(key);
    var url = SgtTools.Instance().GetFullUrl('sort/bubble', metaListVal);
    window.location.href = url;
}