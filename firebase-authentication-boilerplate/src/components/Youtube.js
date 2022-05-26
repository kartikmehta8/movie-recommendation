import React, { useState, useEffect } from 'react';
import youtube from './YTHelper.js';

export default function Youtube({movie}) {
  const [YTMovies, setYTMovies] = useState({});

  async function fetch(res) {
    const response = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 10,
        key: "AIzaSyCJopBlZSXqhkLxts952xQCmoU-SCuaa9w",
        q: res
      }
    })
    return response;
  }

  useEffect(() => {
    let results = fetch(movie);
    setYTMovies(results)
  })

  return (
    <div>
      {JSON.stringify(YTMovies)}
    </div>
  )
}