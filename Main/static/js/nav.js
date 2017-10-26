function OnBubbleClick() {
    var url = SgtTools.Instance().GetFullUrl('sort/bubble', SgtTools.Instance().GetMetaListStr());
    window.location.href = url;
}
function OnSelectionClick() {
    var url = SgtTools.Instance().GetFullUrl('sort/selection', SgtTools.Instance().GetMetaListStr());
    window.location.href = url;
}