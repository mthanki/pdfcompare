import pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// Set the worker source for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function extractTextFromPdf(file) {
    const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
    const textByPage = [];
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        textByPage.push(pageText);
    }
    return textByPage;
}

export async function comparePdfText(file1, file2) {
    const text1 = await extractTextFromPdf(file1);
    const text2 = await extractTextFromPdf(file2);

    const maxPages = Math.max(text1.length, text2.length);
    const pageResults = [];
    let overallSimilarity = 0;

    for (let i = 0; i < maxPages; i++) {
        const page1 = text1[i] || "";
        const page2 = text2[i] || "";
        const similarity = calculateSimilarity(page1, page2);
        pageResults.push({ page: i + 1, similarity });
        overallSimilarity += similarity;
    }

    overallSimilarity /= maxPages;
    return { overall: overallSimilarity.toFixed(2), pageResults };
}

function calculateSimilarity(text1, text2) {
    const set1 = new Set(text1.split(/\s+/));
    const set2 = new Set(text2.split(/\s+/));
    const intersection = new Set([...set1].filter((x) => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size || 0;
}
