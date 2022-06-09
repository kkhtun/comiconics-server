module.exports = ({ GenresService }) => ({
    getGenres: GenresService.getGenres,
    createGenre: GenresService.createGenre,
});
