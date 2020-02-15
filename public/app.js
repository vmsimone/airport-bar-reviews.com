function loadHomePage() {
    $('main').html(`
        <h1>Welcome to Airport Bar Reviews .Com!</h1>
        <p>Visit your local airport bar and click the buttons above to get started</p>
    `);
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
    readCollection('reviews');
    $('main').append(`
        <div class="add-section">
            <button class="add">Add New</button>
        </div>
    `);
    readyAddButton();
}

function readyAddButton() {
    $('.add').on('click', () => {
        reviewAddForm();
    });
}

function readyListButtons() {
    $('.put').on('click', (event) => {
        let thisReview = $(event.currentTarget).parent().parent();
        reviewUpdateForm(thisReview);
    });

    $('.del').on('click', (event) => {
        const thisReview = $(event.currentTarget).parent().parent();
        const thisReviewId = thisReview.attr('id');
        
        deleteReview(thisReviewId);
    });
}

//activated after CREATE req
function displayAirports(data) {
    for (index in data.airports) {
        let thisAirport = data.airports[index];
        $('main').append(
            `
            <div class="review" id=${thisAirport.id}>
                <h3><a href="#">${thisAirport.fullAirportName}</a></h3>
            </div>
            `
        );
    }
}

function displayBars(data) {
    for (index in data.bars) {
        let thisBar = data.bars[index];
        $('main').append(
            `
            <div class="review" id=${thisBar.id}>
                <h3>${thisBar.name}</h3>
                <h4>Located in ${thisBar.airport}</h4>
                <p>${thisBar.location}</p>
            </div>
            `
        );
    }
}

function displayReviews(data) {
    for (index in data.reviews) {
        let thisReview = data.reviews[index];
        console.log(thisReview);
        $('main').append(
            `
            <div class="review" id=${thisReview.id}>    
                <div class="updateable-fields">
                    <h3>${thisReview.title}</h3>
                </div>
                <div class="static-fields">
                    <p>Review submitted on ${thisReview.date} by ${thisReview.author || 'Anonymous'}</p>
                </div>
                <div class="updateable-fields">
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