import React, {Dispatch, SetStateAction} from "react";
import {Input} from "reactstrap";
import {DynamicObject} from "./Utils";
import {IDatatableField} from "./DatatableFieldModel";

interface DatatableHeaderProps<T> {
    searchTerms: DynamicObject;
    showSearch: boolean;
    fields: Array<IDatatableField<T>>;
    visibleColumns: DynamicObject;
    setShowSettings: Dispatch<SetStateAction<boolean>>;
    showSettings: boolean;
    setVisibleColumns: Dispatch<SetStateAction<DynamicObject>>;
    changeSort: (field: IDatatableField<T>) => void;
    setSearchTerms: Dispatch<SetStateAction<DynamicObject>>;
    sort: { field: string | undefined, direction: string };
}

const DatatableHeader = <T extends object>({
                                               visibleColumns,
                                               fields,
                                               changeSort,
                                               sort,
                                               showSearch,
                                               searchTerms,
                                               setSearchTerms,
                                           }: DatatableHeaderProps<T>) => {


    return (
        <tr className={'datatable-row datatable-header-row'}>
            {fields.map((field, index) => {
                if (!visibleColumns[index]) return null;
                return (
                    <th
                        className={'datatable-col'}
                        // style={{ cursor: "pointer", width: field.width || undefined }}
                        key={index}
                        style={{flexDirection: "column"}}
                    >
                        <div
                            style={{cursor: "pointer"}}
                            onClick={() => changeSort(field)}
                        >
                            {field.name}
                            {sort.field === field.value ? (
                                <i
                                    className={
                                        sort.direction === "asc"
                                            ? "fa fa-angle-up"
                                            : "fa fa-angle-down"
                                    }
                                />
                            ) : null}
                        </div>
                        {showSearch ? (
                            <div>
                                <Input
                                    onChange={(event) => {
                                        if (Array.isArray(field.value))
                                            setSearchTerms({
                                                ...searchTerms,
                                                [field.value[field.value.length - 1]]:
                                                event.target.value,
                                            });
                                        else
                                            setSearchTerms({
                                                ...searchTerms,
                                                [field.value!]: event.target.value,
                                            });
                                    }}
                                    type="text"
                                />
                            </div>
                        ) : null}
                    </th>
                );
            })}
        </tr>
    );
};

export default DatatableHeader;

{/*<div>*/
}
{/*  <div style={{ display: "flex", flexDirection: "row" }}>*/
}
{/*    <div>*/
}
{/*      <Button*/
}
{/*        style={{ marginRight: 5 }}*/
}
{/*        onClick={() => setShowSettings(!showSettings)}*/
}
{/*      >*/
}
{/*        Settings*/
}
{/*      </Button>*/
}
{/*      {showSettings ? (*/
}
{/*        <div*/
}
{/*          style={{*/
}
{/*            minHeight: "200px",*/
}
{/*            borderRadius: 10,*/
}
{/*            position: "absolute",*/
}
{/*            backgroundColor: "white",*/
}
{/*            boxShadow: "5px 5px 10px",*/
}
{/*            animation: "slideDownFade .2s forwards",*/
}
{/*            marginTop: 5,*/
}
{/*          }}*/
}
{/*        >*/
}
{/*          {fields.map((field, index) =>*/
}
{/*            field.name !== "" ? (*/
}
{/*              <div key={index} style={{ margin: 10 }}>*/
}
{/*                <label*/
}
{/*                  style={{*/
}
{/*                    display: "flex",*/
}
{/*                    alignItems: "center",*/
}
{/*                    justifyContent: "space-between",*/
}
{/*                    cursor: "pointer",*/
}
{/*                    padding: "5px",*/
}
{/*                  }}*/
}
{/*                >*/
}
{/*                  {field.name}*/
}
{/*                  <input*/
}
{/*                    style={{ cursor: "pointer", marginLeft: "5px" }}*/
}
{/*                    onChange={() =>*/
}
{/*                      setVisibleColumns({*/
}
{/*                        ...visibleColumns,*/
}
{/*                        [index]: !visibleColumns[index],*/
}
{/*                      })*/
}
{/*                    }*/
}
{/*                    checked={visibleColumns[index]}*/
}
{/*                    type="checkbox"*/
}
{/*                  />*/
}
{/*                </label>*/
}
{/*              </div>*/
}
{/*            ) : null*/
}
{/*          )}*/
}
{/*        </div>*/
}
{/*      ) : null}*/
}
{/*    </div>*/
}
{/*</div>*/
}
{/*</div>*/
}