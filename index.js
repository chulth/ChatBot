// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  const producto = ['Lince',' Dragonfish','Znube'];
  const categoriasDragon =['Altas','Ventas','Compras','Comercio Exterior','Fondos','Contabilidad', 'Ecommerce', 'Toma de invetario', 'Listados',];
  const categoriasLince = ['Ventas','Mayorista','Compras','Altas','Produccion','Gestion de Produccion','Contabilidad','Listados','Herramientas','Parametros'];
  const categoriasZnube = ['business intelligence','Centralizador de clientes','configuracion de Znube','Omnicanalidad','Cubos','E-commerce','Gestion de horarios','Reportes','Snapshots','Mi compañia'];
  const categoriasStockYPrecios = ['Configuracion','Uso'];
  const categoriasZmobile = ['Configuracion', 'Uso',];
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function saludo(agent){
    agent.add(`Buen dia, Bienvenido a Zoo Logic, mi nombre es Gus, puedes indicarme que producto utilizas?`);
    agent.add(new Suggestion(producto[0]));
    agent.add(new Suggestion(producto[1]));
    agent.add(new Suggestion(producto[2]));

    
  }

  function seleccionDragon(agent){
    agent.add(`escoge la  opcion que te puedan ayudar`);
    agent.add(new Suggestion(categoriasDragon[0]));
    agent.add(new Suggestion(categoriasDragon[1]));
    agent.add(new Suggestion(categoriasDragon[2]));
    agent.add(new Suggestion(categoriasDragon[8]));
    agent.add(new Suggestion(categoriasDragon[9]));
    agent.add(new Suggestion(categoriasDragon[10]));
    agent.add(new Suggestion(categoriasDragon[11]));
    agent.add(new Suggestion(categoriasDragon[12]));
 
  }

  function seleccionLince(agent){
    agent.add(`Tal ves alguna de estas opciones te puedan ayudar`);
    agent.add(new Suggestion(categoriasLince[0]));
    agent.add(new Suggestion(categoriasLince[1]));
    agent.add(new Suggestion(categoriasLince[2]));
    agent.add(new Suggestion(categoriasLince[3]));
    agent.add(new Suggestion(categoriasLince[7]));
    agent.add(new Suggestion(categoriasLince[8]));
    agent.add(new Suggestion(categoriasLince[9]));
   
  
  }

    
  function seleccionZnube(agent){
    agent.add(`Tal ves alguna de estas opciones te puedan ayudar`);
    agent.add(new Suggestion(categoriasZnube[0]));
    agent.add(new Suggestion(categoriasZnube[1]));
    agent.add(new Suggestion(categoriasZnube[2]));
    agent.add(new Suggestion(categoriasZnube[7]));
    agent.add(new Suggestion(categoriasZnube[8]));
    agent.add(new Suggestion(categoriasZnube[9]));
    agent.add(new Suggestion(categoriasZnube[10]));
  } 

  function seleccioFacturanZmobile(agent){
    agent.add(`Tal ves alguna de estas opciones te puedan ayudar`);
    agent.add(new Suggestion(categoriasZmobile[0]));
    agent.add(new Suggestion(categoriasZmobile[1]));
  }  

  function seleccionStockYPrecios(agent){
    agent.add(`Tal ves alguna de estas opciones te puedan ayudar`);
    agent.add(new Suggestion(categoriasStockYPrecios[0]));
    agent.add(new Suggestion(categoriasStockYPrecios[1]));
  }  
 
  
  function fallback(agent) {
    agent.add(`No, te entiendo, me puedes repetir`);
    agent.add(`Disculpame, Puedes volver a escribirlo?`);
  }

  let intentMap = new Map();
    intentMap.set('Saludo', saludo);
    intentMap.set('Saludo - Dragon', seleccionDragon);
    intentMap.set('Saludo - Lince', seleccionLince);
    intentMap.set('Saludo - Znube', seleccionZnube);
    intentMap.set('Default Fallback Intent', fallback);
    
  agent.handleRequest(intentMap);
});
