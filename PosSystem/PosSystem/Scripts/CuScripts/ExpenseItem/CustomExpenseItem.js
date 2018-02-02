//Declare two variable
var popUp, dataTable;
//================================================================================================================================
//                                                      Load Table Content
//================================================================================================================================

$(document).ready(function () {

    $.ajax({
        type: "POST",
        url: sub + "ExpenseItem/GetSubCategoryFromRootCategory",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(),
        success: function (rData) {
            if (rData != undefined && rData != "") {
                $("#loadExpenseItem").empty();
                $("#loadExpenseItem").append('<option value="">----------------Select---------------- </option>');
                $.each(rData,
                    function (k, v) {
                        $("#loadExpenseItem").append('<option value="' + v.Id + '">' + v.Name + '</option>');
                    });
            }
        }
    });

    var sl = 0;
    dataTable = $("#ExpenseItemDataTable").DataTable({
        "ajax": {
            "url": sub + "ExpenseItem/GetExpenseItemData",
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
            { "data": "CName", "autoWidth": true },
            { "data": "Name", "autoWidth": true },
            { "data": "Code", "autoWidth": true },
            { "data": "Description", "autoWidth": true },
            {
                "data": "Id", "render": function (data) {
                    return "<a class='btn btn-success' style='margin-left: 20px' onclick='PopupFormCategory(" + data + ")'><i class='fa fa-pencil'></i></a><a class='btn btn-danger' style='margin-left: 10px' onclick='CategoryDeleteForm(" + data + ")'><i class='fa fa-trash-o'></i></a>";
                },
                "orderable": false,
                "width": "150px"
            }
        ],
        "language": {
            "emptyTable": "No Data Found Please Click on the <b> Add Expense Item</b> Button."
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
                title: "Expense Item Setup",
                height: 500,
                width: 700,
                close: function () {
                    window.location.href = sub + "ExpenseItem/AddExpenseItem";
                    popUp.dialog('destroy').remove();
                }
            });
        });
}
//================================================================================================================================
//                                                      Update Data
//================================================================================================================================
function PopupFormCategory(a) {

    var url = sub + "ExpenseItem/OpenExpenseItemForm/" + a;
    var formDiv = $('<div/>');
    $.get(url,
        function (rData) {
            formDiv.html(rData);

            popUp = formDiv.dialog({
                autoOpen: true,
                resizable: false,
                title: "Expense Item Setup",
                height: 500,
                width: 700,
                close: function () {
                    window.location.href = sub + "ExpenseItem/AddExpenseItem";
                    popUp.dialog('destroy').remove();
                }

            });
        });
}
//================================================================================================================================
//                                                      Delete Data
//================================================================================================================================
function CategoryDeleteForm(a) {
    var url = sub + "ExpenseItem/DeleteItem";
    var parm = { id: a };
    alert("Are You Sure!......");
    $.post(url,
        parm,
        function (rData) {
            if (rData != null && rData != undefined) {
                window.location.href = sub + "ExpenseItem/AddExpenseItem";
                alert("Deleted Successfully...........!");
            } else {
                alert("Deleted Unsuccessfully...........!");
            }

        });
}


function Root() {
    $("#loadExpenseItem").val("");
}

function Child() {

}