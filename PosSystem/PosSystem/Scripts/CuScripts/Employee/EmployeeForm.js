
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

    var previousActiveTabIndex = 0;
    $(".tab-switcher").on('click', function () {
        var tabClicked = $(this).data("tab-index");
        if (tabClicked != previousActiveTabIndex) {

            $("#allTabsContainer .tab-container").each(function () {

                if ($(this).data("tab-index") == tabClicked) {

                    $(".tab-container").hide();
                    $(this).show();
                    previousActiveTabIndex = $(this).data("tab-index");
                    return;

                }
            });
        }
    });
   
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
    var branchId = $("#loadBranch").val();
    var outlet = $("#loadBranch").find(":selected").text();
    var empId = $("#loadEmployee").val();
    var empName = $("#loadEmployee").find(":selected").text();
    var name = $("#Name").val();
    var code = $("#Code").val();
    var joiningDate = $("#JoiningDate").val();
    var contact = $("#ContactNo").val();
    var emercontact = $("#EmergencyContactNo").val();
    var nid = $("#Nid").val();
    var fatherName= $("#FatherName").val();
    var motherName = $("#MotherName").val();
    var email = $("#Email").val();
    var presentAddress = $("#PresentAddress").val();
    var permanentAddress = $("#PermanentAddress").val();


    var fData = {
        Id: id,
        Name: name,
        Code: code,
        BranchId: branchId,
        BName: outlet,
        EmployeesId: empId,
        EmpName: empName,
        JoiningDate: joiningDate,
        ContactNo: contact,
        Email: email,
        Nid: nid,
        EmergencyContactNo: emercontact,
        FatherName: fatherName,
        MotherName: motherName,
        PresentAddress: presentAddress,
        PermanentAddress:permanentAddress
    }

    $.ajax({
        type: "POST",
        url: sub + "Employee/CreateEmployee",
        contentType: "application/Json; charset=utf-8",
        data: "{employeesave:" + JSON.stringify(fData) + "}",
        
        success: function (rData) {
            if (rData.success) {
                popUp.dialog('close');
                dataTable.ajax.reload();
                alert("Submitted Successfully");
                window.location.href = sub + "Employee/EmployeeDetails";
            } else {
                alert("Error Occured!!");
            }
            
        }
});
}


