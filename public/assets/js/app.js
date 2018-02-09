$(document).ready(function () {

    // Save an article function
    $('#saveBtn').click(function (event) {

        var id = $(this).data("id");
        // alert(id);

        var newSavedState = {
            saved: true
        };
        
        // Send the post request.
        $.ajax("/api/saved" + id, {
            type: "PUT",
            data: newSavedState
        }).then(
            function (result) {}
        );
    });

});