const fakeBPApiCall = {
  compliance: [],
  decisions: {
    carbon: {
      description: '1957.0 kg',
      object: [Object],
      methodology: 'from fuel use and greenhouse gas emission factor'
    },
    ghg_emission_factor: {
      description: '5.15214',
      object: 5.15214,
      methodology: 'from fuel and aviation multiplier'
    },
    aviation_multiplier: { description: '2.0', object: 2, methodology: 'default' },
    energy: {
      description: '14292.4 MJ',
      object: [Object],
      methodology: 'from fuel use and fuel'
    },
    fuel_use: {
      description: '379.846919987433',
      object: 379.846919987433,
      methodology: 'from fuel per segment, segments per trip, trips, freight_share, passengers, seat class multiplier, fuel, date, and timeframe'
    },
    fuel_per_segment: {
      description: '45494.66336622903',
      object: 45494.66336622903,
      methodology: 'from adjusted distance per segment and fuel use coefficients'
    },
    seat_class_multiplier: {
      description: '0.7297',
      object: 0.7297,
      methodology: 'from distance class seat class'
    },
    distance_class_seat_class: {
      description: 'long haul economy',
      object: [Object],
      methodology: 'from distance class and seat class'
    },
    distance_class: {
      description: 'long haul',
      object: [Object],
      methodology: 'from adjusted distance per segment'
    },
    adjusted_distance_per_segment: {
      description: '4955.729967020451',
      object: 4955.729967020451,
      methodology: 'from adjusted distance and segments per trip'
    },
    adjusted_distance: {
      description: '8325.626344594357',
      object: 8325.626344594357,
      methodology: 'from distance, route inefficiency factor, and dogleg factor'
    },
    distance: {
      description: '6503.174571247865',
      object: 6503.174571247865,
      methodology: 'from airports'
    },
    route_inefficiency_factor: {
      description: '1.100000023841858',
      object: 1.100000023841858,
      methodology: 'default'
    },
    dogleg_factor: {
      description: '1.1638548181950328',
      object: 1.1638548181950328,
      methodology: 'from segments per trip'
    },
    fuel_use_coefficients: {
      description: 'BrighterPlanet::Flight::ImpactModel::FuelUseEquation::Given',
      object: [Object],
      methodology: 'default'
    },
    fuel: {
      description: 'Jet Fuel',
      object: [Object],
      methodology: 'default'
    },
    passengers: {
      description: '168',
      object: 168,
      methodology: 'from seats and load factor'
    },
    seats: {
      description: '167.54351777414516',
      object: 167.54351777414516,
      methodology: 'default'
    },
    freight_share: {
      description: '0.0667864752535085',
      object: 0.0667864752535085,
      methodology: 'default'
    },
    segments_per_trip: { description: '1.68', object: 1.68, methodology: 'default' },
    date: {
      description: '2020-01-01',
      object: '2020-01-01',
      methodology: 'from timeframe'
    }
  },
  emitter: 'Flight',
  equivalents: {
    cars_off_the_road_for_a_year: 0.3561784608826177,
    cars_off_the_road_for_a_month: 4.270227481570724,
    cars_off_the_road_for_a_week: 18.503666745303022,
    cars_off_the_road_for_a_day: 129.87988865349342,
    cars_to_priuses_for_a_year: 0.7123569217652354,
    cars_to_priuses_for_a_month: 8.540454963141448,
    cars_to_priuses_for_a_week: 37.007333490606044,
    cars_to_priuses_for_a_day: 259.75977730698685,
    one_way_domestic_flight: 6.360329658618173,
    round_trip_domestic_flight: 3.1801648293090863,
    one_way_cross_country_flight: 2.2349219908129085,
    round_trip_cross_country_flight: 1.1174609954064543,
    vegan_meals_instead_of_non_vegan_ones: 1574.7921821552252,
    days_of_veganism: 524.930727385075,
    weeks_of_veganism: 74.98926518736343,
    months_of_veganism: 17.497756146986177,
    years_of_veganism: 1.4384130151028791,
    barrels_of_petroleum: 4.552039011060268,
    canisters_of_bbq_propane: 81.54334027250567,
    railroad_cars_full_of_coal: 0.009785122551720267,
    homes_energy_in_a_year: 0.18983137750337314,
    homes_energy_in_a_month: 2.2681914074887577,
    homes_energy_in_a_week: 9.826220066437491,
    homes_energy_in_a_day: 68.97924291609684,
    homes_electricity_in_a_year: 0.2876826030205758,
    homes_electricity_in_a_month: 3.4424061136951893,
    homes_electricity_in_a_week: 14.916440817842373,
    homes_electricity_in_a_day: 104.69885427889649,
    homes_with_lowered_thermostat_2_degrees_for_a_winter: 10.272421654795936,
    homes_with_raised_thermostat_3_degrees_for_a_summer: 4.618577844411965,
    replaced_refrigerators: 1.9707236819164617,
    loads_of_cold_laundry: 897.4170735123897,
    lightbulbs_for_a_year: 3.612667246095122,
    lightbulbs_for_a_month: 43.964555624879154,
    lightbulbs_for_a_week: 188.41840580690476,
    lightbulbs_for_a_day: 1318.9347117218642,
    lightbulbs_for_an_evening: 7913.610227355695,
    lightbulbs_to_CFLs_for_a_day: 22449.959701823554,
    lightbulbs_to_CFLs_for_a_week: 3207.136541110648,
    lightbulbs_to_CFLs_for_a_month: 748.33290333889,
    lightbulbs_to_CFLs_for_a_year: 61.507323335603246,
    days_with_lightbulbs_to_CFLs: 498.88860222592666,
    weeks_with_lightbulbs_to_CFLs: 71.26896159319938,
    months_with_lightbulbs_to_CFLs: 16.628837264393418,
    years_with_lightbulbs_to_CFLs: 1.3660031082201491,
    recycled_kgs_of_trash: 1349.671738681328,
    recycled_bags_of_trash: 747.8475612603247
  },
  methodology: 'http://impact.brighterplanet.com/flights?destination_airport=SYD&load_factor=1&origin_airport=DXB&seat_class=economy&timeframe=2020-01-01%2F2021-01-01&trips=1',
  scope: 'The flight greenhouse gas emission is the anthropogenic greenhouse gas emissions attributed to a single passenger on this flight. It includes CO2 emissions from combustion of non-biogenic fuel and extra forcing effects of high-altitude fuel combustion.',
  timeframe: '2020-01-01/2021-01-01',
  characteristics: {
    destination_airport: { description: 'SYD', object: [Object] },
    origin_airport: { description: 'DXB', object: [Object] },
    seat_class: { description: 'economy', object: [Object] },
    trips: { description: '1', object: 1 },
    load_factor: { description: '1.0', object: 1 }
  },
  errors: []
}

exports.fakeBPApiCall = fakeBPApiCall;
