import { converterXmlParaJson } from "./convercao.js";
import { ServiceBusClient } from "@azure/service-bus";
import { consumirBlobXml } from "./requestxml.js";

const chaveConexao = "Endpoint=sb://contosoxml.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=EsFFVpnZtd1F1w6gDjUo2o4HJHgWS08+rKSOaGpSeTU="
const serviceBusClient = new ServiceBusClient(chaveConexao)

const receiver = serviceBusClient.createReceiver("filaxml");

//RECEBE AS MENSAGENS DA FILA
// const myMessages = await receiver.receiveMessages(10);
// console.log(myMessages)

const myMessageHandler = async (message) => {
    console.log(JSON.stringify(message.body.data.url))
    let urlXml = JSON.stringify(message.body.data.url)
    let xml = await consumirBlobXml(urlXml)
    console.log("xml: "+xml)
    let json = converterXmlParaJson(xml)
    console.log("json: "+JSON.stringify(json))
};

const myErrorHandler = async (args) => {
    console.log(
        `Error occurred with ${args.entityPath} within ${args.fullyQualifiedNamespace}: `,
        args.error
    );
};

receiver.subscribe({
    processMessage: myMessageHandler,
    processError: myErrorHandler
});