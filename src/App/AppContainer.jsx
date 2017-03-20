import React from 'react';
import Header from '../Header/HeaderContainer.jsx';
import { connect } from 'react-redux';
import Loader from './components/Loader/index.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        {this.props.loaderHidden ?
        '' :
        <Loader />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loaderHidden: state.loader.hidden
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;