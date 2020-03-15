import {
  dragHandler,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop
} from "./_drag-and-drop";
import { handleFiles } from "./_file-handler";
import { addToModal, clearModal, hideModal, showModal } from "./_modal";
import { fileStore } from "./_file-store";
import { renderAlert } from "./_alert";

const dropArea = document.querySelector(".js-drop-area");
const fileInput = document.querySelector(".js-file-input");
const uploadBtn = document.querySelector(".js-upload-btn");

/**
 * The dragged item is dragged over dropArea,
 * making it the target for the drop event if the user drops it there.
 */
dropArea.addEventListener(
  "dragenter",
  event => dragHandler(event, handleDragEnter),
  false
);

/**
 * The dragged item is dragged off of dropArea and onto another element,
 * making it the target for the drop event instead.
 */
dropArea.addEventListener(
  "dragleave",
  event => dragHandler(event, handleDragLeave),
  false
);

/**
 * Every few hundred milliseconds,
 * while the dragged item is over dropArea and is moving.
 */
dropArea.addEventListener(
  "dragover",
  event => dragHandler(event, handleDragOver),
  false
);

/**
 * The user releases their mouse button,
 * dropping the dragged item onto dropArea.
 */
dropArea.addEventListener(
  "drop",
  event => dragHandler(event, handleDrop),
  false
);

fileInput.addEventListener("change", e => {
  const files = e.target.files;
  handleFiles(files);
});

const uploadModalContent = `
  <div class="grid-container flex justify-center"> 
    <div class="modal__card">
      <button class="modal__close-btn js-modal-close-btn">&times;</button>
      <form class="form">
        <div class="form-group">
          <label>
            <p class="label">URL</p>
            <input type="text" name="endpoint" required />
          </label>
        </div>
        <div class="form-group">
          <label>
            <p class="label">Secret Label</p>
            <input type="text" name="secret-name" />
          </label>
        </div>
        <div class="form-group">
          <label>
            <p class="label">Secret Value</p>
            <input type="text" name="secret" />
          </label>
        </div>
        <button class="primary-button block" type="submit">Send</button>
      </div>
    </div>
</div>
`;

uploadBtn.addEventListener("click", () => {
  const modal = document.querySelector(".js-modal");
  addToModal(modal, uploadModalContent);
  showModal(modal);

  const closeBtn = document.querySelector(".js-modal-close-btn");
  closeBtn.addEventListener("click", function(e) {
    hideModal(modal);
    this.removeEventListener("click", e => hideModal);
  });
});

const form = document.querySelector(".form");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData();
  fileStore.getFiles().forEach((file, index) => {
    formData.append(`file${index}`, file);
  });

  try {
    const res = await fetch(this.endpoint, {
      method: "POST",
      body: formData
    });
    const data = await res.json();

    renderAlert(data.message);
  } catch (error) {
    renderAlert(error);
  }
});
