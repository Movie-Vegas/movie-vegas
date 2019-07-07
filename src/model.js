

class Model {

    /**
     * model for Movie-vegas
     * declare class variables/attributes as private (local var and Accessor as a object literal);
     * @type {{rating: string, likes: string, goodMovies: Array, badMovies: Array, result: string, favourites: string, movieList: Array, watchLater: string, setRating: Model.services.setRating, setLikes: Model.services.setLikes, addGoodMovies: Model.services.addGoodMovies, addBadMovies: Model.services.addBadMovies, setResult: Model.services.setResult, setFavourites: Model.services.setFavourites, addMovies: Model.services.addMovies, setWatchLater: Model.services.setWatchLater, getResult: (function(): string), getLikes: (function(): string), getGoodMovie: (function(): Set<*>), getBadMovie: (function(): Set<*>), getFavorites: (function(): string), getMovieList: (function(): Set<*>), getRating: (function(): string), getWatchLater: (function(): string)}}
     */





    setIsXhrInProgress(isXhrInProgress){
        this.isXhrInProgress=isXhrInProgress;
    }

    getIsXhrInProgress(){
        return this.isXhrInProgress;
    }

    setAccount(account){
        this.account=account;
    }
    getAccount(){
        return this.account;
    }


     XHRequest(method,url,key,flag) {


        let request=new XMLHttpRequest();
         request.withCredentials=flag;
        let loading=document.querySelector("#loading");
         request.addEventListener('progress',function () {
            let color=0;
            let  timer=setInterval(function () {


                color++;
                if(color<=800){


                    loading.style.background="rgba(100%,"+color+color+"%,1%,2.8)";


                }


                if(color===800){
                    clearInterval(timer)

                }

            },50);




        });


         request.open(method,"https://api.themoviedb.org/3"+url+key,true);
        this.request= request;



    }
    getXHR(){

        return this.request;

    }
    setRating (rating) {
        this.rating=rating;
    }












}

export  default  Model;