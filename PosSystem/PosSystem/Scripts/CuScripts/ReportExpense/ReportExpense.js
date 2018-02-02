$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: sub + "ReportsExpense/GetBranch",
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
 });