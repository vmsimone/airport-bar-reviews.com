//CREATE
function addToCollection(collection, review) {
    console.log(collection);
    console.log(review);
    
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
                    break;
                default: loadHomePage();
            }
        }
    }); 
}

// function addAirport(airport) {
//     $.ajax({
//         url: '/api/airports',
//         method: 'post',
//         contentType: "application/json; charset=utf-8",
//         data: JSON.stringify(airport),
//         success: () => {
//             $('.add-section').html(`
//                 <button class="add">Add New</button>
//             `);
//             loadAirportsPage();
//         }
//     }); 
// }

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