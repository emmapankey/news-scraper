$(document).ready(function () {

    // Save an article function
    // $("#saveBtn").on("click", function(event) {
    $(document).on("click", "#saveBtn", function () {

        var id = $(this).data("id");
   
        // Send the post request.
        $.ajax("/api/saved/" + id, {
            type: "PUT",
        }).then(
            function (result) {
            }
        );
    });

    // Delete a saved article function
    $('#deleteBtn').click(function (event) {
        var id = $(this).data("id");

        $.ajax("/api/delete/" + id, {
            type:"PUT"
        }).then(
            function (result) {
            }
        );
    });
        
});