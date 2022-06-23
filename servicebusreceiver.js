import { converterXmlParaJson } from "./convercao.js";
import { ServiceBusClient } from "@azure/service-bus";
import { consumirBlobXml, updateBlobJson } from "./requestxml.js";

const chaveConexao = "Endpoint=sb://contosoxml.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=EsFFVpnZtd1F1w6gDjUo2o4HJHgWS08+rKSOaGpSeTU="
const serviceBusClient = new ServiceBusClient(chaveConexao)

const receiver = serviceBusClient.createReceiver("filaxml");

async function main() {
    for await (let message of receiver.getMessageIterator()) {
        console.log("message: " + JSON.stringify(message.body))
        const urlXml = JSON.stringify(message.body.data.url)
        let urlXmlFormatada = urlXml.substring(1, urlXml.length - 1);
        let xml = await consumirBlobXml(urlXmlFormatada)
        let json = await converterXmlParaJson(xml)
        await updateBlobJson(json)
        await receiver.completeMessage(message)
    }
}


await main()
await receiver.close()
await serviceBusClient.close()

