export function downloadFileFromBlob(data: BlobPart, fileName: string, mimeType: string = "application/pdf") {
  const blob = new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();

  // Limpieza
  a.remove();
  window.URL.revokeObjectURL(url);
}
