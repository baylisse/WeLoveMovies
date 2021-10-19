const knex = require("../db/connection");

function read(movieId) {
    return knex(`movies`)
    .select("*")
    .where({ "movie_id": movieId })
    .first();
}

function list(is_showing) {
    return knex("movies as m")
    .select("m.*")
    .modify((query) => {
        if (is_showing) {
            query
                .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
                .where({ "mt.is_showing": true })
                .groupBy("m.movie_id")
        }
    });
}

module.exports = { list, read };