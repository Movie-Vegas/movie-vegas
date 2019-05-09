import React from "react";
import  or from  "./or.jpg";
import {breakStatement} from "@babel/types";



class View {


    /**
     * model for Movie-vegas
     * declare class variables/attributes as private (local var and Accessor as a object literal);
     * @type {Object}
     */






    renderMovieDetails(xhr, data) {
         if(xhr!==undefined){

             xhr.addEventListener("readystatechange",function () {
                 document.getElementById("item").innerHTML="";
                 if (this.readyState === this.DONE) {

                     let obj=this.responseText;
                     let stop = 0;
                     let time = setInterval(function () {
                         stop += stop + 1;
                     try {
                         let result=JSON.parse(obj).results;

                         for(let x in result){


                             console.log("New "+result[x].original_title)

                                 if (stop === 1) {

                                     let img="http://image.tmdb.org/t/p/w185/"+result[x].poster_path
                                     document.getElementById("item").innerHTML += `<table id='items'><tbody><tr><tr><th >
<img  style='float:left; width: 15%' src="${img}"/><div id='movie_title'><span id='rating_percentage'> 86</span> <span class='movie_title'> ${result[x].original_title}</span>
</div></span> <div id='overview'>${result[x].overview.substr(0,720)}<div> </div></div> <div id='emotional'> <span class='feelings'>&star;</span><span>  Rating</span>+
 <span class='feelings'>&heartsuit;</span> <span>  Favorite</span><span class='feelings'>&#9016;</span>+
 <span>  Add to list</span><span class='feelings'>&#9003;</span> <span>  Remove</span> +
</div> </th> </tr> <tr> <td width='400'> </td> </tr> </tr></tbody></table>`;



                                     clearInterval(time);
                                 }


                             }




                     }catch (e) {
                         alert("Hmm. We’re having trouble finding that site.\n" +
                             "\n" +
                             "We can’t connect to the server at " +navigator.appName+
                             "\n" +
                             "If that address is correct, here are three other things you can try:\n" +
                             "\n" +
                             "    Try again later.\n" +
                             "    Check your network connection.\n" +
                             "    If you are connected but behind a firewall,"+navigator.appName+
                             " check that "+navigator.appName+"has permission to access the Web.")
                         clearInterval(time);

                     }


             }, 1000)

                 }

             });

              xhr.responseType = "text";
              xhr.send(data);
         }


        return (<div id='scroll_list'>
            <div id="item"> </div>
        </div>);


        /*
                      }

return document.getElementById("items").innerHTML=page;

        /*

        "<div id="re"> <div  id='scroll_list'> <table  id='items'> </table> </div>");
                                     </div>"*/


    }
}



export  default View;