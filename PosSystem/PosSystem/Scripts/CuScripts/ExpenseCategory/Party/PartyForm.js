
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
    var id = $("#Id").val();
    var name = $("#Name").val();
    var code = $("#Code").val();
    var contactNumber = $("#ContactNumber").val();
    var email = $("#Email").val();
    var address = $("#Address").val();
    var isCustomar = $("#IsCustomer").val();
    var isSupplier = $("#IsSupplier");

    var fData = {
        Id: id,
        Name: name,
        Code: code,
        ContactNumber: contactNumber,
        Email:email,
        Address: address,
        IsCustomer: isCustomar,
        IsSupplier:isSupplier
    }

    $.ajax({
        type: "POST",
        url: sub + "Party/OpenPartyForm",
        contentType: "application/Json; charset=utf-8",
        data: "{partySave:" + JSON.stringify(fData) + "}",
        
        success: function (rData) {
            if (rData.success) {
                popUp.dialog('close');
                dataTable.ajax.reload();
                alert("Submitted Successfully");
            } else {
                alert("Error Occured!!");
            }
            
        }
});
}
