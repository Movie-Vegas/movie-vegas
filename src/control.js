import React from "react";


class Control extends React.Component{



    constructor(view,model){

               super()
               this.model=model;
               this.isXhrInprogress=false;
               this.view=view;

            }


            setIsXhrInProgress(IsXhrInProgress){
                this.model.services.setIsXhrInProgress(IsXhrInProgress);
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


            setCounter(counter) {
                this.model.services.setCount(counter);

            }

            setSessionId(session){
             this.model.setSessionId(session);
            }


            setToken(session){
            this.model.setToken(session);
           }


    /**The CORS request was attempted with the credentials flag set, but the server is configured using the wildcard ("*")
     * as the value of Access-Control-Allow-Origin, which doesn't allow the use of credentials.

     To correct this problem on the client side, simply ensure that the credentials flag's value is false when issuing your CORS request.
     **/
    setXHRequest(method,url,key,flag) {
             this.model.services.XHRequest(method,url,key,flag);
             }

             setAccount(account){
              this.model.services.setAccount(account);




             }

          updateView (){




              if(this.model.services.getIsXhrInProgress()){

                          return (<div id="view_ready">{this.view.renderMovieDetails(this.model.services.getXHR(),
                              this.model.services.getCounter(),'{}',this.model.services.getAccount())}</div>);


                      }else {

                          return (<div id="view_ready">{this.view. renderMovieDetails(this.model.services.getXHR(),
                              this.model.services.getCounter(),'{}',this.model.services.getAccount())}</div>);


                      }





             }



}


export default Control;
