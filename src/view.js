import React from "react";
import ReactDOM from "react-dom";
import {isTSTypeLiteral} from "@babel/types";


class View  extends React.Component{




    /**
     * model for Movie-vegas
     * declare class variables/attributes as private (local var and Accessor as a object literal);
     * @type {Object}
     */


    /*

    conformation (index,responseText) {

        let element=document.querySelectorAll(".rating_content_confirm");
        let message=JSON.parse(responseText).status_message;
        element.forEach(function (el, key) {
            if(index===key)
            if(![""," ",undefined].includes(index)){
                let color=0;
                let  timer=setInterval(function () {




                    if(color<=0){

                        el.style.display="block";
                        el.textContent=""+message;

                    }

                    color++;
                    if(color===60){

                        el.textContent=""+message;
                        el.style.display="none";
                        clearInterval(timer);

                    }

                },50);
            }
        });


    }
     rating(xhr,index,element,movieId,classInstance){


        if(![" ","",null,undefined].includes(element.getAttribute("title"))){


            let data = JSON.stringify({
                "value": element.getAttribute("title")
            });


            xhr = new XMLHttpRequest();



            xhr.addEventListener("readystatechange", function () {

                if (xhr.readyState === xhr.DONE && [200,201,202].includes(xhr.status)) {

                    console.log("ID:" +movieId);
                    classInstance.conformation(index,xhr.responseText)






                }

            });


            xhr.open("POST", "https://api.themoviedb.org/3/movie/"+movieId+"/rating?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b",true);
            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

            xhr.send(data);
        }


    }

    progress(){
        let color=0;
        let  timer=setInterval(function () {
            let loading=document.getElementById("loading");
            color++;
            if(color<=100){


                loading.style.background="rgba(100%,"+color+color+"%,1%,2.8)";


            }


            if(color===100){
                clearInterval(timer)

            }

        },50);

    }
    */


