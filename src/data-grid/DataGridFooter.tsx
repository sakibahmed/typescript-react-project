export default function DataGridFooter(props : any){
    const { gridRowData } = props,
         {footerHeight} = props.gridOptions;
    return (
        <div className="data-grid-footer" style={{height: footerHeight}}>
            <div>
                Total Rows : {gridRowData.length} 
            </div>            
        </div>
    );
}