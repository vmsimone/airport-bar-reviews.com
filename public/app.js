function loadHomePage() {
    $('main').html(`
        <h1>Welcome to Airport Bar Reviews .Com!</h1>
        <p>Visit your local airport bar and click the buttons above to get started</p>
    `);
}

function loadAirportsPage() {
    $('main').html(`
        <h2>A list of airports with bars that have been reviewed</h2>
    `);
    getReviews();
    $('main').append(`
        <div class="add-section">
            <button class="add">Add New</button>
        </div>
    `);
    readyAddButton();
}

function loadBarsPage() {
    $('main').html(`
        <h2>A list of bars that have been reviewed</h2>
    `);
    getReviews();
    $('main').append(`
        <div class="add-section">
            <button class="add">Add New</button>
        </div>
    `);
    readyAddButton();
}

function loadReviewsPage() {
    $('main').html(`
        <h2>A list of every review added to this site</h2>
    `);
    getReviews();
    $('main').append(`
        <div class="add-section">
            <button class="add">Add New</button>
        </div>
    `);
    readyAddButton();
}

function readyNavButtons() {
    $('#home').on('click', () => {
        loadHomePage();
    });
    $('#airports').on('click', () => {
        loadAirportsPage();
    });
    $('#bars').on('click', () => {
        loadBarsPage();
    });
    $('#reviews').on('click', () => {
        loadReviewsPage();
    });
}

function readyListButtons() {
    $('.put').on('click', (event) => {
        let thisReview = $(event.currentTarget).parent().parent();
        loadUpdateForm(thisReview);
    });

    $('.del').on('click', (event) => {
        const thisReview = $(event.currentTarget).parent().parent();
        const thisReviewId = thisReview.attr('id');
        
        deleteReview(thisReviewId);
    });
}

function readyAddButton() {
    $('.add').on('click', () => {
        loadAddForm();
    });
}

//activated after CREATE req
function displayData(data) {
    for (index in data.reviews) {
        let thisReview = data.reviews[index];
        $('main').append(
            `
            <div class="review" id=${thisReview.id}>
                <div class="static-fields"></div>
                <div class="updateable-fields">
                    <h3>${thisReview.title}</h3>
                    <p>${thisReview.description}</p>
                    <button class="put">Update</button>
                    <button class="del">Delete</button>
                </div>
            </div>
            `
        );
    }
    readyListButtons();
}

$(readyNavButtons)