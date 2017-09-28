function Flush() {
    if ($(cvsId) == null) {
        alert("no canvas");
    }
    $(cvsId).drawArc({
        strokeStyle: '#040',
        strokeWidth: 3,
        x: 100, y: 100,
        radius: 50,
        start: 0, end: 360
    });
}