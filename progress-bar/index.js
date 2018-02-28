document.onreadystatechange = function () {
    console.log(document.readyState);
    var curtain = document.getElementsByClassName('curtain')[0];
    if (document.readyState === 'complete') {
        curtain.style.display = 'none';
    }
}