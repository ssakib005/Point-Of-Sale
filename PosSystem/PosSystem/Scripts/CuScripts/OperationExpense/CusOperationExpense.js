
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
branchDropdown();
employeeDropdown();
});


function dropdownList() {

    var id = $("#expenseId").val();
    if (id != "") {
                
    } else {
        $.ajax({
            type: "POST",
            url: sub + "OperationExpense/GetExpenseItem",
            contentType: "application/Json; charset=utf-8",
            data: JSON.stringify(),
            success: function (rData) {
                if (rData != "" && rData != undefined) {
                    $("#loadExpenseItem").empty();
                    $("#loadExpenseItem").append('<option value="">---------Select----------</option>');
                    $.each(rData,
                        function (k, v) {
                            $("#loadExpenseItem").append('<option value="' + v.Name + '">' + v.Name + '</option>');
                        });
                }
            }
        });
    }
}

function employeeDropdown() {
    var id = $("#expenseId").val();
    if (id != "") {

    } else {
        $.ajax({
            type: "POST",
            url: sub + "OperationExpense/GetEmployee",
            contentType: "application/Json; charset=utf-8",
            data: JSON.stringify(),
            success: function (rData) {
                if (rData != "" && rData != undefined) {
                    $("#employeeSelectForExpense").empty();
                    $("#employeeSelectForExpense").append('<option value="">---------------Select-----------------</option>');
                    $.each(rData,
                        function (k, v) {
                            $("#employeeSelectForExpense").append('<option value="' + v.Name + '">' + v.Name + '</option>');
                        });
                }
            }
        });
    }
}

function branchDropdown() {
    var id = $("#expenseId").val();
    if (id != "") {

    } else {
    $.ajax({
        type: "POST",
        url: sub + "OperationExpense/GetBranch",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(),
        success: function(rData) {
            if (rData != "" && rData != undefined) {
                $("#branchSelectForExpense").empty();
                $("#branchSelectForExpense")
                    .append('<option value="">---------------Select-----------------</option>');
                $.each(rData,
                    function(k, v) {
                        $("#branchSelectForExpense").append('<option value="' + v.Name + '">' + v.Name + '</option>');
                    });
                }
            }
        });
    }
}

function ExpenseItemAdded() {
    createRowForExpense();
}
function createRowForExpense() {
    var selecteditem = getSelectedItem();

    if (selecteditem == 0) { 
        
    } else {

        var index = $("#expenseItemTable").children("tr").length;

        var serial = index;
        var indexCell = "<td style='display: none'><input type='hidden' id='index" + index + "' name='ExpenseDetails.Index' value='" + index + "'/> </td>";
        var serialCell = "<td style='width: 20px; text-align: center'> " + (++serial) + "</td>";
        var itemName = "<td style='width: 150px; text-align: center'> <input type='hidden' id='itemName" + index + "' name='ExpenseDetails[" + index + "].ItemName' value='" + selecteditem.ItemName + "'/>                     <p id='cell1"+index+"'> " + selecteditem.ItemName + "</p></td>";
        var itemQuantity = "<td style='width: 40px; text-align: center'> <input type='hidden' id='itemQuantity" + index + "' name='ExpenseDetails[" + index + "].Quantity' value='" + selecteditem.Quantity + "'/>                     <p id='cell2" + index +"'>" + selecteditem.Quantity + "</p> </td>";
        var itemAmount = "<td style='width: 50px; text-align: center'> <input type='hidden' id='itemAmount" + index + "' name='ExpenseDetails[" + index + "].Amount' value='" + selecteditem.Amount + "'/>                         <p id='cell3" + index +"'>" + selecteditem.Amount + "</p> </td>";
        var itemLineTotal = "<td style='width: 130px; text-align: center'> <input type='hidden' id='itemLineTotal" + index + "' name='ExpenseDetails[" + index + "].Total' value='" + selecteditem.Total + "'/>                           <p id='cell4" + index +"'> " + selecteditem.Total + "</p></td>";
        var itemDescription = "<td style='width: 200px; text-align: center'> <input type='hidden' id='itemDescription" + index + "' name='ExpenseDetails[" + index + "].Description' value='" + selecteditem.Description + "'/>    <p id='cell5" + index +"'>" + selecteditem.Description + "</p></td>";
        var action = "<td style='text-align: center'><a class='btn btn-success' style='margin-left: 5px; background-color: #384177' onclick='itemUpdate("+index+")'><i class='fa fa-pencil-square-o'></i></a><a class='btn btn-danger' style='margin-left: 5px; background-color: #290a04' id='deleteButton' onclick='amountChange("+index+")'><i class='fa fa-trash'></i></a></td>";
        
        var rowAdd = "<tr id='index'>" + indexCell + serialCell + itemName + itemQuantity + itemAmount + itemLineTotal + itemDescription + action + "</tr>";
        $("#expenseItemTable").append(rowAdd);
        dropdownList();
        $("#Description").val("");
        $("#Quantity").val("1");
        $("#Amount").val("0");
    }
}

