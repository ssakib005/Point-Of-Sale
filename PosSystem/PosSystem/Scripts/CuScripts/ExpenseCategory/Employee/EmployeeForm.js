
$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: sub + "Employee/GetBranch",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(),
        success: function (rData) {
            if (rData != undefined && rData != "") {
                $("#loadBranch").empty();
                $("#loadBranch").append('<option value="">----------------Select---------------- </option>');
                $.each(rData,
                    function (k, v) {
                        $("#loadBranch").append('<option value="' + v.Id + '">' + v.Name + '</option>');
                    });
            }
        }
    });

    $.ajax({
        type: "POST",
        url: sub + "Employee/GetEmployee",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(),
        success: function (rData) {
            if (rData != undefined && rData != "") {
                $("#loadEmployee").empty();
                $("#loadEmployee").append('<option value="">----------------Select---------------- </option>');
                $.each(rData,
                    function (k, v) {
                        $("#loadEmployee").append('<option value="' + v.Id + '">' + v.Name + '</option>');
                    });
            }
        }
    });
    
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
    var address = $("#Address").val();

    var fData = {
        Id: id,
        Name: name,
        Code: code,
        ContactNumber: contactNumber,
        Address: address
    }

    $.ajax({
        type: "POST",
        url: sub + "Organization/OpenOrganizationForm",
        contentType: "application/Json; charset=utf-8",
        data: "{organization:" + JSON.stringify(fData) + "}",
        
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
