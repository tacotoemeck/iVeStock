const jumbotron = document.querySelector('.jumbotron');
const progressBar = document.getElementById('progressBar');
const progressBarWrapper = document.getElementById('progress-bar-div');

progressBar.addEventListener('click', function (e) {

    var rect = e.target.getBoundingClientRect();
    // console.log(rect)
    var y = e.clientY - rect.top;  //y position within the element.

    let val = (y / 300).toFixed(2) - 2;
    let displayVal = Math.abs(val).toFixed(2) - 1

    document.getElementById('progressBar').value = displayVal;
    document.getElementById('progress-input').value = (progressBar.value * 10).toFixed(1);




});

// // make a progress bar 100% of jumbotron width
// window.onload = () => {
//     // progressBar.style.height = jumbotron.offsetWidth + 'px';
//     progressBar.style.height = jumbotron.offsetWidth + 'px';

//     let leftMargin = progressBar.getBoundingClientRect();
//     console.log(leftMargin)
//     progressBar.style.marginBottom = -leftMargin.bottom + 'px';
//     // console.log(progressBar)
//     // console.log(jumbotron.offsetWidth)
// };
// // progressBar.style.height = jumbotron.offsetWidth;
// console.log(jumbotron.offsetWidth)

