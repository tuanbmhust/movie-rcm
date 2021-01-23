import React from 'react';
import Movies from '../Movies';

const account = {
    username: 'username',
    password: '13423r',
    moviesLiked: 5
};

const nullAccount = null;

const Message = (props) => {
    return (

        <h3>{props.message}</h3>

    );
}

const Content = (props) => {
    console.log(props.account);
    if (props.account) {
        if (props.account.moviesLiked < 5) {
            const message = 'You must like at least 5 movies to see this content';
            return (

                <Message message={message} />
            )
        } else {
            return (
                <React.Fragment>
                    <div className="app">
                        <div className="app__header">
                            <h1>Recommend For You</h1>
                        </div>
                    </div>
                    <Movies type="now_playing" />
                </React.Fragment>
            );
        }

    } else {
        const message = 'You must log in to see this content';
        return (
            <div className='col-12 col-sm-8 offset-sm-2'>
                <Message message={message} />
            </div>
        )
    }
}

export const RecommendForYou = () => {
    return (
        <div className="container">
            <Content account={account} />
        </div>
    );
}