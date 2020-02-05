$(document).ready(function () {

    let notesBtn = $('.add-note-btn');
    let btnID = $('.add-note-btn').data('_id')
    let notesList = $('#note-list');
    console.log('btnid', btnID);

    $(document).on('click', notesBtn, displayNotes);

    function displayNotes(e) {
        let articleIdA = $(this).data("article-id");
        let articleIdB = $(this).attr('data-article-id');
        let articleIdC = $(this).attr('_id');
        console.log('article id a', articleIdA);
        console.log('article id b', articleIdB);
        console.log('article id c', articleIdC);


        // $.get(`/api/notes/${articleId}`).then(function (data) {
        //     console.log(data);
        //     if (data.length > 0) {
        //         $('#noNotes').remove();
        //         addNotesToModal(data);
        //     }
    };


    function addNotesToModal(notes) {
        const noteItems = [];

        notes.forEach(element => {
            noteItems.push(buildNoteCards(element));
        });

        notesList.append(noteItems);
    };

    function buildNoteCards(note) {

        const noteListItem = $('<li class="list-group-item">').data("_id", note._id);
        const deleteBtn = $('<button type="button" class="btn btn-danger d-inline deleteBtn">').text('x');
        const noteBody = $('<p class="d-inline">').text(note.body);

        noteListItem.append(deleteBtn, noteBody);

        return noteListItem;
    }

    $('#submit').on('click', function (event) {
        event.preventDefault();

        console.log('article id ', articleId);

        let newNote = {};
        let noteData = $('.modal textarea').val().trim();
        console.log(newNote);

        if (noteData) {
            newNote = {
                _articleId: articleId,
                body: noteData
            };
        }

        // $.post('/api/notes', newNote).then(function () {
        //     location.reload();
        // })


    })

});



