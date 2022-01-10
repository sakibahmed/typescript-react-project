import React, { useState } from "react";
import DataGridBody from "./DataGridBody";
import DataGridHeader from "./DataGridHeader";
import DataGridFooter from "./DataGridFooter";
import './DataGrid.css';

export default function DataGrid(props: any){   
    const [rows, setRows] = useState(props.rowData),       
        { gridHeight } = props.gridOptions; 
 
    return (        
        <div className="data-grid-container"  style={{height: gridHeight}}>
            <DataGridHeader {...props} gridRowData={rows} sortRows={setRows} />
            <DataGridBody {...props}  gridRowData={rows} />
            <DataGridFooter {...props} gridRowData={rows} />
        </div>
    );
}


