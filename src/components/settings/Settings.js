import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase';
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from '../../actions/settingsActions';

export class Settings extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    setDisableBalanceOnAdd: PropTypes.func.isRequired,
    setDisableBalanceOnEdit: PropTypes.func.isRequired,
    setAllowRegistration: PropTypes.func.isRequired
  };

  componentDidMount() {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then(idTokenResult => {
        console.log(idTokenResult);
        // Confirm the user is an Admin.
        if (!!idTokenResult.claims.admin) {
          console.log('admin');
        } else {
          console.log('user');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  allowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;

    setAllowRegistration();
  };

  disableBalanceOnAddChange = () => {
    const { setDisableBalanceOnAdd } = this.props;

    setDisableBalanceOnAdd();
  };

  disableBalanceOnEditChange = () => {
    const { setDisableBalanceOnEdit } = this.props;

    setDisableBalanceOnEdit();
  };

  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;

    return (
      <Fragment>
        <div className='row'>
          <div className='col-md-6'>
            <Link to='/' className='btn btn-link'>
              <i className='fas fa-arrow-circle-left' /> Back to Dashboard
            </Link>
          </div>
        </div>
        <div className='card'>
          <div className='card-header'>Edit Setting</div>
          <div className='card-body'>
            <form>
              <div className='form-group'>
                <label>Allow Registration</label>{' '}
                <input
                  type='checkbox'
                  name='allowRegistration'
                  checked={!!allowRegistration}
                  onChange={this.allowRegistrationChange}
                />
              </div>
              <div className='form-group'>
                <label>Disable Balance On Add</label>{' '}
                <input
                  type='checkbox'
                  name='disableBalanceOnAdd'
                  checked={!!disableBalanceOnAdd}
                  onChange={this.disableBalanceOnAddChange}
                />
              </div>
              <div className='form-group'>
                <label>Disable Balance On Edit</label>{' '}
                <input
                  type='checkbox'
                  name='disableBalanceOnEdit'
                  checked={!!disableBalanceOnEdit}
                  onChange={this.disableBalanceOnEditChange}
                />
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  auth: state.firebase.auth,
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
