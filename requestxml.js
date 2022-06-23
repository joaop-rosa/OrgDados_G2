import axios from "axios";
import { BlobServiceClient } from '@azure/storage-blob'

export async function consumirBlobXml(urlxml) {

    return await axios.get(urlxml).then((resposta) => resposta.data)

}

export async function updateBlobJson(json) {

    const blobServiceClient = new BlobServiceClient(
        `https://contosostoragefaccat.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-06-24T03:19:02Z&st=2022-06-23T19:19:02Z&spr=https,http&sig=6MQFWk90mGjmU6MG4WG5BPmIZIt2QYHsJJYAnTihCVc%3D`
    );

    const containerName = "contosojson";

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const content = JSON.stringify(json);
    const blobName = "newjson" + new Date().getTime();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length)
    console.log(`Upload do blob ${blobName} concluido`, uploadBlobResponse.requestId);
}


