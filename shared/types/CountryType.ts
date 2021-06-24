export interface CountryType {
    active: number
    activePerOneMillion: number
    cases: number
    casesPerOneMillion: number
    continent: string
    country: string
    countryInfo: CountryInfoType;
    critical: number
    criticalPerOneMillion: number
    deaths: number
    deathsPerOneMillion: number
    oneCasePerPeople: number
    oneDeathPerPeople: number
    oneTestPerPeople: number
    population: number
    recovered: number
    recoveredPerOneMillion: number
    tests: number
    testsPerOneMillion: number
    todayCases: number
    todayDeaths: number
    todayRecovered: number
    undefined: number
    updated: number
}

export interface CountryInfoType {
    flag: string
    iso2: string
    iso3: string
    lat: number
    long: number
    _id: number
}