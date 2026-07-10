import fs from 'fs';

const filePath = 'd:/projects/threadly/threadlyAdminPanel/src/components/BarChartStats.jsx';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/const DASHBOARD_STATS = \[\s+.*?\];/s, '');
content = content.replace(/<BarChart data=\{DASHBOARD_STATS\}>/g, '<BarChart data={data}>');
content = content.replace(/<p>Engagement Distribution<\/p>/g, '<p>Post Creation Trend (Last 30 Days)</p>');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully patched BarChartStats.jsx");
