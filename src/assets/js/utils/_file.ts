function roundNumber(num: number, dp: number = 2) {
  return Number(`${Math.round(`${num}e${dp}`)}e-${dp}`);
}

function formatFileSize(size: number) {
  const sizeLookup = ["KB", "MB", "GB"];

  // Return for size not up to a kilobyte
  if (size < 1024) return `${roundNumber(size)}B`;

  function divideSize(size: number, n: number = 0) {
    n++;
    size = size / 1024;

    if (size < 1024) return `${roundNumber(size)}${sizeLookup[n - 1]}`;
    if (size >= 1024) return divideSize(size, n);
  }

  return divideSize(size);
}

function formatFilename(name: string) {
  const splitName: string[] = name.split(".");
  splitName.pop();
  return splitName.join(".");
}

function formatFileType(type: string) {
  const splitType: string[] = type.split("/");
  return splitType[splitType.length - 1];
}

function formatFileDetails(file: File) {
  return {
    name: formatFilename(file.name),
    size: formatFileSize(file.size),
    type: formatFileType(file.type)
  };
}

export {
  roundNumber,
  formatFileSize,
  formatFilename,
  formatFileType,
  formatFileDetails
};
