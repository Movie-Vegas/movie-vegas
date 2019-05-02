

class Model {
    /**
     * model for Movie-vegas
     * declare class variables/attributes as private (local var and Accessor as a object literal);
     * @type {{rating: string, likes: string, goodMovie: string, badMovie: string, result: string,
     * favourites: string, movieList: Array, watchLater: string, setRating: Model.services.setRating,
     * setLikes: Model.services.setLikes, setGoodMovie: Model.services.setGoodMovie, setBadMovie: Model.services.setBadMovie,
     * setResult: Model.services.setResult, setFavourites: Model.services.setFavourites, addMovies: Model.services.addMovies,
     * setWatchLater: Model.services.setWatchLater, getResult: (function(): string), getLikes: (function(): string), getGoodMovie:
     * (function(): string), getBadMovie: (function(): string), getFavorites: (function(): string), getMovieList: (function(): Set<*>),
     * getRating: (function(): string), getWatchLater: (function(): string)}}
     */



    services={
         rating:"",
         likes:"",
         goodMovies:[],
         badMovies:[],
         result:"",
         favourites:"",
         movieList:[],
         watchLater:"",

        setRating:function (rating) {
              this.rating=rating;
         },
        setLikes:function (likes) {
            this.likes=likes;

        },
        addGoodMovies:function (index,goodMovies) {
            this.goodMovies[index]=goodMovies;

        },
        addBadMovies:function (index,badMovies) {
            this.badMovies[index]=badMovies;

        },
        setResult:function (result) {
            this.result=result;

        },
        setFavourites:function (favourites) {
            this.favourites=favourites;

        },
        addMovies:function (index,addMovie) {
            this.movieList[index].push(addMovie);

        },
        setWatchLater:function (watchLater) {
            this.watchLater=watchLater;

        },

        getResult:function () {
            return this.result;
        }
        ,

        getLikes:function () {
            return this.likes;
        }

        ,

        getGoodMovie:function () {
            return new Set(this.goodMovies);
        }

        ,

        getBadMovie:function () {
            return new Set(this.badMovies);
        }

        ,

        getFavorites:function () {
            return this.favourites;
        }

        ,

        getMovieList:function () {
            return new Set(this.movieList);
        }

        ,

        getRating:function () {
            return this.rating;
        },
        getWatchLater:function () {
            return this.watchLater;
        }



    }

}

export  default  Model;