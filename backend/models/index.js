const mongoose = require("mongoose");

const opts = { timestamps: true };

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema(
    {
      name: String,
      email: String,
      phone: String,
      company: String,
      requirement: String,
      message: String,
      status: { type: String, default: "new" },
    },
    opts
  )
);

const Consultation = mongoose.model(
  "Consultation",
  new mongoose.Schema(
    {
      name: String,
      email: String,
      phone: String,
      company: String,
      preferredDate: String,
      message: String,
      status: { type: String, default: "new" },
    },
    opts
  )
);

const HealthCheckup = mongoose.model(
  "HealthCheckup",
  new mongoose.Schema(
    {
      business: { name: String, industry: String, size: String, email: String, phone: String },
      digitalPresence: { hasWebsite: String, websiteUrl: String },
      marketing: { channels: [String], budget: String },
      technology: { tools: [String], pain: String },
      challenges: String,
      status: { type: String, default: "new" },
    },
    opts
  )
);

const LeadMagnet = mongoose.model(
  "LeadMagnet",
  new mongoose.Schema(
    { name: String, company: String, email: String, phone: String, resource: String },
    opts
  )
);

const Application = mongoose.model(
  "Application",
  new mongoose.Schema(
    {
      name: String,
      email: String,
      phone: String,
      position: String,
      resumeUrl: String,
      message: String,
      status: { type: String, default: "new" },
    },
    opts
  )
);

module.exports = { Contact, Consultation, HealthCheckup, LeadMagnet, Application };