
$(document).ready(function () {
    $("#rootCategory").hide();
});
function Root() {
    $("#rootCategory").hide();
    $("#loadExpenseCategory").val("");
}

function Child() {
    $("#rootCategory").show();
    $.ajax({
        type: "POST",
        url: sub + "ExpenseCategory/GetSubCategoryFromRootCategory",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(),
        success: function (rData) {
            if (rData != undefined && rData != "") {
                $("#loadExpenseCategory").empty();
                $("#loadExpenseCategory").append('<option value="">----------------Select---------------- </option>');
                $.each(rData,
                    function (k, v) {
                        $("#loadExpenseCategory").append('<option value="' + v.Id + '">' + v.Name + '</option>');
                    });
            }
        }
    });
}

$("#Name").change(function () {


    if ($("#loadExpenseCategory").val() == "") {

        var categotyName = $("#Name").val();
        var para = { name: categotyName}; 

        $.ajax({
            type: "POST",
            url: sub + "ExpenseCategory/CategoryChecker",
            contentType: "application/Json; charset=utf-8",
            data: JSON.stringify(para),
            success: function (rData) {

                if (rData.Count == -1) {
                    alert("Category Exist");
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


    } else {
        var branchName = $("#Name").val();
        var rootId = $("#loadExpenseCategory").val(); 
        var param = { name: branchName, Id: rootId };

        $.ajax({
            type: "POST",
            url: sub + "ExpenseCategory/ChildCategoryChecker",
            contentType: "application/Json; charset=utf-8",
            data: JSON.stringify(param), 
            success: function (rData) {

                if (rData.Count == -1) {
                    alert("Category Exist");
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
    }
});

function formSave() {

    if ($("#Name").val() == "" || $("#Code").val() == "") {

        alert("Please fill the required field");

    } else {

        var categoryId = "";
        var categoryType = "";
        var categoryName = "";

        if ($("#r").is(":checked")) {
            categoryType = $("#r").val();
            categoryId = $("#loadExpenseCategory").val("");
            categoryName = $("#loadExpenseCategory").find(":selected").text("");
        } else if ($("#c").is(":checked")) {
            categoryType = $("#c").val();
            categoryId = $("#loadExpenseCategory").val();
            categoryName = $("#loadExpenseCategory").find(":selected").text();
        }

        var id = $("#Id").val();
        var name = $("#Name").val();
        var code = $("#Code").val();
        var description = $("#Description").val();


        var fData = {
            Id: id,
            Category: categoryType,
            ExpenseRootId: categoryId,
            CategoryName: categoryName,
            Name: name,
            Code: code,
            Description: description
        }

        $.ajax({
            type: "POST",
            url: sub + "ExpenseCategory/OpenExpenseCategoryForm",
            contentType: "application/Json; charset=utf-8",
            data: "{expenseCategorySave:" + JSON.stringify(fData) + "}",

            success: function(rData) {
                if (rData.success) {
                    popUp.dialog('close');
                    dataTable.ajax.reload();
                    alert("Submitted Successfully");
                } else {
                    alert("Error Occured!!");
                }

            }
        });
    }
}
