import qwest from 'qwest';
import { config } from '../config.js';



export function getSpotifyTrackSuggestions(query, success, error) {
  qwest.base = config.spotify_url
  qwest.get(config.spotify_search_endpoint,
            {q: query + '*', type: 'track'},
            {cache: true})
  .then((xhr, response) => {
    success(response);
  })
  .catch((xhr, response, e) => {
    error(e);
  });
}
