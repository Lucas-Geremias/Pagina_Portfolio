const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    const about = {
        avatar_url: "/foto.jpg",
        name:"Lucas Santos",
        role:"Aluno - Rocketseat",
        description: `Programador full-stack, focado em trabalhar com as melhores tecnologias. olhe o meu repositorio no <a
        href="https://github.com/lucas-geremias" target="_blanck">GitHub`,
        links: [
            { name: "Github", url : "https://github.com/lucas-geremias"},
            { name: "Linkedin", url : "#"},
            { name: "Instagram", url : "#"}
        ]

    }
    return res.render("about", { about } )
})

server.get('/', function(req, res){
    return res.render("about")
})
server.get('/portfolio', function(req, res){
    return res.render("portfolio", {items: videos})
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        return  video.id == id

    })

    if(!video){
        return res.send("Video not found!")
    }

    return res.render("video",{ item: video })
})

server.listen(5000, function(){
    console.log("server is running")
})