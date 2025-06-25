// .github/scripts/fetch_top_albums.js
import fetch from 'node-fetch';
import fs from 'fs';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(SPOTIFY_REFRESH_TOKEN)}`
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('Failed to get access token: ' + JSON.stringify(data));
  return data.access_token;
}

async function getTopAlbums(accessToken) {
  const res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  const data = await res.json();
  const seenArtists = new Set();
  const topAlbums = [];
  for (const track of data.items) {
    const artistId = track.artists[0].id;
    const albumId = track.album.id;
    if (!seenArtists.has(artistId)) {
      seenArtists.add(artistId);
      topAlbums.push({
        album: track.album.name,
        albumId: albumId,
        artist: track.artists[0].name,
        artistId: artistId,
        cover: track.album.images[0]?.url || null,
        url: `https://open.spotify.com/album/${albumId}`
      });
    }
    if (topAlbums.length === 5) break;
  }
  return topAlbums;
}

async function main() {
  try {
    const accessToken = await getAccessToken();
    const topAlbums = await getTopAlbums(accessToken);
    fs.writeFileSync('glance-resume-splash/public/top_albums.json', JSON.stringify(topAlbums, null, 2));
    console.log('Top albums written to glance-resume-splash/public/top_albums.json');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
