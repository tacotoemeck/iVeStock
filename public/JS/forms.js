const stockId = $('#stockID').html();


let selected = new Array();



// get an array of selected elements

$(".multiSubmit").click(function () {

    selected = [];
    $(document).ready(function () {

        $("input[type=checkbox]:checked").each(function () {
            let obj = JSON.parse($(this).val());
            selected.push(obj)
        })
        console.log(selected);
    });
});



// dropdown menu 

$(document).ready(function () {
    $('.dropdown-submenu a.test').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });
});

// all items sold

$('.submitSold').click(function () {
    updateMany('sold', '0')
})

// all items waste

$('.submitWaste').click(function () {
    updateMany('waste', '0')
})

// all move location
$('.submitLocation').click(function () {
    console.log("clicked")
    selected.forEach(item => {
        var updateUrl = '/stock/' + stockId + '/stockUpdate/' + item.id;
        var stock = {
            stock: {
                storingUnit: item.storingUnit,
                location: this.innerHTML,
                volume: item.volume,
                action: item.action,
                bulk: item.bulk
            }
        }
        $.ajax({
            method: 'PUT',
            url: updateUrl,
            data: stock
        })
            .then(location.reload(true))
    })
})


function updateMany(action, volume) {
    selected.forEach(item => {
        var updateUrl = '/stock/' + stockId + '/stockUpdate/' + item.id;
        var stock = {
            stock: {
                storingUnit: item.storingUnit,
                location: item.location,
                volume: volume,
                action: action,
                bulk: item.bulk
            }
        }
        $.ajax({
            method: 'PUT',
            url: updateUrl,
            data: stock
        })
            .then(location.reload(true))
    })

}

