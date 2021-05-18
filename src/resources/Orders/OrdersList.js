import React from "react";
import {Filter, AutocompleteInput, ReferenceInput, DateInput, TextField, ReferenceField, Datagrid, List, DateField, NumberField, ChipField, ReferenceManyField, SingleFieldList} from 'react-admin';

const OrderFilter = (props) => (
    <Filter {...props}>
        <DateInput label="Start Date(Pickup)" source="scheduledPickupDate[after]" alwaysOn/>
        <DateInput label="End Date(Pickup)" source="scheduledPickupDate[before]" alwaysOn/>
        <DateInput label="Start Date(Return)" source="scheduledReturnDate[after]" alwaysOn/>
        <DateInput label="End Date(Return)" source="scheduledReturnDate[before]" alwaysOn/>
        <ReferenceInput label="Station Name" source="pickupStation" reference="stations">
            <AutocompleteInput optionText="name" optionId="id"/>
        </ReferenceInput>
    </Filter>
);

const OrdersList = props => {
    return (
        <>
            <List {...props}
                    filters={<OrderFilter />}
                    sort={{field: 'order', order: 'ASC'}}
                    perPage={10}
                >
                    <Datagrid optimized>
                        <TextField source="store"/>
                        <TextField source="status"/>
                        <NumberField source="grandTotal" options={{ style: 'currency', currency: 'EUR' }}/>
                        <DateField source="scheduledPickupDate" />
                        <DateField source="scheduledReturnDate" />
                        <ReferenceField source="pickupStation" reference="stations">
                            <TextField source="name"/>
                        </ReferenceField>
                        <ReferenceField source="returnStation" reference="stations">
                            <TextField source="name"/>
                        </ReferenceField>
                        <ReferenceManyField label="Order Items" reference="order_items" target="order">
                            <Datagrid>
                                <TextField label="Product Name" source="name" />
                                <TextField source="quantity" />
                            </Datagrid>
                        </ReferenceManyField>
                    </Datagrid>
            </List>
        </>
    )
}

export default OrdersList;
