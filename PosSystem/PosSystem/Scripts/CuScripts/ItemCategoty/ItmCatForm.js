
var categoryId;
var category;
var categoryName;

$(document).ready(function() {
    $("#rootCategory").hide();
    $("#pic").hide();
});
function Root() {
    $("#rootCategory").hide();
    $("#loadItemCategory").val("");
}
function Child() {
    $("#rootCategory").show();
    $.ajax({
        type: "POST",
        url: sub + "ItemCategory/GetSubCategoryFromRootCategory",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(),
        success: function (rData) {
            if (rData != undefined && rData != "") {
                $("#loadItemCategory").empty();
                $("#loadItemCategory").append('<option value="">----------------Select---------------- </option>');
                $.each(rData,
                    function (k, v) {
                        $("#loadItemCategory").append('<option value="' + v.Id + '">' + v.Name + '</option>');
                    });
            }
        }
    });
}
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $("#pic").show();
            $('#pic')
                .attr('src', e.target.result)
                .width(200)
                .height(200);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$("#Name").change(function () {


    if ($("#loadItemCategory").val() == "") {

        var categotyName = $("#Name").val();
        var para = { name: categotyName };

        $.ajax({
            type: "POST",
            url: sub + "ItemCategory/CategoryChecker",
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
        var rootId = $("#loadItemCategory").val();
        var param = { name: branchName, Id: rootId };

        $.ajax({
            type: "POST",
            url: sub + "ItemCategory/ChildCategoryChecker",
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

function FormSubmit() {

    if ($("#Name").val() == "" || $("#Code").val() == "") {

        alert("Please fill the required field");

    } else {

        if ($("#r").is(":checked")) {
            categoryId = $("#loadItemCategory").val();
            category = $("#r").val();
            categoryName = $("#loadItemCategory").find(":selected").text("");
        } else if ($("#c").is(":checked")) {
            categoryId = $("#loadItemCategory").val();
            category = $("#c").val();
            categoryName = $("#loadItemCategory").find(":selected").text();
        }
        var id = $("#Id").val();
        var name = $("#Name").val();
        var code = $("#Code").val();
        var description = $("#Description").val();

        var formData = {
            Id: id,
            RootId: categoryId,
            Category: category,
            CategoryName: categoryName,
            Name: name,
            Code: code,
            Description: description
        }

        $.ajax({
            type: "POST",
            url: sub + "ItemCategory/OpenItemCategoryForm",
            contentType: "application/Json; charset=utf-8",
            data: "{itemCategorySave:" + JSON.stringify(formData) + "}",
            success: function(rData) {
                if (rData.success) {
                    popUp.dialog('close');
                    dataTable.ajax.reload();
                    alert("Submitted Successfully");
                    //window.location.href = sub + "ItemCategory/AddItemCategory";
                }
            }
        });
    }
}
$("#reset").click(function () {

    $("#img").val('');
    $("#pic").hide();

});