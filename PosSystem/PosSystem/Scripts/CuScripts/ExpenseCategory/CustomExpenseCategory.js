//Declare two variable
var popUp, dataTable;
//================================================================================================================================
//                                                      Load Table Content
//================================================================================================================================

$(document).ready(function () {

    var sl = 0;
    dataTable = $("#ExpenseCategoryDataTable").DataTable({
        "ajax": {
            "url": sub + "ExpenseCategory/GetExpenseCategoryData",
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
            { "data": "CategoryType", "autoWidth": true },
            { "data": "CategoryName", "autoWidth": true },
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
            "emptyTable": "No Data Found Please Click on the <b> Add Expense Category</b> Button."
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
                title: "Expense Category Setup",
                height: 500,
                width: 700,
                close: function () {
                    window.location.href = sub + "ExpenseCategory/AddExpenseCategory";
                    popUp.dialog('destroy').remove();
                }
            });
        });
}
//================================================================================================================================
//                                                      Update Data
//================================================================================================================================
function PopupFormCategory(a) {

    var url = sub + "ExpenseCategory/OpenExpenseCategoryForm/" + a;
    var formDiv = $('<div/>');
    $.get(url,
        function (rData) {
            formDiv.html(rData);

            popUp = formDiv.dialog({
                autoOpen: true,
                resizable: false,
                title: "Expense Category Setup",
                height: 500,
                width: 700,
                close: function () {
                    window.location.href = sub + "ExpenseCategory/AddExpenseCategory";
                    popUp.dialog('destroy').remove();
                }

            });
        });
}
//================================================================================================================================
//                                                      Delete Data
//================================================================================================================================
function CategoryDeleteForm(a) {
    var url = sub + "ExpenseCategory/DeleteCategory";
    var parm = { id: a };
    alert("Are You Sure!......");
    $.post(url,
        parm,
        function (rData) {
            if (rData != null && rData != undefined) {
                window.location.href = sub + "ExpenseCategory/AddExpenseCategory";
                alert("Deleted Successfully...........!");
            } else {
                alert("Deleted Unsuccessfully...........!");
            }

        });
}




