function Draw() {
    if ($(cvsId) == null) {
        alert("no canvas");
    }
    $(cvsId).drawArc({
        strokeStyle: '#000',
        strokeWidth: 5,
        x: 100, y: 100,
        radius: 50,
        start: 0, end: 90
    });
}