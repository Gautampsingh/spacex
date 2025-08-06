import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchLaunches } from '../../store/launchesSlice';
import { RootState } from '../../store';
import { AppDispatch } from '../../store';
import Pagination from '../Pagination/Pagination';
import { LaunchChart } from "../LaunchChart/LaunchChart";
import "./EnergyInformation.css";

const ITEMS_PER_PAGE = 6;
const filterColumns = [
  { key: "missionName", label: "Mission name" },
  { key: "date", label: "Date" },
  { key: "mass", label: "Mass (kg)" },
  { key: "payloadWeights", label: "Payload (kg)" },
  { key: "energyMJ", label: "Energy (MJ)" },
];

const EnergyInformation = () => {
  const dispatch: AppDispatch = useDispatch();
  const { launches } = useSelector((state: RootState) => state.launches);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<{ [key: string]: string }>({
    missionName: "",
    date: "",
    mass: "",
    payloadWeights: "",
    energyMJ: "",
  });

  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);

  const handleToggle = (id: number) => {
    setSelectedIds(old =>
      old.includes(id) ? old.filter(i => i !== id) : [...old, id]
    );
  };

  // Energy calculation
  const ENERGY_PER_KG_FUEL = 1.35e7; // Joule
  const FUEL_PER_KG_MASS = 15;       // 15kg fuel per 1kg mass

  const constructData = launches.map((ele: any) => {
    const rocketDetails = ele?.rocket?.rocket;
    const fuelMass = rocketDetails?.mass['kg'] * FUEL_PER_KG_MASS;
    const energyUsed = fuelMass * ENERGY_PER_KG_FUEL; // in Joules

    const totalPayloadWeights = (rocketDetails?.payload_weights.length > 1)
      ? rocketDetails?.payload_weights.reduce((sum: any, l: any) => sum + l['kg'], 0) 
      : rocketDetails?.payload_weights[0]['kg'];

    const getDate = new Date(ele?.launch_date_utc);
    const formattedDate = getDate.toLocaleDateString('en-GB'); 

    return {
      missionName: ele?.mission_name,
      id: ele?.mission_id[0],
      rocketName: rocketDetails?.name,
      date: formattedDate,
      mass: rocketDetails?.mass['kg'],
      payloadWeights: totalPayloadWeights,
      energyMJ: (energyUsed / 1e6).toFixed(2),
    }
  });

  // Filtering logic
  const filteredData = constructData.filter((row: any) =>
    filterColumns.every(col => {
      const value = String(row[col.key] ?? "").toLowerCase();
      const filterValue = filters[col.key].toLowerCase();
      return filterValue === "" || value.includes(filterValue);
    })
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const currentLaunches = filteredData.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const selectedLaunches = constructData.filter((ln: any) => selectedIds.includes(ln.id));
  const totalEnergy = selectedLaunches.reduce((sum: any, l: any) => sum + Number(l.energyMJ), 0);

  // Filter input handler
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page on filter
  };

  // Select all/Unselect all logic
  const allIds = currentLaunches.map((ln: any) => ln.id);
  const allSelected = allIds.every(id => selectedIds.includes(id)) && allIds.length > 0;

  const handleSelectAll = () => {
    setSelectedIds(prev => Array.from(new Set([...prev, ...allIds])));
  };

  const handleUnselectAll = () => {
    setSelectedIds(prev => prev.filter(id => !allIds.includes(id)));
  };

  return (
    <>
      <div className="energy-info-page">
        <div className="energy-launches">
          <h2 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Select Launches
            <span
              style={{
                cursor: "pointer",
                fontSize: 22,
                marginLeft: "auto",
                marginRight: 8,
                display: "flex",
                alignItems: "center"
              }}
              title={showFilters ? "Hide filters" : "Show filters"}
              onClick={() => setShowFilters(f => !f)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 5h18M6 12h12M10 19h4" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>

          <div className="energy-launch-list">
            <table>
              <thead>
                <tr className="energy-launch-item">
                  <td><input
                type="checkbox"
                checked={allSelected}
                onChange={e => e.target.checked ? handleSelectAll() : handleUnselectAll()}
              /></td>
                  {filterColumns.map(col => (
                    <td key={col.key}>{col.label}</td>
                  ))}
                </tr>
                {showFilters && (
                  <tr className="energy-launch-item no-pad">
                    <td></td>
                    {filterColumns.map(col => (
                      <td key={col.key}>
                        <input
                          type="text"
                          placeholder={`${col.label}`}
                          value={filters[col.key]}
                          onChange={e => handleFilterChange(col.key, e.target.value)}
                          style={{ width: "90%" }}
                        />
                      </td>
                    ))}
                  </tr>
                )}
              </thead>
              <tbody>
                {currentLaunches.map((ln: any) => (
                  <tr key={ln.id} className="energy-launch-item" style={{backgroundColor: selectedIds.includes(ln.id) ? "#d0e7ff" : "white"}}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(ln.id)}
                        onChange={() => handleToggle(ln.id)}
                      />
                    </td>
                    <td>{ln.missionName}</td>
                    <td>{ln.date}</td>
                    <td>{ln.mass}</td>
                    <td>{ln.payloadWeights}</td>
                    <td>{ln.energyMJ}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
        <div className="energy-result">
          <h2>Estimated Total Energy Usage:</h2>
          <p>
            <strong style={{fontSize: 20}}>
              Total Energy: {parseFloat(totalEnergy) ? parseFloat(totalEnergy).toExponential(2) : "0"} MJ
            </strong>
          </p>
          {selectedLaunches.length > 0 && (
            <>
              <div>
                <LaunchChart launches={selectedLaunches} />
              </div>
            </>
          )}
          {selectedLaunches.length === 0 && <p>Please select at least one launch!</p>}
        </div>
      </div>
    </>
  );
};

export default EnergyInformation;
