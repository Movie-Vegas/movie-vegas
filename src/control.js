import React from "react";
import View from "./view"
import Model from "./model";

class Control {


    constructor() {
        this.model = Model;
        this.view = View;

    }


    Control(view, model) {
        this.view = view;
        this.model = model;
    }


    setRating(rating) {
        this.model.setRating(rating);
    }

    setLikes(likes) {
        this.model.setLikes(likes);

    }

    addGoodMovies(index,goodMovies) {
        this.model.addGoodMovies(index,goodMovies);

    }

    addBadMovies(index,badMovies) {
        this.model.addBadMovies(index,badMovies);

    }

    setResult(result) {
        this.model.setResult(result);

    }

    setFavourites(favourites) {
        this.model.setFavourites(favourites);

    }


    addMovies(index, addMovie) {
        this.model.addMovies(index,addMovie);

    }


    setWatchLater(watchLater) {
        this.model.setWatchLater( watchLater);

    }


     updateView(){
       return (new View(<h1>Hj</h1>));
     }



}


export default Control;
