import React from 'react';
import Datatable from './lib'

import testData from './mockData.json';

const MyComponent = () => {

    return (
        <>
            <div style={{padding: 50}}>
                <Datatable
                    rowClick={(row) => alert(`You clicked \n\n${JSON.stringify(row)}`)}
                    data={testData}
                    fields={[
                        {name: "Full Name", value: "full_name"},
                        {name: "Phone", value: "phone"},
                        {name: "Email", value: "email"},
                        {name: "City", value: "city"},
                    ]}
                />
            </div>
        </>
    )
}

const App = () => {
    return (
        <MyComponent/>
    )
}

export const Setup = () => {
    return (
        <App/>
    )
}

