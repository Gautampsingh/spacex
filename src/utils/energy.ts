export function calculateEnergy(massKg: number, fuelPerKg: number, energyPerKg: number) {
  if (massKg <= 0 || fuelPerKg <= 0 || energyPerKg <= 0) return 0;
  return massKg * fuelPerKg * energyPerKg;
}

export function calculateTotalEnergy(launches: any[]) {
  let launchesList: {
    mass: number;
    fuelMass: number;
    payload: number[];
    energyUsed: string;
    totalEnergy: string;
  }[] = [];
  // Energy calculation
  const ENERGY_PER_KG_FUEL = 1.35e7; // Joule
  const FUEL_PER_KG_MASS = 15;       // 15kg fuel per 1kg mass

  if (!Array.isArray(launches) || launches.length === 0) return 0;

  const totalEnergy = launches.reduce((total: number, launch: any) => {
      const mass = launch.rocket.rocket.mass?.kg || 0;
      const fuelMass = mass * FUEL_PER_KG_MASS;
      const energy = fuelMass * ENERGY_PER_KG_FUEL; // in Joules
      return total + energy;  
    }, 0);

  launches.forEach((launch: any) => {
    const mass = launch.rocket.rocket.mass?.kg || 0;
    const fuelMass = mass * FUEL_PER_KG_MASS;
    const energy = fuelMass * ENERGY_PER_KG_FUEL; // in Joules
    const payloadWeights = launch.rocket.rocket.payload_weights?.map((weight: any) => weight.kg || 0) || [];
    launchesList.push({
      mass: mass,
      fuelMass: fuelMass,
      payload: payloadWeights,
      energyUsed: (energy / 1e6).toFixed(2),
      totalEnergy: (totalEnergy / 1e6).toFixed(2),
    })
  }); 
  return launchesList
}