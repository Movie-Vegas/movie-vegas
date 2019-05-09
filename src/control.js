import React from "react";
import View from "./view"
import Model from "./model";
import TableData from './test'
import {labeledStatement} from "@babel/types";

class Control extends React.Component{



    constructor(view,model){
               super()
               this.model=model;
               this.isXhrInprogress=false;
               this.view=view;

            }



    setRating(rating) {
                this.model.services.setRating(rating);
            }

            setLikes(likes) {
                this.model.services.setLikes(likes);

            }

            addGoodMovies(index, goodMovies) {
                this.model.services.addGoodMovies(index, goodMovies);

            }

            addBadMovies(index, badMovies) {
                this.model.services.addBadMovies(index, badMovies);

            }

            setResult(result) {
                this.model.services.setResult(result);

            }

            setFavourites(favourites) {
                this.model.services.setFavourites(favourites);

            }


            addMovies(index, addMovie) {
                this.model.services.addMovies(index, addMovie);

            }


            setWatchLater(watchLater) {
                this.model.services.setWatchLater(watchLater);

            }
    /**The CORS request was attempted with the credentials flag set, but the server is configured using the wildcard ("*")
     * as the value of Access-Control-Allow-Origin, which doesn't allow the use of credentials.

     To correct this problem on the client side, simply ensure that the credentials flag's value is false when issuing your CORS request.
     **/
            search(method,query,data) {
             this.model.services.XHReq(method,query);
               this.isXhrInprogress=true;



             }


          updateView (){

                      if(this.isXhrInprogress){

                          return (<div id="view_ready">{this.view.renderMovieDetails(this.model.services.getXHR(),'{}')}</div>);




                      }else {
                          return (<div id="view_ready">{this.view. renderMovieDetails(this.model.services.getXHR(),'{}')}</div>);

                      }





             }



}


export default Control;
