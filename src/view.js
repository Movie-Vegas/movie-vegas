import React from "react";
import ReactDOM from "react-dom";



class View  extends React.Component{
    handleChange;




    /**
     * model for Movie-vegas
     * declare class variables/attributes as private (local var and Accessor as a object literal);
     * @type {Object}
     */




    constructor(prop){
        super(prop) ;

        this.state={
            query:"",
            value:'',
            selectedValue:"",
            page:0,
            count:1,
            isDone:false,
        };
        this.listId=[];
        this.flag=[];
        this.favoriteDetails=[];
        this.ratingResults=[];
        this.next=this.next.bind(this);
        this.prev= this.prev.bind(this);
        this.readyModeFavorite(this);
        this.readyModeRatings(this);










       }


       setIsDone(index,flag){
        this.flag[index]=flag;
       }
       getIsDone(){
        return this.flag;
       }
       readyModeWatchLater(classInst){

        let count=1;

        let url="https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/rated/movies?api_key=" +
            "a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by=" +
            "created_at.desc&page=1&append_to_response=content_ratings";


        fetch(url, {
            method: 'GET',

        }).then(function(response){

            return response.json();

            // extract token from JSON response
            // return token
        }).then(function(token) {
            // endpoint where file will be uploaded

            let results=token.total_pages;
            //console.log(token);
            // file that has been selected in the form

            for(let x=1;x<=results;x++){


                fetch("https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/rated/movies?" +
                    "api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by" +
                    "=created_at.desc&page="+x+"&append_to_response=content_ratings",{
                    method: 'GET',

                }).then(function (response) {
                    return response.json();
                }).then(function (token) {

                    let results=token.results;

                    classInst.setFavoriteResults(count,results);
                    count++;



                });


            }

        }).then(function(response){






            // do something with the response

        }).catch(function(error) {
            console.log(error)
            // handle error
        });

    }
       readyModeFavorite(classInst){

           let count=1;

           let url="https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite/movies?page=1&sort_by=" +
               "created_at.asc&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=" +
               "a8ac0ce418f28d6ec56424ebad76ed12";


           fetch(url, {
               method: 'GET',

           }).then(function(response){

               return response.json();

               // extract token from JSON response
               // return token
           }).then(function(token) {
               // endpoint where file will be uploaded

               let results=token.total_pages;
               //console.log(token);
               // file that has been selected in the form

               for(let x=1;x<=results;x++){


                   fetch("https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite/movies?page="+x+"&sort_by=" +
                       "created_at.asc&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=" +
                       "a8ac0ce418f28d6ec56424ebad76ed12",{
                       method: 'GET',

                   }).then(function (response) {
                       return response.json();
                   }).then(function (token) {

                       let results=token.results;

                       classInst.setFavoriteResults(count,results);

                       count++;



                   });


               }

           }).then(function(response){






               // do something with the response

           }).catch(function(error) {
               console.log(error)
               // handle error
           });

       }
       readyModeRatings(classInst){


             let count=1;

               let url="https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/rated/movies?api_key=" +
                   "a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by=" +
                   "created_at.desc&page=1&append_to_response=content_ratings";


               fetch(url, {
                   method: 'GET',

               }).then(function(response){

                   return response.json();

                   // extract token from JSON response
                   // return token
               }).then(function(token) {
                   // endpoint where file will be uploaded

                   let results=token.total_pages;
                   //console.log(token);
                   // file that has been selected in the form

                   for(let x=1;x<=results;x++){


                       fetch("https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/rated/movies?" +
                           "api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by" +
                           "=created_at.desc&page="+x+"&append_to_response=content_ratings",{
                           method: 'GET',

                       }).then(function (response) {
                           return response.json();
                       }).then(function (token) {

                           let results=token.results;

                           classInst.setIsDone(count,true)
                           classInst.setRatingResults(count,results);
                           count++;



                       });


                   }

               }).then(function(response){






                   // do something with the response

               }).catch(function(error) {
                   console.log(error)
                   // handle error
               });










       }


    addMovie(xhr,element,page,response,title){

        let classInstance=this;
        let createContentConfirm = document.querySelector("#create_content_confirm");
        let listed = document.querySelector("#created_list");
        let data = JSON.stringify({});

        let resultsId = "";
        xhr = new XMLHttpRequest();
        xhr.withCredentials=false;
        let isResult=false;

        if(![""," ",undefined].includes(listed.value)){

            xhr.addEventListener("readystatechange", function () {

                if (xhr.readyState === xhr.DONE && [200, 201, 202].includes(xhr.status)) {


                    let results = JSON.parse(xhr.responseText).results;
                    classInstance.setPages(JSON.parse(this.responseText).total_pages);
                    let media = JSON.stringify({
                        "media_id": response,
                    });

                    results.forEach(function (results) {


                        let listed = document.querySelectorAll('.listed');
                        let createdList = document.querySelector("#created_list" );

                        if (results.name === createdList.value) {
                            console.log(results.id)
                            isResult = true;
                            resultsId = results.id;

                            return false;

                        }

                        listed.forEach(function (el) {



                        });




                    });
                    if (isResult) {

                        xhr = new XMLHttpRequest();
                        xhr.withCredentials = false;

                        xhr.addEventListener("readystatechange", function () {

                            if (xhr.readyState === 4 && [200,201,202.203].includes(xhr.status) ){


                                classInstance.listMessage(createContentConfirm ,"The movie "+title.value+" was created successfully");
                            }

                            if ([400,401,402,403,404].includes(xhr.status) ){

                                classInstance.listMessage(createContentConfirm ,"The movie "+title.value+" already in the list");
                            }

                        });

                        xhr.open("POST", "https://api.themoviedb.org/3/list/" + resultsId + "/add_item?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b", true);
                        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                        xhr.send(media);


                    }


                }

                if ([400,401,402,403.404].includes(this.status) ){


                    classInstance.listMessage(createContentConfirm ,"The movie "+title.value+" already in the list");
                }

            });
            xhr.open("GET", "https://api.themoviedb.org/3/account/a8ac0ce418f28d6ec56424ebad76ed12/lists?api_key=" +
                "a8ac0ce418f28d6ec56424ebad76ed12&sort_by=created_at.desc&language=en-US&session_id=" +
                "968092a83b4016a49c3ddde1cc030d149fc6ba0b&page="+this.state.count,true);
            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
            xhr.responseType="text";

            xhr.send(data);


        }else {

            classInstance.listMessage(createContentConfirm ,"Select a list to add movie or create new list ");
        }




            }





