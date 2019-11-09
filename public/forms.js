function loadUpdateForm(selectedReview) {
    const reviewID = $(selectedReview).attr('id');

    const classSelector = `#${reviewID}`;
    const oldTitle = $(`${classSelector} .updateable-fields h3`).text();
    const oldDescription = $(`${classSelector} .updateable-fields p`).text();

    $(classSelector).html(`
        <form action="#" name="update-form" class="js-update">
            <fieldset>
                <label for="review-title">New Title:</label>
                <input type="text" id="review-title" value="${oldTitle}" autoselect>
                <br><br>
                <label for="review-description">New Description:</label>
                <input type="text" id="review-description" value="${oldDescription}">
                <br><br>
                <button type="submit" class="save">Save</button>
            </fieldset>
        </form>
        <br>
        <button class="cancel">Cancel</button>
    `);
    readyFormButtons(reviewID);
}

function readyFormButtons(reviewID) {
    $('.js-update').submit(event => {
        //update the review on the database and reload page
        event.preventDefault();
        
        let putObject = {
            "id": `${reviewID}`,
            "title": `${getValById(`#${reviewID}`, '#review-title')}`,
            "description": `${getValById(event.currentTarget, '#review-description')}`
        };
        updateReview(putObject);
    });

    $('.cancel').on('click', () => {
        loadReviewsPage();
    });
}

function loadAddForm() {
    $('.add-section').html(`
        <form action="#" name="add-form" class="js-add">
            <fieldset>
                <label for="add-review-airport">Which Airport?</label>
                <input type="text" id="add-review-airport" placeholder="Airport Name" required autoselect>
                <br><br>
                <label for="add-review-bar">Which Bar?</label>
                <input type="text" id="add-review-bar" placeholder="Bar Name" required autoselect>
                <br><br>
                <label for="add-review-title">Title:</label>
                <input type="text" id="add-review-title" placeholder="Your review Title" required autoselect>
                <br><br>
                <label for="add-review-description">Description:</label>
                <input type="text" id="add-review-description" placeholder="Your review here" required>
                <br><br>
                <button type="submit" class="save">Save</button>
            </fieldset>
        </form>
        <br>
        <button class="cancel">Cancel</button>
    `);
    readyAddFormButtons();
}

function readyAddFormButtons() {
    $('.js-add').submit(event => {
        //add a new review to the database and reload page
        event.preventDefault();
        const airport = $(event.currentTarget).find('#add-review-airport').val();
        const bar = $(event.currentTarget).find('#add-review-bar').val();
        const title = $(event.currentTarget).find('#add-review-title').val();
        const desc = $(event.currentTarget).find('#add-review-description').val();
        const currentDate = new Date();

        let addObject = {
            "airport": `${airport}`,
            "bar": `${bar}`,
            "title": `${title}`,
            "description": `${desc}`,
            "date": `${currentDate}`
        };

        console.log(addObject);
        addToCollection('reviews', addObject);
    });

    $('.cancel').on('click', () => {
        $('.add-section').html(`
            <button class="add">Add New</button>
        `);
        readyAddButton();
      });
}

function getValById(target, idSelector) {
    return $(target).find(idSelector).val();
}