import { converterXmlParaJson } from "./convercao.js";
import { ServiceBusClient } from "@azure/service-bus";

const chaveConexao = "Endpoint=sb://contosoxml.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=EsFFVpnZtd1F1w6gDjUo2o4HJHgWS08+rKSOaGpSeTU="
const serviceBusClient = new ServiceBusClient(chaveConexao)

const receiver = serviceBusClient.createReceiver("filaxml");

//RECEBE AS MENSAGENS DA FILA
// const myMessages = await receiver.receiveMessages(10);
// console.log(myMessages)

const myMessageHandler = async (message) => {
    const json = converterXmlParaJson(`${message.body}`)
    console.log(JSON.stringify(json))
    //console.log(`message.body: ${message.body}`);
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