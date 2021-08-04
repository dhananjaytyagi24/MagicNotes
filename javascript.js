// To show notes when page is loaded
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
  let titleText = document.getElementById("addTitleText");
  let noteText = document.getElementById("addNoteText");

  let note = {
    titleText: titleText.value,
    noteText: noteText.value,
  };

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }
  notesArray.push(note);
  localStorage.setItem("notes", JSON.stringify(notesArray));
  titleText.value = "";
  noteText.value = "";
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }

  let htmlString = "";
  Array.from(notesArray).forEach((note, index) => {
    htmlString += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${note.titleText}</h5>
                <p class="card-text">${note.noteText}</p>
                <button id="${index}" class="btn-sm btn-primary" onclick="deleteNote(this.id)">Delete Note</button>
            </div>
        </div>
    `;
  });

  let noteArea = document.getElementById("notes");
  if (notesArray == null || notesArray.length == 0) {
    noteArea.innerText = "No notes to show!";
  } else {
    noteArea.innerHTML = htmlString;
  }
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArray = [];
    return;
  } else {
    notesArray = JSON.parse(notes);
  }

  if (notesArray.length != 0) {
    notesArray.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }
  showNotes();
}

let inputText = document.getElementById("inputText");
inputText.addEventListener("input", () => {
    let notes = document.getElementsByClassName("noteCard");

    // get the first element with specified tag
    // since there is only 1 p tag in card HTML this works
    Array.from(notes).forEach((note) => {
        let noteText = note.getElementsByTagName("p")[0].innerText;
        let noteTitle = note.getElementsByTagName("h5")[0].innerText;
        if(noteText.includes(inputText.value) || noteTitle.includes(inputText.value)){
            note.style.display = "block";
        }
        else {
            note.style.display = "none";
        }
    });
});