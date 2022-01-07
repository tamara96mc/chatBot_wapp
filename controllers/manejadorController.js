let datos = [];

let fase1 = [];
let fase2 = [];
let fase3 = [];
let fase4 = [];
let fase5 = [];

let clientes = [];
let proyectos = [];

let jiraCredencials;

let nombre = '';
let telefono = '';

// const venomOptions = require('./venom-options.js')
const venom = require('venom-bot');
const fetch = require('node-fetch');

let clienteModel = require('../models').cliente;
let proyectoModel = require('../models').proyecto;


const { sequelize_conexion } = require('../config/db.js');

const ManejadorController = {}; //Create the object controller


ManejadorController.createBot = (req, res) => {

  try {


    let telefono_manejador = req.body.telefono;

    venom
      .create(
        //session
        telefono_manejador, //Pass the name of the client you want to start the bot
        //catchQR
        (base64Qrimg, asciiQR, attempts, urlCode) => {

          console.log(asciiQR);
          console.log('base64 image string qrcode: ', base64Qrimg);

          try {
            res.send(base64Qrimg);
          }
          catch (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while generate qr"
            });
          };


        },
        // statusFind
        (statusSession, session) => {
          console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
          //Create session wss return "serverClose" case server for close
          console.log('Session name: ', session);
        },
        // options
        {
          multidevice: false, // for version not multidevice use false.(default: true)
          folderNameToken: 'tokens', //folder name when saving tokens
          mkdirFolderToken: '', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
          headless: true, // Headless chrome
          devtools: false, // Open devtools by default
          useChrome: true, // If false will use Chromium instance
          debug: false, // Opens a debug session
          logQR: true, // Logs QR automatically in terminal
          browserWS: '', // If u want to use browserWSEndpoint
          browserArgs: [''], //Original parameters  ---Parameters to be added into the chrome browser instance
          puppeteerOptions: {}, // Will be passed to puppeteer.launch
          disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
          disableWelcome: true, // Will disable the welcoming message which appears in the beginning
          updatesLog: true, // Logs info updates automatically in terminal
          autoClose: 60000, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
          createPathFileToken: false, // creates a folder when inserting an object in the client's browser, to work it is necessary to pass the parameters in the function create browserSessionToken
          chromiumVersion: '818858', // Version of the browser that will be used. Revision strings can be obtained from omahaproxy.appspot.com.
          addProxy: [''], // Add proxy server exemple : [e1.p.webshare.io:01, e1.p.webshare.io:01]
          userProxy: '', // Proxy login username
          userPass: '' // Proxy password
        },
        // BrowserSessionToken
        // To receive the client's token use the function await clinet.getSessionTokenBrowser()
        // {
        //   WABrowserId: '"UnXjH....."',
        //   WASecretBundle:
        //     '{"key":"+i/nRgWJ....","encKey":"kGdMR5t....","macKey":"+i/nRgW...."}',
        //   WAToken1: '"0i8...."',
        //   WAToken2: '"1@lPpzwC...."'
        // },
        // BrowserInstance
        (browser, waPage) => {
          console.log('Browser PID:', browser.process().pid);
          waPage.screenshot({ path: 'screenshot.png' });
        }
      )
      .then((client) => {
        start(client);
      })
      .catch((erro) => {
        console.log(erro);
      });


    const getDataClientes = (nameSesion) => {

      sequelize_conexion.query(`select clientes.telefono 
    from  jiras inner join clientes ON jiras.id = clientes.jiraId
    where jiras.telefono = '${nameSesion}'`, { model: clienteModel })
        .then(data => {

          data.map(cliente => {
            clientes.push(cliente.telefono);
          })

        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving clientes."
          });
        });
    }

    const getDataProyectos = (nameSesion) => {

      sequelize_conexion.query(`Select proyectos.nombre , proyectos.tipo 
    from  jiras inner join proyectos ON jiras.id = proyectos.jiraId
    where jiras.telefono = '${nameSesion}'`, { model: proyectoModel })
        .then(data => {

          data.map(proyecto => {
            proyectos.push([proyecto.nombre, proyecto.tipo]);
          })

        })


        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving clientes."
          });
        });
    }

    const getDataJira = (nameSesion) => {

      sequelize_conexion.query(`Select url_jira, usuario, contraseya from  jiras where telefono = '${nameSesion}' limit 1;`)
        .then(data => {
          jiraCredencials = data[0][0];
        })

        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving clientes."
          });
        });
    }



    function start(client) {

      getDataClientes(client.session);
      getDataProyectos(client.session);
      getDataJira(client.session);

      // example: reply every message with "Hi!""
      client.onMessage((message) => {

        try {

          let clienteWA = message.from.substring(2, 11);


          if (clientes.includes(clienteWA)) {

            let condicion = !fase1.includes(clienteWA) && !fase2.includes(clienteWA) && !fase3.includes(clienteWA) && !fase4.includes(clienteWA) && !fase5.includes(clienteWA);


            if (condicion) {

              fase1.push(clienteWA);
              fase2.push(clienteWA);
              fase3.push(clienteWA);
              fase4.push(clienteWA);
              fase5.push(clienteWA);


              client
                .sendText(message.from, `Hola 👋, bienvenido al soporte de JIRA. Vamos a crear un ticket, ¿Me puedes facilitar un resumen para el ticket?`)
                .then((result) => {
                  //console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                  console.error('Error when sending: ', erro); //return object error
                });
            } else {

              telefono = message.sender.id;
              nombre = message.sender.pushname;
              datos.push(message.body);

              if (fase1.includes(clienteWA)) {

                client
                  .sendText(message.from, `Vale. ¿Me puedes facilitar algo más de información? 💬`)
                  .then((result) => {
                    //console.log('Result: ', result); //return object success
                    fase1 = fase1.filter(val => !clienteWA.includes(val));
                  })
                  .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                  });

              }

              else if (fase2.includes(clienteWA)) {

                let nombres = [];

                for (let i = 0; i < proyectos.length; ++i) {

                  nombres.push(proyectos[i][0]);

                }

                let uniqueChars = [...new Set(nombres)];

                let buttons = [];

                uniqueChars.map(nombreBoton => {
                  buttons.push({
                    "buttonText": {
                      "displayText": nombreBoton
                    }
                  });
                })

                client.sendButtons(message.from, 'Proyectos', buttons, 'Selecciona uno')
                  .then((result) => {
                    //console.log('Result2: ', result); //return object success
                    fase2 = fase2.filter(val => !clienteWA.includes(val));
                  })
                  .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                  });

              } else if (fase3.includes(clienteWA)) {


                let tipos = [];

                for (let i = 0; i < proyectos.length; ++i) {

                  if (proyectos[i][0] == datos[2]) //proyecto seleccionado en la respuesta 
                    tipos.push(proyectos[i][1]);

                }

                let uniqueChars = [...new Set(tipos)];

                let rows_list = [];

                uniqueChars.map(nombreBoton => {
                  rows_list.push({
                    title: nombreBoton,
                    description: "Seleccione está opción para crear " + nombreBoton.toLowerCase(),
                  });
                })

                const list = [
                  {
                    title: "Tipo de tareas",
                    rows: rows_list
                  }
                ];

                client.sendListMenu(message.from, 'Tipo de tarea', 'Seleccione uno', 'Para clasificar este ticket necesitamos saber de que tipo se trata', 'opciones', list)
                  .then((result) => {
                    // console.log('Result: ', result); //return object success
                    fase3 = fase3.filter(val => !clienteWA.includes(val));
                  })
                  .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                  });

              } else if (fase4.includes(clienteWA)) {

                const msg = [
                  {
                    "buttonText": {
                      "displayText": "Vale 👍"
                    }
                  }
                ]
                client.sendButtons(message.from, 'Gracias por facilitarnos la información, vamos a proceder a crear el ticket, ¿de acuerdo?', msg, 'Pulse el botón para finalizar')
                  .then((result) => {
                    //console.log('Result2: ', result); //return object success
                    fase4 = fase4.filter(val => !clienteWA.includes(val));
                  })
                  .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                  });

              } else if (fase5.includes(clienteWA)) {


                const issue =
                  `{
                                    "update": {},
                                    "fields": {
                                    "summary":  "${datos[0]}",
                                    "issuetype": {
                                        "name": "${datos[3].substring(0, datos[3].indexOf('\n'))}"
                                    },
                                    "project": {
                                        "key": "${datos[2]}"
                                    },
                                    "description": {
                                        "type": "doc",
                                        "version": 1,
                                        "content": [
                                        {
                                            "type": "paragraph",
                                            "content": [
                                            {
                                                "text": "${datos[1]}",
                                                "type": "text"
                                            }
                                            ]
                                        }
                                        ]
                                    },
                                    "reporter": {
                                        "id": "5d0a2b3cdae4be0bc931c579"
                                    },
                                        "customfield_10058": "${telefono.substring(2, 11)}",
                                        "customfield_10057":  "${nombre}"
                                    }
                                }`
                  ;


                fetch(`${jiraCredencials.url_jira}/rest/api/3/issue`, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Basic ${Buffer.from(
                      `${jiraCredencials.usuario}:${jiraCredencials.contraseya}`
                    ).toString('base64')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: issue
                })
                  .then(response => {
                    console.log(
                      `Response: ${response.status} ${response.statusText}`
                    );
                    return response.text();
                  })
                  .then(text => {

                    let datos = JSON.parse(text);
                    client
                      .sendText(message.from, `Hemos creado en ticket 📝 ${datos.key}, puede consultarlo en ➡ https://chatsbot.atlassian.net/browse/${datos.key}`)
                      .then((result) => {
                        fase5 = fase5.filter(val => !clienteWA.includes(val));
                      })
                      .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                      });
                  })
                  .catch(err => console.error(err));
              }

            }

          } else {

            client
              .sendText(message.from, `Hola 👋, vemos que tienes permisos en este manejador :(`)
              .then((result) => {
                //console.log('Result: ', result); //return object success
              })
              .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
              });

          }

        } catch (error) {

          console.log(error);

        }


      });

    }

  } catch (error) {

    console.log(error);

  }

};
module.exports = ManejadorController;

