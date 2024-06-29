import { OpenSeaStreamClient } from '@opensea/stream-js';
import { WebSocket } from 'ws';
import { LocalStorage } from 'node-localstorage';
import 'dotenv/config';

export default async function handler(request, response) {
  try {
    const client = new OpenSeaStreamClient({
      token: process.env.OPENSEA_API_KEY,
      connectOptions: {
        transport: WebSocket,
        sessionStorage: new LocalStorage('./scratch') // Armazenamento local para a sessão WebSocket
      }
    });

    client.onItemListed('sunflower-land-collectibles', (event) => {
      console.log('Item listado:', event);
      // Aqui você pode processar o evento de item listado
    });

    client.onItemSold('sunflower-land-collectibles', (event) => {
      console.log('Item vendido:', event);
      // Aqui você pode processar o evento de item vendido
    });

    client.connect();

    // Mantenha a conexão WebSocket aberta indefinidamente
    while (true) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Aguarde 1 segundo
    }
  } catch (error) {
    console.error('Erro na função serverless:', error);
    response.status(500).json({ error: 'Erro interno do servidor' });
  }
}
