import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

export class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  };

  static propTypes = {
    firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newClient = this.state;
    const { firestore, history } = this.props;

    /* If null balance make 0 */
    if (newClient.balance === '') {
      newClient.balance = 0;
    }

    firestore
      .add({ collection: 'clients' }, newClient)
      .then(() => history.push('/'));
  };

  render() {
    const { firstName, lastName, email, phone, balance } = this.state;
    const { disableBalanceOnAdd } = this.props.settings;

    return (
      <Fragment>
        <div className='row'>
          <div className='col-md-6'>
            <Link to='/' className='btn btn-link'>
              <i className='fas fa-arrow-circle-left' /> Back To Dashboard
            </Link>
          </div>
        </div>
        <div className='card'>
          <div className='card-header'>Add Client</div>
          <div className='card-body'>
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <label htmlFor='firstName'>First Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='firstName'
                  minLength='2'
                  required
                  onChange={this.onChange}
                  value={firstName}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='lastName'>Last Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='lastName'
                  minLength='2'
                  required
                  onChange={this.onChange}
                  value={lastName}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  onChange={this.onChange}
                  value={email}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='phone'>Phone</label>
                <input
                  type='text'
                  className='form-control'
                  name='phone'
                  minLength='7'
                  required
                  onChange={this.onChange}
                  value={phone}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='balance'>Balance</label>
                <input
                  type='text'
                  className='form-control'
                  name='balance'
                  onChange={this.onChange}
                  value={balance}
                  disabled={disableBalanceOnAdd}
                />
              </div>
              <input
                type='submit'
                value='Submit'
                className='btn btn-primary btn-block'
              />
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  settings: state.settings
});

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(AddClient);
