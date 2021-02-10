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
grid-gap:1em;
}

header{
grid-column: 1 / span 3;
grid-row: 1;
display: flex;
justify-content: center;
border: 2px ridge slategrey;
font-family: calibri;

}

button{
border-style: ridge;
border-color: palegreen;

}
button:hover {
background-color: palegreen;
}

ul{
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
list-style: none;
padding: 0;


}

ul li {
padding: 1em 5em ;
}

.testBtn, .contactBtn, .homeBtn {
text-decoration: underline;
text-decoration-style: dotted;
cursor: pointer;
color: #222;

}

.aboutBtn:hover {
color: blue;
font-weight: 500;

}

h1{
grid-column: 2 / span 1;
grid-row: 2;
color: darkslategray;
text-align: center;
font-family: calibri;
font-size: 2.7em;
}

main{
grid-column: 1 / span 3;
grid-row: 3;
display: grid;
grid-template-columns:  repeat(9, 1fr);

}


.recentNews{
grid-column: 3 / span 3;
grid-row: 1;


}

.allNews{
grid-column: 7 / span 2;
grid-row: 1;

}

p{
 font-family: calibri;;
font-size: 1.1em;
line-height: 1.5em;
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
padding: 0 5px;
color: #222;

}

.collapsible:hover {
color: blue;
font-weight: 500;

}


.posted-title {
padding: 0 5px;
font-family: monospace;
font-weight: 400;
font-size: 1.2em;
}

.mostRecentNews{
padding: 0 5px;
font-family: monospace;
font-weight: 400;
font-size: 1.2em;
background-color: red;
}

#news-date{
padding: 0 5px ;
font-size: 0.7em;
font-family: monospace;

}

.tester {
background-color: green;
}

