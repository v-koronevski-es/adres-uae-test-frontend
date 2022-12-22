import { useState } from 'react';
import type { NextPage } from 'next';

import { getList } from 'lib/api/logger';
import { Log } from 'lib/types/logger';

import Table, { Column, FilterColumn } from 'components/Table';
import FiltersForm, { FormData } from 'components/LoggerTableFilters';

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

type HomeProps = {
  data: Log[];
};

export type FilterColumn = {
  columnAccessor: string;
  filterValue: any;
  isFullMatchFilter?: boolean;
};

const Home: NextPage<HomeProps> = ({ data }: HomeProps) => {
  const [filtersState, setFiltersState] = useState([] as FilterColumn[]);

  const handleFilterSubmit = (args: FormData) => {
    const filters = [] as FilterColumn[];
    if (args.logId) {
      filters.push({
        filterValue: args.logId,
        columnAccessor: 'logId',
      });
    }

    if (args.actionType) {
      filters.push({
        filterValue: args.actionType,
        columnAccessor: 'actionType',
      });
    }

    if (args.applicationType) {
      filters.push({
        filterValue: args.applicationType,
        columnAccessor: 'applicationType',
      });
    }

    if (args.applicationType) {
      filters.push({
        filterValue: args.applicationType,
        columnAccessor: 'applicationType',
      });
    }

    setFiltersState(filters);
  };

  return (
    <>
      <div>
        <FiltersForm onSubmit={handleFilterSubmit} />
        <Table rows={data} columns={columnsConfig} filters={filtersState} />
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
