import React, { useCallback, useState } from "react";
import DataGridBody from "./DataGridBody";
import DataGridHeader from "./DataGridHeader";
import DataGridFooter from "./DataGridFooter";
import './DataGrid.css';

const DataGrid = (props: any) => {   
    const [rows, setRows] = useState(props.rowData),       
        { gridHeight,footerHeight, gridWidth } = props.gridOptions; 

    const sortHandler = useCallback( (data: any) => {
        setRows(data)
    }, []);
 
    return (        
        <div className="data-grid-container"  style={{height: gridHeight, width: gridWidth }}>
            <DataGridHeader {...props} gridRowData={rows} sortHandler={sortHandler} />
            <DataGridBody {...props}  gridRowData={rows} />
            <DataGridFooter numberOfRows={rows.length} footerHeight={footerHeight}/>
        </div>
    );
}


export default DataGrid;