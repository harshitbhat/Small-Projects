const url = 'https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUfTFmNBRM';

async function test() {
  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer BQA5vTlkrhcXqZnxLC-zq_McklrIp3Ev4BxpEQrkcT70aE70bTXwSA0TbBVvBoMiEw0hdTvWQ_h01c8dMWj0rmpG379J8eq6VhYKnPD-lPjvgTjRiMkV1fpcjuZ7Pv_6lGrVrmIozdoOpL2v_HAleZk5f-SB8RYpIv14ASR3',
      },
    });
    const data = await res.json();
    console.log(data.name);
    console.log(data.images[0].url);
    console.log(data.tracks.items[0].track.album.name);
    console.log(data.tracks.items[0].track.external_urls.spotify);
    console.log(data.tracks.items[0].track.href);
  } catch (err) {
    console.log('Error !!! ', err);
  }
}

test();
