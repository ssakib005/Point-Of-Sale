


$(document).ready(function () {
    selectBranch();
    getStockList();
});

function selectBranch() {

$.ajax({
    type: "POST",
    url: sub + "ReportsStock/GetBranch",
    contentType: "application/Json; charset=utf-8",
    data: JSON.stringify(),
    success: function (rData) {
        if (rData != undefined && rData != "") {
            $("#stocks").empty();
            $("#stocks").append('<option value="">');
            $.each(rData,
                function (k, v) {
                    $("#stocks").append('<option value="' + v.Name + '">' + v.Name + '</option>');
                });
            }
        }
    });
}

var dataTable;
function getStockList() {

    var sl = 0;
    dataTable = $("#stockHeadTable").DataTable({
        "ajax": {
            "url": sub + "ReportPurchase/GetStockReport",
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
            { "data": "Date", "render": function (d) { return ToJavaScriptDate(d) }, "width": "150px" },
            { "data": "Description", "width": "150px" },
            { "data": "Branch", "width": "150px" },
            { "data": "Supplier", "width": "200px" },
            { "data": "Total", "width": "250px" },
            {
                "data": "Id", "render": function (data) {
                    return "<a class='btn btn-info' style='margin-left: 10px; background-color: #023e69; border: 0;' onclick='viewForm(" + data + ")' onmouseout='modalClose()'><i class='fa fa-info'></i></a>";
                },
                "orderable": false,
                "width": "150px"

            }
        ],
        "language": {
            "emptyTable": "No Data Found Please Click on the <b> Add Item</b> Button."
        },
        "dom": '<"top"li>rt<"bottom"p><"clear">'
    });
}

