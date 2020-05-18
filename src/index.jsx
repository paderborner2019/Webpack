import  Post  from "@models/Post";
import * as $ from "jquery";
import "./styles/style.css";
import "./styles/less.less";
import  "./styles/style.scss"
import "./babel";
import logo from "./assets/webpack-logo"
import xml from "./assets/data.xml";
import React from "react";
import { render } from "react-dom";

const post = new Post("Webpack ost",logo)

console.log('Post to string',post.toString())

// $('pre').addClass('code').html(post.toString())

const App = () => ( 
    <div>

        <h1>Webpack cuerse</h1>
            <hr/>
    <div className="logo"></div>
    <hr/>
    <pre></pre>
    <hr/>
    <div className="box">
        <h2>less</h2>
    </div>

    <div className="card">
        <h2>SCSS</h2>
    </div>
    </div>
)

render(<App />, document.getElementById('app'))
