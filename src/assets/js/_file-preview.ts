import { formatFileDetails } from "./utils/_file";
import { fileStore } from "./_files";

function createFilePreview(file) {
  const filePreviewTemplate: HTMLTemplateElement = document.querySelector(
    "template.js-preview-item"
  );

  const filePreview = filePreviewTemplate.content.cloneNode(true);
  const filePreviewImage = filePreview.querySelector("img");

  const fileDetails = formatFileDetails(file);

  filePreviewImage.src = file.imageSrc;
  filePreview.children[0].dataset["id"] = file.name;
  filePreview.querySelector(".js-title").textContent = fileDetails.name;
  filePreview.querySelector(".js-size").textContent = fileDetails.size;
  filePreview.querySelector(".js-type").textContent = fileDetails.type;

  return filePreview;
}

function deleteFilePreview(id) {
  const elem: HTMLElement = document.querySelector(`[data-id='${id}']`);
  elem.remove();
}

function updateFilesCount(files) {
  document.querySelector(".js-files-count").textContent = `${files.length}`;
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
    fileStore.addFile(file);
    // Update UI
    document.querySelector(".js-preview").appendChild(filePreview);
    updateFilesCount(fileStore.getFiles());

    if (fileStore.getFiles().length >= 1) {
      document.querySelector<HTMLButtonElement>(
        ".js-upload-btn"
      ).disabled = false;
      document
        .querySelector(".js-preview-area-header")
        .classList.add("visible");
    }

    [...document.querySelectorAll(".js-preview-item-delete-btn")].forEach(
      (deleteBtn: HTMLButtonElement) => {
        deleteBtn.onclick = function(e) {
          const id: string = this.parentElement.dataset.id;
          // Update State
          fileStore.removeFile(id);
          // Update UI
          deleteFilePreview(id);
          updateFilesCount(fileStore.getFiles());

          if (fileStore.getFiles().length <= 0) {
            document.querySelector<HTMLButtonElement>(
              ".js-upload-btn"
            ).disabled = true;
            document
              .querySelector(".js-preview-area-header")
              .classList.remove("visible");
          }
        };
      }
    );
  };
}

export { createFilePreview, deleteFilePreview, renderFilePreview };
