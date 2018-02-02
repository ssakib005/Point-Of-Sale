
$(document).ready(function () {
    $("#rootCategory").hide();
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

$("#Name").change(function() {

    var orgName = $("#Name").val();
    var para = { name: orgName };

    $.ajax({
        type: "POST",
        url: sub + "Organization/OrganizationChecker",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(para),
        success: function (rData) {

                if (rData.Count == -1) {
                    alert("Organization Exist");
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
                                if (dbCode == (++code) ) {
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

    if ($("#Name").val() == "" || $("#Code").val() == "" || $("#Address").val() == "") {

        alert("Please fill the required field");

    } else {

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
                    alert("Successfully");
                } else {
                    alert("Error Occured!!");
                }

            }
        });

    }
}