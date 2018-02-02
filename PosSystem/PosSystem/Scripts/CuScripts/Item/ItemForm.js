
$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: sub + "Item/GetCatagory",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(),
        success: function (rData) {
            if (rData != undefined && rData != "") {
                $("#loadCategory").empty();
                $("#loadCategory").append('<option value="">----------------Select---------------- </option>');
                $.each(rData,
                    function (k, v) {
                        $("#loadCategory").append('<option value="' + v.Id + '">' + v.Name + '</option>');
                    });
            }
        }
    });
    $("#pic").hide();
});
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
$("#reset").click(function () {

    $("#img").val('');
    $("#pic").hide();

});


$("#Name").change(function () {

    var itemName = $("#Name").val();
    var categorytId = $("#loadCategory").val();
    var category = "";
    var itemCode = "";
    var item = "";
    var param = { name: itemName, id: categorytId };

    $.ajax({
        type: "POST",
        url: sub + "Item/ItemChecker",
        contentType: "application/Json; charset=utf-8",
        data: JSON.stringify(param),
        success: function (rData) {
            var ctCode = rData.Category;
            if (rData.Count == -1) {
                alert("Item Exist");
                $("#Name").val("");
                $("#Code").val("");
            } else if (rData.Count == -2) {
                alert("Item already exist in another category");
                $("#Name").val("");
                $("#Code").val("");
            } else {
                
                $("#CtCode").val(ctCode);
                var code = 1;
                var codeCounter = 0;
                var dbCode = 1;
                if (rData == "") {
                    $("#ItCode").val("000" + (++codeCounter));
                    item = $("#ItCode").val();
                    category = $("#CtCode").val();
                    itemCode = category + "-" + item;
                    $("#Code").val(itemCode);
                    $("#ItCode").val(item);
                    $("#CtCode").val(category);

                } else {
                    $.each(rData.Code, function (k, v) {
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
                        $("#ItCode").val("000" + (codeCounter));
                        item = $("#ItCode").val();
                        category = $("#CtCode").val();
                        itemCode = category + "-" + item;
                        $("#Code").val(itemCode);
                    } else if (codeCounter >= 10 && codeCounter < 100) {
                        $("#ItCode").val("00" + (codeCounter));
                        item = $("#ItCode").val();
                        category = $("#CtCode").val();
                        itemCode = category + "-" + item;
                        $("#Code").val(itemCode);
                    } else if (codeCounter >= 100 && codeCounter < 1000) {
                        $("#ItCode").val("0" + (code));
                        item = $("#ItCode").val();
                        category = $("#CtCode").val();
                        itemCode = category + "-" + item ;
                        $("#Code").val(itemCode);
                    } else {
                        alert("There have insufficient space for organization");
                    }
                }
            }
        }
    });
});

function formSave() {

    if ($("#loadCategory").val() == "" ||
        $("#Name").val() == "" ||
        $("#Code").val() == "" ||
        $("#Description").val() == "") {
        alert("Please Select Expense category");
    } else {

        var id = $("#Id").val();
        var catId = $("#loadCategory").val();
        var categoryName = $("#loadCategory").find(":selected").text();
        var name = $("#Name").val();
        var code = $("#Code").val();
        var description = $("#Description").val();
        var costPrice = $("#CostPrice").val();
        var salePice = $("#SellPrice").val();

        var fData = {
            Id: id,
            CategoryId: catId,
            CatName: categoryName,
            Name: name,
            Code: code,
            Description: description,
            CostPrice: costPrice,
            SellPrice: salePice
        }

        $.ajax({
            type: "POST",
            url: sub + "Item/OpenItemForm",
            contentType: "application/Json; charset=utf-8",
            data: "{itemSave:" + JSON.stringify(fData) + "}",

            success: function(rData) {
                if (rData.success) {
                    popUp.dialog('close');
                    dataTable.ajax.reload();
                    alert("Submitted Successfully");
                    window.location.href = sub + "Item/AddItem";
                } else {
                    alert("Error Occured!!");
                }

            }
        });
    }
}
