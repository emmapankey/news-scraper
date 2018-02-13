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

    // Save an article request
    $(document).on("click", "#saveBtn", function () {
        const id = $(this).data("id");

        $.ajax("/api/saved/" + id, {
            type: "PUT",
        }).done(function (result) {
        });
    });

    // "Delete" a saved article request
    $("#deleteBtn").click(function (event) {
        const id = $(this).data("id");

        $.ajax("/api/delete/" + id, {
            type: "POST"
        }).done(function() {
            location.reload();
        })
    });

    // On click of the article notes button
    $("#noteBtn").click(function (event) {
        // grab id for the article from the article notes button
        const id = $(this).data("id");
        //open note modal
        $("#noteModal").modal();

        // on click of the save note button
        $("#saveNote").click(function (event) {

            // post note text
            $.ajax("/api/note/" + id, {
                type: "POST",
                data: $(".noteText")
            }).done(function (data) {
                // do something here to display the newly created note
            })
        })
    });

});