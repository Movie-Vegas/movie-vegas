import React from "react";
import  or from  "./or.jpg";
import ReactDOM from "react-dom";



class View  extends React.Component{


    /**
     * model for Movie-vegas
     * declare class variables/attributes as private (local var and Accessor as a object literal);
     * @type {Object}
     */




    renderMovieDetails(xhr,page,data) {
         if(xhr!==undefined){




             xhr.addEventListener("readystatechange",function () {




                 if (this.readyState === this.DONE) {

                     let obj=this.responseText;


                     if(page <= JSON.parse(obj).total_pages){
                         ReactDOM.findDOMNode( document.getElementById('item')).
                         querySelectorAll('table').forEach(function (val) {
                             val.remove();

                         });

                     }


                     if(["", " "].includes(obj)){




                         alert("Hmm. We’re having trouble finding that site.\n" +
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

                                 if (stop === 1) {
                                     ReactDOM.findDOMNode( document.getElementById('req_error')).
                                     querySelectorAll('table').forEach(function (val) {
                                         val.remove();

                                     });
                                  ;
                                     let img = "http://image.tmdb.org/t/p/w185/" + result[x].poster_path;
                                     ReactDOM.findDOMNode(document.getElementById('item')).innerHTML += `<table id='items'>
                                     <tbody><tr><tr><th ><img  style='float:left; width: 15%' src="${img}"/>
                                     <div id='movie_title'><span id='vote_average'>${result[x].vote_average}</span>
                                      <span class='movie_title'> ${result[x].original_title}</span></div></span> 
                                      <div id='overview'>${result[x].overview.substr(0, 720)}<div> </div></div> 
                                      <div id='emotional'> <span class='feelings'>&star;</span><span>Rating</span>
                                      <span class='feelings'>&heartsuit;</span> <span>  Favorite</span><span class='feelings'>&#9016;</span>
                                      <span>  Add to list</span><span class='feelings'>&#9003;</span> <span>  Remove</span>
                                      </div> </th> </tr> <tr> <td width='400'> </td> </tr> </tr></tbody></table>`;
                                     ReactDOM.findDOMNode(document.getElementById('qty')).innerHTML = JSON.parse(obj).total_pages;


                                     ReactDOM.findDOMNode(document.getElementById('total_pages_title')).innerHTML="Total pages";
                                     clearInterval(time);

                                 }


                             }
                               }











             }, 1000)
                     }





                 }else {

                     ReactDOM.findDOMNode(document.getElementById('total_pages_title')).innerHTML="loading.."

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