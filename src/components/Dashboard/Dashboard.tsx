import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLaunches } from '../../store/launchesSlice';
import { RootState } from '../../store';
import "./Dashboard.css";

import { AppDispatch } from '../../store';
import { Box, Card, CardContent, CircularProgress, Grid, Paper, Typography } from '@mui/material';
// import { calculateTotalEnergy } from '../../utils/energy';
import { EnergyChart } from '../LaunchChart/LaunchChart';

const summaryConfigs = [
  {
    title: "Launches",
    items: [
      { label: "Total", getValue: (data: any) => data.totalLaunches },
      { label: "Successful", getValue: (data: any) => `${data.successLaunches} (${data.successRate.toFixed(2)}%)` },
    ],
  },
  {
    title: "Mass",
    items: [
      { label: "Total", getValue: (data: any) => `${data.totalMass.toFixed(2)} kg` },
      { label: "Average", getValue: (data: any) => `${data.averageMass.toFixed(2)} kg` },
    ],
  },
  {
    title: "Energy",
    items: [
      { label: "Total", getValue: (data: any) => `${data.totalEnergy.toFixed(2)} J` },
    ],
  },
  {
    title: "Payload",
    items: [
      { label: "Total", getValue: (data: any) => `${data.totalPayload.toFixed(2)} kg` },
    ],
  },
];

const chartConfigs = [
  {
    title: "Energy Monitoring",
    description: "Monitor trends of missions, and enables to compare them",
    chartType: "bar",
  },
  {
    title: "Energy Comparison",
    description: "Show the energy comparision for the selected launches, including mass, fuel, and payload.",
    chartType: "line",
  },
];

const PastLaunchesList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { launches, loading, error } = useSelector((state: RootState) => state.launches);

  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);

  // Calculate stats with useMemo (always called, before any return)
  const stats = useMemo(() => {
    if (!launches || launches.length === 0) {
      return {
        totalLaunches: 0,
        successLaunches: 0,
        successRate: 0,
        totalMass: 0,
        averageMass: 0,
        totalEnergy: 0,
        totalPayload: 0,
      };
    }
    const totalLaunches = launches.length;
    const successLaunches = launches.filter((launch: any) => launch.launch_success).length;
    const successRate = totalLaunches > 0 ? (successLaunches / totalLaunches * 100) : 0;
    const totalMass = launches.reduce((sum: number, launch: any) => sum + (launch.rocket.rocket.mass?.kg || 0), 0);
    const averageMass = totalLaunches > 0 ? totalMass / totalLaunches : 0;
    const totalEnergy = launches.reduce((sum: number, launch: any) => {
      const mass = launch.rocket.rocket.mass?.kg || 0;
      return sum + (mass + mass * 15) * 1.35e7;
    }, 0);
    const totalPayload = launches.reduce((sum: number, launch: any) => {
      const payloads = launch.rocket.rocket.payload_weights || [];
      return sum + payloads.reduce((pSum: number, p: any) => pSum + (p.kg || 0), 0);
    }, 0);
    return { totalLaunches, successLaunches, successRate, totalMass, averageMass, totalEnergy, totalPayload };
  }, [launches]);

  const constructGridChart = useMemo(() => {
    if (!launches || launches.length === 0) return [];
    return launches.slice(0, 10).map((launch: any) => ({
      name: `${launch.mission_name}`,
      mass: launch.rocket.rocket.mass?.kg || 0,
      energy: ((launch.rocket.rocket.mass?.kg || 0) + (launch.rocket.rocket.mass?.kg || 0) * 15) * 1.35e7 / 1e12,
      date: new Date(launch.launch_date_utc).toLocaleDateString('en-GB'),
    }));
  }, [launches]);

  if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  if (error) return <Typography color="error">Error loading dashboard data.</Typography>;
  if (!launches || launches.length === 0) return <Typography>No past launches available.</Typography>;

  return (
    <>
      <h2>Dashboard Overview</h2>
      <Paper elevation={0} sx={{ p: 3, mb: 3, background: 'transparent' }}>
        <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
          {summaryConfigs.map((element) => (
            <Grid key={element.title} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card variant="outlined" sx={{ height: '100%', flexGrow: 1, border: '1px solid #0174c8', borderRadius: 3, backgroundColor: '#e3f0fd !important' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {element.title}
                  </Typography>
                  {element.items.map(item => (
                    <Typography key={item.label} component="div" variant="subtitle1">
                      {item.label}: {item.getValue(stats)}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        {chartConfigs.map((element) => (
          <Card
            key={element.title}
            variant="outlined"
            sx={{ flex: 2, p: 3, mb: 3, background: 'transparent', width: '40%' }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>
                {element.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                {element.description}
              </Typography>
              <Box sx={{ height: 350 }}>
                <EnergyChart datasource={constructGridChart} chartType={element.chartType} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

const Dashboard = () => (
  <div style={{ padding: '10px 30px' }}>
    <PastLaunchesList />
  </div>
);

export default Dashboard;