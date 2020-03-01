import { addHighlight, removeHighlight } from "./utils/_highlight";
import { handleFiles } from "./_file-handler";

function dragHandler(event: DragEvent, cb: Function) {
  // Stops the browser from opening the file in the tab
  event.preventDefault();
  // Stops the event from bubbling higher than necessary
  event.stopPropagation();

  const dropAreaElem = event.target.closest(".js-drop-area");
  cb(event, dropAreaElem);
}

function handleDragEnter(_, elem: HTMLElement) {
  addHighlight(elem);
}

function handleDragLeave(_, elem: HTMLElement) {
  removeHighlight(elem);
}

function handleDragOver(_, elem: HTMLElement) {
  addHighlight(elem);
}

function handleDrop(e, elem: HTMLElement) {
  removeHighlight(elem);

  const data = e.dataTransfer;
  const files = data.files;

  handleFiles(files);
}

export {
  dragHandler,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop
};
