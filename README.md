# Killer Sudoku Helper

A web-based Killer Sudoku Helper with tools for finding valid cage combinations and generating 3x3 grid possibilities.

## Features

### Combination Finder
- Find all possible number combinations for a cage given the sum, number of cells, and excluded digits
- Helps solve killer sudoku cages by providing valid options
- Excludes digits already used in the same row, column, or box

### 3×3 Generator
- Find valid combinations for a complete 3×3 grid section
- Visualize how cages can fit together in a valid sudoku grid
- Ensures all combinations sum correctly and use each digit 1-9 exactly once

## Technologies Used

- React
- TypeScript
- TailwindCSS
- ShadcnUI Components

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to the local development URL

## Deploying to GitHub Pages

This project is set up for easy deployment to GitHub Pages:

1. Fork or push this repository to your GitHub account
2. Make sure your repository is public
3. Go to Settings > Pages
4. Choose "GitHub Actions" as the source
5. The site will automatically deploy when you push to the main branch
6. Access your site at `https://yourusername.github.io/repository-name/`

You can also test the GitHub Pages build locally using:

```bash
./build-github.sh
```

## How to Use

### Combination Finder
1. Enter the sum of the cage
2. Enter the number of cells in the cage
3. Enter any digits that should be excluded (already used in row, column or box)
4. Click "Find Combinations" to see all valid combinations

### 3×3 Generator
1. Enter each cage as a sum and number of cells (e.g., `8,2` for a cage with sum 8 and 2 cells)
2. Add all cages that make up the 3×3 grid
3. Ensure all cages add up to 45 (sum of digits 1-9)
4. Click "Calculate Valid Combinations" to see possible ways to arrange the digits

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Feature Ideas
- Implement a full Killer Sudoku solver
- Add a visual grid editor for 3×3 Generator
- Create a printable Killer Sudoku generator
- Add support for different grid sizes (4×4, 6×6, etc.)

## License

Distributed under the MIT License. See `LICENSE` for more information.