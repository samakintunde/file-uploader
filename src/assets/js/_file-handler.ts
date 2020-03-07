import { renderFilePreview } from "./_file-preview";
import { renderAlert } from "./_alert";

function handleFiles(files: FileList) {
  const fileInput = document.querySelector(".js-file-input");
  // Acceptable file types
  const acceptableFileTypes = fileInput.getAttribute("accept").split(",");

  // convert files FileList to Array
  [...files].forEach(file => {
    if (!acceptableFileTypes.includes(file.type)) {
      return renderAlert(`${file.type} is not an acceptable type`);
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
