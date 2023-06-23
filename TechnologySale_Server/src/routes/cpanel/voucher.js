var express = require('express');
var router = express.Router();
const voucherController = require('../../controllers/Voucher');
const authentication =require('../../../middleware/authentication');
const upload = require('../../../middleware/upload');
 /**
* http://localhost:3000/category
* method : get
*/
router.get('/',[authentication.checkLogin], async function(req, res, next) {
    const data = await voucherController.getVoucher();
    res.render('voucher/index',{voucher: data});
  });
   /**
* http://localhost:3000/voucher/insert
* method : get
*/
router.get('/insert',[authentication.checkLogin], async function(req, res, next) {
  res.render('voucher/insert', { layout: 'layout_child' });
});
  /**
* http://localhost:3000/voucher/insert
* method : post
*/
router.post('/',[authentication.checkLogin],[upload.single('image')], async function(req, res, next) {
  //thêm mới sản phẩm vào database
  let {body, file} = req;
  let image = '';
  if(file){
    image = `http://localhost:3000/images/${file.filename}`;
  }
  body = {...body,image : image}
  await voucherController.insertVoucher(body);
  res.redirect('/voucher');
});
 /**
* http://localhost:3000/category/:id/edit
* method : get
*/
router.get('/:id/edit',[authentication.checkLogin], async function(req, res, next) {
  //lấy thông tin 1 sản phẩm
  const { id } = req.params;
  const voucher = await voucherController.getVoucherById(id);  
  res.render('voucher/update', { layout: 'layout_update' ,voucher : voucher });
});

/**
* http://localhost:3000/news/:id/edit
* method : post
*///[authentication.checkLogin]
router.post('/:id/edit',[authentication.checkLogin],[upload.single('image')],async function(req, res, next) {
  let {body, file,params} = req;
  delete body.image;
  if(file){
    let image = `http://192.168.3.101:3000/images/${file.filename}`;
    body = {...body, image: image};
  }
  await voucherController.update(params.id,body);
  res.redirect('/voucher');
});
/**
* http://localhost:3000/delete/
* method : delete
*/
router.delete('/:id/delete',[authentication.checkLogin], async function(req, res, next) {
  //xóa 1 sản phẩm
  try{
    const { id } = req.params;
      await voucherController.delete(id);
      res.json({result: true});
  }catch(err){
    next(err);
  }
  
});
  module.exports = router;