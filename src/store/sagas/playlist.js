import { call, put } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as PlaylistActions } from '../ducks/playlists';
import { Creators as ErrorAction } from '../ducks/error';

export function* getPlaylists() {
  try {
    const response = yield call(api.get, '/playlists');
    yield put(PlaylistActions.getPlaylistsSuccess(response.data));
  } catch (error) {
    yield put(ErrorAction.setError('Nao foi possivel obter as playlist'));
  }
}
