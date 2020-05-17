import  Post  from "@models/Post";
import * as $ from "jquery";
import "./styles/style.css";
import "./styles/less.less";
import logo from "./assets/webpack-logo"
import xml from "./assets/data.xml";

const post = new Post("Webpack ost",logo)

console.log('Post to string',post.toString())

$('pre').addClass('code').html(post.toString())

console.log(xml)