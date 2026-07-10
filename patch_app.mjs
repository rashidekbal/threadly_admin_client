import fs from 'fs';

const filePath = 'd:/projects/threadly/threadlyAdminPanel/src/App.jsx';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace('<Route path="/system-anomalies" element={<AnomalyLogsMain />} />', '<Route path="/system-anomalies" element={<AnomalyLogsMain />} />\n              <Route path="/deleted-records" element={<DeletedRecordsMainPage />} />');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully patched App.jsx");
