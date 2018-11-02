const express = require('express');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.set('trust proxy', 1); // trust first proxy

app.use(
    cookieSession({
        name: 'cook-sess',
        keys: [process.env.REACT_APP_WEB_TOKEN_SECRET],
        maxAge: 3600 * 1000 // 1 hour
    })
);

// app.use(cookieParser(
//     process.env.REACT_APP_WEB_TOKEN_SECRET
// ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//COMMENTED = PRODUCTION BUILDS!

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', require('./server/apiRoute'));

app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`\n\nCheck out the app at http://localhost:${PORT}`);
});
