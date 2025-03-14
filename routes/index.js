const express = require('express');
const router = express.Router();

router.get('/', (req,res) =>{
    res.send('Tagum Market Place Backend API');
})

module.exports = router;