import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Creators as PlaylistDetailsActions } from '../../store/ducks/playlistDetails';
import { Creators as PlayerActions } from '../../store/ducks/player';

import {
  Container, Header, SongList, SongItem,
} from './styles';

import Loading from '../../components/Loading';

import ClockIcon from '../../assets/images/clock.svg';
import PlusIcon from '../../assets/images/plus.svg';

class PlayList extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number,
      }),
    }).isRequired,
    getPlaylistDetailsRequest: PropTypes.func.isRequired,
    playlistDetails: PropTypes.shape({
      data: PropTypes.shape({
        thumbnail: PropTypes.string,
        title: PropTypes.string,
        songs: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            author: PropTypes.string,
            album: PropTypes.string,
          }),
        ),
      }),
      loading: PropTypes.bool,
    }).isRequired,
    loadSong: PropTypes.func.isRequired,
    currentSong: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  };

  state = {
    selectedSong: null,
  };

  componentDidMount() {
    this.LoadingPlaylistDetails();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (prevProps.match.params.id !== match.params.id) {
      this.LoadingPlaylistDetails();
    }
  }

  LoadingPlaylistDetails = () => {
    const { match, getPlaylistDetailsRequest } = this.props;
    getPlaylistDetailsRequest(match.params.id);
  };

  renderList = () => {
    const { playlistDetails, loadSong, currentSong } = this.props;
    const { selectedSong } = this.state;
    return (
      <Container>
        <Header>
          <img src={playlistDetails.data.thumbnail} alt={playlistDetails.data.title} />

          <div>
            <span>Playlist</span>
            <h1>{playlistDetails.data.title}</h1>
            {!!playlistDetails.data.songs && <p>{playlistDetails.data.songs.length} musicas</p>}

            <button>Play</button>
          </div>
        </Header>

        <SongList cellPadding={0} cellSpacing={0}>
          <thead>
            <th />
            <th>Titulo</th>
            <th>Artista</th>
            <th>Album</th>
            <th>
              <img src={ClockIcon} alt="Duração" />
            </th>
          </thead>

          <tbody>
            {!playlistDetails.data.songs ? (
              <tr>
                <td colSpan={5}>Nenhuma musica cadastrada</td>
              </tr>
            ) : (
              playlistDetails.data.songs.map(song => (
                <SongItem
                  key={song.id}
                  onClick={() => this.setState({ selectedSong: song.id })}
                  onDoubleClick={() => loadSong(song, playlistDetails.data.songs)}
                  selected={selectedSong === song.id}
                  playing={currentSong && currentSong.id === song.id}
                >
                  <td>
                    <img src={PlusIcon} alt="Adicionar" />
                  </td>
                  <td>{song.title}</td>
                  <td>{song.author}</td>
                  <td>{song.album}</td>
                  <td>5:59</td>
                </SongItem>
              ))
            )}
          </tbody>
        </SongList>
      </Container>
    );
  };

  render() {
    const { playlistDetails } = this.props;
    return playlistDetails.loading ? (
      <Container loading>
        <Loading />
      </Container>
    ) : (
      this.renderList()
    );
  }
}

const mapStateToProps = state => ({
  playlistDetails: state.playlistDetails,
  currentSong: state.player.currentSong,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...PlaylistDetailsActions, ...PlayerActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayList);
