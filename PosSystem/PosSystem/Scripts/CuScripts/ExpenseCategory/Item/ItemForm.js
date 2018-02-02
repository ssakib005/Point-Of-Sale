
$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: sub + "Item/GetCategory",
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

function formSave() {
    var id = $("#Id").val();
    var categoryType = $("#CategoryId").val();
    var name = $("#Name").val();
    var code = $("#Code").val();
    var description = $("#Description").val();
    var costPrice = $("#CostPrice").val();
    var salePice = $("#SellPrice").val();

    var fData = {
        Id: id,
        CategoryId:categoryType,
        Name: name,
        Code: code,
        Description: description,
        CostPrice: costPrice,
        SellPrice:salePice
    }

    $.ajax({
        type: "POST",
        url: sub + "Item/OpenItemForm",
        contentType: "application/Json; charset=utf-8",
        data: "{itemSave:" + JSON.stringify(fData) + "}",
        
        success: function (rData) {
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
