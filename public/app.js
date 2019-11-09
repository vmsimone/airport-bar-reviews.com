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
    readCollection('airports');
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
    readCollection('bars');
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
    console.log('reviews ready')
    readCollection('reviews');
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
function displayAirports(data) {
    for (index in data.airports) {
        let thisAirport = data.reviews[index];
        $('main').append(
            `
            <div class="review" id=${thisAirport.id}>
                <div class="static-fields"></div>
                <div class="updateable-fields">
                    <h3>${thisAirport.title}</h3>
                </div>
            </div>
            `
        );
    }
    readyListButtons();
}

function displayBars(data) {
    for (index in data.bars) {
        let thisBar = data.reviews[index];
        $('main').append(
            `
            <div class="review" id=${thisBar.id}>
                <div class="static-fields"></div>
                <div class="updateable-fields">
                    <h3>${thisBar.title}</h3>
                    <p>${thisBar.description}</p>
                    <button class="put">Update</button>
                    <button class="del">Delete</button>
                </div>
            </div>
            `
        );
    }
    readyListButtons();
}

function displayReviews(data) {
    for (index in data.reviews) {
        let thisReview = data.reviews[index];
        $('main').append(
            `
            <div class="review" id=${thisReview.id}>
                <div class="static-fields"></div>
                <div class="updateable-fields">
                    <h3>${thisReview.title}</h3>
                    <p>Review submitted on ${thisReview.date}</p>
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