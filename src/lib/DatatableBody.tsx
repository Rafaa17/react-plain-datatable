import React, {Fragment} from "react";
import {DynamicObject, getNestedObjectElement} from "./Utils";
import {IDatatableField} from "./DatatableFieldModel";

interface DatatableBodyParams<T> {
    visibleData: Array<T>;
    fields: Array<IDatatableField<T>>;
    renderRow?: (row: T, index: number) => JSX.Element;
    // renderExpand: (row: DynamicObject) => JSX.Element;
    rowClick?: (row: T, index: number) => void;
    visibleColumns: DynamicObject;
}

const DatatableBody = <T extends object>({
                                             visibleData,
                                             renderRow,
                                             rowClick,
                                             fields,
                                             visibleColumns,
                                             // expanded,
                                         }: DatatableBodyParams<T>) => {
    return (
        <Fragment>
            {visibleData.map((entry, entryIndex) => (
                <Fragment key={entryIndex}>
                    {!renderRow ? (
                        <tr
                            className={'datatable-row datatable-body-row'}
                            style={{
                                cursor: 'pointer',
                            }}
                            key={entryIndex}
                            onClick={() => rowClick ? rowClick(entry, entryIndex) : null}
                        >
                            {fields.map((field, index) => {
                                if (!visibleColumns[index]) return null;
                                if (!field.hasOwnProperty("render")) {
                                    // @ts-ignore
                                    // @ts-ignore
                                    // @ts-ignore
                                    return Array.isArray(field.value) ? (
                                        <td
                                            key={index}
                                            className={'datatable-col'}
                                            style={{
                                                color: field.onClick ? "royalblue" : 'black',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() =>
                                                field.onClick ? field.onClick(entry) : () => {
                                                }
                                            }
                                        >
                                            {getNestedObjectElement(field.value, entry)}
                                        </td>
                                        //@ts-ignore
                                    ) : entry[field.value!] ? (
                                        <td
                                            key={index}
                                            className={'datatable-col'}
                                            style={{
                                                textDecoration: field.onClick ? "underline" : 'none',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() =>
                                                field.onClick ? field.onClick(entry) : () => {
                                                }
                                            }
                                        >
                                            {/* @ts-ignore */}
                                            {entry[field.value!]}
                                        </td>
                                    ) : (
                                        <td key={index} className={'datatable-col'}/>
                                    );
                                } else {
                                    return (
                                        <td className={'datatable-col'}>
                                            {field.render ? field.render(entry, entryIndex) : null}
                                        </td>
                                    );
                                }
                            })}
                        </tr>
                    ) : (
                        renderRow(entry, entryIndex)
                    )}
                    {/*{renderExpand && expanded === entryIndex ? (*/}
                    {/*    <div>*/}
                    {/*        <div colSpan="100%">*/}
                    {/*            <div style={{animation: "expand .5s forwards"}}>*/}
                    {/*                {renderExpand(entry)}*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*) : null}*/}
                </Fragment>
            ))}
        </Fragment>
    );
};

export default DatatableBody;