const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user')

mongoose.connect('mongodb://localhost:27017/authDemo')
    .then(() => {
        console.log('MONGO CONNECTION OPEN')
    })
    .catch(err => {
        console.log('OH NO MONGO CONNECTION ERROR', err)
    })

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true })); //req.body




app.get('/', (req, res) => {
    res.send('homepage')
})

//form
app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const hashP = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hashP
    })
    await user.save();
    res.redirect('/');
})


app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        // return res.send('try again')
        next();
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
        res.send('welcome')
    } else {
        res.send('try again')
    }
})



app.use((req, res, next) => {
    res.send('try again')
})

app.get('/secret', (req, res) => {
    res.send('nuclear codes')
})

app.listen(3000, () => {
    console.log('SERVING APP')
})