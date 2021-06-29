export interface WorldwideType {
    updated: number;
    cases: number;
    todayCases: number;
    deaths: number
    todayDeaths: number
    recovered: number
    todayRecovered: number
    active: number
    critical: number
    casesPerOneMillion: number
    deathsPerOneMillion: number
    tests: number
    testsPerOneMillion: number
    population: number
    oneCasePerPeople: null | number
    oneDeathPerPeople: null | number
    oneTestPerPeople: null | number
    undefined: null
    activePerOneMillion: number
    recoveredPerOneMillion: number
    criticalPerOneMillion: number
    affectedCountries: number
}