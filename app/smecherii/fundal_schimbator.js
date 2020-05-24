'use strict';
var i = 0;
var k = 1;
function changeC() {
    var color = ["#cce6ff", "#84baee", "#66b3ff",
        "rgb(79,158,238)", "rgb(39,140,243)", "#097bee", "#0066cc",
        "#0a56a0", "#094a8d", "#004080"];
    document.body.style.backgroundColor = color[i];
    //document.getElementById('booki').style.color = color[i];
    i+=k;
    if (i == color.length-1) k = -1;
    if (i == 0) k = 1;
}
setInterval(changeC, 1000);
