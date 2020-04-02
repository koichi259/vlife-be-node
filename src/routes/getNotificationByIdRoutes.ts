import DataService from '../service/DataService';
import { any } from 'bluebird';
const jwt = require('jsonwebtoken');
const verifytoken = require('../validation/verifyToken');
const { Sequelize } = require('sequelize');

const router = (app: any, ds: DataService) => {
    app.route('/getNotificationById')
        .get(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {


                    const Cryptr = require('cryptr');
                    const cryptr = new Cryptr('goyeneche');

                    //const encryptedString = cryptr.encrypt('AIzaSyD4HK2DucBEZplPHjwWAb1ALvuEImprrOw');
                    const decryptedString = cryptr.decrypt(process.env.GM_API_KEY);

                    //console.log("Encriptada " + encryptedString + "FIN");
                    console.log("Desencriptada " + decryptedString);
                    const profesional: any = ds.dbModels.professional;

                    const profesional1 = await profesional.findOne({
                        where: { id: req.body.id }
                    });

                    const origenGM = profesional1.lat + "," + profesional1.lng

                    const usuarios = await ds.dbClient.query("Select Requests.id,Requests.commentusr,name,surname,address,lat,lng,mobile,email,dni,picture from Users inner join Requests  on Users.id = Requests.UserId where Requests.ProfessionalId = " + req.body.id, { type: Sequelize.QueryTypes.SELECT });

                    const solicitudes = usuarios.map(async (usuario: any) => {

                        const destinoGM = usuario.lat + "," + usuario.lng

                        ///Llamad al APi de Google distance-matrix

                        var request = require('request');
                        var options = {
                            'method': 'GET',
                            'url': 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + origenGM + '&destinations=' + destinoGM + '&language=es-ES&key=' + decryptedString,
                            'headers': {
                            }
                        };

                        var usrDistancia = "";
                        var usrTiempo = "";
                        await request(options, function (error: any, response: any) {
                            if (error) throw new Error(error);
                            console.log("--------------INICIO get api google---------------");
                            console.log(response.body);
                            console.log("--------------FIN get api google---------------");
                            let json = JSON.parse(response.body);
                            console.log(json);
                            console.log(json.destination_addresses);
                            console.log(json.rows[0].elements[0].status);
                            if (json.rows[0].elements[0].status = "OK") {

                                usrDistancia = json.rows[0].elements[0].distance.text;
                                usrTiempo = json.rows[0].elements[0].duration.text
                                console.log("distancia " + usrDistancia + "tiempo " + usrTiempo);
                            }
                        });


                        const practicas = await ds.dbClient.query("select Practices.id,Practices.name as nombre,ImgPrescriptions.picture as imagen from Practices left join ImgPrescriptions on Practices.id = ImgPrescriptions.PracticeId and ImgPrescriptions.RequestId = " + usuario.id + " where Practices.id in (select PracticeId from Requests_Practices where RequestId = " + usuario.id + ")", { type: Sequelize.QueryTypes.SELECT });


                        var preacticasID = "";

                        practicas.forEach((practica: any) => {
                            //  practicasNombre.push(practica.name);
                            preacticasID = preacticasID + "PracticeId = " + practica.id + " or "
                        });

                        preacticasID = preacticasID.slice(0, -4);

                        console.log("select Professionals.id,name,surname,sum(cost) as cost, '1km' as distance, '10m' as time, picture from Professionals  inner join PracticeCosts on Professionals.id = Professionalid where Professionals.id in (select Professionalid from PracticeCosts where (" + preacticasID + ") and ProfessionalId = " + req.body.id + " ) group by Professionalid");

                        const servicios = await ds.dbClient.query("select Professionals.id,name,surname,sum(cost) as cost, '1km' as distance, '10m' as time, picture from Professionals  inner join PracticeCosts on Professionals.id = Professionalid where Professionals.id in (select Professionalid from PracticeCosts where (" + preacticasID + ") and ProfessionalId = " + req.body.id + " ) group by Professionalid", { type: Sequelize.QueryTypes.SELECT });

                        console.log("--------------------");
                        console.log(usuario.id);
                        console.log(usuario.commentusr);
                        console.log("--------------------");

                        const sol = {
                            id: usuario.id,
                            pacientinfo: {
                                nombre: usuario.name,
                                apellido: usuario.surname,
                                direccion: usuario.address,
                                geoloc: {
                                    lat: usuario.lat,
                                    lng: usuario.lng,
                                },
                                //telefono: usuario.mobile,
                                dni: usuario.dni,
                                userpicture: usuario.picture,
                            },
                            requestinfo: {
                                practicas: practicas,
                                //recetas: imgPrescriptionurl,
                                comentario: usuario.commentusr,
                                valortotal: servicios.cost,
                                distancek: usrDistancia,
                                distancetiempo: usrTiempo,
                            }
                        };



                        //solicitudes.push(sol);
                        console.log("Sol1: " + JSON.stringify(sol));

                        return sol;

                    });

                    Promise.all(solicitudes)
                        .then(returnedValues => {
                            // console.log('##########  MAP profPerSpecialties values: ', values);
                            console.log("Solicitudes: " + JSON.stringify(returnedValues));
                            res.send(returnedValues);
                        })
                        .catch(console.error);
                }
            });

        })
        .post(verifytoken, (req: any, res: any) => {
            jwt.verify(req.token, process.env.JWT_SECRETKEY, async (err: any, authData: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    res.status(201);
                    res.send('live POST Req Ok');
                }
            });
        });

};
export default router;
