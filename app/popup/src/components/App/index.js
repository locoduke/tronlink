import React, { Component } from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { WALLET_STATUS } from 'extension/constants';

import Welcome from 'components/Welcome';
import Queue from 'components/Queue';

import Accounts from 'pages/Accounts';
import Transactions from 'pages/Transactions';
import Tokens from 'pages/Tokens';
import Send from 'pages/Send';

import Redeem from 'pages/Redeem';
import Settings from 'pages/Settings';

import './App.css';

class App extends Component {
    render() {
        const { 
            confirmations, 
            status 
        } = this.props;

        if (status === WALLET_STATUS.UNLOCKED && confirmations.length > 0) 
            return <Queue />;

        return (
            <MemoryRouter className="app">
                <Switch>
                    <Route exact path="/" component={ Welcome } />
                    <Route exact path="/confirm" component={ Queue } />
                    <Route path="/main" render={ props => (
                        <div className="mainContainer">
                            <Switch>
                                <Route path="/main/accounts" component={ Accounts } />
                                <Route path="/main/transactions" component={ Transactions } />
                                <Route path="/main/tokens" component={ Tokens } />
                                <Route path="/main/send" component={ Send } />
                                
                                <Route path="/main/redeem" component={ Redeem } />
                                <Route path="/main/settings" component={ Settings } />                                
                            </Switch>
                        </div>
                    )} />
                </Switch>
            </MemoryRouter>
        );
    }
}

export default connect(state => ({
    confirmations: state.confirmations.confirmations,
    status: state.wallet.status
}))(App);