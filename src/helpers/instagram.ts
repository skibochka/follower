import * as Instagram from 'instagram-web-api';
import constants from './constans';

let instagramInstance = null;

export async function getInstagramInstance() {
  if (!instagramInstance) {
    instagramInstance = new Instagram({ username: constants.username, password: constants.password });
    await instagramInstance.login();
    return instagramInstance;
  }
  return instagramInstance;
}
