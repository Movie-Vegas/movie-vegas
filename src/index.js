import Control from "./control";
import Model from "./model";
import View from "./view";
import icon from './icon.GIF';
import movie_vegas from "./movie_vegas.css"
import React from "react";
import ReactDom from "react-dom"
import search_glass from "./search_glass.png";




class Main extends React.Component{



    /**
     *
     * @type {Model}
     */


    componentWillMount() {
        this.model=new Model();
        this.view=new View();
        this.control=new Control(this.view,this.model);


    }



    render() {


        //let element = React.createElement("div",null,this.control.updateView());

        return  (<div>    <MenuBar/>{<div ><div id="results" ref ="results">{this.control.updateView()}</div></div>}<Footer/></div>)
       // return  (<div><MenuBar/><Footer/>{<div>{this.control.updateView()}</div>}</div>)

    }



}


class MenuBar extends React.Component{

    render() {
        return (<div>


            <div id="heading_background">
                <Menu/>
               <span id="company_name">MOVIE<span className="logo"> </span>VEGAS</span> <MenuItems/><SearchBar/>



            </div>

        </div>);
    }

}
class SearchBar extends React.Component{


    constructor(){
        super() ;
        this.state={
            query:1,
            value:'',
            count:1
        };
        this.model=new Model();
        this.view=new View();
        this.control=new Control(this.view,this.model);
        this.updateNext=this.updateNext.bind(this);
        this.updatePrev= this.updatePrev.bind(this);
        this.updateState=this.updateState.bind(this);






    }


    updateState(event) {


        if(event.target.value !==undefined){
            this.state.value=event.target.value;

        }
        let query="/search/movie?include_adult=false&page=1&query="+this.state.value+"&language=en-US";
        let key="a8ac0ce418f28d6ec56424ebad76ed12";
        this.control.setXHRequest("GET",query,key,false);
        this.control.updateView ();
        if(event.target.value !==undefined){

            this.setState({searchData:event.target.value});
        }

    }

    updateNext() {

        let query="/search/movie?include_adult=false&page="+this.state.count+"&query="+this.state.query+"&language=en-US";
        this.control.setXHRequest("GET",query,"a8ac0ce418f28d6ec56424ebad76ed12",false);
        this.control.updateView ();
        if(this.props.query  !==undefined){
            this.props.count++;
            this.control.setCounter(this.state.count);

            console.log(this.state.count);

        }



    }


    updatePrev() {

        let query="/search/movie?include_adult=false&page="+this.state.count+"&query="+this.state.query+"&language=en-US";
        this.control.setXHRequest("GET",query,"a8ac0ce418f28d6ec56424ebad76ed12",false);
        this.control.updateView ();

        if(this.props.query !==undefined && this.props.count >1){

            this.props.count--;
            console.log(this.props.count);
            this.control.setCounter(this.props.count);
            this.setState({count:this.state.count});
        }



    }



    render() {
        return (<div id="search_box">
            <div className="search_box" placeholder="Search...">
                <input type="search"  ref="search_text_field" placeholder="Search.." onChange={this.updateState} id="search_text_field"/>
                <span id="prev" onTouchStart={this.updatePrev} onClick={this.updatePrev} className="nav"> </span>
                <span id="next" onClick={this.updateNext} onTouchStart={this.updateNext} className="nav"> </span> <span id='search_glass'  onClick={this.updateState} onTouchStart={this.updateState} ><span  className="search-glass"> </span></span>
            </div>
        </div>);
    }

}
class Menu extends React.Component{

    render() {
        return (  <div id="menu">
                <span id="accents"> </span>
               </div>
        );
    }
}

class MenuItems extends React.Component{




    constructor(){
        super();

        this.state={
            account:""
        };
        this.model=new Model();
        this.view=new View();
        this.control=new Control(this.view,this.model);
        this.menuList=this.menuList.bind(this);
        this.favorites=this.favorites.bind(this);
        this.lists=this.lists.bind(this);
        this.watchLater=this.watchLater.bind(this);
        this.likes=this.likes.bind(this);
        this.accountRequest=this.accountRequest.bind(this);


    }
    componentDidMount() {

        this.accountRequest();
    }

    accountRequest(){
        let control=this.control;
        let model=control.model.services;
        let key="a8ac0ce418f28d6ec56424ebad76ed12&";
        let session_id="968092a83b4016a49c3ddde1cc030d149fc6ba0b";
        let favorites=document.querySelector("#favorite-menu");


        control.setXHRequest("GET", "/account?session_id="+session_id ,key,false);
        control.setIsXhrInProgress(true);

        let xhr=model.getXHR();
        let data = "{}";
        let state=this.state;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE && this.responseText !=null) {

                control.setAccount(this.responseText);
                state.account=this.responseText;
                favorites.click();





            }
        });

        xhr.responseType="text";
        xhr.send(data);






    }

    menuList(event){

        let menuList=event.target;
        let borderBottom="border-bottom: 6px solid  crimson";

              Array.from(document.getElementsByClassName('menu_list')).forEach(function (value, index, array) {
                  value.style.cssText="background: none; border-bottom:none;";

              }) ;


             if( menuList.textContent==="Favorites"){
                 menuList.style.cssText=borderBottom;
                 this.favorites()



             }else if( menuList.textContent==="Lists"){
                 menuList.style.cssText=borderBottom;


             }else if( menuList.textContent==="WatchLater"){
                  menuList.style.cssText=borderBottom;


             }else if( menuList.textContent==="Likes"){
                 menuList.style.cssText=borderBottom;


             }




    }
    likes(event){

    }
    favorites() {
        let data = "{}";
        let control=this.control;
        let account="/account/"+JSON.parse(this.state.account).id+"/";
        let session_id="968092a83b4016a49c3ddde1cc030d149fc6ba0b";
        let apiKey="a8ac0ce418f28d6ec56424ebad76ed12";

        control.setXHRequest("GET", account+"favorite/movies?page=1&sort_by=created_at.asc&language=en-US&session_id="+session_id,apiKey,false);
        control.updateView();


    }


    watchLater(event){

    }
    lists(event){

    }


    render() {
        return (< div   id="menus_list" onMouseEnter={this.accountRequest}>
            <span id="favorite-menu" onTouchStart={this.menuList}  onClick={this.menuList} className="menu_list">Favorites</span>
            <span className="menu_list"  onTouchStart={this.menuList} onClick={this.menuList}>Lists</span>
            <span  className="menu_list" onTouchStart={this.menuList} onClick={this.menuList}>WatchLater</span>
            <span className="menu_list"  onTouchStart={this.menuList} onClick={this.menuList}>Likes</span>
        </div>);
    }



}
class Footer extends React.Component{

    render() {
        return   (<footer id="footer"> Dan Technologies © Inc {new Date().getFullYear()} </footer>);
    }
}


 ReactDom.render(<Main/>,document.getElementById("root"));







