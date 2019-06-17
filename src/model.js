

class Model {

    /**
     * model for Movie-vegas
     * declare class variables/attributes as private (local var and Accessor as a object literal);
     * @type {{rating: string, likes: string, goodMovies: Array, badMovies: Array, result: string, favourites: string, movieList: Array, watchLater: string, setRating: Model.services.setRating, setLikes: Model.services.setLikes, addGoodMovies: Model.services.addGoodMovies, addBadMovies: Model.services.addBadMovies, setResult: Model.services.setResult, setFavourites: Model.services.setFavourites, addMovies: Model.services.addMovies, setWatchLater: Model.services.setWatchLater, getResult: (function(): string), getLikes: (function(): string), getGoodMovie: (function(): Set<*>), getBadMovie: (function(): Set<*>), getFavorites: (function(): string), getMovieList: (function(): Set<*>), getRating: (function(): string), getWatchLater: (function(): string)}}
     */




    services={

         rating:"",
         sessionId:"",
         token:"",
         likes:"",
         goodMovies:[],
         badMovies:[],
         result:"",
         favourites:"",
         movieList:[],
         watchLater:"",
         counter:"",
         account:"",
         isXhrInProgress:"",
         page:"",


        setIsXhrInProgress(isXhrInProgress){
            this.isXhrInProgress=isXhrInProgress;
        },

        getIsXhrInProgress(){
            return this.isXhrInProgress;
        },
        setPage(page){
            this.page=page;
        },
        getPage(){
            return this.page;
        },
         setAccount(account){
             this.account=account;
         },
         getAccount(){
             return this.account;
         },
        setSessionId(sessionId){
            this.sessionId=sessionId;
        },

        getSessionId(){
            return this.sessionId;
        },
        setToken(token){
             this.token=token;
        },

        getToken(){
             return this.token;
        },

        XHRequest: function (method,url,key,flag,progressElement) {


             let req=new XMLHttpRequest();
                 req.withCredentials=flag;
                 let loading=document.querySelector("#loading");
                 req.addEventListener('progress',function () {
                     let color=0;
                     let  timer=setInterval(function () {


                         color++;
                         if(color<=100){


                             loading.style.background="rgba(100%,"+color+color+"%,1%,2.8)";


                         }


                         if(color===100){
                             clearInterval(timer)

                         }

                     },50);




                 });


                  req.open(method,"https://api.themoviedb.org/3"+url+"&api_key="+key,true);
                  this.request= req;



           } ,
        setCount:function (counter) {
            this.counter=counter;
        },

        getCounter:function(){
             return this.counter;

        },


        getXHR(){

            return this.request;

           },
        setRating:function (rating) {
              this.rating=rating;
         },
        setOverView:function (rating) {
            this.rating=rating;
        },
        setTitle:function (rating) {
            this.rating=rating;
        },
        setPoster:function (rating) {
            this.rating=rating;
        },
        setReleaseDate:function (rating) {
            this.rating=rating;
        },
        setVoteAverage:function (rating) {
            this.rating=rating;
        },
        setVoteCount:function (rating) {
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