
$(document).ready(function () {
    getSalesList();
    getBranch();
    getDate();
});
var dataTable;
function getSalesList() {

    var sl = 0; 
    dataTable = $("#salesList").DataTable({
        "ajax": {
            "url": sub + "ReportSales/GetSalesDetails", 
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
            { "data": "Customer", "width": "200px" },
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
function SearchFromBranch() {

    var branch = $("#loadBranch").find(":selected").text();
    var fromDate = $("#FromDate").val();
    var toDate = $("#ToDate").val();
    var pur = { branchName: branch, fDate: fromDate, tDate: toDate };
    var sl = 0;
    $.ajax({
        type: "POST",
        url: sub + "ReportSales/GetSalesFromDate",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(pur),
        success: function (rData) {
            if (rData != "" && rData != undefined) {
                $("#salesTable").empty();
                $.each(rData,
                    function (k, v) {
                        var serial = "<td>" + (++sl) + "</td>";
                        var date = "<td>" + ToJavaScriptDate(v.Date) + "</td>";
                        var description = "<td>" + v.Description + "</td>";
                        var branch = "<td>" + v.Branch + "</td>"; 
                        var customer = "<td>" + v.Customer + "</td>";
                        var total = "<td>" + v.Total + "</td>";
                        var action = "<td><a class='btn btn-info' style='margin-left: 10px; background-color: #023e69; border: 0;' onclick='viewForm(" + v.Id + ")' onmouseout='modalClose()'><i class='fa fa-info'></i></a></td>";
                        $("#salesTable").append("<tr>" + serial + date + description + branch + customer + total + action + "</tr>");
                    });
            }
        }
    });
}
function showAll() {
    var sl = 0;
    $.ajax({
        type: "POST",
        url: sub + "ReportSales/ShowSalesDetails",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(),
        success: function (data) {
            if (data != "" && data != undefined) {
                $("#salesTable").empty();
                $.each(data,
                    function (k, v) {
                        var serial = "<td>" + (++sl) + "</td>";
                        var date = "<td>" + ToJavaScriptDate(v.Date) + "</td>";
                        var description = "<td>" + v.Description + "</td>";
                        var branch = "<td>" + v.Branch + "</td>";
                        var customer = "<td>" + v.Customer + "</td>";
                        var total = "<td>" + v.Total + "</td>";
                        var action = "<td><a class='btn btn-info' style='margin-left: 10px; background-color: #023e69; border: 0;' onclick='viewForm(" + v.Id + ")' onmouseout='modalClose()'><i class='fa fa-info'></i></a></td>";
                        $("#salesTable").append("<tr>" + serial + date + description + branch + customer + total + action + "</tr>");
                    });
            }
        }
    });
}
function modalClose() {
    $("#salesModal").dialog('destroy').remove(); 
}


function viewForm(id) {

    var contentId = { ctId: id };
    var date = "";
    var description = "";
    var branch = "";
    var customer = ""; 
    var total = "";
    var name = "";
    var quantity = "";
    var price = "";
    var serial = "";
    var sl = 0;
    var totalSalePrice = 0;
    var table = "";
    $.ajax({
        type: "POST",
        url: sub + "ReportSales/GetSalesFromId",
        contentType: "application/Json; charset=utf-8", 
        data: JSON.stringify(contentId),
        success: function (rData) {
            date = "<tr><td style='color: white; font-size: 18px;padding:10px;'> Date: " + ToJavaScriptDate(rData.Date) + "</td></tr>";
            description = "<tr><td style='color: white; font-size: 18px;padding:10px;'>Description: " + rData.Description + "</td></tr>";
            branch = "<tr><td style='color: white; font-size: 18px;padding:10px;'> Branch: " + rData.Branch + "</td></tr>";
            customer = "<tr><td style='color: white; font-size: 18px;padding:10px;'> Customer: " + rData.Customer + "</td></tr>";
            total = "<tr><td style='color: white; font-size: 18px;padding:10px;'> Total: " + rData.Total + "</td></tr>";

            table = "<table class='class='table table-bordered table-striped table-hover'>" +
                date +
                description +
                branch +
                customer +
                total +
                "</table>";
            $("#salesModalBody").html(table);
            $.ajax({
                type: "POST",
                url: sub + "ReportSales/GetSalesDetailsFromId",
                contentType: "application/Json; charset=utf-8",
                data: JSON.stringify(contentId),
                success: function (rData) {
                    $.each(rData,
                        function (k, v) {
                            serial = "<td style='color: white; font-size: 18px;padding:10px;'>" + (++sl) + "</td>";
                            name = "<td style='color: white; font-size: 18px;padding:10px;'>Item Name: " + v.ItemName + "</td>";
                            quantity = "<td style='color: white; font-size: 18px;padding:10px;'>Quantity: " + v.Quantity + "</td>";
                            price = "<td style='color: white; font-size: 1px;padding:10px;'>Price: " + v.Price + "</td>";
                            totalSalePrice = "<td style='color: white; font-size: 18px;padding:10px;'>Total: " + v.Total + "</td>";
                            table = "<table class='class='table table-bordered table-striped table-hover'> <tr style='padding-left: 20px;'>" +
                                serial+
                                name +
                                quantity +
                                price +
                                totalSalePrice +
                                "</tr></table>";
                            $("#salesDetailsList").html(table);
                        });
                }
            });
        }
    });


    $("#salesModal").modal("show");
}


$("#PurchaseCode").on("keydown",
    function () {
        var code = $(this).val();
        if (code == "") {
            SearchFromBranch();
        } else {

        }

    });


$("#PurchaseCode").on("keyup",
    function () {

        var code = $(this).val();
        if (code != "") {
            var branch = $("#loadBranch").find(":selected").text();
            var fromDate = $("#FromDate").val();
            var toDate = $("#ToDate").val();
            var pur = { branchName: branch, fDate: fromDate, tDate: toDate, selasCode: code };
            var sl = 0;
            $.ajax({
                type: "POST",
                url: sub + "ReportSales/GetSalesFromCode",   
                contentType: "application/Json; charset=utf-8",
                data: JSON.stringify(pur),
                success: function (rData) {
                    if (rData != "" && rData != undefined) {
                        $("#salesTable").empty();
                        $.each(rData,
                            function (k, v) {
                                var serial = "<td>" + (++sl) + "</td>";
                                var date = "<td>" + ToJavaScriptDate(v.Date) + "</td>";
                                var description = "<td>" + v.Description + "</td>";
                                var branch = "<td>" + v.Branch + "</td>";
                                var customer = "<td>" + v.Customer + "</td>";
                                var total = "<td>" + v.Total + "</td>";
                                var action = "<td><a class='btn btn-info' style='margin-left: 10px; background-color: #023e69; border: 0;' onclick='viewForm(" + v.Id + ")' onmouseout='modalClose()'><i class='fa fa-info'></i></a>";
                                $("#salesTable").append("<tr>" + serial + date + description + branch + customer + total + action + "</tr>");
                            });
                    }
                }
            });


        } else {

        }

    });


function ToJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
}

function getBranch() {
    $.ajax({
        type: "POST",
        url: sub + "ReportSales/GetBranch",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(),
        success: function (rData) {
            if (rData != "" && rData != undefined) {
                $("#loadBranch").empty();
                $("#loadBranch").append('<option value="">---------Select----------</option>');
                $.each(rData,
                    function (k, v) {
                        $("#loadBranch").append('<option value="' + v.Name + '">' + v.Name + '</option>');
                    });
            }

        }
    });
}

function getDate() {

    $("#FromDate").datepicker({
        dateFormat: "yy/mm/dd",
        changeMonth: true,
        changeYear: true,
        dateonly: true,
        showOn: "both",
        theme: "dark-theme",
        buttonText: "<i class='fa fa-calendar'>"
    });
    $("#ToDate").datepicker({
        dateFormat: "yy/mm/dd",
        changeMonth: true,
        changeYear: true,
        dateonly: true,
        showOn: "both",
        buttonText: "<i class='fa fa-calendar'>"
    });
}