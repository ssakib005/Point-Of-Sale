
$(document).ready(function () {

    $("#updateItem").hide();

    $("#DateTime").datepicker({
        dateFormat: "yy/mm/dd",
        changeMonth: true,
        changeYear: true,
        dateonly: true,
        showOn: "both",
        buttonText: "<i class='fa fa-calendar'>"
    });
    dropdownList();
    getBranches();
    createPurchaseCode();
});


function createPurchaseCode() {
    $.ajax({
        type: "POST",
        url: sub + "OperationPurchase/CreatePurchaseCode",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(),
        success: function(rData) {
            var counter = rData.Count;
            if (counter>=0 && counter<10) {
                $("#PurchaseCode").val("00000000"+(++counter));
            }else if (counter>=10 && counter <100) {
                $("#PurchaseCode").val("0000000" + (++counter));
            } else if (counter >= 100 && counter < 1000) {
                $("#PurchaseCode").val("000000" + (++counter));
            } else if (counter >= 1000 && counter < 10000) {
                $("#PurchaseCode").val("00000" + (++counter));
            } else if (counter >= 10000 && counter < 100000) {
                $("#PurchaseCode").val("0000" + (++counter));
            } else if (counter >= 100000 && counter < 1000000) {
                $("#PurchaseCode").val("000" + (++counter));
            } else if (counter >= 1000000 && counter < 10000000) {
                $("#PurchaseCode").val("00" + (++counter));
            } else if (counter >= 10000000 && counter < 100000000) {
                $("#PurchaseCode").val("0" + (++counter));
            } else if (counter >= 100000000 && counter < 1000000000) {
                $("#PurchaseCode").val((++counter));
            }
        }
    });
}


function dropdownList() {

    var id = $("#purchaseId").val();
    if (id != "") {

    } else {
        $.ajax({
            type: "POST",
            url: sub + "OperationPurchase/GetItem",
            contentType: "application/Json; charset=utf-8",
            data: JSON.stringify(),
            success: function (rData) {
                if (rData != "" && rData != undefined) {
                    $("#loadPurchaseItem").empty();
                    $("#loadPurchaseItem").append('<option value="">---------Select----------</option>');
                    $.each(rData,
                        function (k, v) {
                            $("#loadPurchaseItem").append('<option value="' + v.Name + '">' + v.Name + '</option>');
                        });
                }

            }
        });
    }
}

function getBranches() {
    var id = $("#purchaseId").val();
    if (id != "") {

    } else {
        $.ajax({
            type: "POST",
            url: sub + "OperationPurchase/GetBranch",
            contentType: "application/Json; charset=utf-8",
            data: JSON.stringify(),
            success: function (rData) {
                if (rData != "" && rData != undefined) {
                    $("#branchSelectForPurchase").empty();
                    $("#branchSelectForPurchase")
                        .append('<option value="">-------Select-------</option>');
                    $.each(rData,
                        function (k, v) {
                            $("#branchSelectForPurchase").append('<option value="' + v.Name + '">' + v.Name + '</option>');
                        });
                }
            }
        });
        $.ajax({
            type: "POST",
            url: sub + "OperationPurchase/GetParty",
            contentType: "application/Json; charset=utf-8",
            data: JSON.stringify(),
            success: function (rData) {
                if (rData != "" && rData != undefined) {
                    $("#supplierSelectForPurchase").empty();
                    $("#supplierSelectForPurchase").append('<option value="">-------Select-------</option>');
                    $.each(rData,
                        function (k, v) {
                            $("#supplierSelectForPurchase").append('<option value="' + v.Name + '">' + v.Name + '</option>');
                            
                        });
                }
            }
        });
    }
}

$("#branchSelectForPurchase").change(function() {

    var branchName = $(this).val();
    var para = { name: branchName };
    $.ajax({
        type: "POST",
        url: sub + "OperationPurchase/GetEmployee",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(para),
        success: function (rData) {
            if (rData != "" && rData != undefined) {
                $("#employeeSelectForPurchase").empty();
                $("#employeeSelectForPurchase").append('<option value="">-------Select-------</option>');
                $.each(rData,
                    function (k, v) {
                        $("#employeeSelectForPurchase").append('<option value="' + v.Name + '">' + v.Name + '</option>');
                    });
            }
        }
    });

});

