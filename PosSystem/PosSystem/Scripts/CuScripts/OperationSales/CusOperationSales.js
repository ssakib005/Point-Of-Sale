
$(document).ready(function () {

    $("#updateItem").hide();

    $("#SaleDate").datepicker({
        dateFormat: "yy/mm/dd",
        changeMonth: true,
        changeYear: true,
        dateonly: true,
        showOn: "both",
        buttonText: "<i class='fa fa-calendar'>"
    });
    dropdownItemList();
    loadBranches();
    getCustomerFromParty();
    createPurchaseCode();
});

function createPurchaseCode() {
    $.ajax({
        type: "POST",
        url: sub + "OperationSales/CreateSalesCode",  
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(),
        success: function (rData) {
            var counter = rData.Count;
            if (counter >= 0 && counter < 10) {
                $("#SalesCode").val("00000000" + (++counter));
            } else if (counter >= 10 && counter < 100) {
                $("#SalesCode").val("0000000" + (++counter));
            } else if (counter >= 100 && counter < 1000) {
                $("#SalesCode").val("000000" + (++counter));
            } else if (counter >= 1000 && counter < 10000) {
                $("#SalesCode").val("00000" + (++counter));
            } else if (counter >= 10000 && counter < 100000) {
                $("#SalesCode").val("0000" + (++counter));
            } else if (counter >= 100000 && counter < 1000000) {
                $("#SalesCode").val("000" + (++counter));
            } else if (counter >= 1000000 && counter < 10000000) {
                $("#SalesCode").val("00" + (++counter));
            } else if (counter >= 10000000 && counter < 100000000) {
                $("#SalesCode").val("0" + (++counter));
            } else if (counter >= 100000000 && counter < 1000000000) {
                $("#SalesCode").val((++counter)); 
            }
        }
    });
}



var previousQuantity = 0;  
var stock = 0; 
$("#Qty").on("keyup",
    function() {

        stock = parseInt($("#totalStackQty").val());
        var qty = parseInt($(this).val());
        if (stock < qty) {
            alert("Slock insufficient");
            $(this).val("");
            stock += previousQuantity;
            previousQuantity = 0;
            $("#totalStackQty").val(stock);

        } else {
            if ($(this).val() == "") {
                qty = 0;
                stock += previousQuantity;
                stock -= qty;
                previousQuantity = qty;
                $("#totalStackQty").val(stock);

            } else {

                if (previousQuantity < qty) {
                    stock += previousQuantity;
                    stock -= qty;
                    previousQuantity = qty;
                    $("#totalStackQty").val(stock);

                } else if (previousQuantity > qty) {

                    stock += previousQuantity;
                    stock -= qty;
                    previousQuantity = qty;
                    $("#totalStackQty").val(stock);

                }
            }
        }
    });




//--------------Get Item List
function dropdownItemList() { 
    $.ajax({
        type: "POST",
        url: sub + "OperationSales/GetItem",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(),
        success: function (rData) {
            if (rData != "" && rData != undefined) {
                $("#loadSalesItem").empty();
                $("#loadSalesItem").append('<option value="">---------Select----------</option>');
                $.each(rData,
                    function (k, v) {
                        $("#loadSalesItem").append('<option value="' + v.Name + '">' + v.Name + '</option>');
                    });
            }
        }
    });
}
//----------------------------//

function loadBranches() {
    var id = $("#salesId").val();
    if (id != "") {

    } else {
        $.ajax({
            type: "POST",
            url: sub + "OperationSales/GetBranch",
            contentType: "application/Json; charset=utf-8",
            data: JSON.stringify(),
            success: function (rData) {
                if (rData != "" && rData != undefined) {
                    $("#salesBranch").empty();
                    $("#salesBranch").append('<option value="">-------------------------Select-----------------------</option>');
                    $.each(rData,
                        function (k, v) {
                            $("#salesBranch").append('<option value="' + v.Name + '">' + v.Name + '</option>');
                        });
                }
            }
        });

    }
}

function getCustomerFromParty() {
    $.ajax({
        type: "POST",
        url: sub + "OperationSales/GetCustomerFromParty",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(),
        success: function (rData) {
            if (rData != "" && rData != undefined) {
                $("#customerName").empty();
                $("#customerName").append('<option value="">');
                $.each(rData,
                    function (k, v) {
                        $("#customerName").append('<option value="' + v.Name + '">');
                    });
            }
        }
    });
}

