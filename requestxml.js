import { XMLHttpRequest } from "xmlhttprequest";
export async function consumirBlobXml(urlxml){
    var xhr = new XMLHttpRequest;
    xhr.open('GET', urlxml);
    xhr.responseType = 'document';
    //xhr.overrideMimeType('text/xml');
    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            let resposta = xhr.responseXML()
            return resposta
        }
    };
}



