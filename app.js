const ex = require('express')
const morgan = require('morgan')
const moment = require('moment-timezone')

const app = ex()

morgan.token('date', (req, res, tz) => {
    return moment().tz(tz).format()
})

morgan.format('myformat', '":remote-addr" - - [:date[Asia/Bangkok]] ":method :url" :status :res[content-length] - :response-time ms')

app.use(morgan('myformat'))

app.get('/', (req, res) => {
    res.send({
        info: "test"
    })
})

app.get('/test', (req, res) => {
    res.json({
        test: req.headers
    })
})

app.listen(process.env.PORT || 3000)