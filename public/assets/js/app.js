$(document).ready(function () {

    // Save an article function
    // $("#saveBtn").on("click", function(event) {
    $(document).on("click", "#saveBtn", function () {

        var id = $(this).data("id");
        // alert(id);

        var newSavedState = {
            saved: true
        };
        
        // Send the post request.
        $.ajax("/api/saved/" + id, {
            type: "PUT",
            data: newSavedState
        }).then(
            function (result) {
            }
        );
    });

    // Delete a saved article function
    $('#deleteBtn').click(function (event) {
        var id = $(this).data("id");
        // alert(id);

        $.ajax("/api/saved" + id, {
            type:"PUT"
        }).then(
            function (result) {
            }
        );
    });
        
});