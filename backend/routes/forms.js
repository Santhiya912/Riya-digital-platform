const express = require("express");
const { z } = require("zod");
const M = require("../models");

const router = express.Router();

const phone = z.string().trim().regex(/^[0-9+\-\s]{8,15}$/, "Invalid phone number");
const email = z.string().trim().toLowerCase().email("Invalid email");
const name = z.string().trim().min(2, "Name is too short").max(80);
const text = (min = 0) => z.string().trim().min(min).max(2000);

const schemas = {
  contact: z.object({
    name, email, phone,
    company: z.string().trim().max(120).optional().default(""),
    requirement: z.string().trim().min(2).max(120),
    message: text(10),
  }),
  consultation: z.object({
    name, email, phone,
    company: z.string().trim().max(120).optional().default(""),
    preferredDate: z.string().trim().max(60).optional().default(""),
    message: text().optional().default(""),
  }),
  "health-checkup": z.object({
    business: z.object({
      name: z.string().trim().min(2),
      industry: z.string().trim().optional().default(""),
      size: z.string().trim().optional().default(""),
      email,
      phone,
    }),
    digitalPresence: z.object({
      hasWebsite: z.string().optional().default(""),
      websiteUrl: z.string().trim().optional().default(""),
    }).default({ hasWebsite: "", websiteUrl: "" }),
    marketing: z.object({
      channels: z.array(z.string()).default([]),
      budget: z.string().optional().default(""),
    }).default({ channels: [], budget: "" }),
    technology: z.object({
      tools: z.array(z.string()).default([]),
      pain: z.string().optional().default(""),
    }).default({ tools: [], pain: "" }),
    challenges: text().optional().default(""),
  }),
  "lead-magnet": z.object({
    name, email, phone,
    company: z.string().trim().min(2).max(120),
    resource: z.string().optional().default("software-project-planning-guide"),
  }),
  applications: z.object({
    name, email, phone,
    position: z.string().trim().min(2).max(120),
    resumeUrl: z.string().trim().optional().default(""),
    message: text().optional().default(""),
  }),
};

const models = {
  contact: M.Contact,
  consultation: M.Consultation,
  "health-checkup": M.HealthCheckup,
  "lead-magnet": M.LeadMagnet,
  applications: M.Application,
};

Object.keys(schemas).forEach((key) => {
  router.post(`/${key}`, async (req, res, next) => {
    try {
      const parsed = schemas[key].safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: parsed.error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        });
      }
      const doc = await models[key].create(parsed.data);
      res.status(201).json({ success: true, message: "Submitted successfully", id: doc._id });
    } catch (err) {
      next(err);
    }
  });
});

module.exports = router;