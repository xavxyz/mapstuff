import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../api/actionCreators.js';
import Layout from '../layout/Layout.jsx';

const mapStateToProps = (state) => {
  return {
    mapbox: state.mapbox
  };
};

const mapDispachToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

const App = connect(mapStateToProps, mapDispachToProps)(Layout);

export default App;