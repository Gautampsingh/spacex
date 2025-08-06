import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLaunches } from '../../store/launchesSlice';
import { RootState } from '../../store';
import Pagination from '../Pagination/Pagination';
import "./Launches.css";

import { AppDispatch } from '../../store';

const ITEMS_PER_PAGE = 6;

const PastLaunchesList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { launches, loading, error } = useSelector((state: RootState) => state.launches);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);

  const totalPages = useMemo(() => Math.ceil(launches.length / ITEMS_PER_PAGE), [launches]);
  const startIdx = useMemo(() => (page - 1) * ITEMS_PER_PAGE, [page]);
  const currentLaunches = useMemo(() => launches.slice(startIdx, startIdx + ITEMS_PER_PAGE), [launches, startIdx]);
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        {currentLaunches.map((launch: any) => (
          <div
            key={launch.mission_name}
            style={{
              flex: '0 0 25%',
              margin: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              background: '#fafafa',
            }}
          >
            <h3>Mission: {launch.mission_name}</h3>
            <p>Date: {new Date(launch.launch_date_utc).toLocaleDateString()}</p>
            <p>Rocket Name: {launch.rocket.rocket_name}</p>
            <p>Rocket ID: {launch.rocket.rocket.id}</p>
            <p>Mass: {launch.rocket.rocket.mass.kg} kg</p>
            <p>Payload Weight: {launch.rocket.rocket.payload_weights[0].kg} kg</p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

const Launches = () => (
  <div style={{ padding: '10px 30px' }}>
    <h2>Launch Information</h2>
    <PastLaunchesList />
  </div>
);

export default Launches;