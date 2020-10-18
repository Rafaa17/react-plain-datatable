# react-plain-datatable

react-plain-datatable is a plain Typed React package for dealing with datatables.

![Alt text](samples/screenshot.PNG?raw=true "Title")

## Installation

```bash
npm i react-plain-datatable
```

## Usage

```jsx padded

import Datatable from 'react-plain-datatable';

const testData = [
    {"full_name":"Kareem Greser","phone":"586-199-2075","email":"kgreser0@chronoengine.com","city":"Tabasalu"},
    {"full_name":"Joela Haston","phone":"576-110-6942","email":"jhaston1@hexun.com","city":"Brondong"},
    {"full_name":"Zorine Fursse","phone":"823-363-1243","email":"zfursse2@yahoo.com","city":"Pilar do Sul"},
    {"full_name":"Rowan Eves","phone":"848-661-4748","email":"reves3@cafepress.com","city":"Buyant"}
];

const MyComponent = () => {

    return (
        <>
            <div style={{padding: 50}}>
                <Datatable
                    rowClick={(row) => console.log(JSON.stringify(row))}
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

export default MyComponent;
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)