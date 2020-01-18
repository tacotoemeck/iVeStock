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
        $('#boxedAndWeightedItemsADD').removeClass("hiddenForms");
        $('#singleItemsADD').addClass("hiddenForms");
        $('#singleItemVolume').attr("disabled", true)
        $('#singleItem').attr("disabled", true)
        $('#singleItemVolumeType').attr("disabled", true)
        $('#boxORweightVolumeType').val(volumeType);

    }

    if (element === 'singleItem') {

        $('#boxedAndWeightedItemsADD').addClass("hiddenForms");
        $('#singleItemsADD').removeClass("hiddenForms");
        $('.progress-input').attr("disabled", true)
        $('#boxORweight').attr("disabled", true)
        $('#boxORweightVolumeType').attr("disabled", true)

    }
}