$("#salesBranch").change(function() {

    var braName = $(this).val();
    var para = { name: braName };
    $.ajax({
        type: "POST",
        url: sub + "OperationSales/GetEmployee",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(para),
        success: function (rData) {
            if (rData != "" && rData != undefined) {
                $("#salesEmployee").empty();
                $("#salesEmployee").append('<option value="">-------------------------Select-----------------------</option>');
                $.each(rData,
                    function (k, v) {
                        $("#salesEmployee").append('<option value="' + v.Name + '">' + v.Name + '</option>');
                    });
            }
        }
    });

});

$("#loadSalesItem").change(function() {

    var count = 0;  

    var itemName = $("#loadSalesItem").val();
    for (var i = 0; i < itemNameList.length; i++) {
        if (itemNameList[i] == itemName) {
            count++;
        }
    }
    if (count == 1) {
        alert("Item already Added to the List");
        $("#Qty").val("1");
        $("#Price").val("0");
        $("#totalStackQty").val("0");
        dropdownItemList();
    } else {
        var para = { name: itemName };

        $.ajax({
            type: "POST",
            url: sub + "OperationSales/GetItemDetails",
            contentType: "application/Json; charset=utf-8",
            data: JSON.stringify(para),
            success: function (rData) {

                var qty = rData.Quantity;
                var price = rData.Price;
                $("#totalStackQty").val(qty);
                $("#Price").val(price);
            }
        });
    }

});

function SalesItemAdded() { 
    createRowForSales();
}

function createRowForSales() {
    var selecteditem = getSelectedItem();
    if (selecteditem == 0) {

    } else {

        var index = $("#salesItemTable").children("tr").length;

        var serial = index;
        var indexCell = "<td style='display: none'><input type='hidden' id='index" + index + "' name='PurchaseDetails.Index' value='" + index + "'/> </td>";
        var serialCell = "<td style='width: 20px; text-align: center'> " + (++serial) + "</td>";
        var itemName = "<td style='width: 150px; text-align: center'> <input type='hidden' id='itemName" + index + "' name='SalesDetails[" + index + "].ItemName' value='" + selecteditem.ItemName + "'/> <p id='cell1" + index + "'> " + selecteditem.ItemName + "</p></td>";
        var itemQuantity = "<td style='width: 40px; text-align: center'> <input type='hidden' id='itemQuantity" + index + "' name='SalesDetails[" + index + "].Qty' value='" + selecteditem.Quantity + "'/> <p id='cell2" + index + "'>" + selecteditem.Quantity + "</p></td>";
        var stockQuantity = "<td style='width: 40px; text-align: center; display: none'> <input type='hidden' id='stockQuantity" + index + "' name='SalesDetails[" + index + "].StockQty' value='" + selecteditem.StockQty + "'/> </td>";
        var itemAmount = "<td style='width: 50px; text-align: center'> <input type='hidden' id='itemAmount" + index + "' name='SalesDetails[" + index + "].Price' value='" + selecteditem.Amount + "'/> <p id='cell3" + index + "'>" + selecteditem.Amount + "</p></td>";
        var itemLineTotal = "<td style='width: 130px; text-align: center'> <input type='hidden' id='itemLineTotal" + index + "' name='SalesDetails[" + index + "].Total' value='" + selecteditem.Total + "'/> <p id='cell4" + index + "'> " + selecteditem.Total + "</p></td>";
        var action = "<td style='text-align: center'><a class='btn btn-success' style='margin-left: 5px; background-color: #384177' onclick='itemUpdate(" + index + ")'><i class='fa fa-pencil-square-o'></i></a><a class='btn btn-danger' style='margin-left: 5px; background-color: #290a04' id='deleteButton' onclick='amountChange(" + index + ")'><i class='fa fa-trash'></i></a></td>";

        var rowAdd = "<tr id='index'>" + indexCell + serialCell + itemName + itemQuantity +stockQuantity+ itemAmount + itemLineTotal + action + "</tr>";
        $("#salesItemTable").append(rowAdd);
        //dropdownItemList();
        //$("#Qty").val("1");
        //$("#Price").val("0");
        //$("#totalStackQty").val("0");
    }
}

var totalSalesAmount = 0;
var itemNameList = [];
var itemQtyChange = "";


