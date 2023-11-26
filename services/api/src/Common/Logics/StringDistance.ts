export class StringDistanceLogic {
  static getDistance(x: string, y: string): number {
    // Create a matrix
    const matrix: number[][] = [];

    // Initialize the first row and column of the matrix
    for (let index = 0; index <= x.length; index++) {
      matrix[index] = [index];
    }
    for (let index = 0; index <= y.length; index++) {
      matrix[0][index] = index;
    }

    // Populate the matrix
    for (let index = 1; index <= x.length; index++) {
      for (let index_ = 1; index_ <= y.length; index_++) {
        matrix[index][index_] = x.charAt(index - 1) === y.charAt(index_ - 1) ?
          matrix[index - 1][index_ - 1] : // No operation needed
          Math.min(
            matrix[index - 1][index_ - 1], // Substitution
            matrix[index][index_ - 1],     // Insertion
            matrix[index - 1][index_]      // Deletion
          ) + 1;
      }
    }

    // The distance is in the bottom-right corner of the matrix
    return matrix[x.length][y.length];
  }

  static getNearestFromList(x: string, list: string[]): string {
    let nearest = list[0];
    let nearestDistance = this.getDistance(x, nearest);
    for (let index = 1; index < list.length; index++) {
      const element = list[index];
      const distance = this.getDistance(x, element);
      if (distance < nearestDistance) {
        nearest = element;
        nearestDistance = distance;
      }
    }
    return nearest;
  }
}
