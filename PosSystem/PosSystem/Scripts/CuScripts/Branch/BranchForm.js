
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

$("#Name").change(function () {

    var branchName = $("#Name").val();
    var orgId = $("#loadOrganization").val();
    var para = { name: branchName, Id: orgId }; 

    $.ajax({
        type: "POST",
        url: sub + "Branch/BranchChecker", 
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(para),
        success: function (rData) {

            if (rData.Count == -1) {
                alert("Branch Exist");
                $("#Name").val("");
                $("#Code").val("");
            } else {
                var counter = rData.length;
                var code = 1;
                var codeCounter = 0;
                var dbCode = 1;
                if (rData == "") {
                    $("#Code").val("000" + (++codeCounter));
                } else {
                    $.each(rData, function (k, v) {
                        if (code == v.Code) {
                            if (dbCode == (++code)) {
                                codeCounter = (++code);
                                dbCode = v.Code;
                            } else {
                                codeCounter = (code);
                                ++code;
                            }
                        } else {
                            codeCounter = code;
                            dbCode = v.Code;
                        }
                    });
                    if (codeCounter >= 0 && codeCounter < 10) {
                        $("#Code").val("000" + (codeCounter));
                    } else if (codeCounter >= 10 && codeCounter < 100) {
                        $("#Code").val("00" + (codeCounter));
                    } else if (codeCounter >= 100 && codeCounter < 1000) {
                        $("#Code").val("0" + (code));
                    } else if (codeCounter >= 1000 && codeCounter < 10000) {
                        $("#Code").val(codeCounter);
                    } else {
                        alert("There have insufficient space for organization");
                    }
                }
            }
        }
    });
});

function formSave() {

    if ($("#Name").val() == "" || $("#Code").val() == "" || $("#Address").val() == "" || $("#loadOrganization").val() == "") {

        alert("Please fill the required field");

    } else {
        
        var organizationId = $("#loadOrganization").val();
        var organizationName = $("#loadOrganization").find(":selected").text();
        var id = $("#Id").val();
        var name = $("#Name").val();
        var code = $("#Code").val();
        var contactNumber = $("#ContactNumber").val();
        var address = $("#Address").val();

        var fData = {
            Id: id,
            OrganizationId: organizationId,
            OrgName: organizationName,
            Name: name,
            Code: code,
            ContactNumber: contactNumber,
            Address: address
        };

        $.ajax({
            type: "POST",
            url: sub + "Branch/OpenBranchForm",
            contentType: "application/Json; charset=utf-8",
            data: "{branchSave:" + JSON.stringify(fData) + "}",

            success: function(rData) {
                if (rData.success) {
                    popUp.dialog('close');
                    dataTable.ajax.reload();
                    alert("Successfully");
                } else {
                    alert("Error Occured!!");
                }

            }
        });
    }
}

