import './App.css';
import Login from './Login';
import React,{ useEffect, useState } from 'react';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';
import { useDataLayerValue } from './DataLayer'

function App() {

  const spotify = new SpotifyWebApi()

  const [{ user, token },dispatch] = useDataLayerValue()

  useEffect(() => {
    const hash = getTokenFromUrl()
    window.location.hash = ""

    const _token = hash.access_token

    if(_token) {

      dispatch({
        type: 'SET_TOKEN',
        token: _token
      })

      spotify.setAccessToken(_token)

      spotify.getMe().then(user => {

        dispatch({
          type: 'SET_USER',
          user: user
        })

      }).catch(console.error())

      spotify.getUserPlaylists().then(playlists => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists
        })
      })

      spotify.getPlaylist('6YFFeM9R9QxZh4M65Ih73Y').then(res => {
        dispatch({
          type: 'SET_DISCOVERWEEKLY',
          discover_weekly: res
        })
      })

    }

  }, [])

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
