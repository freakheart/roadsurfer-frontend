import React from "react";
import {TextField, ReferenceField, Datagrid, List} from 'react-admin';

const OrderItemsList = props => {
    return (
        <>
            <List {...props}
                    filters={null}
                    sort={{field: 'order', order: 'ASC'}}
                    perPage={10}
                >
                    <Datagrid optimized>
                        <ReferenceField source="product" reference="products">
                            <TextField source="name"/>
                        </ReferenceField>
                        <ReferenceField source="order" reference="orders">
                            <TextField source="id"/>
                        </ReferenceField>
                    </Datagrid>

            </List>
        </>
    )
}

export default OrderItemsList;
