require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());


// ==========================
// Strona główna API
// ==========================

app.get("/", (req,res)=>{

    res.json({

        name:"kazzasyvAPI",

        status:"online",

        message:"API działa poprawnie"

    });

});


// ==========================
// Status API
// ==========================

app.get("/status",(req,res)=>{

    const start = Date.now();

    res.json({

        name:"kazzasyvAPI",

        status:"online",

        ping:(Date.now()-start)+"ms"

    });

});



// ==========================
// Sprawdzanie strony
// ==========================

app.get("/api/status/website", async (req,res)=>{

    const start = Date.now();

    try{

        const response = await axios.get(
            process.env.WEBSITE,
            {
                timeout:5000
            }
        );


        res.json({

            name:"Website",

            status:"online",

            ping:(Date.now()-start)+"ms",

            code:response.status

        });


    }catch(error){

        res.json({

            name:"Website",

            status:"offline",

            ping:(Date.now()-start)+"ms",

            code:0

        });

    }

});



// ==========================
// Ping API
// ==========================

app.get("/api/ping",(req,res)=>{

    res.json({

        alive:true

    });

});



// ==========================
// Status API samego siebie
// ==========================

app.get("/api/status/api", async (req,res)=>{

    const start = Date.now();

    try{

        await axios.get(
            "http://localhost:"+PORT+"/api/ping"
        );


        res.json({

            name:"Kazzasyv API",

            status:"online",

            ping:(Date.now()-start)+"ms",

            code:200

        });


    }catch(error){

        res.json({

            name:"Kazzasyv API",

            status:"offline",

            ping:(Date.now()-start)+"ms",

            code:0

        });

    }

});



// ==========================
// Hosting
// ==========================

app.get("/api/status/hosting", async (req,res)=>{

    const start = Date.now();


    try{

        await axios.get(process.env.WEBSITE);


        res.json({

            name:"Hosting",

            status:"online",

            ping:(Date.now()-start)+"ms",

            code:200

        });


    }catch(error){

        res.json({

            name:"Hosting",

            status:"offline",

            ping:(Date.now()-start)+"ms",

            code:0

        });

    }

});




// ==========================
// 🤖 kazzasyvAI Generator
// ==========================

app.get("/api/ai/generate",(req,res)=>{


    let prompt = req.query.prompt;


    if(!prompt){

        return res.json({

            error:"Brak opisu strony"

        });

    }


    prompt = prompt.replace(/[<>]/g,"");



    let color="#2196ff";


    if(prompt.toLowerCase().includes("czerw")){

        color="#ff3333";

    }


    if(prompt.toLowerCase().includes("zielon")){

        color="#00ff88";

    }



    const html = `

<!DOCTYPE html>

<html lang="pl">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">


<title>kazzasyvAI Website</title>


<style>

body{

background:#050b18;

color:white;

font-family:Arial,sans-serif;

text-align:center;

padding:50px;

}


.container{

background:#0d1628;

border:2px solid ${color};

border-radius:25px;

padding:40px;

}


h1{

color:${color};

}


button{

background:${color};

color:white;

border:0;

padding:15px 30px;

border-radius:30px;

}


footer{

margin-top:50px;

color:#999;

}


</style>


</head>


<body>


<div class="container">


<h1>${prompt}</h1>


<p>

Strona wygenerowana automatycznie przez kazzasyvAI 🤖

</p>


<button>

kazzasyvAI

</button>


</div>



<footer>


© 2026 Created with kazzasyvAI

<br>

Powered by kazzasyvAPI


</footer>



</body>

</html>

`;



res.json({

status:"success",

creator:"kazzasyvAI",

description:prompt,

html:html

});


});




// ==========================
// Start serwera
// ==========================

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{

console.log(
"🚀 kazzasyvAPI działa na porcie " + PORT
);

});