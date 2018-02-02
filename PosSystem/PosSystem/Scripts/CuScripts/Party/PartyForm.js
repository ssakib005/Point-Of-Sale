
$(document).ready(function () {
   
    $("#pic").hide();
});
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $("#pic").show();
            $('#pic')
                .attr('src', e.target.result)
                .width(200)
                .height(200);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
$("#reset").click(function () {

    $("#img").val('');
    $("#pic").hide();

});

function formSave() {
    var isCustomar = ""; 
    var isSupplier = "";
    var id = $("#Id").val();
    var name = $("#Name").val();
    var code = $("#Code").val();
    var contactNumber = $("#ContactNumber").val();
    var email = $("#Email").val();
    var address = $("#Address").val();

    if ($("#customer").is(":checked")) {
        isCustomar = "✔";
    } else {
        isCustomar = "X";
    }
    if ($("#supplier").is(":checked")) {
        isSupplier = "✔";
    } else {
        isSupplier = "X";
    }
    

    var formData = {
        Id: id,
        Name: name,
        Code: code,
        Email: email,
        ContactNumber: contactNumber,
        Address: address,
        Customer: isCustomar,
        Supplier: isSupplier
    }

    $.ajax({
        type: "POST",
        url: sub +"Party/OpenPartyForm",
        contentType: "application/json; charset=utf-8",
        data: "{partysave:"+JSON.stringify(formData)+"}",
        success: function (rData) {
            if (rData.success) {
                popUp.dialog('close');
                dataTable.ajax.reload();
                alert("Submitted Successfully");
            } else {
                alert(error);
            }
            
        }
});
}
