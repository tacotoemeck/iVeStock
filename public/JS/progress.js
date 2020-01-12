const jumbotron = document.querySelector('.jumbotron');
const submit = document.querySelector('.submitBtns');
const progressBar = document.getElementById('progressBar');
const progressBarDisplay = document.getElementById('progress-display');
const progressBarVal = document.querySelector('.innerVal');
const progressBarWrapper = document.getElementById('progress-bar-div');

progressBar.addEventListener('click', function (e) {

    var rect = e.target.getBoundingClientRect();

    var y = e.clientY - rect.top;  //y position within the element.

    let val = (y / 300).toFixed(2) - 1;
    let displayVal = Math.abs(val).toFixed(2)

    progressBarDisplay.style.width = displayVal * 100 + '%';
    progressBarVal.innerHTML = (displayVal * 10).toFixed(2);
    document.getElementById('progress-input').value = (displayVal * 10).toFixed(2);
});

// progressBar.style.height = "500px"

window.onload = () => {

    progressBar.style.height = submit.offsetWidth + 'px';
};
