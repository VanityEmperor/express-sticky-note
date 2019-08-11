var express = require('express')
var router = express.Router()
var Note = require('../models/note')

/* 获取所有的 notes */

router.get('/notes', function(req, res, next) {
  var query = {raw:true}
  if(req.session.user){
    query.where = {
      uid:req.session.user.id
    }
  }
  Note.findAll(query).then(function(notes) {
    res.send({status: 0, data: notes});
  }).catch(function(){
    res.send({ status: 1,errorMsg: '数据库异常'});
  });
});

/*新增note*/
router.post('/notes/add', function(req, res, next){
  if(!req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  var note = req.body.note;
  var userid = req.session.user.id;
  Note.create({text: note, uid: userid}).then(function(note){
    addid = note.dataValues.id
    res.send({status: 0 , noteid:addid})
  }).catch(function(){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
})

/*修改note*/
router.post('/notes/edit', function(req, res, next){
  if(!req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  var noteId = req.body.id;
  var note = req.body.note;
  var userid = req.session.user.id;
  Note.update({text: note}, {where:{id: noteId, uid: userid}}).then(function(lists){
    res.send({status: 0})
  }).catch(function(e){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
})

/*删除note*/
router.post('/notes/delete', function(req, res, next){
  if(!req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  var noteId = req.body.id
  var userid = req.session.user.id
  Note.destroy({where:{id:noteId, uid: userid}}).then(function(deleteLen){
    res.send({status: 0})
  }).catch(function(e){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
})

module.exports = router;
