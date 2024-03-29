import { writable } from 'svelte/store';
import {data}  from "../assets/data/temperatureData.js";

let dataTemp = data.filter((d) => d.Year >= 1988 && d.Year <= 2087);

export const yourBirthYear = writable();
export const yourDeathYear = writable();
export const yourAge = writable();
export const yourData = writable(dataTemp);
export const yourBirthYearTemp = writable();
export const yourDeathYearTemp = writable();
export const selectedPersonBirthYearTemp = writable();
export const selectedPersonBirthYear = writable();
export const selectedPersonDeathYear = writable();
export const selectedPersonData = writable(dataTemp);
export const selectedPerson = writable();
export const currentScenario = writable();
export const started = writable(false);
export const modalOpen = writable(false);
export const yourAgeProfile = writable();
export const yearProfile = writable();
export const stripeCliked = writable(false);


