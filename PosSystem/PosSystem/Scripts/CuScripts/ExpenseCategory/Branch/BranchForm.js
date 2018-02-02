
$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: sub + "Branch/GetOrganizations",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(),
        success: function (rData) {
            if (rData != undefined && rData != "") {
                $("#loadOrganization").empty();
                $("#loadOrganization").append('<option value="">----------------Select---------------- </option>');
                $.each(rData,
                    function (k, v) {
                        $("#loadOrganization").append('<option value="' + v.Id + '">' + v.Name + '</option>');
                    });
            }
        }
    });
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
        url: sub + "Branch/OpenBranchForm",
        contentType: "application/Json; charset=utf-8",
        data: "{branchSave:" + JSON.stringify(fData) + "}",
        
        success: function (rData) {
            if (rData.success) {
                popUp.dialog('close');
                dataTable.ajax.reload();
                alert("Saved Successfully");
            } else {
                alert("Error Occured!!");
            }
            
        }
});
}

