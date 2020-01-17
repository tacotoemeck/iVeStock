// variables for measure create form
const boxVolume = $('#boxVolume');
let detachedBoxForm = $('#boxOrWeightForm').detach();
let detachedSingleForm = $('#singleItemsForm').detach();

// variables for add new stockItem form
const addNewItemForm = $('#addNewItemForm');


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

// display correct form when creating a new stock item



$('.measureButtons').click(function () {

    if ($('.measureButtons').is(':checked')) {
        console.log(this.dataset.volumetype)
        if (this.dataset.volumetype === 'box' || this.dataset.volumetype === 'weight') {
            $('#boxedAndWeightedItemsADD').removeClass("hiddenForms");
            $('#singleItemsADD').addClass("hiddenForms");
            $('#singleItemVolume').attr("disabled", true)
            $('#singleItem').attr("disabled", true)
        }

        if (this.dataset.volumetype === 'singleItem') {

            $('#boxedAndWeightedItemsADD').addClass("hiddenForms");
            $('#singleItemsADD').removeClass("hiddenForms");
            $('.progress-input').attr("disabled", true)
            $('#boxORweight').attr("disabled", true)

        }
    }
});

