import React from "react";
import ReactDOM from "react-dom";


class View  extends React.Component{


    /**
     * model for Movie-vegas
     * declare class variables/attributes as private (local var and Accessor as a object literal);
     * @type {Object}
     */



    renderMovieDetails(xhr,page,data) {
        let  xDirection="",yDirection="",oldY=0,oldX=0;
         if(xhr!==undefined){




             xhr.addEventListener("readystatechange",function () {




                 if (this.readyState === this.DONE) {

                     let obj=this.responseText;





                     if(["", " "].includes(obj)){




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
                         if(page <= JSON.parse(obj).total_pages){
                             ReactDOM.findDOMNode( document.getElementById('item')).
                             querySelectorAll('table').forEach(function (val) {
                                 val.remove();

                             });

                         }


                     let stop = 0;
                     let time = setInterval(function () {
                         stop += stop + 1;

                         if(JSON.parse(obj).total_results===0) {


                             ReactDOM.findDOMNode( document.getElementById('item')).
                             querySelectorAll('table').forEach(function (val) {
                                 val.remove();

                             });


                             ReactDOM.findDOMNode(document.getElementById('req_error')).
                                 innerHTML = "<table class='req_error'><tr><td>" +
                                 "<p id='search_result'>Your search yield no results check your spellings and try again " +
                                 " </p> </td> </tr></table>"



                             clearInterval(time);

                             return false;



                         }else {


                             let result = JSON.parse(obj).results;
                             for (let x in result) {

                                 if (stop === 1 && result.hasOwnProperty(x)) {
                                     ReactDOM.findDOMNode( document.getElementById('req_error')).
                                     querySelectorAll('table').forEach(function (val) {
                                         val.remove();

                                     });

                                     let img = "http://image.tmdb.org/t/p/w185/" + result[x].poster_path;
                                     ReactDOM.findDOMNode(document.getElementById('item')).innerHTML += `<table id='items'>
                                     <tbody><tr><tr><th ><img  style='float:left; width: 15%' src="${img}"/>
                                     <div id='movie_title'><div id='vote_average'><div>${result[x].vote_average}</div></div>
                                      <span class='movie_title'> ${result[x].original_title}</span></div> 
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
    <label class="half" for="star3half${x}" title="Meh - 3.5 stars"> </label>
    <input type="radio" id="star3${x}" name="rating" value="3" />
    <label class = "full" for="star3${x}" title="Meh - 3 stars"> </label>
    <input type="radio" id="star2half${x}" name="rating" value="2 and a half" />
    <label class="half" for="star2half${x}" title="Kinda bad - 2.5 stars"> </label>
    <input type="radio" id="star2${x}" name="rating" value="2" />
    <label class = "full" for="star2${x}" title="Kinda bad - 2 stars"> </label>
    <input type="radio" id="star1half${x}" name="rating" value="1 and a half" />
    <label class="half" for="star1half${x}" title="Meh - 1.5 stars"> </label>
    <input type="radio" id="star1${x}" name="rating" value="1" />
    <label class = "full" for="star1${x}" title="Sucks big time - 1 star"> </label>
    <input type="radio" id="starhalf${x}" name="rating" value="half" />
    <label class="half" for="starhalf${x}" title="Sucks big time - 0.5 stars"> </label>

      </fieldset><span> </span>
                                      <div  class="favorite" title="Favorite"><span  class="favorite-text" > &heartsuit;<span></div> <div class='feelings' title="Add to list">&#9016;</div>
                                      <div  class='feelings' title="Remove">&#9003;</div> <span> </span>
                                      </div> </th> </tr> <tr> <td width='400'> </td> </tr> </tr></tbody></table>`;



                                     ReactDOM.findDOMNode(document.getElementById('qty')).innerHTML = JSON.parse(obj).total_pages;
                                     let ratingContent=document.getElementsByClassName("rating_content");
                                     let favorite=document.querySelectorAll(".favorite");
                                     let favoriteText=document.querySelectorAll(".favorite-text");
                                     let rating=document.getElementsByClassName("rating");
                                     let stars=document.getElementsByClassName("stars");
                                     let ratingWidget=document.querySelectorAll(".rating-widget")  ;
                                     let indexList=Array();



                                         ['click','touch',"mouseleave","mouseenter"].forEach(function (event) {
                                             for (let x in rating){
                                                 /*
                                                 favorite.item(Number(x)).addEventListener(event,function (event) {
                                                     event.stopImmediatePropagation();
                                                     event.preventDefault();
                                                     event.stopPropagation();

                                                       if(this.title==="Favorite" && ['click','touch'].includes(event.type)){
                                                           favoriteText.item(Number(x)).innerHTML='&times;';
                                                           this.title="Remove Favorite"
                                                           return false;
                                                       }else {

                                                           if(this.title==="Remove Favorite" && ['click','touch'].includes(event.type)) {
                                                               favoriteText.item(Number(x)).innerHTML='&heartsuit;';
                                                               this.title="Favorite"

                                                           }
                                                           return false;

                                                       }





                                                 });*/
                                                 rating.item(Number(x)).addEventListener(event,function () {

                                               //  ratingContent.item(Number(x)).style.display="inline";



                                             ratingContent.item(Number(x)).addEventListener(event,function (event) {
                                                 event.preventDefault();
                                                 event.stopImmediatePropagation();
                                                 event.stopPropagation();






                                                 if(event.type==="mouseleave"){


                                                 //    ratingContent.item(Number(x)).style.display="none";

                                                 }

                                                 if(event.type==="mouseenter"){


                                                     let dataList=new Set(indexList);
                                                     for(let i=0;i<stars.length;i++){




                                                    ['mouseenter','mouseleave'].forEach(function (val) {


                                                    stars[i].addEventListener(val,function (event) {

                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        event.stopImmediatePropagation();



                                                    });

                                                     })

                                                     }

                                                    // ratingContent.item(Number(x)).style.display="inline";

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
                                         });




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


        return (<div id='scroll_list'>
            <div id="item" ref="item"><div id="req_error"> </div><div id="total_pages"><div id="total_pages_title">Total Pages </div><div id="qty">

            </div> </div> </div>
        </div>);




    }
}



export  default View;