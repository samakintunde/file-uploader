import { formatFileDetails } from "./utils/_file";

function createFilePreview(file) {
  const filePreviewTemplate = document.querySelector(
    "template.js-preview-item"
  );

  const filePreview = filePreviewTemplate.content.cloneNode(true);
  const filePreviewImage = filePreview.querySelector("img");

  const fileDetails = formatFileDetails(file);

  filePreviewImage.src = file.imageSrc;
  filePreview.querySelector(".js-title").textContent = fileDetails.name;
  filePreview.querySelector(".js-size").textContent = fileDetails.size;
  filePreview.querySelector(".js-type").textContent = fileDetails.type;

  return filePreview;
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
    document.querySelector(".js-preview").appendChild(filePreview);
  };
}

export { createFilePreview, renderFilePreview };
