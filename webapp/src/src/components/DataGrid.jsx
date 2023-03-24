import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from "@mui/material";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'slug',
        width: 150,
        sortable: true,
        headerName: 'Slug',
        renderCell: (params: GridRenderCellParams<Date>) => (
            <strong>
                <Link href={'http://investidor10.com.br/acoes/' + params.value} target="_blank">
                    { params.value }
                </Link>
            </strong>
        )
    },
    {
        field: 'name',
        headerName: 'Nome',
        width: 150,
        sortable: true,
    },
    {
        field: 'current_price',
        headerName: 'Preço atual',
        type: 'number',
        width: 150,
        sortable: true,
        align: 'right',
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            var valueFormatted = new Intl.NumberFormat('pt-BR', { }).format(params.value.toFixed(2));

            return `R$ ${valueFormatted}`;
        }
    },
    {
        field: 'fundamental_value',
        headerName: 'Valor justo',
        type: 'number',
        sortable: true,
        width: 160,
        align: 'right',
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            var valueFormatted = new Intl.NumberFormat('pt-BR', { }).format(params.value.toFixed(2));

            return `R$ ${valueFormatted}`;
        },
    },
    {
        field: 'pvp',
        headerName: 'P/VP',
        type: 'number',
        width: 110,
        sortable: true
    },
    {
        field: 'growing_expectation',
        headerName: 'Probabilidade de crescimento',
        type: 'number',
        width: 200,
        sortable: true,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            const valueFormatted = new Intl.NumberFormat('pt-BR', { }).format(params.value.toFixed(2));

            return `${valueFormatted} %`;
        },
    },
    {
        field: 'dy',
        headerName: 'DY',
        type: 'number',
        width: 110,
        sortable: true,
        align: 'right',
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            const valueFormatted =
                new Intl.NumberFormat('pt-BR', { }).format(params.value.toFixed(2));

            return `${valueFormatted} %`;
        },
    },
    {
        field: 'pl',
        headerName: 'P/L',
        type: 'number',
        width: 70,
        sortable: true,
        align: 'right',
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            const valueFormatted = new Intl.NumberFormat('pt-BR', { }).format(params.value.toFixed(2));

            return `${valueFormatted}`;
        },
    },
    {
        field: 'roe',
        headerName: 'ROE',
        type: 'number',
        width: 110,
        sortable: true,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            const valueFormatted = new Intl.NumberFormat('pt-BR', { }).format(params.value.toFixed(2));

            return `${valueFormatted} %`;
        },
    },
    {
        field: 'net_margin',
        headerName: 'Margem líquida',
        type: 'number',
        width: 110,
        sortable: true,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            const valueFormatted = new Intl.NumberFormat('pt-BR', { }).format(params.value.toFixed(2));

            return `${valueFormatted} %`;
        },
    },
    {
        field: 'net_debt_ebitda',
        headerName: 'Dívida líquida / EBITIDA',
        type: 'number',
        width: 200,
        sortable: true,
        align: 'right',
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            const valueFormatted = new Intl.NumberFormat('pt-BR', { }).format(params.value.toFixed(2));

            return `${valueFormatted} %`;
        },
    },
    {
        field: 'updated_at',
        headerName: 'Updated at',
        type: 'dateTime',
        width: 110,
        sortable: true,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }

            const date = new Date(params.value);
            return(date.toLocaleString('pt-BR', { timezone: 'UTC' }));
        },
    }
];

export default function DataGridDemo({ rows }) {
    return (
        <Box minHeight={ 300 } sx={{ width: '100%', backgroundColor: 'white' }} >
            <DataGrid
                rows={ rows }
                columns={ columns }
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                    ...rows.initialState,
                    filter: {
                        filterModel: {
                            items: [
                                { field: 'growing_expectation', operator: '>', value: 0 },
                                { field: 'pvp', operator: '>', value: 1 },
                            ],
                        },
                    },
                    sorting: {
                        sortModel: [{ field: 'growing_expectation', sort: 'desc' }],
                    },
                }}
                stat
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                autoHeight={ true }
            />
        </Box>
    );
}
