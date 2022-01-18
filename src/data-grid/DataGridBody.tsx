
 const cellFormatters: any = {},
        cellStyles: any = {},
        classNames: any = {};

const populateFields = (columnDefinitions: any) => {
    for(let col of columnDefinitions){
        cellFormatters[col.field] = col.cellFormatter;    
        cellStyles[col.field] = col.cellStyle;   
        classNames[col.field] = col.customClassName;            
    }
}
 
const DataGridBody = (props: any) => {    
    const  { gridRowData, gridOptions } = props,
            { setRowStyle, columnDefinitions, rowHeight,
            headerHeight, gridHeight, footerHeight } = gridOptions;

    populateFields(columnDefinitions);

    const getCellStyle = (field: any, value: any) => {        
        return cellStyles[field] ? cellStyles[field](value) : null;
    }

    const getCellFormatter = (field: any, value: any) => {        
        return cellFormatters[field] ? cellFormatters[field](value) : value;
    }

    let rowElements = gridRowData && gridRowData.map( (data: any, index: number) => {
        let rows = [];

        for(let field in data){
            let cellClassName = "data-grid-cell "+  ( classNames[field] ? classNames[field] : '');
            rows.push(
                <div className={cellClassName} key={field}
                 style={{height: rowHeight, ...getCellStyle(field, data[field])}}>
                    {getCellFormatter(field, data[field])}
                </div>
            );
        }

        return (
            <div className="data-grid-row"  key={index} style={setRowStyle(data)}>
                {rows}
            </div>
        );
                
    });

    if(!rowElements){
        return null;
    }
    return (
        <div className="data-grid-body" style={{height: gridHeight - (headerHeight+footerHeight) - 2}}>
            { rowElements }
        </div>
    );
}


export default DataGridBody;