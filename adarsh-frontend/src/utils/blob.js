import { BlobServiceClient } from "@azure/storage-blob";
const blobServiceClient = new BlobServiceClient(
  "https://querrystorageac.blob.core.windows.net/imagestorage?si=access&sv=2022-11-02&sr=c&sig=CxP0cMfLaWr5gE%2Fm1TLwf71SpiDZiWQT0OngIcFOZeM%3D",
);
const containerClient = blobServiceClient.getContainerClient("imagestorage");

export async function uploadImage(file) {
  const blobClient = containerClient.getBlobClient(file.name);
  const blockBlobClient = blobClient.getBlockBlobClient();
  await blockBlobClient.uploadBrowserData(file, {
    blockSize: 4 * 1024 * 1024,
    concurrency: 20,
    onProgress: (ev) => console.log(ev),
  });
  return blockBlobClient.url;
}
