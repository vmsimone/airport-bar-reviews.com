//CREATE
function addReview(review) {
    $.ajax({
        url: '/api/reviews',
        method: 'post',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(review),
        success: () => {
            $('.add-section').html(`
                <button class="add">Add</button>
            `);
            loadListPage();
        }
    }); 
}

//READ
function getReviews() {
    $.ajax({
        url: '/api/reviews',
        method: 'get',
        success: displayData
    });
}

//UPDATE
function updateReview(review) {
    $.ajax({
        url: `/api/reviews/${review.id}`,
        method: 'put',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(review),
        success: () => { loadListPage() }
    });
}

//DELETE
function deleteReview(reviewId) {
    $.ajax({
        url: `/api/reviews/${reviewId}`,
        method: 'delete',
        success: () => { loadListPage() }
    });
}