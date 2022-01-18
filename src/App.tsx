import React, { useEffect, useState } from 'react';
import DataGrid from './data-grid/DataGrid';
import mockData from './mock-data/instruments';

declare type Instrument = {
  assetClass: string,
  price: number,
  ticker: string
}

function App() {  
  return (
    <div className="App">      
      <DataGrid gridOptions={gridOptions} rowData={mockData}></DataGrid>
    </div>
  );
}

const columnDefinitions = [
  {
    columnName: 'Asset Class',
    field: 'assetClass',
    sortable: true,
    customSort: (field: any, data: any[], order: any) => {
      return data.sort((a,b) =>{
        let u = a[field],
            v = b[field],
            result = 0,
            factor = order === 'asc' ? 1 : -1;

        if( u === 'Equities'){
          if(u > v || u < v){
            result = -1;
          }
          
          return result * factor;
        }

        if( u === 'Macro'){  
          if(u > v){
            result = 1;
            if(v === 'Credit'){
              result = -1;
            }            
          }
          if(u < v){
            result = -1;
          }
          return result * factor;
        }

        if( u === 'Credit'){  
          if(u > v || u < v){              
            result = 1;
          }
          return result * factor;
        }
        
        return result * factor;
      });
    },
    cellStyle: () => {
      return {
        flexBasis: '30%',
        flexShrink: 0,
        flexGrow: 0
      }
    }
  },
  {
    columnName: 'Price',
    field: 'price',
    sortable: true,
    customClassName: 'price',
    cellFormatter: (value: any) => {        
     return '$'+ Math.abs(value);
    },
    cellStyle: (value: any) => {    
      let style: any = {
        flexBasis: '25%',
        flexShrink: 0,
        flexGrow: 0
      };    
      if(value > 0){
        style.color = 'darkblue';
      }
      if(value < 0){
        style.color = 'red';
      }
      return style;
    }
  },
  {
    columnName: 'Ticker',
    field: 'ticker',
    sortable: true,  
  },    
];

const gridOptions = {
  columnDefinitions,    
  enableSorting: true,
  enablePagination: true,
  rowHeight: 30,
  headerHeight: 40,
  footerHeight: 40,
  gridHeight: 400,
  gridWidth: 700,
  setRowStyle: (data: any) => {      
    if(data.assetClass === 'Equities'){
      return {backgroundColor: 'deepskyblue'};
    }
    
    if(data.assetClass === 'Credit'){
      return {backgroundColor: 'lightgreen'};
    }

    if(data.assetClass === 'Macro'){
      return {backgroundColor: 'white'};
    }

    return null;
  }
};


export default App;
