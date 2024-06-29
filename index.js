import { OpenSeaStreamClient, Network } from '@opensea/stream-js';
import { WebSocket } from 'ws';
import { LocalStorage } from 'node-localstorage';
require('dotenv').config();

const client = new OpenSeaStreamClient({
  token: process.env.OPENSEA_API_KEY, 
  connectOptions: {
    transport: WebSocket,
    sessionStorage: LocalStorage
  }
});

client.onItemListed('sunflower-land-collectibles', (event) => {
  console.log(event); 
});

client.onItemSold('sunflower-land-collectibles', (event) => {
  console.log(event);
});

client.connect();
