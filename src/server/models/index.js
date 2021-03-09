const { esclient, index, type } = require("../../elastic");

async function getSongs(req) {
   
    const query = {
        query: {
            match: {
                lyrics:
                {
                    query: req.lyrics,
                    // operator: "and",
                    fuzziness: "AUTO"
                }
            }
        }
    }

    const { body: { hits } } = await esclient.search({
        /* from: req.page || 0,
        size: req.limit || 100, */
        size: 1,
        index: index,
        type: type,
        body: query
    });

    console.log("hits.total ", JSON.stringify(hits.total));
    console.log("hits.total.value ", hits.total.value);

    const results = hits.total.value;

    const values = hits.hits.map((hit) => {
        return {
            id: hit._id,
            lyrics: hit._source.lyrics,
            artist: hit._source.artist,
            title: hit._source.title,
            score: hit._score
        }
    });

    return {
        results,
        values
    }
}

async function insertNewSong(lyrics, artist, title) {
    return esclient.index({
        index,
        type,
        body: {
            lyrics,
            artist,
            title
        }
    })
}

module.exports = {
    getSongs: getSongs,
    insertNewSong: insertNewSong
}