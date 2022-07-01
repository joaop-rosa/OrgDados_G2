import axios from "axios";
import { BlobServiceClient } from '@azure/storage-blob'

export async function consumirBlobXml(urlxml) {

    return await axios.get(urlxml).then((resposta) => resposta.data)

}

export async function updateBlobJson(json) {

    const blobServiceClient = new BlobServiceClient(
        `https://contosostoragefaccat.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-07-01T08:02:44Z&st=2022-06-28T00:02:44Z&spr=https&sig=UIWyRbaaCXxrC4dsndyszn4o1puSbhKQ8Hr89T%2Bspvs%3D`
    );
    //DefaultEndpointsProtocol=https;AccountName=contosostoragefaccat;AccountKey=cBW5cxXd9kRL8tge0SShJkSYyam6MPESN7enc02nb73fqE5HX8CxoUPyBBh0YeNhMq2Ujx/y/32V+AStEVmkrw==;EndpointSuffix=core.windows.net
    const containerName = "contosojson";

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const content = JSON.stringify(json);
    const blobName = "newjson" + new Date().getTime();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length)
    console.log(`Upload do blob ${blobName} concluido`, uploadBlobResponse.requestId);
}


