import {
  dragHandler,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop
} from "./_drag-and-drop";
import { handleFiles } from "./_file-handler";

const dropArea = document.querySelector(".js-drop-area");
const fileInput = document.querySelector(".js-file-input");
const dropAreaForm = document.querySelector(".js-drop-area-form");
const deletePreviewBtn = document.querySelector(".js-preview-item-delete-btn");

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
