import { component } from 'riot';
import App from './app.riot';

const createApp = component(App);

const oReq = new XMLHttpRequest();
oReq.addEventListener('load', function load() {
  const { master } = JSON.parse(this.responseText);
  createApp(document.getElementById('root'), {
    master: `data/${master}`,
  });
});
oReq.open('GET', 'data/PALLADOS05/manifest.json');
oReq.send();
