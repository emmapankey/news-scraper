$(document).ready(function () {

    $(document).on("click", "#scrape", function () {
        // Scrape articles request
        $.ajax({
            method: "GET",
            url: "/api/scrape"
        }).done(function (data) {

            // if (data == "") {
            //     $("#noArticlesModal").modal();
            // }
            // else {
            //      location.reload();
            //     $("#scrapedModal").modal();
            // }
        })
        $("#scrapedModal").modal();
    });

    $(document).on("click", "#noteBtn", function () {
        $("#noteModal").modal();
    });

    $(document).on("click", "#saveNote", function () {

        var noteobj;

        // Create a note request
        $ajax({
            method: "POST",
            url: "/api/note",
            data: noteObj
        }).done(function (data) {

        })
    });

    $(document).on("click", "#saveBtn", function () {
        var id = $(this).data("id");

        // Save an article request
        $.ajax("/api/saved/" + id, {
            type: "PUT",
        }).done(function (result) {
        });
    });


    $('#deleteBtn').click(function (event) {
        var id = $(this).data("id");

        // "Delete" a saved article request
        $.ajax("/api/delete/" + id, {
            type: "POST",
            success: function(data){
                if(data.success == true){ // if true
                    location.reload(); // then reload the page
                }
            }
        });
    });

});