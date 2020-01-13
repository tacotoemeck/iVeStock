const jumbotron = document.querySelector('.jumbotron');
const submit = document.querySelector('.submitBtns');
const progressBar = document.getElementById('progressBar');
const progressBarDisplay = document.getElementById('progress-display');
const progressBarVal = document.querySelector('.innerVal');
const progressBarWrapper = document.getElementById('progress-bar-div');

const slider = document.getElementById('progress-input');

var rect = progressBar.getBoundingClientRect();

progressBar.addEventListener('click', function (e) {



    var y = e.clientY - rect.top;  //y position within the element.

    let val = (y / 300).toFixed(2) - 1;
    let displayVal = Math.abs(val).toFixed(2)

    progressBarDisplay.style.width = displayVal * 100 + '%';
    progressBarVal.innerHTML = (displayVal * 10).toFixed(2);
    document.getElementById('progress-input').value = (displayVal * 10).toFixed(2);


});

slider.addEventListener('input', () => {
    progressBarDisplay.style.width = slider.value * 10 + '%';
    progressBarVal.innerHTML = slider.value;
});

// progressBar.style.height = "500px"

window.onload = () => {

    progressBar.style.height = submit.offsetWidth + 'px';
};


// progressBar.addEventListener("touchstart", function (e) {

//     progressBar.ontouchmove = function (e) {
//         var y = e.clientY - rect.top;
//         let val = (y / 300).toFixed(2) - 1;

//         let displayVal = Math.abs(val).toFixed(2)
//         progressBarDisplay.style.width = displayVal * 100 + '%';
//         progressBarVal.innerHTML = e;
//         // document.getElementById('progress-input').value = (displayVal * 10).toFixed(2);
//     }
// });

// // progressBar.addEventListener("touchend", function (e) {

// //     progressBar.ontouchmove = null
// //     document.getElementById('progress-input').value = progressBarVal.innerHTML;

// // });

// progressBar.addEventListener("mousedown", function (e) {

//     progressBar.onmousemove = function (e) {
//         var y = e.clientY - rect.top;
//         let val = (y / 300).toFixed(2) - 1;

//         let displayVal = Math.abs(val).toFixed(2)
//         progressBarDisplay.style.width = displayVal * 100 + '%';
//         progressBarVal.innerHTML = (displayVal * 10).toFixed(2);
//         // document.getElementById('progress-input').value = (displayVal * 10).toFixed(2);
//     }
// });

// progressBar.addEventListener("mouseup", function (e) {

//     progressBar.onmousemove = null
//     document.getElementById('progress-input').value = progressBarVal.innerHTML;

// });