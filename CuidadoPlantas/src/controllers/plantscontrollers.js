require('mongoose')
const plantModel = require('./../Models/plantModel');
const nodemailer = require('nodemailer');
require('express');

class plantsController{
    agregarPlanta(req,res){
        const {ID,token, name,type, status, pin} = req.body;
        if (!ID||!token || !name || !type || !pin || !status) {
            return res.status(400).send("<h1>All fields are required</h1>");
        }
        plantModel.create({ID,token, name, type,status, pin}).then((response)=>{
            res.send({message: 'Planta creada con exito'});
        }).catch((err)=>{
            res.status(400).send({message: 'Error de creacion del objeto'}); 
        })

    }
    tempPlanta(req,res){
        const {token, pin}=req.body;
        const url = 'http://blynk.cloud/external/api/get?token='+token+'&'+pin;
        fetch(url).then((response)=>{
            if(!response.ok){
                res.send({message:'error en la respuesta' + response.status});
            }else{
                res.send(response.json());
            }
        }).catch((error)=>{
            res.send({message: 'No se pudo obtener la temperatura de la planta'});
        })
        

    }
    eliminarPlanta(req,res){
        const filter = {name:req.body.name};
        const update = {status:"Inactivo"};
        plantModel.findOneAndUpdate(filter,update,{new:true}).then((updatePlant)=>{
            res.send({message: 'Planta eliminada'});
        }).catch((err)=> {
            res.status(500).send({message: 'Error al eliminar planta'});
        })

    }
    MostrarDatosPlanta(req,res){
        const filter = {token:req.body.token};
        plantModel.find(filter).then((response)=>{
            res.send(response);
        }).catch((err)=>{
            res.status(500).send({message: 'Datos no encontrados'});
        })

    }
    /*Planta(req,send){
        const filter={ID:req.body.ID};
        if(!filter){
            res.status(400).send({message:'Datos vacios, ingrese ID'})
        }
        plantModel.findOne(filter).then((response)=>{
            if(response){
                res.send(response);
            }else{
                res.status(404).send({message: 'Planta no encontrada'});                
            }
        }).catch((err)=>{
            res.status(500).send({message: 'error al buscar la planta'});
        })

    }*/
    notificacionEstado(req,res){
        const email = req.body.email;
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'rendon.a.la@gmail.com',
                pass:'218124505Ara*'
            }
        });
        const mailOptions={
            from:'rendon.a.la@gmail.com',
            to:email,
            subject:'Alerta de temperatura',
            text:'Una de tus plantas presenta altos niveles de humedad desde hace un tiempo, favor de revisar tus plantas'

        };
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                res.status(400).send({message:'No se pudo enviar el correo electronico'});
            }else{
                res.send({message:'correo enviado exitosamente',info});
            }
        })


    }

}

module.exports = new plantsController();