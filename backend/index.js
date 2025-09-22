const express = require('express')

const cors = require('cors')

require('dotenv').config();

const cookieparser = require('cookie-parser')

const usermodel = require('./models/usermodel')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const transporter = require('./Config/nodemailer.js')

const app = express();

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

const allowcorsorigin = ['http://localhost:5173', 'https://namjap.onrender.com']

app.use(cookieparser())

app.use(cors({ origin: allowcorsorigin, credentials: true }))

const port = process.env.PORT || 3000;



const activeuser = (req, res, next) => {
    const { token } = req.cookies;
    try {
        if (token) {
            const tokendecode = jwt.verify(token, process.env.JWT_SECRET);
            req.userid = tokendecode.id;
            next();
        }
        else {
            return res.json({ success: false, message: "please login first" });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}



app.post('/create', async (req, res) => {

    const { name, email, password } = req.body;

    const check = await usermodel.findOne({ email: email })

    if (check) {

        return res.json({ success: false, message: "user already exists" })

    }

    else {

        const hashedpassword = await bcrypt.hash(password, 10);

        const user = await usermodel.create({

            name, email, password: hashedpassword,

        })



        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {

            httpOnly: true,

            secure: process.env.NODE_ENV == 'production',

            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',

            maxAge: 7 * 24 * 3600 * 1000

        })



        const mailoptions = {

            from: process.env.SENDER_MAIL,

            to: email,

            subject: 'welcome to NamJap website',

            text: 'you have been created a account in our website ',

        }

        await transporter.sendMail(mailoptions)



        console.log('email sent sucessfully');

        res.send({ success: true, message: "user created sucessfully", user })

    }

})



app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const user = await usermodel.findOne({ email: email })

    if (!user) {

        return res.json({ success: false, message: "You should create your account first..." })

    }

    else {

        const check = await bcrypt.compare(password, user.password)

        if (check) {

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });



            res.cookie('token', token, {

                httpOnly: true,

                secure: process.env.NODE_ENV == 'production',

                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',

                maxAge: 7 * 24 * 3600 * 1000

            })

            return res.json({ success: true, message: "login sucessfully" })

        }

        return res.json({ success: false, message: "login failed" })

    }

})



app.post('/logout', (req, res) => {

    try {

        res.clearCookie('token', {

            httpOnly: true,

            secure: process.env.NODE_ENV == 'production',

            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',

        })

        return res.json({ success: true, message: "logout sucessfully" })

    } catch (error) {

        return res.json({ success: false, message: error.message })

    }

})



app.post('/sendotp', activeuser, async (req, res) => {

    const user = await usermodel.findById(req.userid);



    if (user.isVerified) {

        return res.json({ success: false, message: "user already verified " })

    }

    const otp = String(Math.floor(1000 + Math.random() * 9000));

    user.verifyotp = otp;

    user.verifyotpexpireat = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailoptions = {

        from: process.env.SENDER_MAIL,

        to: user.email,

        subject: 'welcome to NamJap website',

        text: `your otp is ${otp}`,

    }

    await transporter.sendMail(mailoptions)

    res.send({ success: true, message: "user created sucessfully", user })

})





app.post('/verifyotp', activeuser, async (req, res) => {

    try {

        const { otp } = req.body;

        const user = await usermodel.findById(req.userid);



        if (user.isVerified) {

            return res.json({ success: false, message: "user already verified " })

        }

        if (otp === user.verifyotp && user.verifyotpexpireat >= Date.now()) {

            user.verifyotp = ''

            user.verifyotpexpireat = 0;

            user.isVerified = true;

            await user.save();

            return res.json({ success: true, message: "you have been verified", user })

        }

        else {

            return res.json({ success: false, message: "you have enter wrong otp" })

        }



    } catch (error) {

        return res.json({ success: false, message: "something went wrong" })

    }

})



