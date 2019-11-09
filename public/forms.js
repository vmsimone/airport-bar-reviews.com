function loadUpdateForm(selectedReview) {
    const reviewID = $(selectedReview).attr('id');

    const classSelector = `#${reviewID} .updateable-fields`;
    const oldTitle = $(`#${reviewID} .updateable-fields h3`).text();
    const oldDescription = $(`#${reviewID} .updateable-fields p`).text();

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
        loadListPage();
    });
}

function loadAddForm() {
    $('.add-section').html(`
        <form action="#" name="add-form" class="js-add">
            <fieldset>
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
        const title = $(event.currentTarget).find('#add-review-title').val();
        const desc = $(event.currentTarget).find('#add-review-description').val();

        let addObject = {
            "title": `${title}`,
            "description": `${desc}`
        };
        addReview(addObject);
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