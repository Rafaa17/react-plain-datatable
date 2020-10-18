import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import {Button, Input} from "reactstrap";

interface DatatableHeaderActionsProps {
    setShowSearch: Dispatch<SetStateAction<boolean>>;
    showSearch: boolean;
    limitsPerPage: Array<number>;
    changeLimit: (event: ChangeEvent<HTMLInputElement>) => void;
}

const DatatableHeaderActions = (props: DatatableHeaderActionsProps) => {

    const {setShowSearch, showSearch, changeLimit, limitsPerPage} = props;

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Button onClick={() => setShowSearch(!showSearch)}>Search</Button>
            <div>
                <h6>Limit Per Page </h6>
                <Input onChange={changeLimit} type={'select'}>
                    {limitsPerPage.map((val) => (
                        <option value={val}>{val}</option>
                    ))}
                </Input>
            </div>
        </div>
    )
}

export default DatatableHeaderActions;