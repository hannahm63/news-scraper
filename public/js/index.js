$(document).ready(function () {

    const articleContainer = $('.article-container');

    // $(document).on('click', '.favorite-btn', FavoriteArticle);
    // $(document).on('click', '#scrape-new-btn', scrapeForArticles);
    // $(document).on('click', '#view-previous-btn', DisplayOldArticles);

    function scrapeForArticles() {
        $.get("/api/scrape").then(function (data) {
            alert(data.message);
            console.log("this is being called")
        });
    }

    scrapeForArticles();

    // function scrapeForArticles() {
    //     // This function handles the user clicking any "scrape new article" buttons
    //     $.get("/api/fetch").then(function (data) {
    //         // If we are able to successfully scrape the NYTIMES and compare the articles to those
    //         // already in our collection, re render the articles on the page
    //         // and let the user know how many unique articles we were able to save
    //         initPage();
    //         bootbox.alert($("<h3 class='text-center m-top-80'>").text(data.message));
    //     });
    // }


    // function onPageLoad() {
    //     // Run an AJAX request for any unsaved headlines
    //     $.get("/api/articles?favorited=false").then(function (data) {
    //         articleContainer.empty();
    //         // If we have headlines, render them to the page
    //         if (data && data.length) {
    //             renderArticles(data);
    //         } else {
    //             // Otherwise render a message explaining we have no articles
    //             renderEmpty();
    //         }
    //     });
    // }

});