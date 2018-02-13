$(document).ready(function () {
    

    // Scrape articles request
    $(document).on("click", "#scrape", function () {
        $.ajax({
            method: "GET",
            url: "/api/scrape"
        }).done(function() {
            location.reload();
            $("#scrapedModal").modal();
        })
    });


            //     $("#noArticlesModal").modal();
            // }
            // else {
                //  location.reload();
            //     $("#scrapedModal").modal();
            // }

        // $("#scrapedModal").modal();
  

    // Save an article request
    $(document).on("click", "#saveBtn", function () {
        var id = $(this).data("id");

        $.ajax("/api/saved/" + id, {
            type: "PUT",
        }).done(function (result) {
        });
    });

    // "Delete" a saved article request
    $('#deleteBtn').click(function (event) {
        var id = $(this).data("id");

        $.ajax("/api/delete/" + id, {
            type: "POST"
        }).done(function() {
            location.reload();
        })
    });


    $(document).on("click", "#noteBtn", function () {
        $("#noteModal").modal();
    });

    // Create a note request
    $(document).on("click", "#saveNote", function () {

        var noteobj = {
            
        }

        $ajax({
            method: "POST",
            url: "/api/note",
            data: noteObj
        }).done(function (data) {

        })
    });

});