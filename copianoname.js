// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  const producto = ['Lince',' Dragonfish','Znube', 'Stock y precios', 'Factura Mobile'];
  const categoriasDragon =['Listados','Altas de entidades','Stock','Ventas','Compras','Fondos','Importaciones'];
  const categoriasLince =['Altas de entidades','Stock','Ventas','Compras','Importaciones','Gestion de Produccion'];
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Buen dia, mi nombre es Gus, puedes indicarme que producto utilizas?`);
    agent.add(new Suggestion(producto[0]));
    agent.add(new Suggestion(producto[1]));
    agent.add(new Suggestion(producto[2]));
    agent.add(new Suggestion(producto[3]));
    agent.add(new Suggestion(producto[4]));
    
  }
  function seleccionDragonfish(agent){
    agent.add(`Tal ves alguna de estas opciones te puedan ayudar ${categoriasDragon.join(',')}`);
  
  }
    function seleccionLince(agent){
    agent.add(`Tal ves alguna de estas opciones te puedan ayudar ${categoriasLince.join(',')}`);
  
  }
  
  function opcionDragon(agent){
    agent.add(`Tal ves alguna de estas opciones te puedan ayudar ${categoriasDragon.join(',')}`);
  }
 	
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  let intentMap = new Map();
    intentMap.set('Saludo', welcome);
    intentMap.set('Saludo - Dragon', opcionDragon);
    intentMap.set('Saludo - Lince', opcionLince);
    intentMap.set('Seleccion_producto_dragonfish', seleccionDragonfish);
    intentMap.set('Default Fallback Intent', fallback);
    
  agent.handleRequest(intentMap);
});
