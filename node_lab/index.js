const app = require("express")()
const fs = require("fs")
var name = 1

const port = 3000
app.get("/", (req, res)=>{
    console.log(req);
    })
    res.send("Hello");
}

)



app.listen(port)