    makeFavorite(response,xhr,element,index,classInstance){



        let data = JSON.stringify({
            "media_type": "movie",
            "media_id": response,
            "favorite": true
        });

        xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === xhr.DONE) {

                element.innerHTML = '&times;';
                element.title = "Remove Favorite";
                classInstance.conformation(index,xhr.responseText);
                console.log(xhr.responseText);
            }
        });

        xhr.open("POST", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite?session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12",true);
        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

        xhr.send(data);

        return false;





    }

    getFavoriteMovies (response,xhr,element,event,index,classInstance) {

        let data = "{}";

        xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {


            if (this.readyState === 4 && [200,201,202.203].includes(this.status) ) {

                if (["mouseenter", "click"].includes(event.type)) {

                    let  results= JSON.parse(this.responseText).results;
                    let isResults = true;
                    let item=document.querySelectorAll('.item');
                    let  movie_count= document.querySelector("#movie_count");


                    item.forEach(function (val,key) {

                        if(key===index) {

                            results.forEach(function (val) {

                                if (response === val.id) {

                                    console.log(response)

                                    isResults=false;
                                    let item=document.querySelectorAll('.item');

                                    item.forEach(function (val,key){



                                        if (["mouseenter","click"].includes(event.type)) {

                                            element.innerHTML = '&times;';
                                            element.title = "Remove Favorite";



                                            if(event.type==="click"){


                                                if(key===index){
                                                    let data = JSON.stringify({
                                                        "media_type": "movie",
                                                        "media_id": response,
                                                        "favorite": false
                                                    });
                                                    xhr = new XMLHttpRequest();

                                                    xhr.addEventListener("readystatechange", function () {
                                                        if (xhr.readyState === xhr.DONE) {


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
                                    return false;
                                }





                            });


                            return false;
                        }





                        return false;

                    });



                    if (event.type === "click" && isResults)  {

                      classInstance.makeFavorite(response,xhr,element,index,classInstance)



                    }





                    /*

                     Array.from(favoriteId).forEach(function (response) {

                        if (resultsId===response.results.id){
                            if(['mouseenter','mouseleave','click'].includes(event.type)) {
                                if(event.type==="mouseenter"){
                                    element.innerHTML='&times;';
                                    element.title="Remove Favorite";
                                }
                                if(event.type==="mouseleave"){
                                    element.innerHTML='&heartsuit;';
                                    element.title="Favorite";
                                    return false;
                                }
                                if(event.type==="click"){
                                    let item=document.querySelectorAll('.item');
                                    item.forEach(function (val,key,parent) {
                                        if(key===index){
                                            let data = JSON.stringify({
                                                "media_type": "movie",
                                                "media_id": resultsId,
                                                "favorite": false
                                            });
                                            xhr = new XMLHttpRequest();
                                            xhr.addEventListener("readystatechange", function () {
                                                if (xhr.readyState === xhr.DONE) {
                                                    console.log(xhr.responseText);
                                                    val.remove();
                                                }
                                            });
                                            xhr.open("POST", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite?session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12");
                                            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                                            xhr.send(data);
                                            return false;
                                        }
                                    });
                                }
                            }
                        }else {
                            alert("hdkjfs")
                        }
                    });


                    if(![""," ",0,undefined].includes(favorite.length)){


                    }else {
                        let data = JSON.stringify({
                            "media_type": "movie",
                            "media_id": resultsId,
                            "favorite": true
                        });
                        xhr = new XMLHttpRequest();
                        xhr.addEventListener("readystatechange", function () {
                            if (xhr.readyState === xhr.DONE) {
                                console.log(xhr.responseText);
                            }
                        });
                        xhr.open("POST", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite?session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12");
                        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                        xhr.send(data);
                        return false;
                    }*/


                }



            }


        });

        if (event.type === "mouseleave") {


            element.innerHTML = '&heartsuit;';
            element.title = "Favorite";

            return false;



        }



        if(["click","mouseenter"].includes(event.type)) {

            xhr.open("GET", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite/movies?page=1&sort_by=created_at.asc&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12");
            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
            xhr.responseType = "text";
            xhr.send(data);
        }





    }


    watchTrailer(xhr,index,element,movieId) {



        let data = JSON.stringify({

        });

        xhr = new XMLHttpRequest();




        let name=document.querySelector("#movie_title_iframe");

        xhr.addEventListener("readystatechange", function () {

            if (xhr.readyState === xhr.DONE) {

                let results=JSON.parse(xhr.responseText).results;



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



        xhr.open("GET", "http://api.themoviedb.org/3/movie/"+movieId+"/videos?api_key=a8ac0ce418f28d6ec56424ebad76ed12&append_to_response=videos");
        xhr.responseType="text";

        xhr.send(data);





    }



    deleteFavorites(xhr,index,element,response,event,classInstance) {



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



                                    //classInstance.conformation(index,xhr.responseText);
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

    rating(xhr,value,movieId,index,classInstance){


        if(![" ","",null,undefined].includes(value)){


            let data = JSON.stringify({
                "value": value,
            });


            xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {

                if (xhr.readyState === xhr.DONE && [200,201,202].includes(xhr.status)) {

                    console.log("ID:" +movieId);
                    classInstance.conformation(index,xhr.responseText)






                }

            });


            xhr.open("POST", "https://api.themoviedb.org/3/movie/"+movieId+"/rating?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b",true);
            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

            xhr.send(data);
        }


    }

    getRating(xhr,movieId,index,classInstance){


        if(![" ","",null,undefined].includes(value)){


            let data = JSON.stringify({

            });


            xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {

                if (xhr.readyState === xhr.DONE && [200,201,202].includes(xhr.status)) {

                    console.log("ID:" +xhr.responseText);
                    classInstance.conformation(index,xhr.responseText)






                }

            });

          //  https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=<<api_key>>&language=en-US&session_id=n&sort_by=created_at.asc&page=1
            xhr.open("GET", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/rated/movies?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by=created_at.asc&page=1",true);
            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

            xhr.send(data);
        }


    }



    conformation(id,responseText) {
        let element=document.querySelectorAll(".rating_content_confirm");
        let message=JSON.parse(responseText).status_message;


        let color=0;
        let  timer=setInterval(function () {


            element.item(id).textContent=""+message;


            color++;
            if(color<=100){

                element.item(id).style.display="block";

            }


            if(color===30){
                clearInterval(timer);
                element.item(id).style.display="none";

            }

        },50);
    }





    utility={



        makeFavoriteThroughGetFavorite:function (response,xhr,element,event,index) {

            let data = "{}";


            xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {




                if (this.readyState === 4 && [200,201,202.203].includes(this.status) ) {

                    if (["mouseenter", "click"].includes(event.type)) {

                        let  results= JSON.parse(this.responseText).results;
                        let isResults = true;
                        let item=document.querySelectorAll('.item');
                        let  movie_count= document.querySelector("#movie_count");




                        item.forEach(function (val,key) {

                            if(key===index) {

                                results.forEach(function (val) {

                                    if (response === val.id) {

                                        console.log(response)

                                        isResults=false;
                                        let item=document.querySelectorAll('.item');

                                        item.forEach(function (val,key,parent){



                                            if (["mouseenter","click"].includes(event.type)) {

                                                element.innerHTML = '&times;';
                                                element.title = "Remove Favorite";



                                                if(event.type==="click"){


                                                    if(key===index){
                                                        let data = JSON.stringify({
                                                            "media_type": "movie",
                                                            "media_id": response,
                                                            "favorite": false
                                                        });
                                                        xhr = new XMLHttpRequest();

                                                        xhr.addEventListener("readystatechange", function () {
                                                            if (xhr.readyState === xhr.DONE) {


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
                                        return false;
                                    }





                                })


                                return false;
                            }





                            return false;

                        })



                        if (event.type === "click" && isResults)  {

                            let data = JSON.stringify({
                                "media_type": "movie",
                                "media_id": response,
                                "favorite": true
                            });

                            xhr = new XMLHttpRequest();

                            xhr.addEventListener("readystatechange", function () {
                                if (xhr.readyState === xhr.DONE) {
                                    console.log(xhr.responseText);
                                }
                            });

                            xhr.open("POST", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite?session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12",true);
                            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

                            xhr.send(data);

                            return false;



                        }


                        /* Array.from(favoriteId).forEach(function (response) {
                            //let results= JSON.parse(resp);
                            if (resultsId===response.results.id){
                                if(['mouseenter','mouseleave','click'].includes(event.type)) {
                                    if(event.type==="mouseenter"){
                                        element.innerHTML='&times;';
                                        element.title="Remove Favorite";
                                    }
                                    if(event.type==="mouseleave"){
                                        element.innerHTML='&heartsuit;';
                                        element.title="Favorite";
                                        return false;
                                    }
                                    if(event.type==="click"){
                                        let item=document.querySelectorAll('.item');
                                        item.forEach(function (val,key,parent) {
                                            if(key===index){
                                                let data = JSON.stringify({
                                                    "media_type": "movie",
                                                    "media_id": resultsId,
                                                    "favorite": false
                                                });
                                                xhr = new XMLHttpRequest();
                                                xhr.addEventListener("readystatechange", function () {
                                                    if (xhr.readyState === xhr.DONE) {
                                                        console.log(xhr.responseText);
                                                        val.remove();
                                                    }
                                                });
                                                xhr.open("POST", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite?session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12");
                                                xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                                                xhr.send(data);
                                                return false;
                                            }
                                        });
                                    }
                                }
                            }else {
                                alert("hdkjfs")
                            }
                        });
                        if(![""," ",0,undefined].includes(favorite.length)){
                        }else {
                            let data = JSON.stringify({
                                "media_type": "movie",
                                "media_id": resultsId,
                                "favorite": true
                            });
                            xhr = new XMLHttpRequest();
                            xhr.addEventListener("readystatechange", function () {
                                if (xhr.readyState === xhr.DONE) {
                                    console.log(xhr.responseText);
                                }
                            });
                            xhr.open("POST", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite?session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12");
                            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                            xhr.send(data);
                            return false;
                        }*/


                    }



                }


            });

            if (event.type === "mouseleave") {


                element.innerHTML = '&heartsuit;';
                element.title = "Favorite";

                return false;



            }



            if(["click","mouseenter"].includes(event.type)) {
                xhr.open("GET", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite/movies?page=1&sort_by=created_at.asc&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12");
                xhr.responseType = "text";
                xhr.send(data);
            }





        },




        watchTrailer:function (xhr,index,element,movieId) {



            let data = JSON.stringify({

            });

            xhr = new XMLHttpRequest();




            let name=document.querySelector("#movie_title_iframe");

            xhr.addEventListener("readystatechange", function () {

                if (xhr.readyState === xhr.DONE) {

                    let results=JSON.parse(xhr.responseText).results;



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


                    /*
                      element.forEach(function (el,key,parent) {
                          results.forEach(function (val) {
                              if(val.hasOwnProperty('id')){
                                  alert(key)
                                  if(key===index){
                                      let data = JSON.stringify({
                                      });
                                      xhr = new XMLHttpRequest();
                                      xhr.addEventListener("readystatechange", function () {
                                          if (xhr.readyState === xhr.DONE) {
                                              let id=JSON.parse(xhr.responseText).id;
                                              element.forEach(function (el,key,parent) {
                                                  results.forEach(function (val) {
                                                      if(val.hasOwnProperty('id')){
                                                          if(key===index){
                                                              el.src="https://www.youtube.com/embed/"+val.key+"?controls=1";
                                                             // console.log(xhr.responseText);
                                                          }
                                                      }
                                                  });
                                                  return false;
                                              });
                                          }
                                      });
                                      xhr.open("GET", "http://api.themoviedb.org/3/movie/"+movieId+"/videos?api_key=a8ac0ce418f28d6ec56424ebad76ed12&append_to_response=videos");
                                      xhr.responseType="text";
                                      xhr.send(data);
                                  }
                              }
                          });
                          return false;
                      });*/






                }

            });



            xhr.open("GET", "http://api.themoviedb.org/3/movie/"+movieId+"/videos?api_key=a8ac0ce418f28d6ec56424ebad76ed12&append_to_response=videos");
            xhr.responseType="text";

            xhr.send(data);





        },
        removeRating:function (xhr,index,element,movieId,rating) {

            let data = JSON.stringify({
                "value": 8.5
            });

            xhr = new XMLHttpRequest();


            xhr.addEventListener("readystatechange", function () {

                if (xhr.readyState === xhr.DONE) {

                    let results=JSON.parse(xhr.responseText).results;
                    alert(xhr.responseText)




                }

            });



            xhr.open("GET", "https://api.themoviedb.org/3/movie/"+movieId+"/rating?api_key=a8ac0ce418f28d6ec56424ebad76ed12");
            xhr.responseType="text";

            xhr.send(data);


        }
        ,
        addToList:function () {

        }

    };


    renderMovieDetails(xhr,numberPages,data,account) {

         if(xhr !==undefined){


             let utilities=new View();
             let isProgress=false;

             xhr.addEventListener("loadend",function (results) {

                  if(xhr.readyState===4 && [200,201,202,203].includes(xhr.status)){

                 if(![" ","",undefined].includes(xhr.responseText)) {


                     let resultText = JSON.parse(xhr.responseText);
                     results = JSON.parse(xhr.responseText).results;

                     let remove = document.querySelectorAll('table');
                     remove.forEach(function (value) {
                         value.remove();

                     });

                     if (![" ", "", undefined].includes(results) && results.hasOwnProperty('0')) {

                         for (let x = 0; x < results.length; x++) {

                             let items = document.getElementById('item');
                             let img = "http://image.tmdb.org/t/p/w185/" + results[x].poster_path;
                             items.innerHTML +=


                                 `
                                      <table class="item">
                                      <tbody><tr><td ><img  style='float:left; width: 15%' src="${img}" alt=""/>
                                      <div id='movie_title'><div id='vote_average'><div>${results[x].vote_average}</div></div>
                                      <span class='movie_title'> ${results[x].original_title}<span class='release_date'><span class="release">Release Date </span><span> ${results[x].release_date}</span> </span></span></div>
                                      <div id='overview'>${results[x].overview.substr(0, 720)}</div>
                                      <div class='emotions'> <div class="rating" title="Rating"><span class="rate">&star;</span></div>
                                  
                                 
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
                                      <div class='feelings' title="Add to list">&#9016;</div>
                                      <div  class='watch_trailer' title="Watch trailer">&#9783;</div> <span> </span>
                                      </div> </td> </tr>
                                      <tbody>
                                      </table>
                                      `;


                             let movieCount = document.querySelector("#movie_count");
                             movieCount.textContent = "" + resultText.total_results;
                             ReactDOM.findDOMNode(document.getElementById('total_pages_title')).innerHTML = "Total pages";


                             ReactDOM.findDOMNode(document.getElementById('qty')).innerHTML = resultText.total_pages;





                         }

                         let ratingContent = document.querySelectorAll(".rating_content");
                         let favorite = document.querySelectorAll(".favorite");
                         let item = document.querySelectorAll(".item");
                         let rating = document.querySelectorAll(".rating");
                         let stars = document.querySelectorAll(".half, .full");
                         let ratingWidget = document.querySelectorAll(".starhalf" );
                         let player = document.querySelectorAll("#video_player");
                         let watchTrailer = document.querySelectorAll(".watch_trailer");

                         let movieId=0;
                         let indexes=0;

                         ['click', 'touch', 'mouseenter', 'mouseover', 'mouseleave'].forEach(function (event) {

                             item.forEach(function (value, itemIndex) {

                                 watchTrailer.forEach(function (el, key) {

                                     el.addEventListener(event, function (ev) {
                                         ev.preventDefault();


                                         if (ev.type === "click") {


                                             player.forEach(function (val) {

                                                 let closePlayer = document.querySelectorAll(".close_player");
                                                 let movieSource = document.querySelectorAll(".video_1");
                                                 val.style.display = "inline-block";


                                                 if (key === itemIndex && ![undefined].includes(results[itemIndex].id)) {

                                                     utilities.watchTrailer(xhr, key, movieSource, results[itemIndex].id);

                                                     return false;
                                                 }


                                                 closePlayer.forEach(function (value, key) {

                                                     value.addEventListener(event, function (ev) {

                                                         ev.preventDefault();
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

                                                     })

                                                 });


                                             });


                                         }

                                     });


                                 });


                                 favorite.forEach(function (el, key) {




                                     el.addEventListener(event, function (ev) {

                                         ev.preventDefault();
                                         ev.stopPropagation();



                                         if (itemIndex === key && ![undefined].includes(results[itemIndex].id)) {
                                             console.log()

                                             utilities.getFavoriteMovies(results[itemIndex].id,xhr,el,ev,key,utilities);

                                         }


                                     });


                                     return false;
                                 });



                                 rating.forEach(function (rating, index) {

                                     rating.addEventListener(event, function (ev) {
                                        // ev.preventDefault();

                                         if (index === itemIndex) {


                                                 ratingContent.item(itemIndex).addEventListener(event, function (ev) {

                                                     if (ev.type === "mouseleave") {
                                                         ratingContent.item(itemIndex).style.display = "none";
                                                         return false;
                                                     }
                                                     if (ev.type === "mouseenter") {


                                                         movieId=results[itemIndex].id;
                                                         indexes=itemIndex;
                                                         ratingContent.item(itemIndex).style.display = "block";
                                                         utilities.getRating(xhr,movieId,index,utilities);
                                                         return false;
                                                     }



                                                 });










                                             if (ev.type === "mouseleave") {
                                                 ratingContent.item(itemIndex).style.display = "none";

                                                 return false;
                                             }

                                             if (ev.type === "mouseenter") {


                                                 ratingContent.item(itemIndex).style.display = "block";
                                                 return false;
                                             }



                                             ev.stopPropagation();
                                             ev.stopImmediatePropagation();
                                         }
                                     })
                                 })



                             });


                             return false;
                         });








                         stars.forEach(function (el, key, parent) {

                             el.addEventListener('click',function (ev) {
                                 // ev.stopImmediatePropagation();
                                 // ev.preventDefault();
                                 //



                                 utilities.rating(xhr,el.getAttribute('title'),movieId,indexes,utilities);



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

                 }else {}

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

                      <div id="video_player" >

                          <div className="close_player">  </div>
                          <div id="movie_title_iframe"> </div>
                          <iframe  title="IPlayer" className="video_1" width="80%" height="420px"
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
                           <span id="prev" onTouchStart={this.updatePrev} onClick={this.updatePrev} className="nav"> </span>
                           <span id="next" onClick={this.updateNext} onTouchStart={this.updateNext} className="nav"> </span>

                       </div>

                 </div>

                );





    }



}



export  default View;