import React from "react";
import {TextField, Datagrid, List} from 'react-admin';

const StationsList = props => {
    return (
        <>
            <List {...props}
                    filters={null}
                    sort={{field: 'order', order: 'ASC'}}
                    perPage={10}
                >
                    <Datagrid optimized>
                        <TextField source="name"/>
                    </Datagrid>

            </List>
        </>
    )
}

export default StationsList;
