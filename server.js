const cors = require("cors");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const app = express();

app.use(cors());
app.use(express.json());


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



    let theme = "#2196ff";


    if(prompt.toLowerCase().includes("czerw")){

        theme="#ff3333";

    }


    if(prompt.toLowerCase().includes("zielon")){

        theme="#00ff88";

    }


    if(prompt.toLowerCase().includes("fiolet")){

        theme="#a855f7";

    }



    const html = `

<!DOCTYPE html>

<html lang="pl">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">


<title>kazzasyvAI</title>


<style>

body{

background:#050b18;

color:white;

font-family:Arial,sans-serif;

text-align:center;

padding:50px;

}



.box{

background:#0d1628;

border:2px solid ${theme};

border-radius:25px;

padding:40px;

max-width:700px;

margin:auto;

}



h1{

color:${theme};

}



button{

background:${theme};

color:white;

border:none;

padding:15px 30px;

border-radius:30px;

font-size:16px;

}



footer{

margin-top:50px;

color:#999;

}



</style>


</head>


<body>


<div class="box">


<h1>${prompt}</h1>


<p>

Ta strona została wygenerowana przez kazzasyvAI 🤖

</p>


<button>

Created by kazzasyvAI

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
// 🤖 kazzasyvAI ZIP Website Generator
// ==========================

app.get("/api/ai/create",(req,res)=>{


const prompt = req.query.prompt;


if(!prompt){

return res.json({
error:"Brak opisu strony"
});

}



const folder = path.join(
__dirname,
"kazzasyvAI-project"
);



if(fs.existsSync(folder)){

fs.rmSync(folder,{
recursive:true,
force:true
});

}


fs.mkdirSync(folder);



const html = `
<!DOCTYPE html>

<html lang="pl">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${prompt}</title>

<link rel="stylesheet" href="style.css">

</head>


<body>


<div class="container">

<h1>${prompt}</h1>

<p>
Strona wygenerowana przez kazzasyvAI 🤖
</p>


</div>


<footer>

© 2026 kazzasyvAI

<br>

Powered by kazzasyvAPI

</footer>


<script src="script.js"></script>


</body>

</html>
`;




const css = `

body{

background:#050b18;

color:white;

font-family:Arial;

text-align:center;

padding:50px;

}


.container{

background:#0d1628;

border:2px solid #2196ff;

padding:40px;

border-radius:25px;

}


footer{

margin-top:50px;

color:#2196ff;

}

`;




const js = `

console.log("Generated by kazzasyvAI 🚀");

`;




fs.writeFileSync(
path.join(folder,"index.html"),
html
);


fs.writeFileSync(
path.join(folder,"style.css"),
css
);


fs.writeFileSync(
path.join(folder,"script.js"),
js
);



const zipPath = path.join(
__dirname,
"kazzasyvAI-project.zip"
);



const output = fs.createWriteStream(zipPath);


const archive = archiver("zip");



output.on("close",()=>{


res.download(
zipPath,
"kazzasyvAI-project.zip"
);


});



archive.pipe(output);


archive.directory(
folder,
false
);


archive.finalize();



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