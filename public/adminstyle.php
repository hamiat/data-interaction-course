<?php
header("Content-type: text/css; charset: UTF-8");
?>
* {
box-sizing: border-box;
text-decoration: none;
}


body{
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-gap:2em;
}

header{
grid-column: 3 / span 1;
grid-row: 1;
display: flex;
justify-content: center;
font-family: calibri;

}
nav a {
border: 2px ridge palegreen;
background-color: #FCFCFC;
}

nav a:hover{
background-color: palegreen;

}

main{
grid-column: 1 / span 3;
grid-row: 3;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-gap: 1em;

}

h1{
grid-column: 2 / span 1;
grid-row: 2;
font-family: monospace;
}

p{
font-family: calibri;
font-size: 1em;
line-height: 1.5em;
}

.form-section {
grid-column: 1 / span 2;
grid-row: 1;
padding: 0 20px;
}

.news-item{
grid-column: 3 / span 1;
grid-row: 1;

}

form *{
width: 100%

}
form{
gap: 10px;
}

label{
font-size: 1.4em;
font-family: monospace;
margin-left: 0.2em;

}

.title-input {
height: 2em;
font-size: 1em;
border: 1.3px solid darkslategray;
border-radius: 5px;

}

.content-input {
height: 14em;
font-size: 1.2em;
border: 1.3px solid darkslategray;
border-radius: 5px;
font-family: calibri;

}


.seeMore {
padding: 0 18px;
display: none;
overflow: hidden;
background-color: #f1f1f1;


}

.collapsible {
text-decoration: underline;
text-decoration-style: dotted;
cursor: pointer;

}

.collapsible:hover {
color: blue;
font-weight: 400;

}

#first-title{
font-size: 1.2em;
font-family: monospace;
font-weight: 800;
}

#second-title{
font-size: 1.2em;
font-family: monospace;
}
