$(document).ready(function () {

    $('#favorites-nav').parents('.nav-item').removeClass('active');
    $('#home-nav').parents('.nav-item').addClass('active');

    const articleList = $(".article-list");
    $(document).on("click", ".not-favorite-btn", favoriteArticle);

    $.get("/api/articles").then(function (data) {
        console.log(data);
        displayArticles(data);
    });

    function displayArticles(articles) {
        const articleCards = [];

        articles.forEach(element => {
            if (!element.favorited) {
                articleCards.push(buildArticleCard(element));
            }
        });

        articleList.append(articleCards);
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
        const unfavoriteBtn = $('<button type="button" class="btn btn-secondary d-inline not-favorite-btn"><i class="far fa-bookmark"></i></button>');
        articleBody.append(articleTitle, articleAuthor, articlePubDate, articleSummary);
        articleItem.append(articleBody, unfavoriteBtn);

        return articleItem;
    }

    function favoriteArticle() {
        console.log('favoriteArticle called');

        let articleId = $(this).parents(".media").data("_id");
        let idObj = { _id: articleId };

        $(this)
            .parents(".media")
            .remove();

        $.ajax({
            method: "PUT",
            url: `/api/articles/favorites/${articleId}`,
            data: idObj
        }).then(function (data) {
            if (data.saved) {
                reload('/');
            }
        });
    }
});