import React from 'react';
import Movies from '../Movies';

export const TopRated = () => (
    <div className="container">
      <div className="app">
        <div className="app__header">
          <h1>Top Rated Movies</h1>
        </div>
      </div>
      <Movies type="top_rated" />
    </div>
  );