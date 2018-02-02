


$(document).ready(function () {
    getPurchaseList();
    getBranch();
    getDate();
});


var dataTable;
function getPurchaseList() {

    var sl = 0;
    dataTable = $("#purchaseList").DataTable({
        "ajax": {
            "url": sub + "ReportPurchase/GetPurchaseDetails",
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
            { "data": "Date", "render": function (d) { return ToJavaScriptDate(d)}, "width": "150px" },
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

function SearchFromBranch() {

    var branch = $("#loadBranch").find(":selected").text();
    var fromDate = $("#FromDate").val();
    var toDate = $("#ToDate").val();
    var pur = { branchName: branch, fDate: fromDate, tDate: toDate };
    var sl = 0;
    $.ajax({
        type: "POST",
        url: sub + "ReportPurchase/GetPurchaseFromDate",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(pur),
        success: function (rData) {
            if (rData != "" && rData != undefined) {
                $("#purchaseTable").empty();
                $.each(rData,
                    function (k, v) {
                        var serial = "<td>" + (++sl) + "</td>";
                        var date = "<td>" + ToJavaScriptDate(v.Date) + "</td>";
                        var description = "<td>" + v.Description + "</td>";
                        var branch = "<td>" + v.Branch + "</td>";
                        var supplier = "<td>" + v.Supplier + "</td>";
                        var total = "<td>" + v.Total + "</td>";
                        var action = "<td><a class='btn btn-info' style='margin-left: 10px; background-color: #023e69; border: 0;' onclick='viewForm(" + v.Id + ")' onmouseout='modalClose()'><i class='fa fa-info'></i></a></td>";
                        $("#purchaseTable").append("<tr>" + serial + date + description + branch + supplier + total + action + "</tr>");
                    });
            }
        }
    });
}



function modalClose() {
    $("#purchaseModal").dialog('destroy').remove();
}


function viewForm(id) {

    var contentId = { ctId: id };
    var date = "";
    var description = "";
    var branch = "";
    var supplier = "";
    var total = "";
    var table = "";
    $.ajax({
        type: "POST",
        url: sub + "ReportPurchase/GetPurchaseFromId",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(contentId),
        success: function (rData) {

                date = "<tr><td style='color: white; font-size: 20px;padding:10px;'> Date: " + ToJavaScriptDate(rData.Date) + "</td></tr>";
                description = "<tr><td style='color: white; font-size: 20px;padding:10px;'>Description: " + rData.Description + "</td></tr>";
                branch = "<tr><td style='color: white; font-size: 20px;padding:10px;'> Branch: " + rData.Branch + "</td></tr>";
                supplier = "<tr><td style='color: white; font-size: 20px;padding:10px;'> Supplier: " + rData.Supplier + "</td></tr>";
                total = "<tr><td style='color: white; font-size: 20px;padding:10px;'> Total: " + rData.Total + "</td></tr>";

                table = "<table class='class='table table-bordered table-striped table-hover'>" +
                date +
                description +
                branch +
                supplier +
                total +
                    "</table>";
            $("#purchaseModalBody").html(table);
        }
    });


    $("#purchaseModal").modal("show");
}


function showAll() {
        location.reload();
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
    function() {

        var code = $(this).val();
        if (code != "") {
            var branch = $("#loadBranch").find(":selected").text();
            var fromDate = $("#FromDate").val();
            var toDate = $("#ToDate").val();
            var pur = { branchName: branch, fDate: fromDate, tDate: toDate, purchaseCode: code }; 
            var sl = 0;
            $.ajax({
                type: "POST",
                url: sub + "ReportPurchase/GetPurchaseFromCode",
                contentType: "application/Json; charset=utf-8",
                data: JSON.stringify(pur),
                success: function (rData) {
                    if (rData != "" && rData != undefined) {
                        $("#purchaseTable").empty();
                        $.each(rData,
                            function (k, v) {
                                var serial = "<td>" + (++sl) + "</td>";
                                var date = "<td>" + ToJavaScriptDate(v.Date) + "</td>";
                                var description = "<td>" + v.Description + "</td>";
                                var branch = "<td>" + v.Branch + "</td>";
                                var supplier = "<td>" + v.Supplier + "</td>";
                                var total = "<td>" + v.Total + "</td>";
                                var action = "<td><a class='btn btn-info' style='margin-left: 10px; background-color: #023e69; border: 0;' onclick='viewForm(" + v.Id + ")' onmouseout='modalClose()'><i class='fa fa-info'></i></a>";
                                $("#purchaseTable").append("<tr>" + serial + date + description + branch + supplier + total + action + "</tr>");
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
        url: sub + "ReportPurchase/GetBranch",
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
        theme:"dark-theme",
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