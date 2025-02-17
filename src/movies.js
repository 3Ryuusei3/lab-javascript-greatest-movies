// Iteration 1: All directors? - Get the array of all directors.

function getAllDirectors(moviesArray) {
	const allDirectors = moviesArray.map((movie) => {
		return movie.director;
	});
	// How could you "clean" a bit this array and make it unified (without duplicates)?
	// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
	return [...new Set(allDirectors)];
}
// console.log(getAllDirectors(movies));

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
	const stevenMovies = moviesArray.filter(
		(movie) => movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
	);
	return stevenMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
	if (moviesArray.length === 0) {
		return 0;
	} else {
		const totalScore =
			moviesArray.reduce((acc, movie) => {
				if (!movie.score) {
					return acc;
				} else {
					return acc + movie.score;
				}
			}, 0) / moviesArray.length;
		return Math.round(totalScore * 100) / 100;
	}
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
	const dramaMovies = moviesArray.filter((movie) => movie.genre.includes("Drama"));
	return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
	const newMoviesArray = [...moviesArray];
	newMoviesArray.sort((a, b) => {
		if (a.year < b.year) {
			return -1;
		} else if (a.year > b.year) {
			return 1;
		} else if (a.title < b.title) {
			return -1;
		} else if (a.title > b.title) {
			return 1;
		} else {
			return 0;
		}
	});
	return newMoviesArray;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
	const newMoviesArray = [...moviesArray];
	newMoviesArray.sort((a, b) => {
		if (a.title < b.title) {
			return -1;
		} else if (a.title > b.title) {
			return 1;
		} else {
			return 0;
		}
	});
	const newMoviesArrayTitle = newMoviesArray.map((movie) => {
		return movie.title;
	});
	const firstTwentyMovies = newMoviesArrayTitle.slice(0, 20);
	return firstTwentyMovies;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
	const minutedMovies = JSON.parse(JSON.stringify(moviesArray));

	minutedMovies.map((movie) => {
		let totalMinutes = 0;
		let splitsArray = [];

		if (movie.duration.includes("h")) {
			if (movie.duration.includes("min")) {
				splitsArray = movie.duration.split("min");
				splitsArray = splitsArray[0].split("h ");
				totalMinutes = splitsArray[0] * 60 + parseInt(splitsArray[1]);
			} else {
				splitsArray = movie.duration.split("h");
				totalMinutes = splitsArray[0] * 60;
				console.log("");
			}
		} else {
			splitsArray = movie.duration.split("min");
			totalMinutes = parseInt(splitsArray[0]);
		}

		movie.duration = totalMinutes;
		return movie;
	});
	return minutedMovies;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
	const bestMoviesByYear = [...moviesArray];

	if (bestMoviesByYear.length === 0) {
		return null;
	} else if (bestMoviesByYear.length === 1) {
		return `The best year was ${bestMoviesByYear[0].year} with an average score of ${bestMoviesByYear[0].score}`;
	}

	let scoreByYear = [];

	for (let i = 1900; i < 2050; i++) {
		let filterByYear = bestMoviesByYear.filter((movie) => {
			return movie.year === i;
		});
		scoreByYear.push({
			year: i,
			score: scoresAverage(filterByYear),
		});
	}
	// console.log("Score of the year", scoreByYear);

	const sortByScoreByYear = scoreByYear.sort((a, b) => {
		if (a.score < b.score) {
			return 1;
		} else if (a.score > b.score) {
			return -1;
		} else {
			if (a.year < b.year) {
				return -1;
			} else if (a.year < b.year) {
				return 1;
			} else {
				return 0;
			}
		}
	});

	return `The best year was ${sortByScoreByYear[0].year} with an average score of ${sortByScoreByYear[0].score}`;
}
