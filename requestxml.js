import axios from "axios";
export async function consumirBlobXml(urlxml){
    
    return await axios.get(urlxml).then((resposta) => resposta.data)

}

export async function updateBlobJson(json){

    return await axios.post("https://contosostoragefaccat.blob.core.windows.net/contosojson",json).then((resposta) => console.log(resposta)).catch((error)=> console.log(error))

}

