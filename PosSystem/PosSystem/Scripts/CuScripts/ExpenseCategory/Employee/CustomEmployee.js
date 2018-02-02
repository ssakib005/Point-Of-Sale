//Declare two variable
var popUp, dataTable;
//================================================================================================================================
//                                                      Load Table Content
//================================================================================================================================

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

 //================================================================================================================================
//                                                      TabControl
//================================================================================================================================

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

 //================================================================================================================================
//                                                      Show Data in Table
//================================================================================================================================

    var sl = 0;
    dataTable = $("#EmployeeDataTable").DataTable({
        "ajax": {
            "url": sub + "Employee/GetEmployeeData",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            {
                "data": "Id",
                "render": function () {
                    return ++sl;
                }
            },
            { "data": "Name", "autoWidth": true },
            { "data": "Code", "autoWidth": true },
            { "data": "Outlet", "autoWidth": true },
            { "data": "Contact", "autoWidth": true },
            { "data": "Address", "autoWidth": true },
            {
                "data": "Id", "render": function (data) {
                    return "<a class='btn btn-success' style='margin-left: 20px' onclick='PopupFormCategory(" + data + ")'><i class='fa fa-pencil'></i></a>" +
                        "<a class='btn btn-danger' style='margin-left: 10px' onclick='CategoryDeleteForm(" + data + ")'><i class='fa fa-trash-o'></i></a>";
                },
                "orderable": false,
                "width": "150px"
            }
        ],
        "language": {
            "emptyTable": "No Data Found Please Click on the <b> Add Employee</b> Button."
        }

    });
});
//================================================================================================================================
//                                                      Open PopUp Bar
//================================================================================================================================
function PopupForm(url) {
    var formDiv = $('<div/>');
    $.get(url,
        function (rData) {
            formDiv.html(rData);

            popUp = formDiv.dialog({
                autoOpen: true,
                resizable: false,
                title: "Employee Setup",
                height: 600,
                width: 700,
                close: function () {
                    window.location.href = sub + "Employee/EmployeeDetails";
                    popUp.dialog('destroy').remove();
                }
            });
        });
}
//================================================================================================================================
//                                                      Update Data
//================================================================================================================================
function PopupFormCategory(a) {

    var url = sub + "Employee/CreateEmployee/" + a;
    var formDiv = $('<div/>');
    $.get(url,
        function (rData) {
            formDiv.html(rData);

            popUp = formDiv.dialog({
                autoOpen: true,
                resizable: false,
                title: "Employe Setup",
                height: 600,
                width: 700,
                close: function () {
                    window.location.href = sub + "Employee/EmployeeDetails";
                    popUp.dialog('destroy').remove();
                }

            });
        });
}
//================================================================================================================================
//                                                      Delete Data
//================================================================================================================================
function CategoryDeleteForm(a) {
    var url = sub + "Employee/DeleteEmployee";
    var parm = { id: a };
    alert("Are You Sure!......");
    $.post(url,
        parm,
        function (rData) {
            if (rData != null && rData != undefined) {
                window.location.href = sub + "Employee/EmployeeDetails";
                alert("Deleted Successfully...........!");
            } else {
                alert("Deleted Unsuccessfully...........!");
            }

        });
}
//================================================================================================================================
//                                                      Reset Button
//================================================================================================================================
