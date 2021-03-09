const model = require("../models");

async function getSongs(req, res) {
    const query = req.query;
    console.log("getSongs query ", query)
    console.log("query.lyrics ", query.lyrics)
    if (!query.lyrics) {
        res.status(422).json({
            error: true,
            data: "Missing required parameter: lyrics"
        });
        return;
    }
    try {
        var result = await model.getSongs(req.query);
        console.log("result ", result)
        result = result.results === 0 ? "Not found" : result;
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: "Unknown error." });
    }
}

async function addSong(req, res) {
    const body = req.body;
    if (!body.lyrics || !body.artist || !body.title) {
        res.status(422).json({
            error: true,
            data: "Missing required parameter(s): 'lyrics' or 'artist' or 'title'"
        });
        return;
    }
    try {
        const result = await model.insertNewSong(body.lyrics, body.artist, body.title);
        res.json({
            success: true,
            data: {
                id: result.body._id,
                artist: body.artist,
                lyrics: body.lyrics,
                title: body.title
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: "Unknown error." });
    }
}
module.exports = {
    getSongs: getSongs,
    addSong: addSong
};