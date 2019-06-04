import { call, put } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as PlaylistDetailsAction } from '../ducks/playlistDetails';
import { Creators as ErrorAction } from '../ducks/error';

export function* getPlaylistDetails(action) {
  try {
    const response = yield call(api.get, `/playlists/${action.payload.id}?_embed=songs`);
    yield put(PlaylistDetailsAction.getPlaylistDetailsSuccess(response.data));
  } catch (error) {
    yield put(ErrorAction.setError('Nao foi possivel obter os detalhes da playlist'));
  }
}
