const path = require('path');
const { NONE } = require('sequelize');
const Roboto = require('./fonts/Roboto')

const createDoc = async ()=>{
  var fontPath = path.dirname('utils/PdfGenerator/fonts/')
  
  var PdfPrinter = require('pdfmake');
  var printer = new PdfPrinter(Roboto);
  var fs = require('fs');
  var rows = [
    [
      {
        style : 'body',
        text:'07:00'
      },{
        style : 'body',
        text:'08:00'
      },{
        style : 'body',
        text:'C'
      },'',{
        style : 'body',
        text:'D'
      },{
        style : 'body',
        text:'E'
      },{
        style : 'body',
        text:'F'
      },{
        style : 'body',
        text:'G'
      },{
        style : 'body',
        text:'H'
      },{
        style : 'body',
        text:'I'
      },{
        style : 'body',
        text:'J'
      },{
        style : 'body',
        text:'K'
      },{
        style : 'body',
        text:'L'
      },{
        style : 'body',
        text:'M'
      },{
        style : 'body',
        text:'N'
      },{
        style : 'body',
        text:'O'
      },{
        style : 'body',
        text:'P'
      }],
      [
        {
          style : 'body',
          text:'08:00'
        },{
          style : 'body',
          text:'09:00'
        },{
          style : 'body',
          text:'C'
        },'',{
          style : 'body',
          text:'D'
        },{
          style : 'body',
          text:'E'
        },{
          style : 'body',
          text:'F'
        },{
          style : 'body',
          text:'G'
        },{
          style : 'body',
          text:'H'
        },{
          style : 'body',
          text:'I'
        },{
          style : 'body',
          text:'J'
        },{
          style : 'body',
          text:'K'
        },{
          style : 'body',
          text:'L'
        },{
          style : 'body',
          text:'M'
        },{
          style : 'body',
          text:'N'
        },{
          style : 'body',
          text:'O'
        },{
          style : 'body',
          text:'P'
        }
      ]
  ]
  
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
            text:'Jenis NG '
          },'','','','','','','','',{
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
                text:'Bocor'
              },{
                style : 'body',
                text:'Crack'
              },{
                style : 'body',
                text:'Serabut'
              },{
                style : 'body',
                text:'Scracth'
              },{
                style : 'body',
                text:'Setting'
              },{
                style : 'body',
                text:'Dirty'
              },{
                style : 'body',
                text:'Slinkmark'
              },{
                style : 'body',
                text:'Black Dot'
              },{
                style : 'body',
                text:'Other'
              },{
                style : 'body',
                text:''
              }],
              rows[0],
              rows[1],
                [
                  {
                    style : 'body',
                    text:'09:00'
                  },{
                    style : 'body',
                    text:'10:00'
                  },{
                    style : 'body',
                    text:'C'
                  },'',{
                    style : 'body',
                    text:'D'
                  },{
                    style : 'body',
                    text:'E'
                  },{
                    style : 'body',
                    text:'F'
                  },{
                    style : 'body',
                    text:'G'
                  },{
                    style : 'body',
                    text:'H'
                  },{
                    style : 'body',
                    text:'I'
                  },{
                    style : 'body',
                    text:'J'
                  },{
                    style : 'body',
                    text:'K'
                  },{
                    style : 'body',
                    text:'L'
                  },{
                    style : 'body',
                    text:'M'
                  },{
                    style : 'body',
                    text:'N'
                  },{
                    style : 'body',
                    text:'O'
                  },{
                    style : 'body',
                    text:'P'
                  }
                ],
                [
                  {
                    style : 'body',
                    text:'10:00'
                  },{
                    style : 'body',
                    text:'11:00'
                  },{
                    style : 'body',
                    text:'C'
                  },'',{
                    style : 'body',
                    text:'D'
                  },{
                    style : 'body',
                    text:'E'
                  },{
                    style : 'body',
                    text:'F'
                  },{
                    style : 'body',
                    text:'G'
                  },{
                    style : 'body',
                    text:'H'
                  },{
                    style : 'body',
                    text:'I'
                  },{
                    style : 'body',
                    text:'J'
                  },{
                    style : 'body',
                    text:'K'
                  },{
                    style : 'body',
                    text:'L'
                  },{
                    style : 'body',
                    text:'M'
                  },{
                    style : 'body',
                    text:'N'
                  },{
                    style : 'body',
                    text:'O'
                  },{
                    style : 'body',
                    text:'P'
                  }
                ],
                [
                  {
                    style : 'body',
                    text:'11:00'
                  },{
                    style : 'body',
                    text:'12:00'
                  },{
                    style : 'body',
                    text:'C'
                  },'',{
                    style : 'body',
                    text:'D'
                  },{
                    style : 'body',
                    text:'E'
                  },{
                    style : 'body',
                    text:'F'
                  },{
                    style : 'body',
                    text:'G'
                  },{
                    style : 'body',
                    text:'H'
                  },{
                    style : 'body',
                    text:'I'
                  },{
                    style : 'body',
                    text:'J'
                  },{
                    style : 'body',
                    text:'K'
                  },{
                    style : 'body',
                    text:'L'
                  },{
                    style : 'body',
                    text:'M'
                  },{
                    style : 'body',
                    text:'N'
                  },{
                    style : 'body',
                    text:'O'
                  },{
                    style : 'body',
                    text:'P'
                  }
                ],
                [
                  {
                    style : 'body',
                    text:'13:00'
                  },{
                    style : 'body',
                    text:'14:00'
                  },{
                    style : 'body',
                    text:'C'
                  },'',{
                    style : 'body',
                    text:'D'
                  },{
                    style : 'body',
                    text:'E'
                  },{
                    style : 'body',
                    text:'F'
                  },{
                    style : 'body',
                    text:'G'
                  },{
                    style : 'body',
                    text:'H'
                  },{
                    style : 'body',
                    text:'I'
                  },{
                    style : 'body',
                    text:'J'
                  },{
                    style : 'body',
                    text:'K'
                  },{
                    style : 'body',
                    text:'L'
                  },{
                    style : 'body',
                    text:'M'
                  },{
                    style : 'body',
                    text:'N'
                  },{
                    style : 'body',
                    text:'O'
                  },{
                    style : 'body',
                    text:'P'
                  }
                ],
                [
                  {
                    style : 'body',
                    text:'14:00'
                  },{
                    style : 'body',
                    text:'15:00'
                  },{
                    style : 'body',
                    text:'C'
                  },'',{
                    style : 'body',
                    text:'D'
                  },{
                    style : 'body',
                    text:'E'
                  },{
                    style : 'body',
                    text:'F'
                  },{
                    style : 'body',
                    text:'G'
                  },{
                    style : 'body',
                    text:'H'
                  },{
                    style : 'body',
                    text:'I'
                  },{
                    style : 'body',
                    text:'J'
                  },{
                    style : 'body',
                    text:'K'
                  },{
                    style : 'body',
                    text:'L'
                  },{
                    style : 'body',
                    text:'M'
                  },{
                    style : 'body',
                    text:'N'
                  },{
                    style : 'body',
                    text:'O'
                  },{
                    style : 'body',
                    text:'P'
                  }
                ],
                [
                  {
                    style : 'body',
                    text:'15:00'
                  },{
                    style : 'body',
                    text:'16:00'
                  },{
                    style : 'body',
                    text:'C'
                  },'',{
                    style : 'body',
                    text:'D'
                  },{
                    style : 'body',
                    text:'E'
                  },{
                    style : 'body',
                    text:'F'
                  },{
                    style : 'body',
                    text:'G'
                  },{
                    style : 'body',
                    text:'H'
                  },{
                    style : 'body',
                    text:'I'
                  },{
                    style : 'body',
                    text:'J'
                  },{
                    style : 'body',
                    text:'K'
                  },{
                    style : 'body',
                    text:'L'
                  },{
                    style : 'body',
                    text:'M'
                  },{
                    style : 'body',
                    text:'N'
                  },{
                    style : 'body',
                    text:'O'
                  },{
                    style : 'body',
                    text:'P'
                  }
                ],
                [
                  {
                    style : 'body',
                    text:'16:00'
                  },{
                    style : 'body',
                    text:'17:00'
                  },{
                    style : 'body',
                    text:'C'
                  },'',{
                    style : 'body',
                    text:'D'
                  },{
                    style : 'body',
                    text:'E'
                  },{
                    style : 'body',
                    text:'F'
                  },{
                    style : 'body',
                    text:'G'
                  },{
                    style : 'body',
                    text:'H'
                  },{
                    style : 'body',
                    text:'I'
                  },{
                    style : 'body',
                    text:'J'
                  },{
                    style : 'body',
                    text:'K'
                  },{
                    style : 'body',
                    text:'L'
                  },{
                    style : 'body',
                    text:'M'
                  },{
                    style : 'body',
                    text:'N'
                  },{
                    style : 'body',
                    text:'O'
                  },{
                    style : 'body',
                    text:'P'
                  }
                ],
                [
                  {
                    style : 'body',
                    text:'17:00'
                  },{
                    style : 'body',
                    text:'18:00'
                  },{
                    style : 'body',
                    text:'C'
                  },'',{
                    style : 'body',
                    text:'D'
                  },{
                    style : 'body',
                    text:'E'
                  },{
                    style : 'body',
                    text:'F'
                  },{
                    style : 'body',
                    text:'G'
                  },{
                    style : 'body',
                    text:'H'
                  },{
                    style : 'body',
                    text:'I'
                  },{
                    style : 'body',
                    text:'J'
                  },{
                    style : 'body',
                    text:'K'
                  },{
                    style : 'body',
                    text:'L'
                  },{
                    style : 'body',
                    text:'M'
                  },{
                    style : 'body',
                    text:'N'
                  },{
                    style : 'body',
                    text:'O'
                  },{
                    style : 'body',
                    text:'P'
                  }
                ],
                [
                  {
                    style : 'body',
                    text:'18:00'
                  },{
                    style : 'body',
                    text:'19:00'
                  },{
                    style : 'body',
                    text:'C'
                  },'',{
                    style : 'body',
                    text:'D'
                  },{
                    style : 'body',
                    text:'E'
                  },{
                    style : 'body',
                    text:'F'
                  },{
                    style : 'body',
                    text:'G'
                  },{
                    style : 'body',
                    text:'H'
                  },{
                    style : 'body',
                    text:'I'
                  },{
                    style : 'body',
                    text:'J'
                  },{
                    style : 'body',
                    text:'K'
                  },{
                    style : 'body',
                    text:'L'
                  },{
                    style : 'body',
                    text:'M'
                  },{
                    style : 'body',
                    text:'N'
                  },{
                    style : 'body',
                    text:'O'
                  },{
                    style : 'body',
                    text:'P'
                  }
                ],
                [
                  {
                    colSpan:2,
                    style : 'body',
                    text:'Total'
                  },{
                    style : 'body',
                    text:''
                  },{
                    style : 'body',
                    text:'C'
                  },'',{
                    style : 'body',
                    text:'D'
                  },{
                    style : 'body',
                    text:'E'
                  },{
                    style : 'body',
                    text:'F'
                  },{
                    style : 'body',
                    text:'G'
                  },{
                    style : 'body',
                    text:'H'
                  },{
                    style : 'body',
                    text:'I'
                  },{
                    style : 'body',
                    text:'J'
                  },{
                    style : 'body',
                    text:'K'
                  },{
                    style : 'body',
                    text:'L'
                  },{
                    style : 'body',
                    text:'M'
                  },{
                    style : 'body',
                    text:'N'
                  },{
                    style : 'body',
                    text:'O'
                  },{
                    style : 'body',
                    text:'P'
                  }
                ],
                [
                  {
                    style : 'body',
                    text:'19:00'
                  },{
                    style : 'body',
                    text:'20:00'
                  },{
                    style : 'body',
                    text:'C'
                  },'',{
                    style : 'body',
                    text:'D'
                  },{
                    style : 'body',
                    text:'E'
                  },{
                    style : 'body',
                    text:'F'
                  },{
                    style : 'body',
                    text:'G'
                  },{
                    style : 'body',
                    text:'H'
                  },{
                    style : 'body',
                    text:'I'
                  },{
                    style : 'body',
                    text:'J'
                  },{
                    style : 'body',
                    text:'K'
                  },{
                    style : 'body',
                    text:'L'
                  },{
                    style : 'body',
                    text:'M'
                  },{
                    style : 'body',
                    text:'N'
                  },{
                    style : 'body',
                    text:'O'
                  },{
                    style : 'body',
                    text:'P'
                  }],
                  [
                    {
                      style : 'body',
                      text:'20:00'
                    },{
                      style : 'body',
                      text:'21:00'
                    },{
                      style : 'body',
                      text:'C'
                    },'',{
                      style : 'body',
                      text:'D'
                    },{
                      style : 'body',
                      text:'E'
                    },{
                      style : 'body',
                      text:'F'
                    },{
                      style : 'body',
                      text:'G'
                    },{
                      style : 'body',
                      text:'H'
                    },{
                      style : 'body',
                      text:'I'
                    },{
                      style : 'body',
                      text:'J'
                    },{
                      style : 'body',
                      text:'K'
                    },{
                      style : 'body',
                      text:'L'
                    },{
                      style : 'body',
                      text:'M'
                    },{
                      style : 'body',
                      text:'N'
                    },{
                      style : 'body',
                      text:'O'
                    },{
                      style : 'body',
                      text:'P'
                    }
                  ],
                  [
                    {
                      style : 'body',
                      text:'21:00'
                    },{
                      style : 'body',
                      text:'22:00'
                    },{
                      style : 'body',
                      text:'C'
                    },'',{
                      style : 'body',
                      text:'D'
                    },{
                      style : 'body',
                      text:'E'
                    },{
                      style : 'body',
                      text:'F'
                    },{
                      style : 'body',
                      text:'G'
                    },{
                      style : 'body',
                      text:'H'
                    },{
                      style : 'body',
                      text:'I'
                    },{
                      style : 'body',
                      text:'J'
                    },{
                      style : 'body',
                      text:'K'
                    },{
                      style : 'body',
                      text:'L'
                    },{
                      style : 'body',
                      text:'M'
                    },{
                      style : 'body',
                      text:'N'
                    },{
                      style : 'body',
                      text:'O'
                    },{
                      style : 'body',
                      text:'P'
                    }
                  ],
                  [
                    {
                      style : 'body',
                      text:'22:00'
                    },{
                      style : 'body',
                      text:'23:00'
                    },{
                      style : 'body',
                      text:'C'
                    },'',{
                      style : 'body',
                      text:'D'
                    },{
                      style : 'body',
                      text:'E'
                    },{
                      style : 'body',
                      text:'F'
                    },{
                      style : 'body',
                      text:'G'
                    },{
                      style : 'body',
                      text:'H'
                    },{
                      style : 'body',
                      text:'I'
                    },{
                      style : 'body',
                      text:'J'
                    },{
                      style : 'body',
                      text:'K'
                    },{
                      style : 'body',
                      text:'L'
                    },{
                      style : 'body',
                      text:'M'
                    },{
                      style : 'body',
                      text:'N'
                    },{
                      style : 'body',
                      text:'O'
                    },{
                      style : 'body',
                      text:'P'
                    }
                  ],
                  [
                    {
                      style : 'body',
                      text:'23:00'
                    },{
                      style : 'body',
                      text:'00:00'
                    },{
                      style : 'body',
                      text:'C'
                    },'',{
                      style : 'body',
                      text:'D'
                    },{
                      style : 'body',
                      text:'E'
                    },{
                      style : 'body',
                      text:'F'
                    },{
                      style : 'body',
                      text:'G'
                    },{
                      style : 'body',
                      text:'H'
                    },{
                      style : 'body',
                      text:'I'
                    },{
                      style : 'body',
                      text:'J'
                    },{
                      style : 'body',
                      text:'K'
                    },{
                      style : 'body',
                      text:'L'
                    },{
                      style : 'body',
                      text:'M'
                    },{
                      style : 'body',
                      text:'N'
                    },{
                      style : 'body',
                      text:'O'
                    },{
                      style : 'body',
                      text:'P'
                    }
                  ],
                  [
                    {
                      style : 'body',
                      text:'00:00'
                    },{
                      style : 'body',
                      text:'01:00'
                    },{
                      style : 'body',
                      text:'C'
                    },'',{
                      style : 'body',
                      text:'D'
                    },{
                      style : 'body',
                      text:'E'
                    },{
                      style : 'body',
                      text:'F'
                    },{
                      style : 'body',
                      text:'G'
                    },{
                      style : 'body',
                      text:'H'
                    },{
                      style : 'body',
                      text:'I'
                    },{
                      style : 'body',
                      text:'J'
                    },{
                      style : 'body',
                      text:'K'
                    },{
                      style : 'body',
                      text:'L'
                    },{
                      style : 'body',
                      text:'M'
                    },{
                      style : 'body',
                      text:'N'
                    },{
                      style : 'body',
                      text:'O'
                    },{
                      style : 'body',
                      text:'P'
                    }
                  ],
                  [
                    {
                      style : 'body',
                      text:'01:00'
                    },{
                      style : 'body',
                      text:'02:00'
                    },{
                      style : 'body',
                      text:'C'
                    },'',{
                      style : 'body',
                      text:'D'
                    },{
                      style : 'body',
                      text:'E'
                    },{
                      style : 'body',
                      text:'F'
                    },{
                      style : 'body',
                      text:'G'
                    },{
                      style : 'body',
                      text:'H'
                    },{
                      style : 'body',
                      text:'I'
                    },{
                      style : 'body',
                      text:'J'
                    },{
                      style : 'body',
                      text:'K'
                    },{
                      style : 'body',
                      text:'L'
                    },{
                      style : 'body',
                      text:'M'
                    },{
                      style : 'body',
                      text:'N'
                    },{
                      style : 'body',
                      text:'O'
                    },{
                      style : 'body',
                      text:'P'
                    }
                  ],
                  [
                    {
                      style : 'body',
                      text:'02:00'
                    },{
                      style : 'body',
                      text:'03:00'
                    },{
                      style : 'body',
                      text:'C'
                    },'',{
                      style : 'body',
                      text:'D'
                    },{
                      style : 'body',
                      text:'E'
                    },{
                      style : 'body',
                      text:'F'
                    },{
                      style : 'body',
                      text:'G'
                    },{
                      style : 'body',
                      text:'H'
                    },{
                      style : 'body',
                      text:'I'
                    },{
                      style : 'body',
                      text:'J'
                    },{
                      style : 'body',
                      text:'K'
                    },{
                      style : 'body',
                      text:'L'
                    },{
                      style : 'body',
                      text:'M'
                    },{
                      style : 'body',
                      text:'N'
                    },{
                      style : 'body',
                      text:'O'
                    },{
                      style : 'body',
                      text:'P'
                    }
                  ],
                  [
                    {
                      style : 'body',
                      text:'03:00'
                    },{
                      style : 'body',
                      text:'04:00'
                    },{
                      style : 'body',
                      text:'C'
                    },'',{
                      style : 'body',
                      text:'D'
                    },{
                      style : 'body',
                      text:'E'
                    },{
                      style : 'body',
                      text:'F'
                    },{
                      style : 'body',
                      text:'G'
                    },{
                      style : 'body',
                      text:'H'
                    },{
                      style : 'body',
                      text:'I'
                    },{
                      style : 'body',
                      text:'J'
                    },{
                      style : 'body',
                      text:'K'
                    },{
                      style : 'body',
                      text:'L'
                    },{
                      style : 'body',
                      text:'M'
                    },{
                      style : 'body',
                      text:'N'
                    },{
                      style : 'body',
                      text:'O'
                    },{
                      style : 'body',
                      text:'P'
                    }
                  ],
                  [
                    {
                      style : 'body',
                      text:'05:00'
                    },{
                      style : 'body',
                      text:'06:00'
                    },{
                      style : 'body',
                      text:'C'
                    },'',{
                      style : 'body',
                      text:'D'
                    },{
                      style : 'body',
                      text:'E'
                    },{
                      style : 'body',
                      text:'F'
                    },{
                      style : 'body',
                      text:'G'
                    },{
                      style : 'body',
                      text:'H'
                    },{
                      style : 'body',
                      text:'I'
                    },{
                      style : 'body',
                      text:'J'
                    },{
                      style : 'body',
                      text:'K'
                    },{
                      style : 'body',
                      text:'L'
                    },{
                      style : 'body',
                      text:'M'
                    },{
                      style : 'body',
                      text:'N'
                    },{
                      style : 'body',
                      text:'O'
                    },{
                      style : 'body',
                      text:'P'
                    }
                  ],
                  [
                    {
                      style : 'body',
                      text:'18:00'
                    },{
                      style : 'body',
                      text:'19:00'
                    },{
                      style : 'body',
                      text:'C'
                    },'',{
                      style : 'body',
                      text:'D'
                    },{
                      style : 'body',
                      text:'E'
                    },{
                      style : 'body',
                      text:'F'
                    },{
                      style : 'body',
                      text:'G'
                    },{
                      style : 'body',
                      text:'H'
                    },{
                      style : 'body',
                      text:'I'
                    },{
                      style : 'body',
                      text:'J'
                    },{
                      style : 'body',
                      text:'K'
                    },{
                      style : 'body',
                      text:'L'
                    },{
                      style : 'body',
                      text:'M'
                    },{
                      style : 'body',
                      text:'N'
                    },{
                      style : 'body',
                      text:'O'
                    },{
                      style : 'body',
                      text:'P'
                    }
                  ],
                  [
                    {
                      colSpan:2,
                      style : 'body',
                      text:'Total'
                    },{
                      style : 'body',
                      text:''
                    },{
                      style : 'body',
                      text:'C'
                    },'',{
                      style : 'body',
                      text:'D'
                    },{
                      style : 'body',
                      text:'E'
                    },{
                      style : 'body',
                      text:'F'
                    },{
                      style : 'body',
                      text:'G'
                    },{
                      style : 'body',
                      text:'H'
                    },{
                      style : 'body',
                      text:'I'
                    },{
                      style : 'body',
                      text:'J'
                    },{
                      style : 'body',
                      text:'K'
                    },{
                      style : 'body',
                      text:'L'
                    },{
                      style : 'body',
                      text:'M'
                    },{
                      style : 'body',
                      text:'N'
                    },{
                      style : 'body',
                      text:'O'
                    },{
                      style : 'body',
                      text:'P'
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
