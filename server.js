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
// Start serwera
// ==========================

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{

    console.log(
        "🚀 kazzasyvAPI działa na porcie " + PORT
    );

});