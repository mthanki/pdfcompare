"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface PdfContextType {
    file1: File | null;
    file2: File | null;
    comparisonResult: ComparisonResult | null;
    setFile1: (file: File | null) => void;
    setFile2: (file: File | null) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void) => void;
    handleCompare: (compareFunction: (file1: File, file2: File) => Promise<ComparisonResult>) => Promise<void>;
    handleClear: () => void;
}

interface ComparisonResult {
    overall: string;
    pageResults: { page: number; similarity: number }[];
}

const defaultContext: PdfContextType = {
    file1: null,
    file2: null,
    comparisonResult: null,
    setFile1: () => { },
    setFile2: () => { },
    handleFileChange: () => { },
    handleCompare: async () => { },
    handleClear: () => { },
};

const PdfContext = createContext<PdfContextType>(defaultContext);

export const PdfProvider = ({ children }: { children: ReactNode }) => {
    const [file1, setFile1] = useState<File | null>(null);
    const [file2, setFile2] = useState<File | null>(null);
    const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFile: (file: File | null) => void
    ) => {
        const file = e.target.files?.[0] || null;
        setFile(file);
    };

    const handleCompare = async (
        compareFunction: (file1: File, file2: File) => Promise<ComparisonResult>
    ) => {
        if (file1 && file2) {
            const result = await compareFunction(file1, file2);
            setComparisonResult(result);
        }
    };

    const handleClear = () => {
        setFile1(null);
        setFile2(null);
        setComparisonResult(null);
    };

    return (
        <PdfContext.Provider
            value={{
                file1,
                file2,
                comparisonResult,
                setFile1,
                setFile2,
                handleFileChange,
                handleCompare,
                handleClear,
            }}
        >
            {children}
        </PdfContext.Provider>
    );
};

export const usePdfContext = () => useContext(PdfContext);
