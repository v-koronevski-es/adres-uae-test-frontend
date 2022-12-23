import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { getList } from 'lib/api/logger';
import { Log } from 'lib/types/logger';
import { FilterColumn } from 'lib/utils/filter';

import Table, { Column } from 'components/Table';
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

const getDefaultFiltersValue = (filterState: FilterColumn[]) => {
  const defaultFilters: FormData = {};
  filterState.forEach(filterElement => {
    if (filterElement.columnAccessor === 'actionType') {
      defaultFilters.actionType = filterElement.filterValue;
    }
    if (filterElement.columnAccessor === 'applicationId') {
      defaultFilters.applicationId = filterElement.filterValue;
    }
    if (filterElement.columnAccessor === 'applicationType') {
      defaultFilters.applicationType = filterElement.filterValue;
    }
    if (filterElement.columnAccessor === 'logId') {
      defaultFilters.logId = filterElement.filterValue;
    }
    if (filterElement.columnAccessor === 'creationTimestamp') {
      if (filterElement.lessThenDate) {
        defaultFilters.toDate = filterElement.filterValue;
      } else {
        defaultFilters.fromDate = filterElement.filterValue;
      }
    }
  });
  return defaultFilters;
};

const Home: NextPage<HomeProps> = ({ data }: HomeProps) => {
  const router = useRouter();
  const [filtersState, setFiltersState] = useState(
    (JSON.parse((router.query.filters || '[]') as string) || []) as FilterColumn[],
  );

  const filterDefaultValue = getDefaultFiltersValue(JSON.parse((router.query.filters || '[]') as string));

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

    if (args.applicationId) {
      filters.push({
        filterValue: args.applicationId,
        columnAccessor: 'applicationId',
      });
    }

    if (args.fromDate) {
      filters.push({
        filterValue: args.fromDate,
        columnAccessor: 'creationTimestamp',
        moreThenDate: true,
      });
    }

    if (args.toDate) {
      filters.push({
        filterValue: args.toDate,
        columnAccessor: 'creationTimestamp',
        lessThenDate: true,
      });
    }

    setFiltersState(filters);
  };

  return (
    <>
      <div>
        <FiltersForm onSubmit={handleFilterSubmit} defaultValues={filterDefaultValue} />
        <Table rows={data} columns={columnsConfig} filters={filtersState} />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const responce = await getList();

  return {
    props: {
      data: responce.data.result.auditLog,
    },
  };
}

export default Home;
