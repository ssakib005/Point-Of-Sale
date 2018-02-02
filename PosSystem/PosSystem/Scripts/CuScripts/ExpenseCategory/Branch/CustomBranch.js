//Declare two variable
var popUp, dataTable;
//================================================================================================================================
//                                                      Load Table Content
//================================================================================================================================

$(document).ready(function () {

    var sl = 0;
    dataTable = $("#branchDataTable").DataTable({
        "ajax": {
            "url": sub + "Branch/GetBranchData",
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
            { "data": "Organization", "autoWidth": true },
            { "data": "Code", "autoWidth": true },
            { "data": "ContactNumber", "autoWidth": true },
            { "data": "Address", "autoWidth": true },
            {
                "data": "Id", "render": function (data) {
                    return "<a class='btn btn-success' style='margin-left: 20px' onclick='PopupFormCategory(" + data + ")'><i class='fa fa-pencil'></i></a><a class='btn btn-danger' style='margin-left: 10px' onclick='CategoryDeleteForm(" + data + ")'><i class='fa fa-trash-o'></i></a>";
                },
                "orderable": false,
                "width": "150px"
            }
        ],
        "language": {
            "emptyTable": "No Data Found Please Click on the <b> Add Branch</b> Button."
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
                title: "Branch Setup",
                height: 500,
                width: 700,
                close: function () {
                    window.location.href = sub + "Branch/AddBranch";
                    popUp.dialog('destroy').remove();
                }
            });
        });
}
//================================================================================================================================
//                                                      Update Data
//================================================================================================================================
function PopupFormCategory(a) {

    var url = sub + "Branch/OpenBranchForm/" + a;
    var formDiv = $('<div/>');
    $.get(url,
        function (rData) {
            formDiv.html(rData);

            popUp = formDiv.dialog({
                autoOpen: true,
                resizable: false,
                title: "Branch Setup",
                height: 500,
                width: 700,
                close: function () {
                    window.location.href = sub + "Branch/AddBranch";
                    popUp.dialog('destroy').remove();
                }

            });
        });
}
//================================================================================================================================
//                                                      Delete Data
//================================================================================================================================
function CategoryDeleteForm(a) {
    var url = sub + "Branch/DeleteBranch";
    var parm = { id: a };
    alert("Are You Sure!......");
    $.post(url,
        parm,
        function (rData) {
            if (rData != null && rData != undefined) {
                window.location.href = sub + "Branch/AddBranch";
                alert("Deleted Successfully...........!");
            } else {
                alert("Deleted Unsuccessfully...........!");
            }

        });
}