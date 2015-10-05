import qwest from 'qwest';
import { config } from '../config.js';

qwest.base = config.base_url

export function retrieveMix(url_identifier, success, error) {

}

export function makeCreateMixCall(name, image_url, tracks, success, error) {
  //TODO: Frontend validation

  let data = {name: name, image_url: image_url, tracks: tracks};
  for (let i = 0; i < data.tracks.length; i++) {
    data.tracks[i]['order'] = i + 1;
  }
  qwest.post(config.mix_enpoint, data, {dataType: 'json'})
  .then((xhr, response) => {
    success();
  })
  .catch((xhr, response, e) => {
    error();
  });
}