var totalExpenseAmount = 0;  

function getSelectedItem() {

    var itemName = "";
    var description = "";
    var amount = 0;
    var qty = 1;

    if ($("#loadExpenseItem").val() == "" || $("#Description").val() == "" || $("#Amount").val() == "" || isNaN(parseInt($("#Amount").val())) || isNaN(parseInt($("#Quantity").val())) ) {
        alert("Please fill the required field with appropriate data");
    } else {
        itemName = $("#loadExpenseItem").find(":selected").text();
        description = $("#Description").val();
        qty = $("#Quantity").val();
        amount = $("#Amount").val();
        var total = qty * amount;
        totalExpenseAmount += total;
        var items = {
            "ItemName": itemName,
            "Description": description,
            "Quantity": qty,
            "Amount": amount,
            "Total": total
        }
        $("#totalAmount").val(totalExpenseAmount);

        return items;
    }
    return 0;
}

var totalAmount;
var totalPaidAmount;
var totalDue;

function paidAmount() {
    totalAmount = $("#totalAmount").val();
    totalPaidAmount = $("#totalPaidAmount").val();
    totalDue = totalAmount - totalPaidAmount;
    $("#totalDueAmount").val(totalDue);
}

//===================================================
//Item Delete Operation
//===================================================

function amountChange(a) {
    var total = $("#itemLineTotal" + a).val();
    totalExpenseAmount -= total;
    $("#totalAmount").val(totalExpenseAmount);
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
    var description = $("#itemDescription" + a).val();
    var quantity = $("#itemQuantity" + a).val();
    var amount = $("#itemAmount" + a).val();

    $("#itemUpdate").val(a);
    $("#loadExpenseItem").val(name);
    $("#Description").val(description);
    $("#Quantity").val(quantity);
    $("#Amount").val(amount);

    totalExpenseAmount -= quantity * amount;
}

function ExpenseItemUpdate(a) {
    $("#updateItem").hide();
    $("#addItem").show();

    var name =  $("#loadExpenseItem").val();
    var description = $("#Description").val();
    var quantity = $("#Quantity").val();
    var amount = $("#Amount").val();

    var total = amount * quantity;
    totalExpenseAmount += total;
    $("#totalAmount").val(totalExpenseAmount);

    $("#itemName" + a).val(name);
    $("#itemDescription" + a).val(description);
    $("#itemQuantity" + a).val(quantity);
    $("#itemAmount" + a).val(amount);
    $("#itemLineTotal" + a).val(total);

    $("#cell1"+a).text(name);
    $("#cell2"+a).text(quantity);
    $("#cell3"+a).text(amount);
    $("#cell4"+a).text(total);
    $("#cell5"+a).text(description);

    dropdownList();
    $("#Description").val("");
    $("#Quantity").val("1");
    $("#Amount").val("0");
}

//===================================================
//Item Update Done//
//===================================================

function loadThisPage() {
    window.location.href = sub + "OperationExpense/Expense";
}

function printPage() {

        var branch = $("#branchSelectForExpense").find(":selected").text();
        var employee = $("#employeeSelectForExpense").find(":selected").text();
        var date = $("#DateTime").val();

        var table = $("#expensePanel").html();
        var summery = $("#expenseSummery").html();

        var printWindow = window.open(' ', ' ', 'height = 800, width=1000');
        printWindow.document.write("<html><head></head><body style='-webkit-print-color-adjust: exact;'>");
        printWindow.document.write("<div class='row' style='background-color: #441106; color: white; font-size: 40px; padding: 30px;'> JIT: Pos System </div>");
        printWindow.document.write("<div class='row'> <div class='col-md-4'><p id='branchName' style='padding-left:20px; font-weight: bold'>Branch: " + branch + "</p></div>");
        printWindow.document.write("<div class='col-md-4'><p id='emloyeeName' style='padding-left:20px; font-weight: bold'>Employee: " + employee + "</p></div>");
        printWindow.document.write("<div class='col-md-4'><p id='expenseDate' style='padding-left:20px; font-weight: bold'>Date: " + date + " </p></div>");
        printWindow.document.write("</div>");
        printWindow.document.write(table);
        printWindow.document.write("<hr style='height: 2px;'>");
        printWindow.document.write(summery);
        printWindow.document.write('</body></html >');
        printWindow.document.close();
        setTimeout(function () {
            printWindow.print();
        }, 500);
    return false;
}