$("#loadPurchaseItem").change(function() {
    var itemName = $("#loadPurchaseItem").find(":selected").text();
    var para = { name: itemName };
    $.ajax({
        type: "POST",
        url: sub + "OperationPurchase/GetItemCostPrice",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(para),
        success: function (rData) {
            if (rData != "" && rData != undefined) {

                var costPrice = rData.CostPrice;
                $("#Amount").val(costPrice);

            }
        }
    });

});


function PurchaseItemAdded() { 
    createRowForPurchase();
}

function createRowForPurchase() {
    var selecteditem = getSelectedItem();
    if (selecteditem == 0) {

    } else {

        var index = $("#purchaseItemTable").children("tr").length;

        var serial = index;
        var indexCell = "<td style='display: none'><input type='hidden' id='index" + index + "' name='PurchaseDetails.Index' value='" + index + "'/> </td>";
        var serialCell = "<td style='width: 20px; text-align: center'> " + (++serial) + "</td>";
        var itemName = "<td style='width: 150px; text-align: center'> <input type='hidden' id='itemName" + index + "' name='PurchaseDetails[" + index + "].ItemName' value='" + selecteditem.ItemName + "'/> <p id='cell1" + index + "'> " + selecteditem.ItemName + "</p></td>";
        var itemQuantity = "<td style='width: 40px; text-align: center'> <input type='hidden' id='itemQuantity" + index + "' name='PurchaseDetails[" + index + "].Quantity' value='" + selecteditem.Quantity + "'/> <p id='cell2" + index + "'>" + selecteditem.Quantity + "</p></td>";
        var itemAmount = "<td style='width: 50px; text-align: center'> <input type='hidden' id='itemAmount" + index + "' name='PurchaseDetails[" + index + "].Amount' value='" + selecteditem.Amount + "'/> <p id='cell3" + index + "'>" + selecteditem.Amount + "</p></td>";
        var itemLineTotal = "<td style='width: 130px; text-align: center'> <input type='hidden' id='itemLineTotal" + index + "' name='PurchaseDetails[" + index + "].Total' value='" + selecteditem.Total + "'/> <p id='cell4" + index + "'> " + selecteditem.Total + "</p></td>";
        var action = "<td style='text-align: center'><a class='btn btn-success' style='margin-left: 5px; background-color: #384177' onclick='itemUpdate(" + index +")'><i class='fa fa-pencil-square-o'></i></a><a class='btn btn-danger' style='margin-left: 5px; background-color: #290a04' id='deleteButton' onclick='amountChange(" + index +")'><i class='fa fa-trash'></i></a></td>"; 

        var rowAdd = "<tr id='index'>" + indexCell + serialCell + itemName + itemQuantity + itemAmount + itemLineTotal + action + "</tr>";
        $("#purchaseItemTable").append(rowAdd);
        dropdownList();
        $("#Quantity").val("1");
        $("#Amount").val("0");
    }
}

var totalPurchaseAmount = 0; 
var itemNameList = [];

var itemName = "";
function getSelectedItem() {


    var amount = 0; 
    var qty = 1;

    var total = 0;
    var items = "";
    if ($("#loadPurchaseItem").val() == "" || $("#Amount").val() == "" || isNaN(parseInt($("#Amount").val())) || isNaN(parseInt($("#Quantity").val()))) {
        alert("Please fill the required field with appropriate data");
    } else {

        itemName = $("#loadPurchaseItem").find(":selected").text();
        qty = $("#Quantity").val();
        amount = $("#Amount").val();
        if (itemNameList.length == 0) {
            itemNameList.push(itemName);
            total = qty * amount;
            totalPurchaseAmount += total;
            items = {
                "ItemName": itemName,
                "Quantity": qty,
                "Amount": amount,
                "Total": total
            }
            $("#totalAmount").val(totalPurchaseAmount);

            return items;
        } else {
            for (var i = 0; i < itemNameList.length; i++) {
                if (itemNameList[i] == itemName )  {
                    alert("Item already Added to the List");
                    dropdownList();
                    $("#Quantity").val("1");
                    $("#Amount").val("0");
                    return 0;
                }
            }
            itemNameList.push(itemName);
            total = qty * amount;
            totalPurchaseAmount += total;
            items = {
                "ItemName": itemName,
                "Quantity": qty,
                "Amount": amount,
                "Total": total
            }
            $("#totalAmount").val(totalPurchaseAmount);
            return items;
        }
    }
    return 0;
}