app.post('/resetotp', async (req, res) => {

    const { resetmail } = req.body;

    const user = await usermodel.findOne({ email: resetmail })

    try {

        if (user.isVerified) {

            const otp = String(Math.floor(10000 + Math.random() * 90000))

            user.resetotp = otp;

            user.resetotpexpireat = Date.now() + 24 * 3600 * 1000;

            await user.save();

            const mailoptions = {

                from: process.env.SENDER_MAIL,

                to: user.email,

                subject: 'welcome to NamJap website',

                text: `you have been created a account in our website , this is your reset otp : ${otp}`,

            }

            await transporter.sendMail(mailoptions)

            return res.json({ success: true, message: "reset password otp send successfully to user mail id" })

        }

        else {

            return res.json({ success: false, message: "verify your email id" })

        }

    } catch (error) {

        return res.json({ success: false, message: error.message })

    }

})



app.post('/verifyresetotp', async (req, res) => {

    try {

        const { carrymail, otp } = req.body;

        const user = await usermodel.findOne({ email: carrymail });

        if (otp === user.resetotp && user.resetotpexpireat >= Date.now()) {

            user.resetotp = ''

            user.resetotpexpireat = 0;

            await user.save();

            return res.json({ success: true, message: "you reset otp verified" })

        }

        else {

            return res.json({ success: false, message: "you have enter wrong otp" })

        }



    } catch (error) {

        return res.json({ success: false, message: "something went wrong" })

    }

})



app.post('/updatepassword', async (req, res) => {

    const { newpassword, carrymail } = req.body;

    const user = await usermodel.findOne({ email: carrymail });

    try {

        if (user) {

            const hashedpassword = await bcrypt.hash(newpassword, 10);

            user.password = hashedpassword;

            user.resetotp = '';

            user.resetotpexpireat = 0;

            await user.save();

            return res.json({ success: true, message: "password changed sucessfully" })

        }

        else {

            return res.json({ success: true, message: "user does not exist " })

        }



    } catch (error) {

        return res.json({ success: false, message: error.message })

    }

})



app.get('/getuserdata', activeuser, async (req, res) => {
    const user = await usermodel.findById(req.userid);
    if (user) {
        return res.json({ success: true, user });
    }
    else {
        return res.json({ success: false, message: "please log in again" });
    }
})

app.post('/addcount', activeuser, async (req, res) => {
    const user = await usermodel.findById(req.userid);
    if (!user.isVerified) return res.json({ success: false, message: "please verify your email..." });

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Update daily count
    const prevCount = user.dailyCounts.get(today) || 0;
    user.dailyCounts.set(today, prevCount + 1);

    // Update streak
    if (user.lastActive) {
        const lastActiveDate = new Date(user.lastActive);
        const diffDays = Math.floor((new Date(today) - lastActiveDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) user.streak += 1;       // Consecutive day
        else if (diffDays > 1) user.streak = 1;     // Break in streak
        // If diffDays === 0, still today, no streak change
    } else {
        user.streak = 1; // First day
    }

    user.lastActive = today;
    user.count += 1;

    await user.save();
    return res.json({ success: true, count: user.count, streak: user.streak, dailyCounts: Object.fromEntries(user.dailyCounts) });
});




app.post('/resetcount', activeuser, async (req, res) => {

    const user = await usermodel.findById(req.userid);

    if (user) {

        user.count = 0;

        await user.save();

    }

    else {

        return res.json({ success: false, message: "please log in again" });

    }

})

app.post('/savegod', activeuser, async (req, res) => {
    const { god } = req.body;
    const user = await usermodel.findById(req.userid);
    if (user) {
        user.godname = god;
        await user.save();
        return res.json({ success: true, message: "god name is updated" })
    }
    else {
        return res.json({ success: true, message: "something goes wrong" })
    }
})

app.get('/', (req, res) => {

    res.send("WELCOME TO BACKEND ")

})



app.listen(port, () => {

    console.log(`server is connected with ${port}`);

})