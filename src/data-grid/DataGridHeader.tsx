const sortColumnMap: any = {};

export default function DataGridHeader(props : any){
    const { gridRowData, gridOptions, sortRows } = props,
        { columnDefinitions, headerHeight, enableSorting } = gridOptions;

    const classNames: any = {};
    for(let col of columnDefinitions){         
        classNames[col.field] = col.className;            
    }

    const getClassName = (field: any) => {        
        return classNames[field] ? classNames[field]: '';
    }        
    
    const sortFn = (event: any, col: any) => {
        const {field, customSort} = col;
        let sortedRows = [];
      
        if(!sortColumnMap[col.field]){
            sortColumnMap[col.field] = '';
        }

        let order = sortColumnMap[col.field];
      
        if(!order ||  order === 'dsc'){
            order = 'asc'
        }else{
            order = 'dsc'
        }

        sortColumnMap[col.field] = order;

        if(customSort){
          sortedRows = customSort(field, gridRowData, order);          
        }else{
            sortedRows =  (gridRowData as []).sort( (a,b) => {
                if(typeof a[field] === 'number'){                     
                   return order === 'asc' ?  a[field] - b[field] : b[field] - a[field];    
                }
    
                if(typeof a[field] === 'string'){
                    return order === 'asc' ?  (a[field] as string).localeCompare(b[field] as string)
                    : (b[field] as string).localeCompare(a[field] as string);
                }
    
                return -1;
            });
        }       
        
        sortRows([...sortedRows]);
    };

    const getSortOrder = (field: any) => {
        let cellClass = "data-grid-header-cell-sortable ",
            sortOrder = sortColumnMap[field];
                
        if(sortOrder === 'asc'){
            cellClass += 'arrow-up';
        } 
        if(sortOrder === 'dsc'){
            cellClass += 'arrow-down';
        }
        
        return cellClass;
    };

    return (
        <div className="data-grid-header">
            {
                columnDefinitions.map((col: any, index: number) => {
                    let className="data-grid-header-cell data-grid-cell " + getClassName(col.field),
                        sortClassName = getSortOrder(col.field);
                        
                    return (
                        <div className={className}  key={index}
                         style={{height: headerHeight}} 
                         onClick={ (event: any) =>  sortFn(event,col)}>
                           <div className="data-grid-header-cell-label">
                                {col.columnName}
                           </div> 

                          { enableSorting && col.sortable && 
                              <div className={sortClassName}>
                              </div>
                          }                            
                        </div>
                    );
                })
            }
        </div>
    );
}