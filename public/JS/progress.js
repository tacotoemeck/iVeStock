const jumbotron = document.querySelector('.jumbotron');
const submit = document.querySelector('.submitBtns');
const progressBar = document.getElementById('progressBar');
const progressBarDisplay = document.getElementById('progress-display');
const progressBarVal = document.querySelector('.innerVal');
const progressBarWrapper = document.getElementById('progress-bar-div');

const slider = document.querySelector('.progress-input');
const sliderSingle = document.querySelector('.progress-input-single-slider');
const manualVol = document.querySelector('.volumeValueManual');
const manualVolSingle = document.querySelector('.progress-input-single');

var rect = progressBar.getBoundingClientRect();

// progressBar.addEventListener('click', function (e) {

//     var y = e.clientY - rect.top;  //y position within the element.

//     let val = (y / 300).toFixed(2) - 1;
//     let displayVal = Math.abs(val).toFixed(2)

//     progressBarDisplay.style.width = displayVal * 100 + '%';

//     progressBarVal.innerHTML = displayVal * 100 + '%';
//     document.getElementById('progress-input').value = (displayVal * 10).toFixed(2);

//     manualVol.value = Number(slider.value);


// });

slider.addEventListener('input', () => {
    progressBarDisplay.style.width = slider.value * 10 + '%';
    progressBarVal.innerHTML = slider.value * 10 + "%";

    manualVol.value = Number(slider.value);
});

manualVol.addEventListener('input', () => {
    progressBarDisplay.style.width = manualVol.value * 10 + '%';
    progressBarVal.innerHTML = manualVol.value * 10 + "%";;
    slider.value = manualVol.value;

});

sliderSingle.addEventListener('input', () => {
    manualVolSingle.value = Number(sliderSingle.value);
});

manualVolSingle.addEventListener('input', () => {
    sliderSingle.value = manualVolSingle.value;

});



// progressBar.style.height = "500px"

window.onload = () => {

    progressBar.style.height = submit.offsetWidth + 'px';
};
