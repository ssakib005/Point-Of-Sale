
var popUp, dataTable;


$(document).ready(function () {
    var sl = 0;
    dataTable = $("#ItemDataTable").DataTable({
        "ajax": {
            "url": sub + "Item/GetItemData",
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
            {"data": "CategoryType","width":"150px"},
            { "data": "Name", "width": "150px" },
            { "data": "Code", "width": "150px" },
            { "data": "Description", "width": "200px" },
            { "data": "CostPrice", "width": "250px" },
            {"data": "SellPrice","width":"250px"},
            {
                "data": "Id", "render": function (data) {
                    return "<a class='btn btn-success' style='margin-left: 20px' onclick='PopupFormOrg(" + data + ")'><i class='fa fa-pencil'></i></a><a class='btn btn-danger' style='margin-left: 10px' onclick='OrgDeleteForm(" + data + ")'><i class='fa fa-trash-o'></i></a>";
                },
                "orderable": false,
                "width": "150px"

            }
        ],
        "language": {
            "emptyTable": "No Data Found Please Click on the <b> Add Item</b> Button."
        }
    });
});

function OrgDeleteForm(a) {
    var url = sub + "Item/DeleteItem";
    var parm = { id: a };
    alert("Are You Sure!......");
    $.post(url,
        parm,
        function (rData) {
            window.location.href = sub + "Item/AddItem";
            alert("Deleted Successfully...........!");
        });
}



function PopupFormOrg(a) {

    var url = sub + "Item/OpenItemForm/" + a;
    var formDiv = $('<div/>');
    $.get(url,
        function (rData) {
            formDiv.html(rData);
            popUp = formDiv.dialog({
                autoOpen: true,
                resizable: false,
                title: "Item Setup",
                height: 600,
                width: 700,
                close: function () {
                    popUp.dialog('destroy').remove();
                    window.location.href = sub + "Item/AddItem";
                }

            });
        });
}



function PopupForm(url) {
    var formDiv = $('<div/>');
    $.get(url,
        function (rData) {
            formDiv.html(rData);

            popUp = formDiv.dialog({
                autoOpen: true,
                resizable: false,
                title: "Item Setup",
                height: 500,
                width: 700,
                close: function () {
                    window.location.href = sub + "Item/AddItem";
                    popUp.dialog('destroy').remove();
                }

            });
        });
}











