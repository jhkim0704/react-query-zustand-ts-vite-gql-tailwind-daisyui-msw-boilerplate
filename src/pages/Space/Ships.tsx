import { useState } from 'react';
import { useShips } from '@/services/queries/space.query';
import { type Ship } from '@/types/space';
import Button from '@/components/Button';

export type Filter = { page: number; search?: string };

export interface ShipListProps {
  ships: Ship[];
}

const ShipList: React.FC<ShipListProps> = ({ ships }) => {
  if (!ships?.length) {
    return <div>No ships found</div>;
  }

  return (
    <>
      {ships.map((ship) => (
        <div key={ship.id} className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
          <article className="overflow-hidden rounded-lg shadow-lg">
            <a href={ship.image} target="_blank" rel="noreferrer">
              {ship.image ? (
                <img alt="Placeholder" className="block h-auto w-full" src={ship.image} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[215px] w-[370px] bg-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </a>

            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 className="text-lg">{ship.name}</h1>
            </header>

            <footer className="flex items-center justify-between leading-none p-2 md:p-4"></footer>
          </article>
        </div>
      ))}
    </>
  );
};

const Ships = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { isLoading, data } = useShips();

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex justify-center w-full">
        <div className="mb-3 xl:w-[40%]">
          <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 block w-auto mr-2 px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Enter search term"
              aria-label="Search"
              aria-describedby="button-addon3"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <Button text="검색" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-1 lg:-mx-4">{isLoading ? <div>Loading...</div> : <ShipList ships={data ?? []} />}</div>
    </div>
  );
};

export default Ships;
