const elastic = require("../elastic");
var songs = require("./songs.json");

/* const esAction = [
    {
        index: {
            _index: elastic.index,
            _type: elastic.type
        }
    },
    {
        author: "quote author",
        quote: "quote"
    }
] */

const esAction = {
    index: {
      _index: elastic.index,
      _type: elastic.type
    }
  };



async function populateDatabase() {
    const docs = [];
   
    for (const song in songs) {
        docs.push(esAction);
        docs.push(song);
    }

   /*  docs.push(esAction);
    docs.push({author: "fff", quote: "nu"}); */
    return elastic.esclient.bulk({ body: docs });
}

module.exports = {
    populateDatabase
};