<?php
header("Content-type: text/css; charset: UTF-8");
?>
* {
box-sizing: border-box;
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
border: 1px solid crimson;
}

h1{
grid-column: 1 / span 2;
grid-row: 2;
color: crimson;
border: 1px solid gold;
}

main{
grid-column: 1 / span 3;
grid-row: 3;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-gap:2em;
}

.form-section{
grid-column: 1 / span 2;
grid-row: 1;
color: black;
border: 1px solid gold;
}

form *{
width: 100%
}

.news-items{
grid-column: 3 / span 1;
grid-row: 1;
color: black;
border: 1px solid gold;
}

