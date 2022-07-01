import axios from "axios";
import { BlobServiceClient } from '@azure/storage-blob'

export async function consumirBlobXml(urlxml) {

    return await axios.get(urlxml).then((resposta) => resposta.data)

}

export async function updateBlobJson(json) {

    const blobServiceClient = new BlobServiceClient(
        `https://contosostoragefaccat.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-07-06T00:13:06Z&st=2022-07-01T16:13:06Z&spr=https&sig=ChL1g63BY%2FWw%2BrOi6I%2BmHYW%2FNkYZ32%2F4ndKDQkOboEs%3D`
    );
    const containerName = "contosojson";

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const content = JSON.stringify(json);
    const blobName = "newjson" + new Date().getTime();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length)
    console.log(`Upload do blob ${blobName} concluido`, uploadBlobResponse.requestId);
}


