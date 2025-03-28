"use client";

import React from "react";
import { usePdfContext, PdfProvider } from "../context/PdfContext";
import { comparePdfText } from "../utils/pdfUtils";

export default function Home() {
  return (
    <PdfProvider>
      <PdfComparison />
    </PdfProvider>
  );
}

function PdfComparison() {
  const {
    file1,
    file2,
    comparisonResult,
    setFile1,
    setFile2,
    handleFileChange,
    handleCompare,
    handleClear,
  } = usePdfContext();

  return (
    <div className="flex flex-col min-h-screen p-8 gap-8">
      {/* Results Section */}
      <section className="w-full bg-gray-100 p-4 rounded shadow max-h-96 overflow-y-auto">
        <h2 className="text-lg font-bold">Comparison Results</h2>
        {comparisonResult ? (
          <div>
            <p
              className={
                parseFloat(comparisonResult.overall) === 1
                  ? "text-blue-500"
                  : parseFloat(comparisonResult.overall) >= 0.75
                    ? "text-green-500"
                    : parseFloat(comparisonResult.overall) >= 0.5
                      ? "text-yellow-500"
                      : "text-red-500"
              }
            >
              <span className="font-semibold">Overall Similarity:</span> {comparisonResult.overall} (
              <span className="font-bold">
                {(parseFloat(comparisonResult.overall) * 100).toFixed(0)}%
              </span>
              )
            </p>
            <ul>
              {comparisonResult.pageResults.map((page, index) => {
                const percentage = (page.similarity * 100).toFixed(0); // Convert to percentage and truncate decimals
                const color =
                  page.similarity === 1
                    ? "text-blue-500 font-bold"
                    : page.similarity >= 0.75
                      ? "text-green-500 font-bold"
                      : page.similarity >= 0.5
                        ? "text-yellow-500 font-bold"
                        : "text-red-500 font-bold"; // Color coding based on similarity

                return (
                  <li key={index}>
                    <span className="font-semibold">Page {index + 1}:</span>{" "}
                    <span className="font-medium">{page.similarity.toFixed(2)}</span> (
                    <span className={color}>{percentage}%</span>)
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p>No results yet. Upload files and click compare.</p>
        )}
      </section>

      {/* File Upload Section */}
      <section className="flex-1 flex flex-col sm:flex-row gap-4 justify-center items-stretch">
        <div className="w-full sm:w-1/2 border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer flex items-stretch hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg transition-transform duration-200">
          <label className="cursor-pointer w-full h-full flex items-center justify-center">
            {file1 ? <p>{file1.name}</p> : <p>Click to upload PDF 1</p>}
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => handleFileChange(e, setFile1)}
            />
          </label>
        </div>
        <div className="w-full sm:w-1/2 border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer flex items-stretch hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg transition-transform duration-200">
          <label className="cursor-pointer w-full h-full flex items-center justify-center">
            {file2 ? <p>{file2.name}</p> : <p>Click to upload PDF 2</p>}
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => handleFileChange(e, setFile2)}
            />
          </label>
        </div>
      </section>

      {/* Button Section */}
      <section className="flex justify-end items-center w-full gap-4">
        <button
          className={`bg-red-500 text-white px-4 py-2 rounded ${file1 || file2 ? "cursor-pointer" : "cursor-not-allowed opacity-50"
            }`}
          onClick={handleClear}
          disabled={!file1 && !file2}
        >
          Clear
        </button>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${file1 && file2 ? "cursor-pointer" : "cursor-not-allowed opacity-50"
            }`}
          onClick={() => handleCompare(comparePdfText)}
          disabled={!file1 || !file2}
        >
          Compare
        </button>
      </section>
    </div>
  );
}
