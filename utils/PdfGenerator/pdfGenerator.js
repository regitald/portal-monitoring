var PdfPrinter = require('pdfmake');
const path = require('path');
const { NONE } = require('sequelize');
const Roboto = require('./fonts/Roboto')

const createDoc = async (rowHeaderList,rows,mo,totalRow)=>{
  var fontPath = path.dirname('utils/PdfGenerator/fonts/')
  
  var rowHeaders = []
  for(ng of rowHeaderList){
    let rowHeader = {
      style : 'body',
      text: ng.name
    }
    rowHeaders.push(rowHeader)
  }
  
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
                text : mo.line_number,
                style : 'body'
              }
            ],
            [
              '',
            {
              text : 'MO no',
              style : 'body'
            },
              {
                text : mo.no_mo,
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
                  widths:[74,92],
                  body: [
                  [
                    {
                      text : 'Nama Part',
                      style : 'body'
                    }
                    ,
                    {
                      text : mo.part_name,
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
                      text : mo.part_no,
                      style : 'body'
                    }
                  ]
                ]
                }
              },
              {
                table: {
                  widths:[74,92],
                  body: [
                  [
                    {
                      text : 'Target/Jam',
                      style : 'body'
                    }
                    ,
                    {
                      text : mo.target_production,
                      style : 'body'
                    }
                  ],
                  [
                    {
                      text : 'Shift',
                      style : 'body'
                    }
                    ,
                    {
                      text : mo.shift_no,
                      style : 'body'
                    }
                  ]
                ]
                }
              },
              {
                table: {
                  widths:[74,92],
                  body: [
                  [
                    {
                      text : 'Cycle Time',
                      style : 'body'
                    }
                    ,
                    {
                      text : mo.cycle_time,
                      style : 'body'
                    }
                  ],
                  [
                    {
                      text : 'Member',
                      style : 'body'
                    }
                    ,
                    {
                      text : '',
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
          },'','','','','','','','','','','','','','',{
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
              rowHeaders[15],
              {
                style : 'body',
                text:''
              }
            ],
            rows[0],
            rows[1],
            rows[2],
            rows[3],
            rows[4],
            rows[5],
            rows[6],
            rows[7],
            rows[8],
            rows[9],
            rows[10],
            rows[11],
            rows[12],
            rows[13],
            rows[14],
            rows[15],
            rows[16],
            rows[17]
          ],
        }
      },
      {
        text:' ',
        style:'bodySmall'
      },
      {
        layout:'noBorders',
        table : {
          body:[
            [
              {
                table: {
                  widths:[70,96],
                  body: [
                  [
                    {
                      text : 'Berat Part',
                      style : 'body'
                    }
                    ,
                    {
                      text : 'RH :     LH:     ',
                      style : 'body'
                    }
                  ],
                  [
                    {
                      text : 'Berat Runner',
                      style : 'body'
                    }
                    ,
                    {
                      text : 'RH :     LH:     ',
                      style : 'body'
                    }
                  ],
                  [
                    {
                      text : 'Target NG',
                      style : 'body'
                    }
                    ,
                    {
                      text : 15,
                      style : 'body'
                    }
                  ],
                  [
                    {
                      text : 'Finish',
                      style : 'body'
                    },
                    {
                      text : 'finish',
                      style : 'body'
                    }
                  ],
                  [
                    {
                      text : 'Operation Time',
                      style : 'body'
                    },
                    {
                      text : 'operationTime',
                      style : 'body'
                    }
                  ],
                  [
                    {
                      text : 'Total Line Stop',
                      style : 'body'
                    },
                    {
                      text : 'totalLineStop',
                      style : 'body'
                    }
                  ]
                ]
                }
              },
              {
                table: {
                  widths:[70,96],
                  body: [
                  [
                    {
                      text : 'Ng Setting (Pcs)',
                      style : 'body'
                    }
                    ,
                    {
                      text : 'RH :     LH:     ',
                      style : 'body'
                    }
                  ],
                  [
                    {
                      text : 'Gumpalan (Kg)',
                      style : 'body'
                    }
                    ,
                    {
                      text : '',
                      style : 'body'
                    }
                  ],
                  [
                    {
                      text : 'Runner (Kg)',
                      style : 'body'
                    }
                    ,
                    {
                      text : '',
                      style : 'body'
                    }
                  ],
                  [
                    {
                      text : 'Achievement Rate',
                      style : 'body'
                    }
                    ,
                    {
                      text : 'RH :     LH:     ',
                      style : 'body'
                    }
                  ],
                  [
                    {
                      text : 'NG Rate',
                      style : 'body'
                    }
                    ,
                    {
                      text : 'RH :     LH:     ',
                      style : 'body'
                    }
                  ],
                  [
                    {
                      text : 'Stop Inline Rate',
                      style : 'body'
                    }
                    ,
                    {
                      text : '',
                      style : 'body'
                    }
                  ]
                ]
                }
              },
              {
                table: {
                  heights:['*',54],
                  widths:[56,56,56],
                  body: [
                  [
                    {
                      text : 'Ng Setting (Pcs)',
                      style : 'body'
                    },
                    {
                      text : 'RH :     LH:     ',
                      style : 'body'
                    },
                    {
                      text : 'Ng Setting (Pcs)',
                      style : 'body'
                    }
                  ],
                  [
                    {
                      text : 'Gumpalan (Kg)',
                      style : 'body'
                    },
                    {
                      text : 'Test',
                      style : 'body'
                    },
                    {
                      text : 'Ng Setting (Pcs)',
                      style : 'body'
                    }

                  ]
                ]
                }
              }
            ]
          ]
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
  pdfDoc.end()
  return pdfDoc
}

module.exports = {
    createDoc
}
