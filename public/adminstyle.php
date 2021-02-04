<?php
header("Content-type: text/css; charset: UTF-8");
?>
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

main{
grid-column: 1 / span 3;
grid-row: 2;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-gap: 1em;
border: 1px solid crimson;
}
h1{
grid-column: 1 / span 3;
grid-row: 1;
}
.add-news{
grid-column: 1 / span 2;
grid-row: 2;

}

.news-item{
grid-column: 3 / span 1;
grid-row: 2;
border: 1px solid gold;
}
.add-news form{
display: grid;
grid-template-columns: 1fr;
grid-template-rows: 1fr 3fr 1fr;
grid-gap: 1em;

}




