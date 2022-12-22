import { useState } from 'react' 
import type { NextPage } from 'next';

import { getList } from 'lib/api/logger';
import { Log } from 'lib/types/logger';

import Table, { Column, FilterColumn } from 'components/Table';
import FiltersForm from 'components/LoggerTableFilters';

const columnsConfig: Column<any>[] = [
  {
    accessor: 'logId',
    title: 'Log ID',
    sortable: true,
  },
  {
    accessor: 'applicationType',
    title: 'Application Type',
    sortable: true,
  },
  {
    accessor: 'applicationId',
    title: 'Application ID',
    sortable: true,
  },
  {
    accessor: 'actionType',
    title: 'Action',
    sortable: true,
  },
  {
    accessor: 'empty',
    title: 'Action Details',
    sortable: true,
  },
  {
    accessor: 'creationTimestamp',
    title: 'Date:Time',
    sortable: true,
  },
];

const Home: NextPage = ({ data }: { data: Log[] }) => {
  const [filtersState, setFiltersState] = useState([] as FilterColumn[]);

  return (
    <>
      <div>
        <FiltersForm onSubmit={args => console.log(args)} />
        <Table rows={data} columns={columnsConfig} />
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const responce = await getList();

  return {
    props: {
      data: responce.data.result.auditLog,
    },
  };
}

export default Home;