    watchTrailer(xhr,index,element,movieId) {



        let data = JSON.stringify({

        });

        xhr = new XMLHttpRequest();




        let name=document.querySelector("#movie_title_iframe");

        xhr.addEventListener("readystatechange", function () {

            if (xhr.readyState === xhr.DONE && [200,201,203].includes(xhr.status)) {

                let results=JSON.parse(xhr.responseText).results;

                let selectedListContent = document.querySelectorAll(".create_list" );
                selectedListContent[0].style.display="none";

                element.forEach(function (el,key,parent) {






                    if(![undefined].includes(results)){
                        if(results.length===0){
                            name.textContent="An error occurred. Please try again later";
                            el.src="https://www.youtube.com/embed/"+movieId+"?controls=1&autoplay=1";

                            return false;
                        }

                        results.forEach(function (val,key,parent) {

                            name.textContent=val.name;
                            if(val.hasOwnProperty('key')){
                                el.src="https://www.youtube.com/embed/"+val.key+"?controls=1&autoplay=1";




                            }
                            return false;
                        })

                    }





                });





            }

        });



        xhr.open("GET", "http://api.themoviedb.org/3/movie/"+movieId+"/videos?api_key=a8ac0ce418f28d6ec56424ebad76ed12&append_to_response=videos",true);
        xhr.responseType="text";

        xhr.send(data);





    }


    deleteFavorites(xhr,index,response,event) {



        let  movie_count= document.querySelector("#movie_count");
        let item=document.querySelectorAll('.item');

        item.forEach(function (val,key){



            if (["mouseenter","click"].includes(event.type)) {



                if(event.type==="click"){


                    if(key===index){
                        let data = JSON.stringify({
                            "media_type": "movie",
                            "media_id": response,
                            "favorite": false
                        });
                        xhr = new XMLHttpRequest();

                        xhr.addEventListener("readystatechange", function () {
                            if (xhr.readyState === xhr.DONE && [200,201,202,203].includes(xhr.status)) {

                                console.log(key+"  :"+index)
                                if(key===index){
                                    movie_count.textContent=""+Number( movie_count.textContent)-1;
                                    while (val.firstChild){
                                        val.firstChild.remove();
                                        val.style.opacity=0;
                                        val.style.display="none";



                                    }




                                    return false;
                                }




                            }

                        });

                        xhr.open("POST", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite?session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12",true);
                        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

                        xhr.send(data);




                    }




                }






            }





        });

    }

    makeFavorite(xhr,movieId,index,flag,classInstance){


        if(![" ","",null,undefined].includes(movieId.id)){


            let data = JSON.stringify({
                "media_type": "movie",
                "media_id": movieId.id,
                "favorite": flag
            });


            xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {



                if (xhr.readyState === xhr.DONE && [200,201,202].includes(xhr.status)) {

                    let message=JSON.parse(xhr.responseText);
                    classInstance.conformation(index, message.status_message);

                    classInstance.readyModeFavorite(classInstance)




                }

            });


            xhr.open("POST", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite?session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12",true);
            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

            xhr.send(data);

        }


    }


    getFavorite(xhr,response,index,element,event,classInstance){


        let movieCount = document.querySelector("#movie_count");
        let results=classInstance.getFavoriteResults();
        let isResults=true;

        if(![undefined,0].includes(results.length)){


        for(let x=1;x<results.length;x++) {

            if(![undefined].includes(results[x])){

                if (results[x].hasOwnProperty('0')) {

                    if(event.type==="mouseleave"){
                        element.innerHTML = '&heart;';
                        element.title = "Favorite"
                    }

                    results[x].forEach(function (results) {


                        if (results.hasOwnProperty("id")) {

                            if (![undefined].includes(results.id)) {


                                if (results.id === response.id) {
                                    isResults=false;


                                    element.addEventListener("click", function (event) {



                                        let data = JSON.stringify({
                                            "media_type": "movie",
                                            "media_id": response.id,
                                            "favorite": false
                                        });

                                        xhr = new XMLHttpRequest();
                                        xhr.addEventListener("readystatechange", function () {


                                            if(xhr.readyState===xhr.DONE){
                                                classInstance.readyModeFavorite(classInstance)
                                            }
                                            if (xhr.readyState === xhr.DONE && [200,201,202].includes(xhr.status)) {

                                                let message=JSON.parse(xhr.responseText);
                                                classInstance.conformation(index, message.status_message);


                                                xhr = new XMLHttpRequest();

                                                xhr.open("GET","https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite/movies?page="+x+"&sort_by=" +
                                                    "created_at.asc&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=" +
                                                    "a8ac0ce418f28d6ec56424ebad76ed12",true);
                                                xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                                                if(classInstance.getIsFavorite()){
                                                    classInstance.renderMovieDetails(xhr,{});

                                                }




                                            }

                                        });


                                        xhr.open("POST", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/" +
                                            "favorite?session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce" +
                                            "418f28d6ec56424ebad76ed12",true);
                                        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

                                        xhr.send(data);

                                        event.stopImmediatePropagation();
                                        event.preventDefault();
                                        event.stopPropagation();

                                    });

                                    if(event.type==="mouseover"){

                                        classInstance.conformation(index, "Remove favorite");
                                        element.innerHTML = '&times;';
                                        element.style.background="#a32897"
                                        element.style.color="white"
                                        element.title = "Remove favorite";

                                        return false;
                                    }

                                    if(event.type==="mouseleave"){

                                        classInstance.conformation(index, "Remove favorite");
                                        element.innerHTML = '&times;';
                                        element.style.background="gold"
                                        element.style.color="black"
                                        element.title = "Remove favorite";

                                        return false;
                                    }

                                }



                            }






                        }

                    })


                }

            }



        }

        }else {



                let items = document.querySelectorAll('.item');

                items.forEach(function (v,k) {
                    if(k===index){


                      isResults=true;

                        return false;
                    }
                });





        }
        if(isResults){




            let items = document.querySelectorAll('.item');
            items.forEach(function (v,k) {

                if (k === index) {


                    element.innerHTML = '&heartsuit;';
                    element.title = "Click to make favorite";
                    classInstance.conformation(index,"Make favorite");

                    if(event.type==="click"){

                movieCount.textContent=""+Number( movieCount.textContent)-1;

                classInstance.makeFavorite(xhr,response,index,true,classInstance);

                   return false;

                    }
            }
        })
        }



    }

    makeRating(xhr,value,movieId,index,classInstance){


        if(![" ","",null,undefined].includes(value)){


            let data = JSON.stringify({
                "value": value,
            });


            xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {


                if(xhr.readyState===xhr.DONE){
                    classInstance.readyModeRatings(classInstance)
                }
                if (xhr.readyState === xhr.DONE && [200,201,202].includes(xhr.status)) {

                    let message=JSON.parse(xhr.responseText);
                    classInstance.conformation(index, message.status_message);





                }

            });


            xhr.open("POST", "https://api.themoviedb.org/3/movie/"+movieId+"/rating?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b",true);
            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

            xhr.send(data);
        }


    }


