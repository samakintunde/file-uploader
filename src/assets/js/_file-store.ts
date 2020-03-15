function FileStore() {
  let files: File[] = [];

  function getFiles(): File[] {
    return files;
  }

  const addFile = (file: File) => {
    files.push(file);
  };

  function removeFile(fileName: string) {
    // TODO: Implement Index based deletion
    files = files.filter(file => {
      return file.name !== fileName;
    });
  }

  return {
    getFiles,
    addFile,
    removeFile
  };
}

export const fileStore = FileStore();
