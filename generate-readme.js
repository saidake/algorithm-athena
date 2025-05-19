const fs = require('fs');
const path = require('path');

function extractLinksFromAlgorithms(content) {
  const lines = content.split('\n');
  const results = [];
  let currentTitle = '';
  let currentLink = '';
  let currentLangs = new Set();

  lines.forEach(line => {
    const match = line.match(/^## (\d+)\. (.+)/);
    if (match) {
      if (currentTitle) {
        results.push({
          title: currentTitle,
          link: currentLink,
          langs: Array.from(currentLangs),
        });
      }
      currentLangs = new Set();
      const anchor = match[2].toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      currentTitle = `${match[1]}. ${match[2]}`;
      currentLink = `docs/Algorithms.md#${match[1]}-${anchor}`;
    }

    if (/^#### MySQL Implementation/i.test(line)) currentLangs.add('MySQL');
    if (/^#### Oracle Implementation/i.test(line)) currentLangs.add('Oracle');
    if (/^#### JavaScript Implementation/i.test(line)) currentLangs.add('JavaScript');
    if (/^#### Java Implementation/i.test(line)) currentLangs.add('Java');
    if (/^#### Python Implementation/i.test(line)) currentLangs.add('Python');
    if (/^#### Python3 Implementation/i.test(line)) currentLangs.add('Python');
    if (/^#### C\+\+ Implementation/i.test(line)) currentLangs.add('C++');
    if (/^#### Golang Implementation/i.test(line)) currentLangs.add('Golang');
  });

  if (currentTitle) {
    results.push({
      title: currentTitle,
      link: currentLink,
      langs: Array.from(currentLangs),
    });
  }

  return results;
}

function extractLinksWithAnchors(content, filename) {
  const lines = content.split('\n');
  const results = [];

  lines.forEach(line => {
    const match = line.match(/^## (\d+)\. (.+)/);
    if (match) {
      const rawTitle = match[2];
      const anchor = rawTitle.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      results.push({
        title: `${match[1]}. ${rawTitle}`,
        link: `docs/${filename}#${match[1]}-${anchor}`,
      });
    }
  });

  return results;
}

function generateMarkdownTable(algo, interview, design) {
  algo.reverse();
  interview.reverse();
  design.reverse();
  
  const maxRows = Math.max(algo.length, interview.length, design.length);
  const rows = [];

  for (let i = 0; i < maxRows; i++) {
    let algoCell = '';
    let interviewCell = '';
    let designCell = '';

    if (algo[i]) {
      const title = algo[i].title;
      const link = algo[i].link;
      const langs = algo[i].langs.length ? ` [${algo[i].langs.join(', ')}]` : '';
      algoCell = `[${title}](${link})${langs}`;
    }

    if (interview[i]) {
      interviewCell = `[${interview[i].title}](${interview[i].link})`;
    }

    if (design[i]) {
      designCell = `[${design[i].title}](${design[i].link})`;
    }

    rows.push(`| ${algoCell} | ${interviewCell} | ${designCell} |`);
  }

  return [
    '| Algorithms | Interview Questions | System Design |',
    '|------------|---------------------|----------------|',
    ...rows,
  ].join('\n');
}


// Load files
const algorithms = fs.readFileSync(path.join(__dirname, './docs/Algorithms.md'), 'utf-8');
const interview = fs.readFileSync(path.join(__dirname, './docs/InterviewQuestions.md'), 'utf-8');
const design = fs.readFileSync(path.join(__dirname, './docs/SystemDesign.md'), 'utf-8');

// Parse and generate table
const algorithmsList = extractLinksFromAlgorithms(algorithms);
const interviewList = extractLinksWithAnchors(interview, 'InterviewQuestions.md');
const designList = extractLinksWithAnchors(design, 'SystemDesign.md');

const markdownTable = generateMarkdownTable(algorithmsList, interviewList, designList);

// Output result
console.log(markdownTable);

// Save result to README.md (append mode)
const outputPath = path.join(__dirname, 'README.md');

// Append to the markdown file with spacing
fs.appendFileSync(outputPath, '\n\n' + markdownTable + '\n');

console.log('✅ Table successfully appended to README.md');