    getRating(xhr,response,index,element,classInstance){



           let results=classInstance.getRatingResult();


           for(let x=1;x<results.length;x++) {

                   if(![undefined].includes(results[x]))
               if (results[x].hasOwnProperty('0')) {

                    results[x].forEach(function (results) {


                   if (results.hasOwnProperty("id")) {

                       if (![undefined].includes(results.id)) {


                           if (results.id === response.id) {
                               if(element.hasChildNodes()){
                               element.childNodes.forEach(function (v,k) {

                                  });
                               }

                               element.addEventListener("mouseleave", function () {
                                   element.innerHTML = '&star;';
                                   element.title = "Rating"


                               });

                               element.addEventListener("click", function () {


                                       let data = JSON.stringify({

                                       });


                                       xhr = new XMLHttpRequest();
                                       xhr.addEventListener("readystatechange", function () {


                                           if(xhr.readyState===xhr.DONE){
                                               classInstance.readyModeRatings(classInstance)
                                           }
                                           if (xhr.readyState === xhr.DONE && [200,201,202].includes(xhr.status)) {

                                               let message=JSON.parse(xhr.responseText);
                                               classInstance.conformation(index, message.status_message);

                                               classInstance.readyModeRatings(classInstance)




                                           }

                                       });


                                       xhr.open("DELETE", "https://api.themoviedb.org/3/movie/"+response.id+"/rating?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b",true);
                                       xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

                                       xhr.send(data);


                               });

                               classInstance.conformation(index, results.rating+"    "+"Click to remove ratings");
                               element.innerHTML = '&times;';
                               element.title = "Click to remove rating";
                           }

                       }
                   }

               })


                  }


           }




    }

    setRatingResults(index,responseText){
        this.ratingResults[index]=responseText;
    }

    getRatingResult(){
        return this.ratingResults;
    }
    setIsFavorite(favorite){
        this.favorite=favorite;
    }

    getIsFavorite(){
        return this.favorite;
    }
    setFavoriteResults(index,favorites){
        this.favoriteDetails[index]=favorites;
    }

    getFavoriteResults(){
        return this.favoriteDetails;
    }
    setIsList(list){
        this.list=list;
    }

    getIsList(){
        return this.list;
    }
    setIsWatchList(watchList){
        this.watchList=watchList;
    }

    getIsWatchList(){
        return  this.watchList;
    }

    conformation(id,responseText){
        let element=document.querySelectorAll(".rating_content_confirm");



        let color=0;
        element.item(id).textContent=""+responseText;
        let  timer=setInterval(function () {

            if(![" ","",undefined,null].includes(element.item(id))){


                color++;
                if(color<=100){

                    element.item(id).style.display="block";

                }


                if(color===30){
                    clearInterval(timer);
                    element.item(id).style.display="none";

                }

            }




        },50);
    }
    //List
    getCreatedList(xhr,createdList,page,utilities,element){

        let data = JSON.stringify({});


      //List



        xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {

            if (xhr.readyState === xhr.DONE && [200,201,202].includes(xhr.status)) {

                let results=JSON.parse(xhr.responseText).results;
                createdList.innerHTML="";
                utilities.setPages(JSON.parse(this.responseText).total_pages);
                results.forEach(function (results,key) {


                    createdList.innerHTML+="<option   class='listed'>"+results.name+"</option>";

                    if(element.getAttribute('title')==="Add to list"){

                        //utilities.deleteList(xhr,createdList,results.name,results);

                        return false;
                    }






                });











            }

        });


        xhr.open("GET", "https://api.themoviedb.org/3/account/a8ac0ce418f28d6ec56424ebad76ed12/lists?api_key=" +
            "a8ac0ce418f28d6ec56424ebad76ed12&sort_by=created_at.desc&language=en-US&session_id=" +
            "968092a83b4016a49c3ddde1cc030d149fc6ba0b&page="+page,true);
        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
        xhr.responseType="text";

