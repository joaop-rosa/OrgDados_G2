import axios from "axios";
export async function consumirBlobXml(urlxml){
    const resposta = await axios.get(urlxml)
    return resposta.data

}
// const teste = await consumirBlobXml("https://contosostoragefaccat.blob.core.windows.net/contosoxml/book (1).xml")
// console.log(teste.data)
