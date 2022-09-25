import { useEffect, useState } from 'react';
import { getDataSources } from '../digitalTwinApi';
import { DataSourceRow } from '../components/DataSourcesTable/DataSourceRow';

export default function Connect() {
  const [dataSources, setDataSources] = useState([]);

  useEffect(() => {
    getDataSources()
      .then((response) => setDataSources(response))
      .catch((err) => console.error(err));
  }, []);

  // debugger
  if (typeof dataSources === 'undefined') {
    setDataSources([]);
  }

  debugger;
  const DataSourcesList = () => {
    const figureClass = `whitrabt text-[clamp(22px,_4.2rem,_6vw)] my-5`;
    const statImageClass = `w-full border-b border-black object-cover aspect-[5/2]`;
    const statInnerClass = `bg-white border border-black w-full h-full flex flex-col justify-between`;
    const dataSourcesList = dataSources.map(
      (/** @type DataSource */ dataSource) => (
        <DataSourceRow dataSource={dataSource} key={dataSource.id} />
      )
    );
    return dataSourcesList;
  };
  return (
    <div className="stat-cards-wrapper">
      <div className="max-w-7xl mx-auto py-4 px-6 sm:px-16">
        <div className="stat-cards -mt-24 mb-16 pl-8 grid gap-x-16 gap-y-[8vw] md:grid-cols-2">
          {DataSourcesList()}
        </div>
      </div>
    </div>
  );
}
