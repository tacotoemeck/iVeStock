const stockId = $('#stockID').html();
console.log(stockId)

let selected = new Array();



// get an array of selected elements
$("#multiSubmit").click(function () {
    $(document).ready(function () {
        $("input[type=checkbox]:checked").each(function () {
            selected.push($(this).val());
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


// update to sold
// let data = {
//     body: {
//         stock: {
//             storingUnit: 'Gastronome 1/6 Deep(kg>2<)',
//             location: 'Kitchen',
//             volume: '1.1',
//             action: 'update'
//         }
//     }
// }




// let json = JSON.stringify(data);

$('#submit').click(function () {
    selected.forEach(id => {
        var updateUrl = '/stock/' + stockId + '/stockUpdate/' + id;
        var stock = {
            stock: {
                storingUnit: 'Gastronome 1/6 Deep(kg>2<)',
                location: 'Kitchen',
                volume: '0',
                action: 'sold',
                bulk: true
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




