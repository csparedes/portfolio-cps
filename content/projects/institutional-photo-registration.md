---
title: Institutional Photo Registration Platform
description: Privacy-focused platform for capturing, validating, and securely managing student photos for institutional access workflows
date: 2026-10-06
author: Cristian Paredes
status: in-development
category: Web App
image: /projects/institutional-photo-registration/cover.png
images:
  - src: /projects/institutional-photo-registration/cover.png
    alt: Conceptual illustration of the secure institutional photo registration platform
  - src: /projects/institutional-photo-registration/institutional-photo-registration-1.jpeg
    alt: Student login screen with institutional credentials and theme selection
  - src: /projects/institutional-photo-registration/institutional-photo-registration-2.jpeg
    alt: Administrative photo validation showing individual quality checks and actionable feedback
  - src: /projects/institutional-photo-registration/institutional-photo-registration-4.jpeg
    alt: Separate administrator login screen for protected management workflows
tags:
  - nuxt
  - nestjs
  - typescript
  - postgresql
  - fastapi
  - mediapipe
  - docker
  - jenkins
---

# Institutional Photo Registration Platform

A full-stack platform that helps students submit a compliant institutional photo while giving authorized staff a secure workflow to review registrations and export approved images.

## What I built

- A guided Nuxt 4 experience for institutional authentication, versioned consent, camera capture, image upload, cropping, and accessible validation feedback.
- Real-time face framing in the browser with MediaPipe, plus authoritative server-side quality analysis using FastAPI and OpenCV.
- A NestJS API with separate student and administrator sessions, role-based access, validation, audit-ready metadata, and protected downloads.
- Administrative search, status filtering, individual review, photo replacement, and streamed ZIP exports for approved records.

## Architecture and privacy

PostgreSQL stores business records and validation metadata, while private image binaries remain in S3-compatible RustFS storage. The system never exposes storage keys or public image URLs, and photo replacements use transactional rules to preserve one authoritative accepted image per student.

The application runs as a Docker Compose stack behind Nginx. A Jenkins pipeline prepares the institutional test deployment, including environment validation, migrations, health checks, HTTPS configuration, and persistent infrastructure.

## Engineering highlights

- Browser camera lifecycle, countdown capture, responsive 3:4 framing, JPEG normalization, and size-aware compression.
- Explicit photo states—pending, accepted, and rejected—with safe retry and conflict-reconciliation paths.
- Unicode-safe export filenames and sequential ZIP streaming without temporary files.
- Automated frontend, backend, image-analysis, and infrastructure checks designed around sensitive-data boundaries.

## Current status

The student and administration flows, private storage, and automated photo-quality analysis are implemented. The deployment configuration is prepared for institutional testing and awaits final environment credentials, migrations, and end-to-end validation before production use.
