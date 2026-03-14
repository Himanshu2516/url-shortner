const express = require('express');

const path = require('path'); //built in module to work with file and directory paths. We will use it to serve static files like css and js files.
const URL = require('./models/url');
const { connectToMongoDB } = require('./connect');  
const staticRouter = require('./routes/staticRouter');
const urlRoutes = require('./routes/url');
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');
const { checkForAuthentication, restrictTo } = require('./middleware/auth');

const app = express();
const port = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log('Connected to MongoDB'));

app.set("view engine", "ejs"); //to set the view engine to ejs, so that we can render ejs templates. We will create a views folder and put our ejs templates there.
//ejs files means html files
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //to parse the incoming request body and make it available in req.body. We need this to get the url from the request body when we create a new short url.
app.use(cookieParser()); //to parse the cookies in the incoming request and make it available in req.cookies. We need this to get the session id from the cookies when we want to identify the user in subsequent requests.
app.use(checkForAuthentication);

app.use(express.static(path.join(__dirname, "public")));

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoutes);
app.use("/user", userRoute);
app.use("/", staticRouter);


app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ 
        shortId
    
    },{
        $push:
        {visitHistory: {
                timestamp: Date.now()
        } },
    });
    res.redirect(entry.redirectUrl);
 
});



app.listen(port, () => console.log(`Server is running on port ${port}`));
