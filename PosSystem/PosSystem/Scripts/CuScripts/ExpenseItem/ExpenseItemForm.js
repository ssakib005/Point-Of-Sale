
$(document).ready(function () {
    $("#rootCategory").hide();
    $("#pic").hide();
});




$("#Name").change(function () {

    var itemName = $("#Name").val();
    var categorytId = $("#loadExpenseItem").val();
    var param = { name: itemName, id: categorytId };

    $.ajax({
        type: "POST",
        url: sub + "ExpenseItem/ItemChecker",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(param),
        success: function (rData) {

            if (rData.Count == -1) {
                alert("Item Exist");
                $("#Name").val("");
                $("#Code").val("");
            } else {
                var counter = rData.length;
                var code = 1;
                var codeCounter = 0;
                var dbCode = 1;
                if (rData == "") {
                    $("#Code").val("000" + (++codeCounter));
                } else {
                    $.each(rData, function (k, v) {
                        if (code == v.Code) {
                            if (dbCode == (++code)) {
                                codeCounter = (++code);
                                dbCode = v.Code;
                            } else {
                                codeCounter = (code);
                                ++code;
                            }
                        } else {
                            codeCounter = code;
                            dbCode = v.Code;
                        }
                    });
                    if (codeCounter >= 0 && codeCounter < 10) {
                        $("#Code").val("000" + (codeCounter));
                    } else if (codeCounter >= 10 && codeCounter < 100) {
                        $("#Code").val("00" + (codeCounter));
                    } else if (codeCounter >= 100 && codeCounter < 1000) {
                        $("#Code").val("0" + (code));
                    } else {
                        alert("There have insufficient space for organization");
                    }
                }
            }
        }
    });
});





function formSave() {

    if ($("#loadExpenseItem").val() == "" || $("#Name").val() == "" || $("#Code").val() == "" || $("#Description").val()=="")  {
        alert("Please Select Expense category");
    } else {
        var id = $("#Id").val();
        var categoryId = $("#loadExpenseItem").val();
        var categoryName = $("#loadExpenseItem").find(":selected").text();
        
        var name = $("#Name").val();
        var code = $("#Code").val();
        var description = $("#Description").val();


        var fData = {
            Id: id,
            CategoryId: categoryId,
            ExpenseCategoryName: categoryName,
            Name: name,
            Code: code,
            Description: description
        }
        $.ajax({
            type: "POST",
            url: sub + "ExpenseItem/OpenExpenseItemForm",
            contentType: "application/Json; charset=utf-8",
            data: "{expenseItemSave:" + JSON.stringify(fData) + "}",

            success: function (rData) {
                if (rData.success) {
                    popUp.dialog('close');
                    dataTable.ajax.reload();
                    alert("Successful");
                } else {
                    alert("Error Occured!!");
                }

            }
        });






    }
}