import React, {Fragment} from "react";
import {Button} from "reactstrap";
import {DynamicObject} from "./Utils";
import {IDatatableField} from "./DatatableFieldModel";

interface DatatableFooterProps<T> {
    totalData: number;
    visibleData: Array<T>;
    fields: Array<IDatatableField<T>>;
    visibleColumns: DynamicObject;
    page: number;
    totalPages: number;
    prevPage: () => void;
    nextPage: () => void;
}

const DatatableFooter = <T extends object>({
                                               totalData,
                                               visibleData,
                                               fields,
                                               visibleColumns,
                                               page,
                                               totalPages,
                                               prevPage,
                                               nextPage,
                                           }: DatatableFooterProps<T>) => {
    return (
        <Fragment>
            <tr className="datatable-footer-row datatable-footer">
                {visibleData ? (
                    <>
                        <td className={'datatable-col'}>
                            <div>
                                <b>Total {totalData} records</b>
                            </div>
                        </td>
                        {fields.map((field, index: number) => {
                            if (index === 0 || !visibleColumns[index]) return null;
                            if (field.calculateTotal)
                                return (
                                    <td className={'datatable-col'} key={index}>
                                        {/* @ts-ignore */}
                                        {field.calculateTotal(visibleData)}
                                    </td>
                                );
                            return (
                                <td className={'datatable-col'} key={index}/>
                            );
                        })}
                    </>
                ) : null}
            </tr>
            <tr>
                <td className={'datatable-col'}>
                    <h6>
                        Page {page + 1} of {totalPages}
                    </h6>
                </td>
                <td className={'text-right'} colSpan={1000}>
                    <Button onClick={prevPage}>Prev</Button>
                    <Button onClick={nextPage} style={{marginLeft: 10}}>
                        Next
                    </Button>
                </td>
            </tr>
        </Fragment>
    );
};

export default DatatableFooter;