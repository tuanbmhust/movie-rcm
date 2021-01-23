import React from 'react';
import Movies from '../Movies';

export const NewRelease = () => (
    <div className="container">
      <div className="app">
        <div className="app__header">
          <h1>New Release</h1>
        </div>
      </div>
      <Movies type="now_playing" />
    </div>
  );