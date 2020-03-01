function Files() {
  const files: File[] = [];
  const listeners: Function[]: [];

  function addFile(file: File) {
    files.push(file);
  }

  function getFile(index) {
    return files[index];
  }

  function deleteFile(index) {
    files.splice(index, 1);
    return files;
  }

  function addListener(listener: Function) {
    listeners.push(listener);
  }

  function listen() {

  }

  return {
    files,
    addFile: addFile,
    deleteFile: deleteFile,
  }
}

export const filesState = Files();

export default Files;
