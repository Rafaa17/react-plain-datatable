import React, {ChangeEvent, useCallback, useEffect, useState,} from "react";
import DatatableHeader from "./DatatableHeader";
import DatatableBody from "./DatatableBody";
import DatatableFooter from "./DatatableFooter";
import DatatableHeaderActions from "./DatatableHeaderActions";
import "./Datatable.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'reactstrap'
import {DynamicObject} from "./Utils";
import {IDatatableField} from "./DatatableFieldModel";

interface DatatableProps<T> {
    data: Array<T>;
    fields: Array<IDatatableField<T>>;
    renderRow?: (row: T, index: number) => JSX.Element;
    rowClick?: (row: T) => void;
    hover?: boolean;
    // renderExpand?: (row: any) => JSX.Element;
}

const Datatable = <T extends object>(props: DatatableProps<T>) => {

    const {
        data,
        fields,
        renderRow,
        rowClick,
    } = props;

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(Math.ceil(data.length / limit));
    const [sort, setSort] = useState<{ field: string | undefined, direction: string }>({field: "", direction: "desc"});
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerms, setSearchTerms] = useState<DynamicObject>({});
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [visibleColumns, setVisibleColumns] = useState<DynamicObject>({});
    const [visibleData, setVisibleData] = useState<Array<T>>([]);
    const limitsPerPage = [10, 20, 50, 100];

    const entriesComparator = useCallback(
        (a: T, b: T) => {
            if (!sort.field) return 0;
            if (sort.direction === "asc") {
                // @ts-ignore
                if (a[sort.field!] < b[sort.field]) return 1;
                // @ts-ignore
                if (b[sort.field] < a[sort.field]) return -1;
                return 0;
            }
            if (sort.direction === "desc") {
                // @ts-ignore
                if (b[sort.field] < a[sort.field]) return 1;
                // @ts-ignore
                if (a[sort.field] < b[sort.field]) return -1;
                return 0;
            }

            return 0;
        },
        [sort]
    );

    const filterData = useCallback(
        (entry: DynamicObject) => {
            if (Object.keys(searchTerms).length === 0) return true;
            let match = true;
            Object.keys(searchTerms).forEach((term) => {
                if (term !== "") {
                    let entryField = entry[term];
                    if (Array.isArray(entryField))
                        entryField = entry[entryField.length - 1];
                    if (
                        String(entryField)
                            .toLowerCase()
                            .includes(String(searchTerms[term]).toLowerCase())
                    )
                        match = true && match;
                    else match = false && match;
                } else {
                    match = true && match;
                }
            });
            return match;
        },
        [searchTerms]
    );

    useEffect(() => {
        if (data && data.length > 0) {
            // @ts-ignore
            let filteredData = data.filter(filterData) as Array<T>;
            let sortedData = filteredData.sort(entriesComparator);
            setVisibleData(sortedData.slice(page * limit, page * limit + limit));
        }
    }, [data, entriesComparator, filterData, limit, page]);

    useEffect(() => {
        let columns: DynamicObject = {};
        // @ts-ignore
        fields.map((field, index) => (columns[index] = true));
        setVisibleColumns(columns);
    }, [fields]);

    useEffect(() => {
        setTotalPages(Math.ceil(data.length / limit));
    }, [data, limit]);

    const nextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
            setTotalPages(Math.ceil(data.length / limit));
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage(page - 1);
            setTotalPages(Math.ceil(data.length / limit));
        }
    };

    const changeLimit = (event: ChangeEvent<HTMLInputElement>) => {
        setLimit(Number(event.target.value));
    };

    const changeSort = (field: IDatatableField<T>) => {
        setSort({
            field: field.value! as string,
            direction: sort.direction === "asc" ? "desc" : "asc",
        });
    };

    // @ts-ignore
    const onRowClick = (row: T, index: number) => {
        if (rowClick) rowClick(row);
        // if (renderExpand) {
        //   if (expanded === index) setExpanded(null);
        //   else setExpanded(index);
        // }
    };

    return (
        <Container fluid className={'datatable-container table-responsive'}>
            <DatatableHeaderActions setShowSearch={setShowSearch} showSearch={showSearch}
                                    limitsPerPage={limitsPerPage}
                                    changeLimit={changeLimit}/>
            <table style={{width: '100%'}} className={'table-hover table-lg'}>
                <thead>
                <DatatableHeader
                    showSettings={showSettings}
                    setShowSettings={setShowSettings}
                    setVisibleColumns={setVisibleColumns}
                    visibleColumns={visibleColumns}
                    fields={fields}
                    sort={sort}
                    showSearch={showSearch}
                    changeSort={changeSort}
                    searchTerms={searchTerms}
                    setSearchTerms={setSearchTerms}
                />
                </thead>
                <tbody>
                <DatatableBody
                    rowClick={onRowClick}
                    visibleData={visibleData}
                    renderRow={renderRow}
                    // renderExpand={renderExpand}
                    fields={fields}
                    visibleColumns={visibleColumns}
                />
                </tbody>
                <tfoot>
                <DatatableFooter
                    totalData={data.length}
                    visibleData={visibleData}
                    fields={fields}
                    visibleColumns={visibleColumns}
                    page={page}
                    totalPages={totalPages}
                    prevPage={prevPage}
                    nextPage={nextPage}
                />
                </tfoot>
            </table>
        </Container>
    )
        ;
};

export default Datatable
