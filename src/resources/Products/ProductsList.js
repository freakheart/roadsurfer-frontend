import React from "react";
import {TextField, ReferenceField, Datagrid, List, DateField, NumberField} from 'react-admin';

const ProductsList = props => {
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

export default ProductsList;
