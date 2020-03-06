import { formatFileDetails } from "./utils/_file";
import { files } from "./_files";

function createFilePreview(file) {
  const filePreviewTemplate: HTMLTemplateElement = document.querySelector(
    "template.js-preview-item"
  );

  const filePreview = filePreviewTemplate.content.cloneNode(true);
  const filePreviewImage = filePreview.querySelector("img");

  const fileDetails = formatFileDetails(file);

  filePreviewImage.src = file.imageSrc;
  filePreview.children[0].dataset[
    "id"
  ] = `${fileDetails.name}-${fileDetails.size}`;
  filePreview.querySelector(".js-title").textContent = fileDetails.name;
  filePreview.querySelector(".js-size").textContent = fileDetails.size;
  filePreview.querySelector(".js-type").textContent = fileDetails.type;

  return filePreview;
}

function deleteFilePreview(id) {
  const elem: HTMLElement = document.querySelector(`[data-id='${id}']`);
  elem.remove();
}

function renderFilePreview(file: File) {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onloadend = () => {
    const filePreview = createFilePreview({
      name: file.name,
      size: file.size,
      type: file.type,
      imageSrc: fileReader.result
    });
    // Update State
    files.addFile(file);
    // Update UI
    document.querySelector(".js-preview").appendChild(filePreview);

    [...document.querySelectorAll(".js-preview-item-delete-btn")].forEach(
      (deleteBtn, index) => {
        deleteBtn.onclick = function(e) {
          const id = e.target.parentElement.dataset.id;
          // Update State
          deleteFilePreview(id);
          // Update UI
          files.removeFile(file, index);
        };
      }
    );
  };
}

export { createFilePreview, deleteFilePreview, renderFilePreview };
