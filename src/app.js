import { component } from 'riot';
import App from './app.riot';

const createApp = component(App);

const oReq = new XMLHttpRequest();
oReq.addEventListener('load', function load() {
  const tracks = new Map( JSON.parse(this.responseText)
    .filter( t => [ 520565400, 555134337 ].indexOf(parseInt(t.id)) === -1)
    //.map( t => { console.log(t); return t; })
    .map( t => ([ `tracks/${t.id}`, {
      id: (new URL(t.permalink_url)).pathname,
      uri: `tracks/${t.id}`,
      title: t.title,
      username: t.user.username,
      cover: t.artwork_url.replace('large', 't500x500'),
      tags: [ t.genre ]
        .concat(t.tag_list.split('\"'))
        .filter(t=>t && t.trim().length>0),
      duration: t.duration,
    }]))
    //.map( t => { console.log(t); return t; })
  )

  createApp(document.getElementById('root'), {
    client_id: 'a9d29aaf9a0cc170e7ee6ab980a6ad49',
    tracks,
  });
});
oReq.open('GET', 'data/2019-playlist.json');
oReq.send();
