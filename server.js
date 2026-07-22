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
// Szybki status API
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
// Sprawdzanie API samego siebie
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
// Ping dla samego API
// ==========================

app.get("/api/ping",(req,res)=>{

    res.json({

        alive:true

    });

});



// ==========================
// Hosting
// ==========================

app.get("/api/status/hosting", async (req,res)=>{

    const start = Date.now();


    try{

        await axios.get(
            process.env.WEBSITE
        );


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
// kazzasyvAI Generator
// ==========================

app.get("/api/ai/generate",(req,res)=>{

    const prompt = req.query.prompt;


    if(!prompt){

        return res.json({

            error:"Brak opisu strony"

        });

    }



    const html = `
<!DOCTYPE html>

<html lang="pl">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>kazzasyvAI Generator</title>


<style>

body{

background:#050b18;

color:white;

font-family:Poppins,Arial,sans-serif;

text-align:center;

padding:50px;

}


.card{

background:#0d1628;

padding:30px;

border-radius:22px;

border:1px solid #2196ff;

}


footer{

margin-top:50px;

color:#2196ff;

}


</style>


</head>


<body>


<div class="card">


<h1>${prompt}</h1>


<p>
Ta strona została wygenerowana przez kazzasyvAI 🤖
</p>


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