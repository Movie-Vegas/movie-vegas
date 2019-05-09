import React from "react"
class Mest extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            header: "Header from props...",
            content: "Content from props..."
        }
    }
    render() {
        return (
            <div></div>
        );
    }
}
Mest.defaultProps = {
    headerProp: "Header from props...",
    contentProp:"Content from props..."
}
class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.headerProp}</h1>
            </div>
        );
    }
}
class Content extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.contentProp}</h2>
            </div>
        );
    }
}


export  default Mest;