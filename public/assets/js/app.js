$(document).ready(function () {

    // Save an article function
    $('#saveBtn').click(function (event) {

        var thisButton = this;

        var id = $(thisButton).data();
        alert(id);
        
        // Send the post request.
        $.ajax({
            cache: false,
            method: "PUT",
            url: "/api/saved/" + id,
            success: function (data) {
            },
            traditional: true
            // url: "/api/saved/" + id
        });

    });
});