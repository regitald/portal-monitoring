const path = require('path');
const { NONE } = require('sequelize');
const Roboto = require('./fonts/Roboto')

const createDoc = async (rowHeaderList,rows)=>{
  var fontPath = path.dirname('utils/PdfGenerator/fonts/')

  console.log(rows[0]);

  var rowHeaders = []
  for(ng of rowHeaderList){
    let rowHeader = {
      style : 'body',
      text: ng.name
    }
    rowHeaders.push(rowHeader)
  }
  
  var PdfPrinter = require('pdfmake');
  var printer = new PdfPrinter(Roboto);
  var fs = require('fs');
  
  var docDefinition = {
    pageMargins: [ 10, 15, 10, 15 ],
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
            colSpan:14,
            style : 'body',
            text:'Jenis NG '
          },'','','','','','','','','','','','','',{
            style : 'body',
            rowSpan:2,
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
              },
              '',
              {
                style : 'body',
                text:'OK'
              },{
                style : 'body',
                text:'NG'
              },{
                style : 'body',
                text:'Total'
              },
              rowHeaders[0],
              rowHeaders[1],
              rowHeaders[2],
              rowHeaders[4],
              rowHeaders[5],
              rowHeaders[6],
              rowHeaders[7],
              rowHeaders[8],
              rowHeaders[9],
              rowHeaders[10],
              rowHeaders[11],
              rowHeaders[12],
              rowHeaders[13],
              rowHeaders[14],
              {
                style : 'body',
                text:''
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
              },
              '',
              {
                style : 'body',
                text:'OK'
              },{
                style : 'body',
                text:'NG'
              },{
                style : 'body',
                text:'Total'
              },
              rowHeaders[0],
              rowHeaders[1],
              rowHeaders[2],
              rowHeaders[4],
              rowHeaders[5],
              rowHeaders[6],
              rowHeaders[7],
              rowHeaders[8],
              rowHeaders[9],
              rowHeaders[10],
              rowHeaders[11],
              rowHeaders[12],
              rowHeaders[13],
              rowHeaders[14],
              {
                style : 'body',
                text:''
              }
            ]
          ],
          
        }
      }
    ],
    styles: {
      header : {
        marginTop:5,
        alignment : 'center',
        fontSize : 9,
        bold : true
      },
      body: {
        fontSize : 6,
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