var totalAmount;
var totalPaidAmount;
var totalDue;

$("#totalPaidAmount").change(function() {
    totalAmount = $("#totalAmount").val();
    totalPaidAmount = $("#totalPaidAmount").val();
    totalDue = totalAmount - totalPaidAmount;
    $("#totalDueAmount").val(totalDue);
});


//===================================================
//Item Delete Operation
//===================================================

function amountChange(a) {
    var total = $("#itemLineTotal" + a).val();
    totalPurchaseAmount -= total;
    $("#totalAmount").val(totalPurchaseAmount);
    itemNameList = [];
}

$(".table tbody").on("click",
    "#deleteButton",
    function () {
        $(this).closest("tr").remove();
    });

//===================================================
//Item Item Delete Done
//===================================================

//===================================================
//Item Update Operation
//===================================================

function itemUpdate(a) {

    $("#updateItem").show();
    $("#addItem").hide();

    var name = $("#itemName" + a).val();
    var quantity = $("#itemQuantity" + a).val();
    var amount = $("#itemAmount" + a).val();

    $("#itemUpdate").val(a);
    $("#loadPurchaseItem").val(name);
    $("#Quantity").val(quantity); 
    $("#Amount").val(amount);

    totalPurchaseAmount -= quantity * amount;
}

function PurchaseItemUpdate(a) {
    $("#updateItem").hide();
    $("#addItem").show();

    var name = $("#loadPurchaseItem").val();
    var quantity = $("#Quantity").val();
    var amount = $("#Amount").val();

    var total = amount * quantity;
    totalPurchaseAmount += total;
    $("#totalAmount").val(totalPurchaseAmount);

    $("#itemName" + a).val(name);
    $("#itemQuantity" + a).val(quantity);
    $("#itemAmount" + a).val(amount);
    $("#itemLineTotal" + a).val(total);

    $("#cell1" + a).text(name);
    $("#cell2" + a).text(quantity);
    $("#cell3" + a).text(amount);
    $("#cell4" + a).text(total);

    dropdownList();
    $("#Quantity").val("1");
    $("#Amount").val("0");
}

//===================================================
//Item Update Done//
//===================================================

function loadThisPage() {
    window.location.href = sub + "OperationPurchase/Purchase";
}

function printPage() {

    if ($("#branchSelectForPurchase").val == "" || $("#Employee").val() == "") {
        alert("Please fill the required fild");
    } else {
        var branch = $("#branchSelectForPurchase").find(":selected").text(); 
        var employee = $("#employeeSelectForPurchase").find(":selected").text(); 
        var date = $("#DateTime").val();
        var supplier = $("#supplierSelectForPurchase").find(":selected").text();
        var remarks = $("#Remarkes").val(); 

        var table = $("#expensePanel").html();
        var summery = $("#expenseSummery").html(); 

        var printWindow = window.open(' ', ' ', 'height = 800, width=1000');
        printWindow.document.write("<html><head></head><body style='-webkit-print-color-adjust: exact;'>");
        printWindow.document.write("<div class='row' style='background-color: #441106; color: white; font-size: 40px; padding: 30px;'> JIT: Pos System </div>");
        printWindow.document.write("<div class='row'> <div style='margin-left: 10px'> Purchase Id: </div>");
        printWindow.document.write("<div style='margin-left: 10px'>Branch: " + branch + "</div>");
        printWindow.document.write("<div style='margin-left: 10px'>Purchase Date: " + date + "</div>");
        printWindow.document.write("<div style='margin-left: 10px'>Employee: " + employee + "</div>");
        printWindow.document.write("<div style='margin-left: 10px'>Supplier: " + supplier + "</div>");
        printWindow.document.write("<div style='margin-left: 10px'>Remarks: " + remarks + "</div>");
        printWindow.document.write("</div>");
        printWindow.document.write(table);
        printWindow.document.write("<hr style='height: 2px;'>");
        printWindow.document.write(summery);
        printWindow.document.write('</body></html >');
        printWindow.document.close();
        setTimeout(function () {

            printWindow.print();

        }, 500);
    }
    return false;
}




