import { converterXmlParaJson } from "./convercao.js";
import { ServiceBusClient } from "@azure/service-bus";
import { consumirBlobXml } from "./requestxml.js";
let urlXml
async function buscaMensagem(){
    const messages = await receiver.receiveMessages(1, {maxWaitTimeInMs: 5000})
    return messages
}


const chaveConexao = "Endpoint=sb://contosoxml.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=EsFFVpnZtd1F1w6gDjUo2o4HJHgWS08+rKSOaGpSeTU="
const serviceBusClient = new ServiceBusClient(chaveConexao)

const receiver = serviceBusClient.createReceiver("filaxml");

async function programa(){
    const messagesprog = await buscaMensagem()
    for(const message of messagesprog){
        console.log(JSON.stringify(message.body.data.url))
        urlXml = JSON.stringify(message.body.data.url)
    }
    let xml = await consumirBlobXml(urlXml)
    console.log(xml)
}
// for (const message of messages){
//     console.log(JSON.stringify(message.body.data.url))
//     let urlXml = JSON.stringify(message.body.data.url)

//     let xml = await consumirBlobXml(urlXml)

// }

await programa()
console.log("aqui")
await receiver.close()
await serviceBusClient.close()

// for await (let message of  receiver.getMessageIterator()) {
//     console.log(JSON.stringify(message.body.data.url))
//     let urlXml = JSON.stringify(message.body.data.url)
//     let xml = await consumirBlobXml(urlXml)
//     await receiver.completeMessage(message)
// }


// const myMessageHandler = async (message) => {
//     console.log(JSON.stringify(message.body.data.url))
//     let urlXml = JSON.stringify(message.body.data.url)
//     let xml = await consumirBlobXml(urlXml)
//     //console.log(xml)
//     //let json = converterXmlParaJson(xml)
//     //console.log("json: "+JSON.stringify(json))
// };

// const myErrorHandler = async (args) => {
//     console.log(
//         `Error occurred with ${args.entityPath} within ${args.fullyQualifiedNamespace}: `,
//         args.error
//     );
// };

// receiver.subscribe({
//     processMessage: myMessageHandler,
//     processError: myErrorHandler
    
// });

