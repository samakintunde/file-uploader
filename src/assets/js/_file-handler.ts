import { renderFilePreview } from "./_file-preview";
import { renderAlert } from "./_alert";
import { fileStore } from "./_file-store";

const fileExists = (file, store) => {
  const storedFiles = store.getFiles();
  return storedFiles.some(storedFile => storedFile.name === file.name);
};

function handleFiles(files: FileList) {
  const fileInput = document.querySelector(".js-file-input");
  // Acceptable file types
  const acceptableFileTypes = fileInput.getAttribute("accept").split(",");

  // convert files FileList to Array
  [...files].forEach(file => {
    if (!acceptableFileTypes.includes(file.type)) {
      return renderAlert(`${file.type} is not an acceptable type`);
    }

    if (fileExists(file, fileStore)) {
      return renderAlert(`${file.name} cannot be added twice.`);
    }
    renderFilePreview(file);
  });
}

async function uploadFile(file: File) {
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

export { handleFiles, uploadFile };
