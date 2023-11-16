

class StringDistance {

	static levenshteinDistance(a, b) {
		// Create an empty matrix of size (a.length+1) x (b.length+1)
		const matrix = [];

		// Initialize the first column and first row of the matrix
		for (let i = 0; i <= a.length; i++) {
			matrix[i] = [i];
		}
		for (let j = 0; j <= b.length; j++) {
			matrix[0][j] = j;
		}

		// Fill in the rest of the matrix
		for (let i = 1; i <= a.length; i++) {
			for (let j = 1; j <= b.length; j++) {
				if (a[i - 1] === b[j - 1]) {
					matrix[i][j] = matrix[i - 1][j - 1];
				} else {
					matrix[i][j] = Math.min(
						matrix[i - 1][j - 1], // substitution
						matrix[i][j - 1],     // insertion
						matrix[i - 1][j]      // deletion
					) + 1;
				}
			}
		}

		// The distance is the value in the bottom-right corner of the matrix
		return matrix[a.length][b.length];
	}

}

module.exports = StringDistance;