function getSelectedItem() {

    var itemName = "";
    var amount = 0;
    var qty = 1;
    var stockQty = 0;
    var total = 0;
    var items = "";
    if ($("#loadSalesItem").val() == "" || $("#Price").val() == "" || isNaN(parseInt($("#Price").val())) || isNaN(parseInt($("#Qty").val()))) {
        alert("Please fill the required field with appropriate data");
    } else {

        itemName = $("#loadSalesItem").find(":selected").text();
        qty = parseInt($("#Qty").val());
        amount = parseInt($("#Price").val());
        stockQty = parseInt($("#totalStackQty").val());

        if (itemNameList.length == 0) {

                $("#totalStackQty").val(stockQty);
                itemNameList.push(itemName);
                total = qty * amount;
                totalSalesAmount += total;
                items = {
                    "ItemName": itemName,
                    "Quantity": qty,
                    "StockQty": stockQty,
                    "Amount": amount,
                    "Total": total
                }
                $("#totalAmount").val(totalSalesAmount);
                return items;

        } else {
            itemName = $("#loadSalesItem").find(":selected").text();

            for (var i = 0; i < itemNameList.length; i++) {
                if (itemNameList[i] == itemName) {
                    alert("Item already Added to the List");
                    dropdownList();
                    $("#Qty").val("1");
                    $("#Price").val("0");
                    return 0;
                }
            }
            $("#totalStackQty").val(stockQty);
            qty = $("#Qty").val();
            amount = $("#Price").val();
            itemNameList.push(itemName);
            total = qty * amount;
            totalSalesAmount += total;
            items = {
                "ItemName": itemName,
                "Quantity": qty,
                "StockQty": stockQty,
                "Amount": amount,
                "Total": total
            }
            $("#totalAmount").val(totalSalesAmount);
            return items;
        }
    }
    return 0;
}


$("#discountTextBox").click(function() {
    $(this).val("");
});

$("#totalPaidAmount").click(function () {
    $(this).val("");
});
$("#vatTextBox").click(function () {
    $(this).val("");
});

var totalAmount;
var totalPaidAmount;
var totalDue;

$("#totalPaidAmount").change(function () {
    totalAmount = $("#subTotalAmount").val();
    totalPaidAmount = $("#totalPaidAmount").val();
    totalDue = totalAmount - totalPaidAmount;
    $("#totalDueAmount").val(totalDue);
});


//===================================================
//Item Delete Operation
//===================================================

function amountChange(a) {
    var total = $("#itemLineTotal" + a).val();
    totalSalesAmount -= total;
    $("#totalAmount").val(totalSalesAmount);
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
    var quantity = parseInt($("#itemQuantity" + a).val());
    var amount = parseInt($("#itemAmount" + a).val());
    var stock = parseInt($("#stockQuantity" + a).val());
    previousQuantity = quantity;

    $("#itemUpdate").val(a);
    $("#loadSalesItem").val(name); 
    $("#Qty").val(quantity);
    $("#Price").val(amount);
    $("#totalStackQty").val(stock);

    totalSalesAmount -= quantity * amount;
}

function SalesItemUpdate(a) {
    $("#updateItem").hide();
    $("#addItem").show();

    var name = $("#loadSalesItem").val();
    var quantity = $("#Qty").val();
    var amount = $("#Price").val();
    var stock = $("#stockQuantity").val();

    var total = amount * quantity;
    totalSalesAmount += total;
    $("#totalAmount").val(totalSalesAmount);

    $("#itemName" + a).val(name);
    $("#itemQuantity" + a).val(quantity);
    $("#itemAmount" + a).val(amount);
    $("#itemLineTotal" + a).val(total);
    $("#stockQuantity" + a).val(stock);

    $("#cell1" + a).text(name);
    $("#cell2" + a).text(quantity);
    $("#cell3" + a).text(amount);
    $("#cell4" + a).text(total);

    dropdownList();
    $("#Qty").val("1");
    $("#Price").val("0");
}



$("#vatTextBox").on("keyup",function() {

    var totalAmount = parseInt($("#totalAmount").val());
    var discount = parseInt($("#discountTextBox").val());
    var vat = parseInt($(this).val());

    var subtotal = (totalAmount - (totalAmount * (discount / 100)));
    var includingVat = subtotal + (subtotal * (vat / 100));

    $("#subTotalAmount").val(includingVat);

});

//===================================================
//Item Update Done//
//===================================================

function loadThisPage() {
    window.location.href = sub + "OperationSales/AddSale";
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
        printWindow.document.write("<div class='row'> <div style='margin-left: 10px'><p id='branchName' style='padding-left:20px; font-weight: bold'>Branch:  <b style='margin-left: 300px'> Branch: </b> " + branch + "</p></div>");
        printWindow.document.write("<div style='margin-left: 10px'><p id='branchName' style='padding-left:20px; font-weight: bold'> <b style='width: 300px;'>Purchase Date: " + date + "</b>  <b style='width: 300px;'> Purchase By: </b> " + employee + "</p></div>");
        printWindow.document.write("<div style='margin-left: 10px'><p id='branchName' style='padding-left:20px; font-weight: bold'>Supplier: " + supplier + "  <b style='margin-left: 300px'> Remarks: </b> " + remarks + "</p></div>");
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



