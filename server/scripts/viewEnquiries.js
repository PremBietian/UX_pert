import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../data/enquiries.json');

async function displayEnquiries() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const enquiries = JSON.parse(raw);

    console.log('\n======================================================');
    console.log(`  UXpert — Client Enquiries (Total: ${enquiries.length})`);
    console.log('======================================================\n');

    if (enquiries.length === 0) {
      console.log('No enquiries recorded yet.\n');
      return;
    }

    enquiries.forEach((item, index) => {
      const date = item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A';
      console.log(`[#${index + 1}] ID: ${item.id || item._id} | Date: ${date}`);
      console.log(`  Name:         ${item.name}`);
      console.log(`  Organization: ${item.organization || '(Not specified)'}`);
      console.log(`  Email:        ${item.email}`);
      console.log(`  Phone / WA:   ${item.phone}`);
      console.log(`  Service:      ${item.service}`);
      console.log(`  Description:  ${item.description}`);
      console.log('------------------------------------------------------');
    });
    console.log('\n');
  } catch (err) {
    console.error('Could not read enquiries:', err.message);
  }
}

displayEnquiries();
