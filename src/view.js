import React from "react";
import movie_vegas from  "./movie_vegas.css"
import search_glass from "./search_glass.png"

class View {
    
     constructor( rating, likes, goodMovie, badMovie, result, favourites, movieList, watchLater){






         return(

      <form encType="">


     <div>

         <div id="heading_background">
             <div id="search_box">
            <div className="search_box"  placeholder="Search...">
            <input type="text" id="search_text_field"/>
            <img id='search_glass' src={search_glass} alt="search"/>
                 </div>
             </div >
             <div id="menus">


             <span className="header">Ratings & Reviews</span>
             <span className="header">Favorites</span>
             <span className="header">Lists</span>
             <span className="header">Watch Later</span>
             <span className="header">Likes</span>
             <span className="header">Good Movies</span>
             <span className="header">Bad Movies</span>
             </div>

             </div>
     </div>

    <table >




        </table>
     <div id='scroll_list'>
         <table>

         </table>
     </div>

 </form>
               )
     }


    
}

export  default View;