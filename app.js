const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use('/', express.urlencoded({extended:false}))

app.get('/', (req, res) => {
    Controller.homePage(req, res)
})

app.get('/reports', (req, res) => {
    Controller.listReport(req, res)
})

app.get('/reports/add', (req, res) => {
    Controller.formAddGet(req, res)
})

app.post('/reports/add', (req, res) => {
    Controller.formAddPost(req, res)
})

app.get('/reports/:id', (req, res) => {
    Controller.detailGet(req.params.id, req, res)
})

app.post('/reports/:id/edit', (req, res) => {
    Controller.detailPost(req.params.id, req, res)
})

app.get('/reports/:id/delete', (req, res) => {
    Controller.delete(req.params.id, req, res)
})

app.listen(port, () => {
    console.log(`This app is listening on port ${port}`);
})