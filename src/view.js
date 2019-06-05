import React from "react";
import ReactDOM from "react-dom";


class View  extends React.Component{




    /**
     * model for Movie-vegas
     * declare class variables/attributes as private (local var and Accessor as a object literal);
     * @type {Object}
     */



    utility={



        makeFavoriteThroughGetFavorite:function (resultsId,xhr,element,event,index) {
            event.stopImmediatePropagation();
            event.preventDefault();
            event.stopPropagation();
            let data = "{}";



                xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function () {

                    //{"page":1,"results":[],"total_pages":0,"total_results":0}
                    if (this.readyState === this.DONE) {

                        if (["mouseenter", "click", "mouseleave"].includes(event.type)) {

                            let  results= JSON.parse(this.responseText).results;
                            let isResults = true;
                            const top=20;
                                 let item=document.querySelectorAll('.item');
                                 let numberOfFavorite= document.querySelector("#number_of_favorite");
                                 item.forEach(function (val,key,parent) {


                                          if(key===index) {

                                             if(!["","",undefined].includes(results)){

                                                 results.forEach(function (val) {

                                                     if (resultsId === val.id) {


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
                                                                               "media_id": resultsId,
                                                                               "favorite": false
                                                                           });
                                                                           xhr = new XMLHttpRequest();

                                                                           xhr.addEventListener("readystatechange", function () {
                                                                               if (xhr.readyState === xhr.DONE) {




                                                                                       // val.style.visibility='hidden';
                                                                                 //  var link = document.getElementById('favorite-menu');
                                                                                  //link.click();
                                                                                  // var ul = document.querySelector('ul');

                                                                                   if(key===index){
                                                                                       numberOfFavorite.textContent=""+Number(numberOfFavorite.textContent)-1;
                                                                                       while (val.firstChild){
                                                                                           val.firstChild.remove();
                                                                                           val.style.opacity=0;
                                                                                           val.style.display="none";


                                                                                       }
                                                                                       return false;
                                                                                   }




                                                                               }
                                                                           });

                                                                           xhr.open("POST", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite?session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12");
                                                                           xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

                                                                           xhr.send(data);




                                                                       }




                                                                 }






                                                             }



                                                         if (event.type === "mouseleave") {

                                                            console.log("leave")

                                                             element.innerHTML = '&heartsuit;';
                                                             element.title = "Favorite";

                                                             return false;



                                                         }

                                                         });
                                                     }





                                                 })
                                             }

                                              if (event.type === "click" && isResults)  {

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



                                             }
                                          }





                                            /*

                                             if (isResults) {

                                                 if(event.type==="click"){
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
                                             }

                                             }*/



                                    return false;

                               })
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




                xhr.open("GET", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite/movies?page=1&sort_by=created_at.asc&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12");
                xhr.responseType="text";
                xhr.send(data);

                return false;



        },
        watchTrailer:function () {

        }
        ,
        rate:function () {

        }

        ,
        removeRating:function () {

        }
        ,
        addToList:function () {

        }

    };

    makeFavorite(results, xhr, x) {

    }
    renderMovieDetails(xhr,numberPages,data,account) {

         if(xhr!==undefined){
             let utilities=this.utility;
             xhr.addEventListener("readystatechange",function () {




                 if (this.readyState === this.DONE) {

                     let resText=this.responseText;


                     //throw an exception
                     let remove=document.querySelectorAll('table');
                         remove.forEach(function (value) {
                             value.remove();

                         });




                     if(["", " "].includes(resText)){



                         alert("Hmm. We’re having trouble finding that Query.\n" +
                             "\n" +
                             "We can’t connect to the server at " + navigator.appName +
                             "\n" +
                             "If that address is correct, here are three other things you can try:\n" +
                             "\n" +
                             "    Try again later.\n" +
                             "    Check your network connection.\n" +
                             "    If you are connected but behind a firewall," + navigator.appName +
                             " check that " + navigator.appName + "has permission to access the Web.");




                     }else {



                         let response=JSON.parse(resText);
                           //throw an exception
                         if(response.errors){

                             let remove=document.querySelectorAll('table');

                             for (let x in remove[0]){
                                 remove.item(Number(x)).remove();
                             }




                            let noResultException=document.querySelectorAll('#item');

                             noResultException[0].innerHTML = "<table class='item'><tbody><tr><td >" +
                                 "<p id='search_result'>Your search yield no results check your input and spellings and try again</p></td></tr> </tbody></table>"
                              }


                         if(numberPages <= response.total_pages){

                             //empty table
                             let remove=document.querySelectorAll('table');
                             for (let x in remove[0]){
                                 remove.item(Number(x)).remove();
                             }

                         }


                     let stop = 0;
                     let time = setInterval(function () {
                         stop += stop + 1;

                         if(response.total_results===0) {

                             //empty table
                        let remove=document.querySelectorAll('table');
                             for (let x in remove[0]){
                                 remove.item(Number(x)).remove();
                             }

                             //throw an exception
                           /*  let noResultException=document.querySelectorAll('.req_error');
                             noResultException[0].innerHTML = "<table class='req_error'><tr><td>" +
                                 "<p id='search_result'>Your search yield no results check your input and spellings and try again " +
                                 " </p> </td> </tr></table>"*/



                             clearInterval(time);

                             return false;



                         }else {

                             let result = response.results;
                             let favorite=document.querySelectorAll(".favorite");

                             for (let x in result) {

                                 if (stop === 1 && result.hasOwnProperty(x)) {


                                     let items=document.getElementById('item');
                                     let img = "http://image.tmdb.org/t/p/w185/" + result[x].poster_path;

                                      items.innerHTML +=
                                          `
                                      <table class="item">
                                      <tbody><tr><td ><img  style='float:left; width: 15%' src="${img}" alt=""/>
                                      <div id='movie_title'><div id='vote_average'><div>${result[x].vote_average}</div></div>
                                      <span class='movie_title'> ${result[x].original_title}<span class='release_date'><span class="release">Release Date</span><span>${result[x].release_date}</span> </span></span></div> 
                                      <div id='overview'>${result[x].overview.substr(0, 720)}</div> 
                                      <div id='emotional'> <div class="rating" title="Rating"><span class="rate">&star;</span></div>
                                      <fieldset class="rating_content">
                                      
                                      
                                     <input type="radio" id="star5${x}" name="rating" value="5" />
                                     <label class = "full" for="star5${x}" title="Awesome - 5 stars"> </label>
                                     <input type="radio" id="star4half${x}" name="rating" value="4 and a half" />
                                     <label class="half" for="star4half${x}" title="Pretty good - 4.5 stars"> </label>
                                     <input type="radio" id="star4${x}" name="rating" value="4" />
                                     <label class = "full" for="star4${x}" title="Pretty good - 4 stars"> </label>
                                     <input type="radio" id="star3half${x}" name="rating" value="3 and a half" />
                                     <label class="half" for="star3half${x}" title="3.5 stars"> </label>
                                     <input type="radio" id="star3${x}" name="rating" value="3" />
                                     <label class = "full" for="star3${x}" title="3 stars"> </label>
                                     <input type="radio" id="star2half${x}" name="rating" value="2 and a half" />
                                     <label class="half" for="star2half${x}" title="2.5 stars"> </label>
                                     <input type="radio" id="star2${x}" name="rating" value="2" />
                                     <label class = "full" for="star2${x}" title=" 2 stars"> </label>
                                     <input type="radio" id="star1half${x}" name="rating" value="1 and a half" />
                                     <label class="half" for="star1half${x}" title="stars"> </label>
                                     <input type="radio" id="star1${x}" name="rating" value="1" />
                                     <label class = "full" for="star1${x}" title=" 1 star"> </label>
                                     <input type="radio" id="starhalf${x}" name="rating" value="half" />
                                     <label class="half" for="starhalf${x}" title="0.5 stars"> </label>
   

                                     </fieldset><span> </span>
                                      <div  class="favorite" title="Favorite"><span  class="favorite-text" > &heartsuit;<span></div> 
                                      <div class='feelings' title="Add to list">&#9016;</div>
                                      <div  class='feelings' title="Watch trailer">&#9783;</div> <span> </span>
                                      </div> </td> </tr><tbody>
                                      </table>`;





                                     //favorite
                                     ReactDOM.findDOMNode(document.getElementById('qty')).innerHTML = response.total_pages;
                                     let numberOfFavorite= document.querySelector("#number_of_favorite");
                                         numberOfFavorite.textContent=""+response.total_results;
                                     let ratingContent=document.getElementsByClassName("rating_content");
                                     let favorite=document.querySelectorAll(".favorite");
                                     let favoriteText=document.querySelectorAll(".favorite-text");
                                     let rating=document.getElementsByClassName("rating");
                                     let stars=document.getElementsByClassName("stars");
                                     let ratingWidget=document.querySelectorAll(".rating-widget")  ;
                                     let indexList=Array();



                                     ['click','touch','mouseenter','mouseleave'].forEach(function (event) {

                                         favorite.forEach(function (el,key,parent) {



                                             el.addEventListener(event,function (ev) {
                                                  ev.preventDefault();
                                                  ev.stopPropagation();
                                                  ev.stopImmediatePropagation();
                                                 utilities.makeFavoriteThroughGetFavorite(result[key].id,xhr,el,ev,key);




                                             });




                                         });
                                         return false;
                                     });

                                    /*
                                     for (let x in rating){
                                         rating.item(Number(x)).addEventListener(event,function (ev) {



                                             if(ev.type==="click"){

                                                 ratingContent.item(Number(x)).style.display="none";

                                             } if(ev.type==="mouseenter"){

                                                 ratingContent.item(Number(x)).style.display="inline";

                                             }

                                             ratingContent.item(Number(x)).addEventListener(event,function (event) {
                                                 event.preventDefault();
                                                 event.stopImmediatePropagation();
                                                 event.stopPropagation();




                                                 if(event.type==="mouseleave"){

                                                     ratingContent.item(Number(x)).style.display="none";

                                                 }

                                                 if(event.type==="mouseenter"){

                                                     for(let i=0;i<stars.length;i++){




                                                         ['mouseenter','mouseleave'].forEach(function (val) {


                                                             stars[i].addEventListener(val,function (event) {

                                                                 event.preventDefault();
                                                                 event.stopPropagation();
                                                                 event.stopImmediatePropagation();



                                                             });

                                                         })

                                                     }

                                                     ratingContent.item(Number(x)).style.display="inline";

                                                 }

                                             });

                                             this.addEventListener(event,function (event) {
                                                 event.preventDefault();
                                                 if(event.type==="mouseleave"){

                                                     // ratingContent.item(Number(x)).style.display="none";

                                                 }

                                             });

                                         })

                                     }
                                     */




                                     ReactDOM.findDOMNode(document.getElementById('total_pages_title')).innerHTML="Total pages";
                                     clearInterval(time);

                                 }


                             }
                               }











             }, 1000)
                     }





                 }else {

                     ReactDOM.findDOMNode(document.getElementById('total_pages_title')).innerHTML="loading..."

                 }

             });

              xhr.responseType = "text";
              xhr.send(data);
         }










        return  (
                  <div>


                      <div  className="favorite_box"><div id="favorite_detail"><span id="my_favorite">My Favorites</span><span id="number_of_like_Title">Movies <span id="number_of_favorite"> </span></span>
                      </div> </div>

                  <div id='scroll_list'>
                      <div id="item"> </div>

                  </div>

                      <div id="total_pages">
                          <div id="total_pages_title">Total Pages </div>
                          <div id="qty">

                          </div>

                      </div>

                 </div>

                );





    }



}



export  default View;