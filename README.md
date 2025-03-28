# PDF Compare

## About
PDF Compare is a web app to compare two PDF files. It calculates similarity using the **Jaccard similarity index**, which measures the overlap between sets of words in the documents. The app provides an overall similarity score and page-by-page results, helping users identify differences. Built with React, Next.js, and `pdfjs-dist`.

## How to Run
1. Clone the repository and navigate to the project folder:
   ```bash
   git clone <repository-url>
   cd pdfcompare
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Overview
The app extracts text from PDFs using `pdfjs-dist` and compares them using the **Jaccard similarity index**. Results include:
- **Overall Similarity**: A single score for the entire documents.
- **Page-by-Page Results**: Individual scores for each page.

### Key Function: `calculateSimilarity`
The `calculateSimilarity` function is the core of the comparison logic. It calculates the Jaccard similarity between two sets of words.

#### Why Use Sets?
Sets are used because they automatically handle duplicate words, ensuring that each word is counted only once. This is crucial for calculating the Jaccard similarity, which is based on unique elements.

1. **Unique Words**:
   - Example: `"Hello world world"` becomes `Set { "Hello", "world" }`.
   - This ensures that repeated words do not inflate the similarity score.

2. **Efficient Operations**:
   - Sets provide efficient methods for finding intersections and unions, which are key to the Jaccard formula.
   - Example:
     - `set1.filter((x) => set2.has(x))` efficiently finds common elements between two sets.

#### Explanation:
1. **Convert Text to Sets**:
   - `text1.split(/\s+/)` splits the text into words using whitespace as the delimiter.
   - `new Set()` creates a set of unique words from the text.

2. **Find Intersection**:
   - The intersection contains words that are present in both sets.
   - Example:
     - `Set1 = { "Hello", "world" }`
     - `Set2 = { "Hello", "universe" }`
     - Intersection = `{ "Hello" }`.

3. **Find Union**:
   - The union contains all unique words from both sets.
   - Example:
     - `Set1 = { "Hello", "world" }`
     - `Set2 = { "Hello", "universe" }`
     - Union = `{ "Hello", "world", "universe" }`.

4. **Calculate Jaccard Similarity**:
   - `intersection.size / union.size` gives the similarity score.
   - Example:
     - Intersection size = 1
     - Union size = 3
     - Similarity = `1 / 3 = 0.33`.

5. **Handle Edge Cases**:
   - If both sets are empty, the function returns `0` to avoid division by zero.

### Why This Approach?
- **Jaccard Similarity**: Measures the overlap between sets of words, making it robust against minor differences like word order.
- **Page Numbers**: Helps locate differences in large documents.

## Conclusion
PDF Compare is a simple, modular tool for comparing PDF documents with detailed results.

### Future Enhancements
The inclusion of page numbers not only helps locate differences in large documents but also opens up possibilities for future improvements:
- **Page Limitation**: Allow users to limit the comparison to a specific number of pages (e.g., the first 10 pages) to handle large documents efficiently.
- **Specific Page Comparison**: Enable users to compare specific pages (e.g., page 5 of document A with page 7 of document B) for more targeted analysis.
