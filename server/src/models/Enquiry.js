import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { isDatabaseConnected } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'enquiries.json');

// Mongoose Schema for MongoDB
const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    organization: { type: String, trim: true, default: '' },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    service: {
      type: String,
      required: true,
      enum: [
        'Web Development',
        'Video Editing',
        'Logo & Brand Design',
        'Social Media Management',
        'Ad Management',
        'Event Management',
        'Other',
      ],
    },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['new', 'in_review', 'contacted', 'closed'],
      default: 'new',
    },
    ipAddress: { type: String, default: '' },
    userAgent: { type: String, default: '' },
  },
  { timestamps: true }
);

const MongooseEnquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);

// File-based store helper functions
async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
    }
  } catch (err) {
    console.error('[Storage] Error ensuring data directory/file:', err);
  }
}

async function readFileEnquiries() {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeFileEnquiries(enquiries) {
  await ensureDataFile();
  const tempPath = `${DATA_FILE}.tmp`;
  await fs.writeFile(tempPath, JSON.stringify(enquiries, null, 2), 'utf8');
  await fs.rename(tempPath, DATA_FILE);
}

// Unified Enquiry API
export const Enquiry = {
  async create(data) {
    if (isDatabaseConnected()) {
      return await MongooseEnquiry.create(data);
    }

    // Local file fallback
    const id = 'enq_' + crypto.randomUUID().slice(0, 8);
    const now = new Date().toISOString();
    const newEnquiry = {
      _id: id,
      id,
      name: data.name,
      organization: data.organization || '',
      email: data.email,
      phone: data.phone,
      service: data.service,
      description: data.description,
      status: 'new',
      ipAddress: data.ipAddress || '',
      userAgent: data.userAgent || '',
      createdAt: now,
      updatedAt: now,
    };

    const enquiries = await readFileEnquiries();
    enquiries.unshift(newEnquiry);
    await writeFileEnquiries(enquiries);

    return newEnquiry;
  },

  async findAll({ limit = 50, skip = 0 } = {}) {
    if (isDatabaseConnected()) {
      return await MongooseEnquiry.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
    }

    const enquiries = await readFileEnquiries();
    return enquiries.slice(skip, skip + limit);
  },

  async count() {
    if (isDatabaseConnected()) {
      return await MongooseEnquiry.countDocuments();
    }
    const enquiries = await readFileEnquiries();
    return enquiries.length;
  },

  async findById(id) {
    if (isDatabaseConnected()) {
      return await MongooseEnquiry.findById(id).lean();
    }
    const enquiries = await readFileEnquiries();
    return enquiries.find((e) => e._id === id || e.id === id) || null;
  }
};
