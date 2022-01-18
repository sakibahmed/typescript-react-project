import React from "react";

 const  DataGridFooter = (props : any) => {
    const { numberOfRows, footerHeight } = props;

    return (
        <div className="data-grid-footer" style={{height: footerHeight}}>
            <div>
                Total Rows : {numberOfRows} 
            </div>            
        </div>
    );
}

export default React.memo(DataGridFooter);