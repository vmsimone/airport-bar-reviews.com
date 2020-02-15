//CREATE
function addToCollection(collection, obj) {
    $.ajax({
        url: `/api/${collection}`,
        method: 'post',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(obj),
        success: () => {
            if(collection === 'reviews') {
                loadReviewsPage();
            }
        }
    }); 
}

//READ
function readCollection(collection) {
    $.ajax({
        url: `/api/${collection}`,
        method: 'get',
        success: (data) => {
            switch(collection) {
                case 'airports':
                    displayAirports(data);
                    break;
                case 'bars':
                    displayBars(data);
                    break;
                case 'reviews':
                    displayReviews(data);
                    break;
                default: loadHomePage();
            }
        }
    });
}

//UPDATE
function updateReview(review) {
    $.ajax({
        url: `/api/reviews/${review.id}`,
        method: 'put',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(review),
        success: () => { loadReviewsPage() }
    });
}

//DELETE
function deleteReview(reviewId) {
    $.ajax({
        url: `/api/reviews/${reviewId}`,
        method: 'delete',
        success: () => { loadReviewsPage() }
    });
}