const path = require('path');
const { NONE } = require('sequelize');
const Roboto = require('./fonts/Roboto')

const createDoc = async ()=>{
  var fontPath = path.dirname('utils/PdfGenerator/fonts/')
  
  var PdfPrinter = require('pdfmake');
  var printer = new PdfPrinter(Roboto);
  var fs = require('fs');
  
  var docDefinition = {
    content: [
      {
        table : {
          widths : [360,'*','*'],
          body : [
            [
              {
                rowSpan :2,
                text : 'LAPORAN PRODUKSI HARIAN',
                style : 'header'
              },
              {
                text : 'Area',
                style : 'body'
              },
              {
                text : 'INJECTION',
                style : 'body'
              }
            ],['',
            {
              text : 'INJECTION',
              style : 'body'
            },
              {
                text : '1234567',
                style : 'body'
              }
            ]
          ]
        },
      },
      {
        text:' ',
        style:'bodySmall'
      },
      {layout:'noBorders',
        table : {
          body:[
            [
              {
                table: {
                  widths:[74,74],
                  body: [
                  [
                    {
                      text : 'Nama Part',
                      style : 'body'
                    }
                    ,
                    {
                      text : 'Nama Part',
                      style : 'body'
                    }
                  ],
                  [
                    {
                      text : 'No Part',
                      style : 'body'
                    }
                    ,
                    {
                      text : 'No Part',
                      style : 'body'
                    }
                  ]
                ]
                }
              },
              {
                table: {
                  widths:[72,72],
                  body: [
                  [
                    {
                      text : 'Nama Part',
                      style : 'body'
                    }
                    ,
                    {
                      text : 'Nama Part',
                      style : 'body'
                    }
                  ],
                  [
                    {
                      text : 'No Part',
                      style : 'body'
                    }
                    ,
                    {
                      text : 'No Part',
                      style : 'body'
                    }
                  ]
                ]
                }
              },
              {
                table: {
                  widths:[74,74],
                  body: [
                  [
                    {
                      text : 'Nama Part',
                      style : 'body'
                    }
                    ,
                    {
                      text : 'Nama Part',
                      style : 'body'
                    }
                  ],
                  [
                    {
                      text : 'No Part',
                      style : 'body'
                    }
                    ,
                    {
                      text : 'No Part',
                      style : 'body'
                    }
                  ]
                ]
                }
              }
            ]
          ]
        }
      },
      {
        text:' ',
        style:'bodySmall'
      },
      {
        table:{
          body:[
            [{
              colSpan:2,
              text: 'Time',
              style : 'body'
            },
            '',
            {
              style : 'body',
              text: 'PLAN'
            },{
              rowSpan:2,
              text:'\nRH/LH',
              style : 'body'
            },{
              colSpan:3,
              style : 'body',
              text:'ACTUAL'
            },'','',
          {
            colSpan:9,
            style : 'body',
            text:'6789101112131415'
          },'','','','','','','','',{
            style : 'body',
            text:'Line Stop/Abnormality'
          }
          ],
            [
              {
                style : 'body',
                text:'Start'
              },{
                style : 'body',
                text:'Finish'
              },{
                style : 'body',
                text:'QTY'
              },'',{
                style : 'body',
                text:'OK'
              },{
                style : 'body',
                text:'NG'
              },{
                style : 'body',
                text:'Total'
              },{
                style : 'body',
                text:'6'
              },{
                style : 'body',
                text:'7'
              },{
                style : 'body',
                text:'8'
              },{
                style : 'body',
                text:'9'
              },{
                style : 'body',
                text:'10'
              },{
                style : 'body',
                text:'11'
              },{
                style : 'body',
                text:'12'
              },{
                style : 'body',
                text:'13'
              },{
                style : 'body',
                text:'14'
              },{
                style : 'body',
                text:''
              }],
          ]
        }
      }
    ],
    styles: {
      header : {
        marginTop:5,
        alignment : 'center',
        fontSize : 10,
        bold : true
      },
      body: {
        fontSize : 8,
        alignment :'center'
      },
      bodySmall : {
        fontSize: 6
      }
    }
  };
  
  
  var options = {
    // ...
  }
  
  var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream('tmp/document.pdf'));
  pdfDoc.end();
  
}

module.exports = {
    createDoc
}
