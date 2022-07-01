import { converterXmlParaJson } from "./convercao.js";
import { ServiceBusClient } from "@azure/service-bus";
import { consumirBlobXml, updateBlobJson } from "./requestxml.js";

let nArquivos = 0
let tempototal = 0
const chaveConexao = "Endpoint=sb://contosoxml.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=EsFFVpnZtd1F1w6gDjUo2o4HJHgWS08+rKSOaGpSeTU="
const serviceBusClient = new ServiceBusClient(chaveConexao);
const receiver = serviceBusClient.createReceiver("filaxml");
async function main() {
    for await (let message of receiver.getMessageIterator()) {
        nArquivos++
        const urlXml = JSON.stringify(message.body.data.url)
        let urlXmlFormatada = urlXml.substring(1, urlXml.length - 1);

        let initGetBlobTime = Date.now()
        let xml = await consumirBlobXml(urlXmlFormatada)
        let finalGetBlobTime = Date.now()

        let initConvertTime = Date.now()
        let json = await converterXmlParaJson(xml)
        let finalConvertTime = Date.now()

        //console.clear()
        console.log("\n=========================")
        console.log("Numero de arquivos processados: "+nArquivos)
        console.log("=========================")
        await updateBlobJson(json)
        console.log("Tempo para consumir Blob XML: "+(finalGetBlobTime - initGetBlobTime)+"ms")
        console.log("Tempo de conversão XML -> JSON: "+(finalConvertTime - initConvertTime)+"ms")
        console.log("Tempo total processo: "+((finalConvertTime - initConvertTime)+(finalGetBlobTime - initGetBlobTime))+"ms")
        console.log("-------------------------")
        tempototal += ((finalConvertTime - initConvertTime)+(finalGetBlobTime - initGetBlobTime))
        console.log("Tempo total: "+tempototal+"ms")
        
        await receiver.completeMessage(message)
    }
}


await main()
await receiver.close()
await serviceBusClient.close()

