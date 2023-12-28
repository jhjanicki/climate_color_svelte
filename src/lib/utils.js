export const formatScenarioText = (scenario) => {
	const ssp = scenario.slice(0, 3).toUpperCase();
    const num = scenario.slice(3, 4);
    const ERF1 = scenario.slice(4, 5);
    const ERF2 = scenario.slice(5);
    return `${ssp}${num}-${ERF1}.${ERF2}`;
};


