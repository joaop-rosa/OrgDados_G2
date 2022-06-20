import { ServiceBusClient } from "@azure/service-bus";

const chaveConexao = "Endpoint=sb://contosoxml.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=EsFFVpnZtd1F1w6gDjUo2o4HJHgWS08+rKSOaGpSeTU="
const serviceBusClient = new ServiceBusClient(chaveConexao)

//const queueClient = serviceBusClient.createQueueClient("filaxml");

const sender = serviceBusClient.createSender("filaxml");

const messageXML = {body:"<MyOperation myAttr='SuccessAttrValue'>MyText</MyOperation>"}

await sender.sendMessages(messageXML);
