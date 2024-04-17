const mongoose = require("mongoose");
const Q = require("q");
const express = require("express");
const SiteConfiguration = require("../models/siteConfiguration.js");
const Edition = require("../models/editions.js");
const NationalTeam = require("../models/nationalTeams");
const Quiz = require("../models/quiz");
const QuizQuestion = require("../models/quizQuestions");
const QuizCorrectAnswer = require("../models/quizCorrectAnswers");
const randomCode = require("../models/randomCodes");
const Round = require("../models/rounds");
const Schedule = require("../models/schedule");
const Score = require("../models/scores");
const Ticket = require("../models/tickets");
const UserStat = require("../models/userStats");


function prepareEdition(){
    var nationalTeamsCollection = _database.ListCollectionNames().ToList().Contains("nationalteams");
    if (nationalTeamsCollection == true) {
        NationalTeam.collection.drop()
    }

    var quizCollection = _database.ListCollectionNames().ToList().Contains("quizzes");
    if (quizCollection == true) {
        Quiz.collection.drop()
    }

    var quizQuestionCollection = _database.ListCollectionNames().ToList().Contains("quizquestions");
    if (quizQuestionCollection == true) {
        QuizQuestion.collection.drop()
    }

    var quizCorrectAnswerCollection = _database.ListCollectionNames().ToList().Contains("quizcorrectanswers");
    if (quizCorrectAnswerCollection == true) {
        QuizCorrectAnswer.collection.drop()
    }

    var randomCodeCollection = _database.ListCollectionNames().ToList().Contains("randomcodes");
    if (randomCodeCollection == true) {
        randomCode.collection.drop()
    }

    var roundCollection = _database.ListCollectionNames().ToList().Contains("rounds");
    if (roundCollection == true) {
        Round.collection.drop()
    }

    var scheduleCollection = _database.ListCollectionNames().ToList().Contains("schedules");
    if (scheduleCollection == true) {
        Schedule.collection.drop()
    }

    var scoreCollection = _database.ListCollectionNames().ToList().Contains("scores");
    if (scoreCollection == true) {
        Score.collection.drop()
    }

    var ticketCollection = _database.ListCollectionNames().ToList().Contains("tickets");
    if (ticketCollection == true) {
        Ticket.collection.drop()
    }

    var userStatsCollection = _database.ListCollectionNames().ToList().Contains("userstats");
    if (userStatsCollection == true) {
        UserStat.collection.drop()
    }

}


function addEdition(formData){
    var def = Q.defer();
    var edition = new Edition({
        name: formData.name,
        price_pool: formData.price_pool,
        participants: formData.participants,
      });
    
      edition.save(function (err, result) {
        if(err){
            console.log(err);
            def.reject(err);
        }else{
            def.resolve(edition);
            console.log("***")
            console.log("Dodano nową edycje")
            console.log(result)
            console.log("***")
        }

      });
    return def.promise;
}

async function setActiveEdition(formData){
    var def = Q.defer();
    await getAllEditions().then(editions =>{
        editions.forEach(edition =>{
            Edition.findByIdAndUpdate(edition._id,{
                active : false,
            },{
                new:false
            }).exec(function (err, result){
                if(err){
                    console.log("***")
                    console.log("Błąd ustawianiu edycji jako nieaktywna")
                    console.log(err)
                    console.log("***")
                    def.reject(err)
                }
            })
        })
    })

    await Edition.findByIdAndUpdate(formData.id,{
        active : true,
    },{
        new:false
    }).exec(function (err, edition){
        if(err){
            console.log("***")
            console.log("Błąd przy ustawianiu aktualnej edycji")
            console.log(err)
            console.log("***")
            def.reject(err)
        }else{
            console.log("***")
            console.log("Ustawiono nową aktualną edycji")
            console.log(edition)
            console.log("***")
            prepareEdition()
            def.resolve(edition)
        }
    })
    
    return def.promise;
}

function getAllEditions(){
    var def = Q.defer();
    Edition
        .find()
        .sort({name: "desc"})
        .exec(function (err, editions) {
            err ? def.reject(err) : def.resolve(editions);
    });
    return def.promise;
}

function getCurrentEdition(){
    var def = Q.defer();
    Edition
        .findOne({active:true})
        .exec(function (err, edition) {
            err ? def.reject(err) : def.resolve(edition);
    });
    return def.promise;
}

function setTransferedEdition(editionId){
    var def = Q.defer();
    Edition.findByIdAndUpdate(editionId,{
        transfered : true,
    },{
        new:false,
        autoIndex: true
    }).exec(function (err, edition){
        if(err){
            console.log("***")
            console.log("Błąd przy ustawianiu kolejki jako przetransferewanej")
            console.log(err)
            console.log("***")
            def.reject(err)
        }else{
            console.log("***")
            console.log("Ustawiono kolejkę jako przetransferowaną")
            console.log(edition)
            console.log("***")
            def.reject(edition)
        }
    })
    return def.promise;
}

module.exports = {
    setActiveEdition,
    getAllEditions,
    getCurrentEdition,
    addEdition,
    setTransferedEdition
}