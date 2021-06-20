import './helpers/jobs';
import Client from './controllers/client';

async function botStart() {
  await Client.build();
}

botStart();
