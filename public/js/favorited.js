$(document).ready(function () {

    $('#home-nav').parents('.nav-item').removeClass('active');
    $('#favorites-nav').parents('.nav-item').addClass('active');

    const favoriteList = $(".favorite-list");
    $(document).on("click", ".favorite-btn", unfavoriteArticle);

    $.get("/api/articles").then(function (data) {
        console.log(data);
        displayArticles(data);
    });

    function displayArticles(articles) {
        const articleCards = [];

        articles.forEach(element => {
            if (element.favorited) {
                articleCards.push(buildArticleCard(element));
            }
        });

        favoriteList.append(articleCards);
    }

    function buildArticleCard(article) {

        const articleItem = $('<li class="media my-1 mx-5 px-5 pb-2 pt-3 border">').data("_id", article._id);
        const articleBody = $('<div class="media-body">');
        const articleTitle = $('<h5 class="mt-0 mb-1">')
            .append(
                $('<a target="_blank">')
                    .attr("href", article.link)
                    .text(article.title)
            );
        const articleAuthor = $('<h6>').text(`Written by: ${article.author}`);
        const articlePubDate = $('<h6>').text(`Published: ${article.publishDate}`);
        const articleSummary = $('<p>').text(`${article.summary}...`);
        const addNoteBtn = $(`<button type="button" class="btn btn-warning mx-2 pl-3 d-inline add-note-btn" data-toggle="modal" data-target="#noteModal" data-article-id=${article._id}>`)
            .data("_id", article._id)
            .append('<i class="far fa-edit">');
        const favoriteBtn = $('<button type="button" class="btn btn-success mx-2 d-inline favorite-btn"><i class="fas fa-bookmark"></i></button>');

        articleBody.append(articleTitle, articleAuthor, articlePubDate, articleSummary);
        articleItem.append(articleBody, addNoteBtn, favoriteBtn);

        return articleItem;
    }

    function unfavoriteArticle() {
        console.log('favoriteArticle called');

        let articleId = $(this).parents(".media").data("_id");
        let idObj = { _id: articleId };

        $(this)
            .parents(".media")
            .remove();

        $.ajax({
            method: "PUT",
            url: `/api/articles/unfavorites/${articleId}`,
            data: idObj
        }).then(function (data) {
            if (data.saved) {
                reload('/');
            }
        });
    }
});