$(document).ready(function () {

    const articleContainer = $('.article-container');

    function scrapeForArticles() {
        $.get("/api/scrape").then(function (data) {
            $.get("/api/articles?favorited=false").then(function (data) {
                articleContainer.empty();
                // If we have headlines, render them to the page
                if (data && data.length) {
                    displayArticles(data);
                } else {
                    // Otherwise render a message explaining we have no articles
                    displayEmpty();
                }
            });
            alert(data.message);
            console.log("this is being called")
        });
    }

    function displayEmpty() {
        console.log('displayEmpty() called');
    };

    function displayArticles(data) {
        console.log(`displayArticles called. ${data}`);
    };

    scrapeForArticles();

});