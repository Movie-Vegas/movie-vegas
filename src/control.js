import React from "react";


class Control extends React.Component{



    constructor(view,model){

               super(model);
               this.model=model;
               this.view=view;

            }


            setIsXhrInProgress(IsXhrInProgress){
                this.model.setIsXhrInProgress(IsXhrInProgress);
            }




            setFavourites(favourites) {
                this.model.setFavourites(favourites);

            }





    /**The CORS request was attempted with the credentials flag set, but the server is configured using the wildcard ("*")
     * as the value of Access-Control-Allow-Origin, which doesn't allow the use of credentials.

     To correct this problem on the client side, simply ensure that the credentials flag's value is false when issuing your CORS request.
     **/
    setXHRequest(method,url,key,flag) {
             this.model.XHRequest(method,url,key,flag);
             }

             setAccount(account){
              this.model.setAccount(account);




             }

          updateView (){



              let data=JSON.stringify('{}');
              if(this.model.getIsXhrInProgress()){

                          return (<div id="view_ready">{this.view.renderMovieDetails(this.model.getXHR(),data)}</div>);


                      }else {

                          return (<div id="view_ready">{this.view.renderMovieDetails(this.model.getXHR(),data)}</div>);


                      }





             }



}


export default Control;
