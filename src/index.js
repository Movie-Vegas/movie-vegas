import Control from "./control";
import Model from "./model";
import View from "./view";
import movie_vegas from "./movie_vegas.css"
import React from "react";
import ReactDom from "react-dom"
import search_glass from "./search_glass.png";
import  Mest from "./test.js"



class Main extends React.Component{



    /**
     *
     * @type {Model}
     */


    constructor(){
        super();



    }


    componentWillMount() {
        this.model=new Model();
        this.view=new View();
        this.control=new Control(this.view,this.model);


    }



    componentDidMount(){


        let req=this.control;
        let searchButton=document.getElementById("search_glass");

        let searchInput=ReactDom.findDOMNode(this.refs.search_text_field);

        ["click","touch"].forEach(function (event) {
            searchButton.addEventListener(event,function (event) {






            })
        });


        let menuItems=document.getElementsByClassName("menu_list");
        ["click","touch"].forEach(function (event) {
            for (let x=0;x<menuItems.length;x++)

            menuItems[x].addEventListener(event,function (event) {
                alert(event.AT_TARGET)

            })
        })


    }


    render() {


        //let element = React.createElement("div",null,this.control.updateView());
        return  (<div><MenuBar/><Footer/>{<div ><div id="results" ref ="results">{this.control.updateView()}</div></div>}</div>)
       // return  (<div><MenuBar/><Footer/>{<div>{this.control.updateView()}</div>}</div>)

    }



}


class MenuBar extends React.Component{

    render() {
        return (<div>


            <div id="heading_background">
                <Menu/>
                <SearchBar/>
                <MenuItems/>


            </div>

        </div>);
    }

}
class SearchBar extends React.Component{


    constructor(props){
        super(props) ;
        this.state={
            searchData:""
        };
        this.model=new Model();
        this.view=new View();
        this.control=new Control(this.view,this.model);

        this.updateState=this.updateState.bind(this);
    }


    updateState(e) {
        let query="/search/movie?include_adult=false&page=1&query="+e.target.value +"&language=en-US";
        this.control.search("GET",query,{});
        this.control.updateView ();
        this.setState({searchData:e.target.value});
    }


    render() {
        return (<div id="search_box">
            <div className="search_box" placeholder="Search...">
                <input type="search"  ref="search_text_field" onChange={this.updateState} id="search_text_field"/>
                <img id='search_glass' ref='search_glass'  onClick={this.updateState}  src={search_glass} alt="search"/>
            </div>
        </div>);
    }

}
class Menu extends React.Component{

    render() {
        return (  <div id="menu">
                <span id="accents">=</span>
            </div>
        );
    }
}
class MenuItems extends React.Component{

    render() {
        return (<div id="menus_list">
            <span className="menu_list">Favorites</span>
            <span className="menu_list">Lists</span>
            <span className="menu_list">Watch Later</span>
            <span className="menu_list">Likes</span>
        </div>);
    }
}
class Footer extends React.Component{

    render() {
        return   (<footer id="footer"> Dan Technologies © Inc {new Date().getFullYear()} </footer>);
    }
}


 ReactDom.render(<Main/>,document.getElementById("root"));







