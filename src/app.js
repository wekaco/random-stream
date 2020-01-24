import { component } from 'riot';
import App from './app.riot';

const createApp = component(App);

const root = `data/PALLADOS05`;
const path = (file) => `${root}/${file}`;

const oReq = new XMLHttpRequest();
oReq.addEventListener('load', function load() {
  const { master, stems } = JSON.parse(this.responseText);
  createApp(document.getElementById('root'), {
    stems: stems.map(path),
    master: path(master),
  });
});
oReq.open('GET', path('manifest.json'));
oReq.send();
