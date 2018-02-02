//Declare two variable
var popUp, dataTable;
//============================================================
//                 Load Table Content
//============================================================

$(document).ready(function () {
   
    var sl = 0;
    dataTable = $("#partyDataTable").DataTable({
        "ajax": {
            "url": sub + "Party/GetPartyData",
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
            { "data": "Name", "autoWidth": true },
            { "data": "Code", "autoWidth": true },
            { "data": "ContactNumber", "autoWidth": true },
            { "data": "Email", "autoWidth": true },
            { "data": "Address", "autoWidth": true },
            { "data": "IsCustomer", "autoWidth": true },
            { "data": "IsSupplier", "autoWidth": true },
            {
                "data": "Id", "render": function (data) {
                    return "<a class='btn btn-success' style='margin-left: 20px' onclick='PopUpBranch(" + data + ")'><i class='fa fa-pencil'></i></a>" +
                        "<a class='btn btn-danger' style='margin-left: 10px' onclick='BranchDeleteForm(" + data + ")'><i class='fa fa-trash-o'></i></a>";
                },
                "orderable": false,
                "width": "150px"
            }
        ],
        "language": {
            "emptyTable": "No Data Found Please Click on the <b> Add Party</b> Button."
        }

    });


});
//============================================================
//                   Open PopUp Bar
//============================================================
function PopupForm(url) {
    var formDiv = $('<div/>');
    $.get(url,
        function (rData) {
            formDiv.html(rData);

            popUp = formDiv.dialog({
                autoOpen: true,
                resizable: false,
                title: "Party Setup",
                height: 600,
                width: 800,
                close: function () {
                    window.location.href = sub + "Party/AddParty";
                    popUp.dialog('destroy').remove();
                }
            });
        });
}
//============================================================
//                     Update Data
//============================================================
function PopUpBranch(a) {

    var url = sub + "Party/OpenPartyForm/" + a;
    var formDiv = $('<div/>');
    $.get(url,
        function (rData) {
            formDiv.html(rData);

            popUp = formDiv.dialog({
                autoOpen: true,
                resizable: false,
                title: "Party Setup",
                height: 600,
                width: 800,
                close: function () {
                    window.location.href = sub + "Party/AddParty";
                    popUp.dialog('destroy').remove();
                }

            });
        });
}
//============================================================
//                          Delete Data
//============================================================
function BranchDeleteForm(a) {
    var url = sub + "Party/DeleteParty";
    var parm = { id: a };
    alert("Are You Sure!......");
    $.post(url,
        parm,
        function (rData) {
            if (rData != null && rData != undefined) {
                window.location.href = sub + "Party/AddParty";
                alert("Deleted Successfully...........!");
            } else {
                alert("Deleted Unsuccessfully...........!");
            }

        });
}

//============================================================
//                    Reset Button
//============================================================
$("#reset").click(function () {

    $("#img").val('');
    $("#pic").hide();

});
