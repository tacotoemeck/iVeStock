// variables for measure create form
const boxVolume = $('#boxVolume');
let detachedBoxForm = $('#boxOrWeightForm').detach();
let detachedSingleForm = $('#singleItemsForm').detach();

// variables for add new stockItem form
const addNewItemForm = $('#addNewItemForm');
let volumeType;

$('#box').click(function () {
    if ($('#box').is(':checked')) {
        boxVolume.append(detachedBoxForm);
        detachedSingleForm = $('#singleItemsForm').detach()
    }
});
$('#single').click(function () {
    if ($('#single').is(':checked')) {
        boxVolume.append(detachedSingleForm);
        detachedBoxForm = $('#boxOrWeightForm').detach()


    }
});


$('.measureButtons').click(function () {
    let container = this.dataset.volumetype;
    volumeType = this.dataset.volumetype;
    if ($('.measureButtons').is(':checked')) {
        displayCorrectUpdateForm(container)
    }
});

$(document).ready(function () {
    let container = document.querySelector('.measureButtons').dataset.volumetype;
    if ($('.measureButtons').is(':checked')) {
        displayCorrectUpdateForm(container)
    }
});


function displayCorrectUpdateForm(element) {

    if (element === 'box' || element === 'weight') {
        // hide / show form
        $('#boxedAndWeightedItemsADD').removeClass("hiddenForms");
        $('#singleItemsADD').addClass("hiddenForms");
        // disable single item inputs
        $('#singleItemVolumeType').attr("disabled", true);
        $('#singleItem').attr("disabled", true);
        $('#singleItemRange').attr("disabled", true);
        $('.progress-input-single-slider').attr("disabled", true);

        // if box or weight have been disabled - enable
        $('#boxORweightVolumeType').attr("disabled", false);
        $('#boxORweight').attr("disabled", false);
        $('.progress-input').attr("disabled", false);
        $('.volumeValueManual').attr("disabled", false);

        // add value to a hidden form element
        $('#boxORweightVolumeType').val(volumeType);
    };

    if (element === 'singleItem') {

        $('#boxedAndWeightedItemsADD').addClass("hiddenForms");
        $('#singleItemsADD').removeClass("hiddenForms");
        // disable box and weight item inputs
        $('#boxORweightVolumeType').attr("disabled", true);
        $('#boxORweight').attr("disabled", true);
        $('.progress-input').attr("disabled", true);
        $('.volumeValueManual').attr("disabled", true);

        // enable
        $('#singleItemVolumeType').attr("disabled", false);
        $('#singleItem').attr("disabled", false);
        $('#singleItemRange').attr("disabled", false);
        $('.progress-input-single-slider').attr("disabled", false);
    };
}



