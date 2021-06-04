export class AlphabetSoup {
  constructor(selectedCase) {
    this.WordSoup = {};
    this.Directions = {};
    this.EnumWordSoupType = {
      Case_3_3: "3_3",
      Case_1_10: "1_10",
      Case_5_5: "5_5",
      Case_7_2: "7_2",
      Case_1_1: "1_1",
    };
    this.EnumDirections = {
      PositiveHorizontal: "Horizontal Positiva",
      NegativeHorizontal: "Horizontal Negativa",
      TopVertical: "Vertical Superior",
      BottomVertical: "Vertical Inferior",
      Diagonal1: "Superior Izquierdo",
      Diagonal2: "Superior Derecho",
      Diagonal3: "Inferior Izquierdo",
      Diagonal4: "Inferior Derecho",
    };
    this.SearchWord = ["O", "I", "E"];
    this.SelectedCase = null;
    this.InitializeComponent(selectedCase);
  }

  InitializeComponent(selectedCase) {
    this.InitializeDirections();
    this.InitializeCases();
    this.InitializeSelectedCases(selectedCase);
  }

  InitializeDirections() {
    this.Directions[this.EnumDirections.PositiveHorizontal] = null;
    this.Directions[this.EnumDirections.NegativeHorizontal] = null;
    this.Directions[this.EnumDirections.TopVertical] = null;
    this.Directions[this.EnumDirections.BottomVertical] = null;
    this.Directions[this.EnumDirections.Diagonal1] = null;
    this.Directions[this.EnumDirections.Diagonal2] = null;
    this.Directions[this.EnumDirections.Diagonal3] = null;
    this.Directions[this.EnumDirections.Diagonal4] = null;
  }

  InitializeCases() {
    this.WordSoup[this.EnumWordSoupType.Case_3_3] = [
      ["O", "I", "E"],
      ["I", "I", "X"],
      ["E", "X", "E"],
    ];
    this.WordSoup[this.EnumWordSoupType.Case_1_10] = [
      ["E", "I", "O", "I", "E", "I", "O", "E", "I", "O"],
    ];
    this.WordSoup[this.EnumWordSoupType.Case_5_5] = [
      ["E", "A", "E", "A", "E"],
      ["A", "I", "I", "I", "A"],
      ["E", "I", "O", "I", "E"],
      ["A", "I", "I", "I", "A"],
      ["E", "A", "E", "A", "E"],
    ];
    this.WordSoup[this.EnumWordSoupType.Case_7_2] = [
      ["O", "X"],
      ["I", "O"],
      ["E", "X"],
      ["I", "I"],
      ["O", "X"],
      ["I", "E"],
      ["E", "X"],
    ];
    this.WordSoup[this.EnumWordSoupType.Case_1_1] = [["E"]];
  }

  InitializeSelectedCases(selectedCase) {
    const mapEnumWordSoupType = {
      ["1"]: "3_3",
      ["2"]: "1_10",
      ["3"]: "5_5",
      ["4"]: "7_2",
      ["5"]: "1_1",
    };
    const defaultCase = mapEnumWordSoupType[selectedCase];
    this.HasCase(defaultCase) && this.SetSelectedCase(defaultCase);
  }

  HasCase(selectedCase) {
    return !!this.WordSoup[selectedCase];
  }

  SetSelectedCase(selectedCase) {
    this.SelectedCase = selectedCase;
  }

  GetSearchWordCount() {
    const coordinatesFirstLetter = this.GetCoordinatesFirstLetter();
    let count = 0;
    coordinatesFirstLetter.forEach((coordinates) => {
      const searchLetter = this.GetSearchLetter(coordinates);
      count = count + this.GetCountSearchLetter(searchLetter);
    });
    return count;
  }

  GetCase() {
    return this.WordSoup[this.SelectedCase] ?? [];
  }

  IsEqualLetterBySearchWord(letter, index) {
    return letter === this.SearchWord[index];
  }

  GetCoordinatesFirstLetter() {
    const INDEX_FIRST_LETTER = 0;
    const coordinates = [];
    const alphabetSoup = this.GetCase();
    alphabetSoup.forEach((row, rowIndex) => {
      row.forEach((letter, columnIndex) => {
        this.IsEqualLetterBySearchWord(letter, INDEX_FIRST_LETTER) &&
          coordinates.push([rowIndex, columnIndex]);
      });
    });
    return coordinates;
  }

  GetSearchLetter(coordinates) {
    let searchLetter = null;
    this.SearchWord.forEach((letter) => {
      const INDEX_FIRST_LETTER = 0;
      if (this.IsEqualLetterBySearchWord(letter, INDEX_FIRST_LETTER)) return;
      if (searchLetter === null) {
        searchLetter = this.NextLetter(coordinates, this.GetCase(), letter);
        return;
      }
      searchLetter = this.NextLetter(searchLetter, this.GetCase(), letter);
    });
    return searchLetter ?? {};
  }

  GetCountSearchLetter(searchLetter) {
    let count = 0;
    for (const [key] of Object.entries(searchLetter)) {
      if (searchLetter[key]) {
        count++;
      }
    }
    return count;
  }

  NextLetter(coordinates, wordSoup, letterToFind) {
    const currentCoordinates =
      this.GetFusionCoordinatesWithDirections(coordinates);
    if (!currentCoordinates) return null;
    const directions = { ...this.Directions };
    for (const [direction, position] of Object.entries(currentCoordinates)) {
      const [r, c] = this.GetXY(position);
      this.SetCoordinatesByLetterToFindInDirections({
        direction,
        wordSoup,
        letterToFind,
        directions,
        r,
        c,
      });
    }
    return directions;
  }

  GetFusionCoordinatesWithDirections(coordinates) {
    if (
      coordinates &&
      coordinates[0] !== undefined &&
      !(coordinates[0][0] !== undefined)
    ) {
      const directions = { ...this.Directions };
      for (const property in directions) {
        directions[property] = coordinates;
      }
      return directions;
    }
    return coordinates;
  }

  GetXY(position) {
    const currentPosition = position ?? [];
    const r = currentPosition[0];
    const c = currentPosition[1];
    return [r, c];
  }

  SetCoordinatesByLetterToFindInDirections({
    direction,
    wordSoup,
    letterToFind,
    directions,
    r,
    c,
  }) {
    switch (direction) {
      case this.EnumDirections.PositiveHorizontal:
        if (
          Array.isArray(wordSoup[r]) &&
          wordSoup[r][c + 1] &&
          wordSoup[r][c + 1] == letterToFind
        ) {
          directions[this.EnumDirections.PositiveHorizontal] = [r, c + 1];
        }
        break;

      case this.EnumDirections.NegativeHorizontal:
        if (
          Array.isArray(wordSoup[r]) &&
          wordSoup[r][c - 1] &&
          wordSoup[r][c - 1] == letterToFind
        )
          directions[this.EnumDirections.NegativeHorizontal] = [r, c - 1];
        break;

      case this.EnumDirections.TopVertical:
        if (
          Array.isArray(wordSoup[r - 1]) &&
          wordSoup[r - 1][c] &&
          wordSoup[r - 1][c] == letterToFind
        )
          directions[this.EnumDirections.TopVertical] = [r - 1, c];
        break;

      case this.EnumDirections.BottomVertical:
        if (
          Array.isArray(wordSoup[r + 1]) &&
          wordSoup[r + 1][c] &&
          wordSoup[r + 1][c] == letterToFind
        )
          directions[this.EnumDirections.BottomVertical] = [r + 1, c];
        break;

      case this.EnumDirections.Diagonal1:
        if (
          Array.isArray(wordSoup[r - 1]) &&
          wordSoup[r - 1][c - 1] &&
          wordSoup[r - 1][c - 1] == letterToFind
        )
          directions[this.EnumDirections.Diagonal1] = [r - 1, c - 1];
        break;

      case this.EnumDirections.Diagonal2:
        if (
          Array.isArray(wordSoup[r - 1]) &&
          wordSoup[r - 1][c + 1] &&
          wordSoup[r - 1][c + 1] == letterToFind
        )
          directions[this.EnumDirections.Diagonal2] = [r - 1, c + 1];
        break;

      case this.EnumDirections.Diagonal3:
        if (
          Array.isArray(wordSoup[r + 1]) &&
          wordSoup[r + 1][c - 1] &&
          wordSoup[r + 1][c - 1] == letterToFind
        )
          directions[this.EnumDirections.Diagonal3] = [r + 1, c - 1];
        break;

      case this.EnumDirections.Diagonal4:
        if (
          Array.isArray(wordSoup[r + 1]) &&
          wordSoup[r + 1][c + 1] &&
          wordSoup[r + 1][c + 1] == letterToFind
        )
          directions[this.EnumDirections.Diagonal4] = [r + 1, c + 1];
        break;
    }
  }
}
