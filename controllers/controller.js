const { Reports } = require('../models')
const { Op } = require("sequelize");

class Controller {
    static homePage(req, res){
        res.render('home', {})
    }

    static listReport(req, res){

        var dataExport = []

        if(!req.query.sbE && !req.query.sbA){
            Reports.findAll({
            order: [['dateOfEvent', 'DESC']]
            })
            .then(data => {
                dataExport.push(data)
                return Reports.maxAge()
            })
            .then(data => {
                dataExport.push(data)
                return Reports.minAge() 
            })
            .then(data => {
                dataExport.push(data)
                return Reports.avgAge()
            })
            .then(data => {
                dataExport.push(data)
                res.render('reportPage', {data: dataExport[0], max: dataExport[1], min: dataExport[2], avg: dataExport[3]})
            })
            .catch(error => {
                res.render('error', {error: error})
            })
        }

        else if(req.query.sbE && !req.query.sbA){
            Reports.findAll({
                order: [['dateOfEvent', 'DESC']],
                where: { event: { [Op.iLike]: `%${req.query.sbE}%` } }
                })
                .then(data => {
                    dataExport.push(data)
                    return Reports.maxAge()
                })
                .then(data => {
                    dataExport.push(data)
                    return Reports.minAge() 
                })
                .then(data => {
                    dataExport.push(data)
                    return Reports.avgAge()
                })
                .then(data => {
                    dataExport.push(data)
                    res.render('reportPage', {data: dataExport[0], max: dataExport[1], min: dataExport[2], avg: dataExport[3]})
                })
                .catch(error => {
                    res.render('error', {error: error})
                })
            }

        else if(!req.query.sbE && req.query.sbA){

            if(isNaN(+req.query.sbA)){
                req.query.sbA = 0
            }

            Reports.findAll({
                order: [['dateOfEvent', 'DESC']],
                where: { age: req.query.sbA }
                })
                .then(data => {
                    dataExport.push(data)
                    return Reports.maxAge()
                })
                .then(data => {
                    dataExport.push(data)
                    return Reports.minAge() 
                })
                .then(data => {
                    dataExport.push(data)
                    return Reports.avgAge()
                })
                .then(data => {
                    dataExport.push(data)
                    res.render('reportPage', {data: dataExport[0], max: dataExport[1], min: dataExport[2], avg: dataExport[3]})
                })
                .catch(error => {
                    res.render('error', {error: error})
                })
            }

        else if(req.query.sbE && req.query.sbA){

            if(isNaN(+req.query.sbA)){
                req.query.sbA = 0
            }

            Reports.findAll({
                order: [['dateOfEvent', 'DESC']],
                where: { age: req.query.sbA, event: { [Op.iLike]: `%${req.query.sbE}%` }
                }})
                .then(data => {
                    dataExport.push(data)
                    return Reports.maxAge()
                })
                .then(data => {
                    dataExport.push(data)
                    return Reports.minAge() 
                })
                .then(data => {
                    dataExport.push(data)
                    return Reports.avgAge()
                })
                .then(data => {
                    dataExport.push(data)
                    res.render('reportPage', {data: dataExport[0], max: dataExport[1], min: dataExport[2], avg: dataExport[3]})
                })
                .catch(error => {
                    res.render('error', {error: error})
                })
            }  

    }

    static formAddGet(req, res){
        res.render('formAdd', {})
    }

    static formAddPost(req, res){
        var {firstName, lastName, age, email, nik, event, description, photo, dateOfEvent} = req.body

        Reports.create({firstName, lastName, age, email, nik, event, description, photo, dateOfEvent})
        .then(() => {
            res.redirect('/reports')
        })
        .catch(error => {
            res.render('error', {error: error})
        })
    }

    static detailGet(id, req, res){
        Reports.findByPk(id)
        .then(data => {
            res.render('detailPage', {data: data})
        })
        .catch(error => {
            res.render('error', {error: error})
        })
    }

    static detailPost(id, req, res){
        var {firstName, lastName, age, email, nik, event, description, photo, dateOfEvent} = req.body

        Reports.update({firstName, lastName, age, email, nik, event, description, photo, dateOfEvent}, {where: {id: id}})
        .then(() => {
            res.redirect('/reports')
        })
        .catch(error => {
            res.render('error', {error: error})
        })
    }

    static delete(id, req, res){
        Reports.destroy({where: {id: id}})
        .then(() => {
            res.redirect('/reports')
        })
        .catch(error => {
            res.render('error', {error: error})
        })
    }

}

module.exports = Controller