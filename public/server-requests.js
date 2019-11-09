//CREATE
function addToCollection(collection, review) {
    $.ajax({
        url: `/api/${collection}`,
        method: 'post',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(review),
        success: () => {
            $('.add-section').html(`
                <button class="add">Add</button>
            `);
            switch(collection) {
                case 'airports':
                    loadAirportsPage();
                    break;
                case 'bars':
                    loadBarsPage();
                    break;
                case 'reviews':
                    loadReviewsPage()
                    break;
                default: loadHomePage();
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
                    displayAirports;
                    break;
                case 'bars':
                    displayBars;
                    break;
                case 'reviews':
                    console.log('reviews triggered')
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