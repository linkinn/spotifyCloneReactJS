import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Creators as ErrorActions } from '../../store/ducks/error';

import CloseIcon from '../../assets/images/plus.svg';

import { Container } from './styles';

const ErrorBox = ({ error: { message, visible }, hideError }) => visible && (
<Container>
  <p>{message}</p>
  <button onClick={hideError}>
    <img src={CloseIcon} alt="Close" />
  </button>
</Container>
);

ErrorBox.propTypes = {
  hideError: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
    visible: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({
  error: state.error,
});

const mapDispatchToProps = dispatch => bindActionCreators(ErrorActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorBox);
