// function Files() {
//   this.files = [];

//   function add(file) {
//     this.files.add(file);
//   }

//   function remove(file) {

//   }

//   function get()
// }

function addHighlight(elem) {
  elem.classList.add("highlight");
}

function removeHighlight(elem) {
  elem.classList.remove("highlight");
}

function dragHandler(event, cb) {
  // Stops the browser from opening the file in the tab
  event.preventDefault();
  // Stops the event from bubbling higher than necessary
  event.stopPropagation();

  const dropAreaElem = event.target.closest(".js-drop-area");
  cb(event, dropAreaElem);
}

function handleDragEnter(_, elem) {
  addHighlight(elem);
}

function handleDragLeave(_, elem) {
  removeHighlight(elem);
}

function handleDragOver(_, elem) {
  addHighlight(elem);
}

function handleDrop(e, elem) {
  removeHighlight(elem);

  const data = e.dataTransfer;
  const files = data.files;
  console.log("files", files);

  handleFiles(files);
}

function handleFiles(files) {
  const fileTypes = fileInput.getAttribute("accept").split(",");

  // convert files FileList to Array
  [...files].forEach(file => {
    if (!fileTypes.includes(file.type)) return;
    // uploadFile(file);
    renderFilePreview(file);
  });
}

async function uploadFile(file) {
  const URL = "http://localhost:5000";
  const formData = new FormData();

  formData.append("file", file);

  try {
    const res = await fetch(URL, {
      method: "POST",
      body: formData
    });

    const data = console.log(res.json());
  } catch (error) {
    console.error(error);
  }
}

function roundNumber(num, dp = 2) {
  return Number(`${Math.round(`${num}e${dp}`)}e-${dp}`);
}

function formatFileSize(size) {
  const sizeLookup = ["KB", "MB", "GB"];

  // Return for size not up to a kilobyte
  if (size < 1024) return `${roundNumber(size)}B`;

  function divideSize(size, n = 0) {
    n++;
    size = size / 1024;

    if (size < 1024) return `${roundNumber(size)}${sizeLookup[n - 1]}`;
    if (size >= 1024) return divideSize(size, n);
  }

  return divideSize(size);
}

function formatFilename(name) {
  name = name.split(".");
  name.pop();
  return name.join(".");
}

function formatFileType(type) {
  type = type.split("/");
  return type[type.length - 1];
}

function formatFileDetails(file) {
  return {
    name: formatFilename(file.name),
    size: formatFileSize(file.size),
    type: formatFileType(file.type)
  };
}

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

function renderFilePreview(file) {
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

function deleteFile(fileList, file) {}

const dropArea = document.querySelector(".js-drop-area");
const fileInput = document.querySelector(".js-file-input");

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
  console.log(e);
  const files = e.target.files;
  handleFiles(files);
});