        xhr.send(data);

    }
    createList(xhr,name,description,utilities,element,publicList,sortedList,index){


        let data = JSON.stringify({
            "name": ""+name,
            "description": ""+description,
            "language": "en",
            "sorted_list":""+sortedList,
            "public_list":""+publicList,
        });





        let addToList=document.querySelectorAll(".add_to_list");

        xhr = new XMLHttpRequest();
        xhr.withCredentials=false;
        xhr.addEventListener("readystatechange", function () {

                   if (xhr.readyState === xhr.DONE) {


                       let message="Successfully created";
                       utilities.listMessage(element,message);
                       addToList.item(index).click();
                       let listed=document.querySelector("#created_list");


                       listed.setAttribute("selected",name);









                   }


               });




        xhr.open("POST","https://api.themoviedb.org/3/list?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=" +
            "968092a83b4016a49c3ddde1cc030d149fc6ba0b",true);
        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
        xhr.responseType="text";

        xhr.send(data);



    }

    next(event){

       let xhr=new XMLHttpRequest();
       let data=JSON.stringify({});
        xhr.withCredentials=false;


        if(this.state.count>=1 ){



            if(this.state.count>this.getPage()){

                this.setState({count:--this.state.count});
            }else {

                this.setState({count:++this.state.count});
            }



        }

        let scroller= document.querySelector("#scroll_list" );
        let selectedListContent = document.querySelectorAll(".create_list" );
        selectedListContent[0].style.display="none";
        scroller.style.overflowY="scroll";
        let url="https://api.themoviedb.org/3/account/8408193/favorite/movies?page="+this.state.count+"&sort_by=created_at.asc&language=" +
            "en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12";

        xhr.open("GET",url,true);
        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

        this.renderMovieDetails(xhr,data);





      event.preventDefault();




    }
    prev(event) {

        let utilities=this;
        let data=JSON.stringify({});
        let xhr=new XMLHttpRequest();
        xhr.withCredentials=false;

        if(this.state.count>1){

            this.setState({count:--this.state.count});





        }

        let url="https://api.themoviedb.org/3/account/8408193/favorite/movies?page="+this.state.count+"&sort_by=created_at.asc&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12";

        xhr.open("GET",url,true);
        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");




        let scroller= document.querySelector("#scroll_list" );
        let selectedListContent = document.querySelectorAll(".create_list" );
        selectedListContent[0].style.display="none";
        scroller.style.overflowY="scroll";



         utilities.renderMovieDetails(xhr,data);

        event.preventDefault();


    }
    setResult(result){
        this.result=result;

    }
    getResult(){
        return this.result;

    }



    addToWatchlist(xhr,index,resultId,classInstance,flag,element){

        let data = JSON.stringify({
            "media_type": "movie",
            "media_id": resultId,
            "watchlist": flag
        });

        xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && [200,201,202.203].includes(this.status) ){
                classInstance.setPages(JSON.parse(this.responseText).total_pages);
                let message=JSON.parse(xhr.responseText);
                classInstance.conformation(index,message.status_message);

                  element.innerHTML = '&times;';
                  element.title = "Remove list";



                xhr = new XMLHttpRequest();
                xhr.open("GET", "https://api.themoviedb.org/3/account/8408193/watchlist/movies?api_key=" +
                    "a8ac0ce418f28d6ec56424ebad76ed12&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by=created_at.asc&page="+classInstance.state.count,true);
                xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                xhr.send({});
                if(flag===false && classInstance.getIsWatchList()){
                    xhr = new XMLHttpRequest();
                    xhr.open("GET", "https://api.themoviedb.org/3/account/8408193/watchlist/movies?api_key=" +
                        "a8ac0ce418f28d6ec56424ebad76ed12&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by=created_at.asc&page="+classInstance.state.count,true);
                    xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                    classInstance.renderMovieDetails(xhr,{}) ;
                }



            }
        });

        xhr.open("POST", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/watchlist?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b",true);
        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
         xhr.send(data);



    }
    //delete movie from list
    deleteMovie(xhr,element,listName,listId,mediaId) {


        let classInstance = this;


        xhr = new XMLHttpRequest();
        let isDelete = false;





        let data = JSON.stringify({"media_id": mediaId});



        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {

            if (xhr.readyState === xhr.DONE && [200,201,202].includes(xhr.status)){
                classInstance.setPages(JSON.parse(this.responseText).total_pages);

                let results = JSON.parse(xhr.responseText).results;

               // let addToList = document.querySelectorAll(".add_to_list");
                // addToList.item(index).click();

                xhr = new XMLHttpRequest();
                xhr.open("GET", " URL:https://api.themoviedb.org/3/list/"+listId+"?api_key=a8ac0ce418f28d6ec56424ebad76ed12&language=en-US",true);
                xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                classInstance.renderMovieDetails(xhr,{}) ;

            }
        });

        xhr.open("POST", "https://api.themoviedb.org/3/list/"+listId+"/remove_item?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b", true);
        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
        xhr.responseType = "text";

        xhr.send(data);

    }
    deleteList(xhr,element,listName,index){



        let data = JSON.stringify({});
        let classInstance=this;


        if(![" ","",undefined,null].includes(element.value)){

            xhr = new XMLHttpRequest();
            let isDelete=false;

            xhr.addEventListener("readystatechange", function () {

                if (xhr.readyState === xhr.DONE && [200,201,202].includes(xhr.status)) {
                    classInstance.setPages(JSON.parse(this.responseText).total_pages);
                    let results=JSON.parse(xhr.responseText).results;
                    results.forEach(function (results,key) {


                        let listed=document.querySelectorAll('.listed');
                        let data=JSON.stringify({});
                        let resultsId="";
                        listed.forEach(function (el) {

                            if(results.name===element.value){
                                isDelete=true;


                                resultsId=results.id;
                                return false;
                            }

                        });

                        if(isDelete){

                            xhr=new XMLHttpRequest();
                            xhr.withCredentials=false;

                            xhr.addEventListener("readystatechange", function () {

                                if (xhr.readyState === xhr.DONE) {

                                    let createContentConfirm = document.querySelector("#create_content_confirm");

                                    classInstance.listMessage(createContentConfirm,"Successfully deleted");
                                    let addToList=document.querySelectorAll(".add_to_list");
                                     addToList.item(index).click();


                                 }
                            });

                            xhr.open("DELETE", "https://api.themoviedb.org/3/list/"+resultsId+"?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b",true);
                            //xhr.responseType="text";

                            xhr.send(data);

                        }






                    });











                }

            });

            xhr.open("GET", "https://api.themoviedb.org/3/account/a8ac0ce418f28d6ec56424ebad76ed12/lists?" +
                "api_key=a8ac0ce418f28d6ec56424ebad76ed12&sort_by=created_at.desc&language=en-US&session_id=" +
                "968092a83b4016a49c3ddde1cc030d149fc6ba0b&page="+this.state.count,true);
            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
            xhr.responseType="text";
            xhr.send(data);

        }else {
            let createContentConfirm = document.querySelector("#create_content_confirm");
            classInstance.listMessage(createContentConfirm,"Select a list to delete");

        }




    }

    listMessage(element,message){
        element.style.display="inline";
        element.innerHTML=""+message;

        let count=0;
        let timer=setInterval(function () {
            count++;
            if(count===20){
                console.log(count);
                element.style.display="none";
                clearInterval(timer)
            }

        },200);
    }
    getWatchList(response,xhr,element,event,index,classInstance){


        let data=JSON.stringify({});
        xhr=new XMLHttpRequest();
        xhr.withCredentials=false;
        let isResult=true;
        let resultId="";


        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && [200,201,202.203].includes(this.status) ){

                if(JSON.parse(this.responseText).hasOwnProperty("total_pages")){

                    classInstance.setPages(JSON.parse(xhr.responseText).total_pages);
                }

                let item=document.querySelectorAll('.item');
                let  movie_count= document.querySelector("#movie_count");
                let results=JSON.parse(this.responseText).results;
                if(results.hasOwnProperty('0')){
                    element.addEventListener("mouseenter",function () {
                        alert()
                        element.innerHTML = '&times;';
                        element.style.background="blue";
                        element.title = "Remove me from watch list";
                    })

                    if(["mouseenter","click"].includes(event.type) ){

                            results.forEach(function (results) {

                            item.forEach(function (value,key) {
                                if(key===index){
                                  resultId=results.id ;

                                }

                            });
                            if(results.id===response){
                                isResult=false;

                                element.innerHTML = '&times;';
                                element.style.background="#a32897";
                                element.title = "Remove me from watch list";
                                classInstance.conformation(index, "Add to watchlist");

                                if(event.type==="click"){

                                    classInstance.addToWatchlist(xhr,index,results.id,classInstance,false,element);

                                    return false;
                                }
                            }

                        });

                        if(event.type==="click" && isResult){

                            classInstance.addToWatchlist(xhr,index,response,classInstance,true,element);


                        }

                    }

                }else {
                    if(event.type==="click" && isResult){

                        classInstance.addToWatchlist(xhr,index,response,classInstance,true,element);

                    }
                }



            }
        });


        if (["mouseleave"].includes(event.type)) {

            element.innerHTML = "&#x2b94;";
            element.title = "Add to watch list";

        }
        if (["click","mouseenter"].includes(event.type)){
            xhr.open("GET", "https://api.themoviedb.org/3/account/8408193/watchlist/movies?api_key=" +
                "a8ac0ce418f28d6ec56424ebad76ed12&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by=created_at.asc&page="+this.state.count,true);
            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
            xhr.send(data)

        }


       event.stopImmediatePropagation();
        event.preventDefault();


    }
    getListDetails(xhr,listId,event,element,response,index,classInstance){



        let data=JSON.stringify({});
        xhr=new XMLHttpRequest();
        xhr.withCredentials=false;
        let isResult=true;
        let resultId="";







        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && [200,201,202.203].includes(this.status) ){

                if(JSON.parse(this.responseText).hasOwnProperty("total_pages")){

                    classInstance.setPages(JSON.parse(xhr.responseText).total_pages);
                }


                let item=document.querySelectorAll('.item');
                let  movie_count= document.querySelector("#movie_count");
                let results=JSON.parse(this.responseText).items;

                if(results.hasOwnProperty('0')){
                    classInstance.setlistMoviesDetails(results);

                    if(["mouseenter","click"].includes(event.type) ){

                        results.forEach(function (results) {

                            item.forEach(function (value,key) {
                                if(key===index){
                                    resultId=results.id ;

                                }

                            });



                            if(results.id===response){

                                isResult=false;
                                element.innerHTML = '&times;';
                                element.title = "Remove list";

                                if(event.type==="click"){

                                    classInstance.addToWatchlist(xhr,index,results.id,classInstance,false,element);

                                    return false;
                                }
                            }

                        });

                        if(event.type==="click" && isResult){

                            classInstance.addToWatchlist(xhr,index,response,classInstance,true,element);


                        }

                    }

                }else {
                    if(event.type==="click" && isResult){

                        classInstance.addToWatchlist(xhr,index,response,classInstance,true,element);

                    }
                }



            }
        });


        if (["mouseleave"].includes(event.type)) {

            element.innerHTML = "&#x2b94;";
            element.title = "Add to watch list";

        }
        if (["click","mouseenter"].includes(event.type)){
            xhr.open("GET", "https://api.themoviedb.org/3/list/"+listId+"?api_key=a8ac0ce418f28d6ec56424ebad76ed12&language=en-US",true);
            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
            classInstance.renderMovieDetails(xhr,data)


        }





    }

    setListId(id,key){
        this.listId[key]=id;
    }
    getListId(){
        return this.listId;
    }
    movieContent(xhr,results,resultText){
        let utilities=this;
        let items = document.querySelector('#item');





        if (![" ", "", undefined].includes(results) && Array.of(results).hasOwnProperty('0')
            && ![" ",0,"",undefined].includes(results.length)){

            let remove = document.querySelectorAll('table');

            remove.forEach(function (value) {
                value.remove();

            });


            for (let x = 0; x < results.length; x++) {


                if(!results[x].hasOwnProperty("description")){

                    let img = "http://image.tmdb.org/t/p/w185/" + results[x].poster_path;
                    items.innerHTML +=


                        `
                                      <table class="item">
                                      <tbody><tr><td >
                                         <img  style='float:left; width: 15%; height: 100%; margin-right: 4px'  src="${img}" alt=""/>
                                      <div class='overview'>
                                    
                                      <div id='movie_title'>
                                      <div id='vote_average'>
                                      <div>
                                       ${results[x].vote_average}
                                      </div>
                                      </div>
                                      <span class='movie_title'>
                                      ${results[x].original_title}
                                      <span class='release_date'>
                                      <span class="release">
                                      Release Date 
                                      </span>
                                      <span> 
                                      ${results[x].release_date}
                                      </span> 
                                      </span>
                                      </span>
                                      </div>
                                     <div class="result_overview">
                                     

                                   
                                     ${results[x].overview.substr(0, 669)}  
                                       </div>
                                       <div class='emotions'> 
                                      <div class="rating" title="Rating"><span class="rate">&star;</span></div>
                                  
                                 
                                   <div class="rating_content_confirm">
                                       
                                     </div>
                                     <fieldset class="rating_content">
                                       
                                     <input type="radio" id="star5${x}" name="rating" title="10" />
                                     <label class = "full" for="star5${x}" title="9.50"> </label>
                                     <input type="radio" id="star4half${x}" name="rating" title="9" />
                                     <label class="half" for="star4half${x}" title="8.50"> </label>
                                     <input type="radio" id="star4${x}" name="rating" title="8" />
                                     <label class = "full" for="star4${x}" title="7.50"> </label>
                                     <input type="radio" id="star3half${x}" title="7" name="7" />
                                     <label class="half" for="star3half${x}" title="6.50"> </label>
                                     <input type="radio" id="star3${x}" name="rating"  title="6"  />
                                     <label class = "full" for="star3${x}" title="5.50"> </label>
                                     <input type="radio" id="star2half${x}" name="rating" title="5" />
                                     <label class="half" for="star2half${x}" title="4.50"> </label>
                                     <input type="radio" id="star2${x}" title="4" name="rating"  />
                                     <label class = "full" for="star2${x}" title="3.50"> </label>
                                     <input type="radio" id="star1half${x}"  title="3" name="rating"  />
                                     <label class="half" for="star1half${x}" title="2.50"> </label>
                                     <input type="radio" title="2"  id="star1${x}" name="rating"  />
                                     <label class = "full" for="star1${x}" title="1.50"> </label>
                                     <input type="radio" title="1" id="starhalf${x}" name="rating"  />
                                     <label class="half" for="starhalf${x}" title="0.50"> </label>

                                     </fieldset><span> </span>
                                     
                                      <div  class="favorite" title="Favorite"><span  class="favorite-text" >&heartsuit;<span></div>
                                      <div class='add_to_list' title="Add to list">&#9016;
                                         
                                      </div><div class='add_to_watchlist' title="Add to watchlist">&#x2b94;
                                         
                                     </div>
                                      <div  class='watch_trailer' title="Watch trailer">&#9654;</div> <span> </span>
                                      </div></div>
                                      </td> </tr>
                                      <tbody>
                                      </table>
                                      `;

                    let movieCount = document.querySelector("#movie_count");
                    document.querySelector('#total_pages_title').innerHTML = "Total pages";

                    if(resultText.hasOwnProperty("total_pages")){

                        movieCount.textContent = "" + resultText.total_results;
                        document.querySelector('#qty').innerHTML = resultText.total_pages;


                    }


                }
                if(results[x].hasOwnProperty("description") ||
                    results[x].hasOwnProperty("media_type") &&
                    ![""," ",undefined].includes(results[x].list_type)){
                    utilities.setListId(results[x].id,x);


                    let items = document.querySelector('#item');
                    let img = "http://image.tmdb.org/t/p/w185/" + results[x].backdrop_path;
                     let description="";
                     let type="";
                     if(![""," ",undefined].includes(results[x].description)){

                         description=results[x].description.substr(0, 669);
                     }
                    if(![""," ",undefined].includes(results[x].overview)){

                        description=results[x].overview.substr(0, 669);
                    }
                     if(![""," ",undefined].includes(results[x].list_type)){
                         type=results[x].list_type.toLocaleUpperCase();

                     }
                    items.innerHTML +=


                        `
                                      <table class="item">
                                      <tbody>
                                      <tr><td >
                                       <img  style='float:left; width: 14%; height: 100%; margin-right: 4px'  src="${img}" alt=""/>
                                      <div class='overview'>
                                    
                                      <div id='movie_title'>
                                      <div id='vote_average'>
                                      <div title="Item count">
                                       ${results[x].item_count}
                                      </div>
                                      </div>
                                      <span class='movie_title'>
                                      ${results[x].name}
                                      <span class='release_date'>
                                      <span class="release">
                                       TYPE
                                      </span>
                                      <span> 
                                   
                                        ${type}
                                      </span> 
                                      </span>
                                      </span>
                                      </div>
                                       <div class="result_overview">
                                     

                                   
                                     ${description}  
                                       </div>
                                    
                                       <div class='emotions'> 
                                     
                                 
                                   <div class="rating_content_confirm">
                                       
                                     </div>
                                   
                                     
                                      <div  class="favorite_count" title="Favorite count"><span  class="favorite-text" > ${results[x].favorite_count}<span></div>
                                      <div class='list_items' title="Items">&#9016;
                                         
                                      </div>
                                      <span> </span>
                                      </div></div>
                                      </td> </tr>
                                      <tbody>
                                      </table>
                                      `;





                }




                let movieCount = document.querySelector("#movie_count");
                document.querySelector('#total_pages_title').innerHTML = "Total pages";
                  if(resultText.hasOwnProperty("total_pages")){
                      movieCount.textContent = "" + resultText.total_results;
                      document.querySelector('#qty').innerHTML = resultText.total_pages;


                  }




            }



            let ratingContent = document.querySelectorAll(".rating_content");
            let favorite = document.querySelectorAll(".favorite");
            let item = document.querySelectorAll(".item");
            let rating = document.querySelectorAll(".rating");
            let stars = document.querySelectorAll(".half, .full");
            let addToList=document.querySelectorAll(".add_to_list");
            let closeCreateList=document.querySelectorAll(".close_createList");
            let createList=document.querySelectorAll(".create_new_list");
            let selectedMovie = document.querySelector("#selected_movie" );
            let scroller= document.querySelector("#scroll_list" );
            let selectedListContent = document.querySelectorAll(".create_list" );
            let createdList = document.querySelector("#created_list" );
            let deleteEl=document.querySelector("#delete_list");
            let player = document.querySelectorAll("#video_player");
            let sorted=document.querySelector("#sorted");
            let visibility=document.querySelector("#visibility");
            let addToWatchlist=document.querySelectorAll(".add_to_watchlist");
            let watchTrailer = document.querySelectorAll(".watch_trailer");
            let listItems=document.querySelectorAll(".list_items");

            let movieId=0;
            let indexes=0;
            let receiveAKey=0;
            let receivedItemId=0;





            ['click', 'touch', 'mouseenter','mouseover','mouseleave'].forEach(function (event) {



                createList.forEach(function (el, key) {


                    el.addEventListener(event,function (ev) {


                        let listed=document.querySelectorAll('.listed');
                        let isList=false;
                        let listItem=document.querySelector('#list_name');
                        let listDescription=document.querySelector('#list_description');
                        let createContentConfirm = document.querySelector("#create_content_confirm");




                        let value=el.getAttribute("value");

                        if(["touch","click"].includes(ev.type) && value==="Create list"){


                            let listName=listItem.value;
                            let listDesc=listDescription.value;

                            if(![""," ",null,undefined].includes(listName)){

                                if(listed.length < 1){
                                    isList=false;
                                }

                             let listContentName="";
                             listed.forEach(function (el) {
                                 listContentName=el.value;
                                 if(listName===listContentName){


                                     isList=true;

                                 }
                                 if(!listName===listContentName) {

                                     isList=false;

                                 }



                             }) ;



                                if(isList){
                                    utilities.listMessage(createContentConfirm,"List name already exist");



                                }else {


                                    let createContentConfirm = document.querySelector("#create_content_confirm");
                                    utilities.createList(xhr,listName,listDesc,utilities,createContentConfirm,visibility.value,sorted.value,key);


                                }


                                if(isList){


                                    return false;

                                }

                            }else {

                                        utilities.listMessage(createContentConfirm, "List name must be provided");
                                        isList=false;
                                        return false;


                                }


                    }


                        if(["touch","click"].includes(ev.type) && value==="Add to list"){


                                utilities.addMovie(xhr,el,utilities.state.count,utilities.getResult(),selectedMovie);





                        }


                        ev.stopPropagation();
                        ev.stopImmediatePropagation();
                        ev.preventDefault();



                    });

                    return false;

                });


                closeCreateList.item(0).addEventListener("click",function (ev) {
                    selectedListContent.item(0).style.display="none";
                    scroller.style.overflowY="scroll";


                });



                item.forEach(function (el, itemIndex) {


                    el.addEventListener("mouseover",function () {
                        let watchlist=addToWatchlist.item(itemIndex);
                        let fav=favorite.item(itemIndex);
                        let list=addToList.item(itemIndex);
                        if(![fav,watchlist,addToList].includes(null)){
                            fav.innerHTML = '&heartsuit;';
                            fav.title = "Favorite";
                            watchlist.innerHTML = "&#x2b94;";
                            list.innerHTML='&#9016';
                            list.title="Add to list";
                            watchlist.title = "Add to watch list";

                        }


                    });


                        listItems.forEach(function (el,key) {
                            el.addEventListener(event,function (ev) {
                              if(ev.type==="click"){

                                  if(key===itemIndex){


                                   utilities.getListDetails(xhr,utilities.getListId()[key],ev,listItems,results[itemIndex],itemIndex,utilities);
                                      return false;
                                  }

                              }
                                ev.preventDefault();
                                ev.stopPropagation();

                            })

                        });


                    addToWatchlist.forEach(function (el,key) {
                        el.addEventListener("mouseleave",function (ev) {

                            el.innerHTML = "&#x2b94;";
                            el.style.background="gold";
                            el.title = "Add to watch list";

                        });

                        el.addEventListener(event, function (ev) {



                            ev.preventDefault();
                            ev.stopPropagation();


                            if(key===itemIndex){

                                selectedListContent.item(0).scrollIntoView(true);

                            }



                            if(["click","mouseenter","mouseleave"].includes(ev.type) && key===itemIndex){

                                selectedMovie.innerHTML=""+results[key].original_title;
                                receiveAKey=key;
                                utilities.setResult(results[key].id);
                                utilities.getWatchList(results[key].id,xhr,el,ev,itemIndex,utilities)




                            }
                        });
                    });

                    addToList.forEach(function (el,key) {

                        deleteEl.addEventListener("click",function (ev) {
                            ev.stopImmediatePropagation();
                            ev.preventDefault();
                            ev.stopPropagation();
                            if(key===itemIndex){

                                utilities.deleteList(xhr,createdList,"",itemIndex,utilities.state.count);


                            }



                        });
                        el.addEventListener(event, function (ev) {


                            ev.preventDefault();
                            ev.stopPropagation();


                            if(key===itemIndex){

                                selectedListContent.item(0).scrollIntoView(true);

                            }



                            if(["mouseover","click"].includes(ev.type) && key===itemIndex){
                                selectedMovie.innerHTML=""+results[key].original_title;
                                 receiveAKey=key;
                                 receivedItemId=results[key].id;

                                //get created list
                                utilities.getCreatedList(xhr,createdList,utilities.state.count,utilities,ev.target);
                                utilities.conformation(key, "Add to list");
                                 if(utilities.getIsList()){



                                     if(ev.type==="mouseover"){

                                         el.innerHTML = '&times;';
                                         el.title = "Remove item";

                                     }

                                     if(ev.type==="click"){
                                         if(key===itemIndex){

                                             //delete movie from list
                                             utilities.deleteMovie(xhr,el,listItems,utilities.getListId()[key],utilities.getListMoviesDetails()[key].id)

                                         }

                                     }



                                     selectedListContent.item(0).style.display="none";


                                 }else {

                                     if(ev.type==="click"){
                                         selectedListContent.item(0).style.display="block";
                                     }


                                 }



                            }
                        });

                    });

                    watchTrailer.forEach(function (el, key) {

                        el.addEventListener(event, function (ev) {
                            ev.preventDefault();


                            if(ev.type==="mouseover"){
                                utilities.conformation(key, "Play trailer");
                            }
                            if (ev.type === "click") {


                                player.forEach(function (val) {

                                    let closePlayer = document.querySelectorAll(".close_player");
                                    let movieSource = document.querySelectorAll(".video_1");
                                    val.style.display = "inline-block";


                                    if (key === itemIndex && ![undefined].includes(results[itemIndex].id)) {

                                        utilities.watchTrailer(xhr, key, movieSource, results[itemIndex].id);

                                        return false;
                                    }


                                    utilities.exitPlayer(closePlayer,player,movieSource);




                                });


                            }

                        });


                    });


                    favorite.forEach(function (el, key) {



                        el.addEventListener(event, function (ev) {

                            ev.preventDefault();
                            ev.stopPropagation();



                            if(ev.type==="mouseleave"){

                                el.innerHTML = '&heartsuit;';
                                el.title = "Favorite";
                            }


                            if (itemIndex === key && ![undefined].includes(results[itemIndex].id)) {


                               utilities.getFavorite(xhr,results[itemIndex],key,el,ev,utilities);

                            }


                        });


                        return false;
                    });



                    rating.forEach(function (rating, index) {

                        rating.addEventListener(event, function (ev) {


                            if (index === itemIndex) {


                                ratingContent.item(itemIndex).addEventListener(event, function (ev) {

                                    if (ev.type === "mouseleave") {

                                        ratingContent.item(itemIndex).style.display = "none";
                                        return false;
                                    }
                                    if (ev.type === "mouseenter") {



                                        ratingContent.item(itemIndex).style.display = "block";

                                        return false;
                                    }



                                });








                                if (ev.type === "mouseleave") {
                                    ratingContent.item(itemIndex).style.display = "none";

                                    return false;
                                }

                                if (ev.type === "mouseover") {
                                    movieId=results[itemIndex].id;
                                    indexes=itemIndex;

                                    utilities.getRating(xhr,results[itemIndex],index,ev.target,utilities);

                                    ratingContent.item(itemIndex).style.display = "block";

                                    return false;
                                }



                            }
                        })
                    })



                });


                return false;
            });








            stars.forEach(function (el, key, parent) {


                el.addEventListener('click',function (ev) {

                    utilities.makeRating(xhr,el.getAttribute('title'),movieId,indexes,utilities);
                    ev.stopPropagation();




                })

            });


        } else {

            let movieCount = document.querySelector("#movie_count");
            movieCount.textContent = "0";
            ReactDOM.findDOMNode(document.getElementById('qty')).textContent = 0;
            ReactDOM.findDOMNode(document.getElementById('total_pages_title')).innerHTML = "Total pages";


            //throw an exception
            let noResultException = document.querySelectorAll('#item');

            noResultException[0].innerHTML = "<table class='item'><tbody><tr><td >" +
                "<p id='search_result'>Your search yield no results check your spellings and try again</p></td></tr> </tbody></table>"


        }

    }

    exitPlayer(closePlayer,player,movieSource){

        closePlayer.forEach(function (value, key) {

            value.addEventListener("click", function (ev) {

                if (ev.type === "click") {

                    player.forEach(function (value, index) {
                        if (index === key) {

                            movieSource.forEach(function (el) {

                                el.src = "";


                            });
                            value.style.display = "none";


                            return false;
                        }

                    })
                }
                ev.preventDefault();
            })

        });
    }


    setPages(page){
        this.page=page;
   }
    getPage(){
        return this.page;
  }
    setTotalPages(page){
        this.page=page;
    }
    getTotalPages(){
        return this.page;
    }
    getListMoviesDetails() {
     return this.listMoviesDetails;
    }
    setlistMoviesDetails(list){
        this.listMoviesDetails=list;
    }
    renderMovieDetails(xhr,data) {

        let utilities=this;
         if(xhr !==undefined){


             let isProgress=false;

             xhr.addEventListener("readystatechange",function (results) {
                 if(this.responseText.hasOwnProperty("total_pages")){
                     utilities.setTotalPages(JSON.parse(this.responseText).total_pages)
                 }
                  if(xhr.readyState===4 && [200,201,202,203].includes(xhr.status)){

                      let scroller= document.querySelector("#scroll_list" );
                      let closePlayer= document.querySelector("#video_player");




                      let selectedListContent = document.querySelectorAll(".create_list" );

                      if(utilities.getIsFavorite() || utilities.getIsList() || utilities.getIsWatchList()){


                          selectedListContent[0].style.display="none";

                          closePlayer.style.display="none";
                          scroller.style.overflowY="scroll";
                      }


                      utilities.setTotalPages(JSON.parse(this.responseText).total_pages);

                 if(![" ","",undefined].includes(xhr.responseText)) {


                     let resultText = JSON.parse(xhr.responseText);
                     results = JSON.parse(xhr.responseText);

                     if(results.hasOwnProperty("results")){

                         results = JSON.parse(xhr.responseText).results;


                     }else {
                         results = JSON.parse(xhr.responseText).items;
                     }

                     let remove = document.querySelectorAll('table');

                     remove.forEach(function (value) {
                         value.remove();

                     });





                        utilities.movieContent(xhr,results,resultText);



                 }

             }else if ([500,501,502.503].includes(this.status)){

                          isProgress=true;
                          alert("Hmm. We’re having trouble finding that Query.\n" +
                              "\n" +
                              "We can’t connect to the server at " + navigator.appName +
                              "\n Server error" +
                              "If that address is correct, here are three other things you can try:\n" +
                              "\n" +
                              "    Try again later.\n" +
                              "    Check your network connection.\n" +
                              "    If you are connected but behind a firewall," + navigator.appName +
                              " check that " + navigator.appName + "has permission to access the Web.");



                  }else if ([1,2,3].includes(this.status)){

                          isProgress=true;

                 }

             });



             if(isProgress){
                 this.progress();
             }

             xhr.responseType = "text";
             xhr.send(data);

             utilities.restoreDown();
         }








        return  (
                  <div>


                      <div  className="info_box">
                          <div id="user_query_details">
                          <span><span className="user_query">My Favorites</span>
                              <span id="user_query">Movies <span id="movie_count">
                              </span></span></span>
                      </div>


                      </div>
                      <div id="create_list_content">


                          <div className="create_list">

                          <div className="create_list_title">
                              <span title="Close" className="close_createList">X</span>
                              Create New List  <span id="create_content_confirm"> </span>
                          </div>
                          <div className="">
                              <select  id="selected_Title" disabled={true} className="sorted" >

                                  <option   id="selected_movie"> </option>

                              </select>


                          </div>


                          <div className="favorite_labels">
                              Name
                          </div>
                          <div className="">
                              <input type="text" id="list_name" className="sorted"/>

                          </div>


                          <div className="list_description">Description</div>
                          <div>
                              <textarea value={this.state.value} id="list_description" onChange={this.handleChange} />
                          </div>


                          <div className="favorite_labels">
                              Public List

                          </div>
                          <div className="sorted">
                              <select  id="visibility" className="sorted">
                                  <option id="public_ list">Yes</option>
                                  <option>No</option>

                              </select>
                          </div>
                          <div className="">
                          Sorted By
                      </div>

                          <div className="">
                              <select id="sorted" className="sorted">
                                  <option id="sorted_list" >Yes</option>
                                  <option>No</option>
                              </select>
                              <div className="list_Names">
                                  My List Bank <span id="delete_list" title="Delete this list">X</span>
                              </div>

                              <div className="">
                                  <select id="created_list"    className="sorted">

                                  </select>


                              </div>



                              <input type="button"  className="create_new_list" value="Create list"/>
                              <input type="button"  id="add_movie_to_list" className="create_new_list" value="Add to list"/>

                          </div>
                      </div>
                    </div>
                      <div id="video_player" draggable="true"  >
                          <div id="movie_title_iframe"> </div>
                          <div className="restore_down" title="Restore down" > </div><div  title="Exit player" className="close_player">  </div>

                          <iframe  title="IPlayer" className="video_1" width="80%" height="60%"
                                  data-setup='{ "aspectRatio":"640:267", "playbackRates": [1, 1.5, 2] }'
                                  src=""  frameBorder="0"
                                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen>


                          </iframe>

                      </div>
                  <div id='scroll_list'>
                      <div id="item"> </div>

                  </div>

                      <div id="total_pages">
                          <div id="total_pages_title">Total Pages </div>
                          <div   id="qty">

                          </div>

                      </div>

                       <div className="navigator">
                           <span id="prev" onTouchStart={this.prev} onClick={this.prev} className="nav"> </span>
                           <span id="next" onClick={this.next} onTouchStart={this.next} className="nav"> </span>

                       </div>

                 </div>

                );





    }

    restoreDown(){
        let restore=document.querySelectorAll(".restore_down");
        let video=document.querySelectorAll(".video_1");
        let title=document.querySelector("#movie_title_iframe");
        let player=document.querySelector("#video_player ");
        let isRestoreDown=true;

            restore.forEach(function (el,key) {

                el.addEventListener("click",function (event) {
                    event.preventDefault();
                    if(isRestoreDown){
                        isRestoreDown=false;
                        video[0].style.cssText="height: 140%;";
                        el.style.cssText="margin-left: 2%;";
                        if(title.textContent.length>=42){

                            title.style.cssText=" padding-right:1%;"
                        }else {
                            title.style.cssText="padding-right:16%;"
                        }
                        player.style.cssText=" width: 40%; height: 25%;display:block;margin-top:272px;padding-top:1%;padding-bottom:8%;margin-left:800px"
                    }else {
                        isRestoreDown=true;
                        if(title.textContent.length>30){

                            title.style.cssText=" padding-right:38%;"
                        }else {
                            title.style.cssText="padding-right:54%;"
                        }
                        video[0].style.cssText="height: 60%;";
                        player.style.cssText=" width: 100%; height: 100%;display:block;margin-top:0;margin-left:0px;padding-top:5%;padding-bottom:7%;"

                    }


                })

            })
    }


}



export  default View;