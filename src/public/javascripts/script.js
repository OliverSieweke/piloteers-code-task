import { configs } from "./configs.js";
const { MAX_FILE_NAME_LENGTH, SHORTENED_FILE_NAME_LENGTH } = configs;

const upload = document.getElementById("upload");
const fileInput = document.getElementById("file-input");
const fileDisplay = document.getElementById("file-display");
const uploadError = document.getElementById("upload-error");
const uploadErrorMessage = document.getElementById("upload-error-message");
const hideUploadError = document.getElementById("hide-upload-error");
const submit = document.getElementById("submit");

// ---------------------------------------------------------------------------------------------- \\
// ---------------------------------------- FILE DISPLAY ---------------------------------------- \\
fileInput.addEventListener("change", e => {
    hideError();
    // noinspection JSUnresolvedVariable
    showFile(e.target.files[0]);
});

function showFile(file) {
    // Display File:
    fileDisplay.textContent = file.name.length < MAX_FILE_NAME_LENGTH ? file.name :
                              `${file.name.slice(0, SHORTENED_FILE_NAME_LENGTH)}\u2026.json`;
    fileDisplay.className = "selected";

    // Enable Button:
    submit.disabled = false;
}

// ---------------------------------------------------------------------------------------------- \\
// ------------------------------------- DRAG FUNCTIONALITY ------------------------------------- \\
const DRAG_EVENTS = ["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"];
const ACTIVE_DRAG_EVENTS = ["dragenter", "dragover"];
const INACTIVE_DRAG_EVENTS = ["dragleave", "dragend", "drop"];

for (const dragEvent of DRAG_EVENTS) {
    upload.addEventListener(dragEvent, e => {
        e.preventDefault();
        e.stopPropagation();
    });
}
for (const activeDragEvent of ACTIVE_DRAG_EVENTS) {
    upload.addEventListener(activeDragEvent, () => {
        upload.className = "active";
    });
}
for (const inactiveDragEvent of INACTIVE_DRAG_EVENTS) {
    upload.addEventListener(inactiveDragEvent, () => {
        upload.className = "";
    });
}

upload.addEventListener("drop", e => {
    hideError();

    const dataTransfer = new DataTransfer();

    for (const file of e.dataTransfer.files) { // We only want to keep the first valid file
        if (file.name.match(/\.json$/u)) {
            dataTransfer.items.add(file);
            break;
        }
    }

    if (dataTransfer.files.length === 0) {
        showError("You may only upload .json files!");
    } else {
        fileInput.files = dataTransfer.files;
        showFile(dataTransfer.files[0]);
    }

    if (e.dataTransfer.files.length > 1) {
        showError("You may only upload one single file!");
    }
});

// ---------------------------------------------------------------------------------------------- \\
// --------------------------------------- UPLOAD ERRORS ---------------------------------------- \\
hideUploadError.addEventListener("click", hideError);

function showError(errorMessage) {
    /* eslint-disable-next-line no-void */
    void uploadError.offsetHeight; // Accessing offsetHeight forces a redraw and restarts the transition in case an error was already being displayed.
    uploadErrorMessage.textContent = errorMessage;
    uploadError.className = "visible";
}

function hideError() {
    uploadError.className = "hidden";
}

// ---------------------------------------------------------------------------------------------- \\
// ----------------------------------------- SUBMISSION ----------------------------------------- \\
submit.addEventListener("click", submitFile);

function submitFile() {
    const formData = new FormData();
    const [file] = fileInput.files;

    formData.append("file", file);

    fetch("/location", {
        method: "POST",
        body: formData,
    });
    // TODO: handle response and errors. Maybe add spinner
}
