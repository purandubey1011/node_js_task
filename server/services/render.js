const axios = require('axios');
const exceljs = require('exceljs');
const Userdb = require('../model/model');

exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

}

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.exportUsers =async(req,res)=>{
    try {
        
        const workbook = new exceljs.Workbook()
        const worksheet = workbook.addWorksheet('all users')

        worksheet.columns = [
            {header:'s no',key:'s_no'},
            {header:"Name",key:"name"},
            {header:"email id ",key:"email"},
            {header:"mobile",key:"mobile"},
            {header:"status",key:"status"},
            {header:"task",key:"task"}
        ]

        let counter = 1
        const userData = await Userdb.find({id:req.params.id})

        userData.forEach((user)=>{
            user.s_no = counter;
            worksheet.addRow(user);
            counter++;
        })

        worksheet.getRow(1).eachCell((cell)=>{
            cell.font={bold:true}
        })

        res.setHeader(
            'Content-Type',
            "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
        )

        res.setHeader('Content-Disposition',`attachment; filename=users.xlsx`)

        return workbook.xlsx.write(res).then(()=>{
            res.status(200)
        })

    } catch (error) {
        console.log(error.message)
    }
}