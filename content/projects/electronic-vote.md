---
title: Electronic Vote
description: Electronic voting system built with Nuxt 4, allowing election administration, candidate management, and secure vote recording with JWT authentication
image: /projects/electronic-vote/electronic-vote-1.png
author: Cristian Paredes
status: in-development
category: Web App
date: 2025-06-15
tags:
  - nuxt
  - nuxt-ui
  - typescript
  - postgresql
  - drizzle-orm
  - tailwindcss
  - jwt
  - docker
---

# Electronic Vote

Electronic voting system built with Nuxt 4, Nuxt UI 4, and PostgreSQL. Allows election administration, candidate management, and secure vote recording with JWT authentication.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Nuxt 4 |
| UI Library | Nuxt UI 4 |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Auth | nuxt-auth-utils (JWT) |
| Styles | TailwindCSS 4 |
| Icons | Lucide Icons |

## Features

### Authentication System
- User registration and login with email and password
- JWT sessions with 1 hour expiration
- Password change with current password verification
- Rate limiting on login (5 attempts per 15 minutes)
- Global authentication middleware protecting routes
- Role-Based Access Control (RBAC)

### Roles and Permissions

| Role | Description |
|------|-------------|
| Voter | Can view active elections and vote |
| Advisor | + Dashboard access |
| Admin | + Election and candidate management |
| Dev | Full system access |

### Voting System
- Active elections list with relevant information (dates, candidates)
- Election detail with candidate visualization
- Visual candidate selection before vote confirmation
- Confirmation modal to prevent accidental votes
- Double vote prevention per user/election
- Election status verification (only active accept votes)
- Results page with bar chart and vote percentages

### Election and Candidate Management
- Full CRUD for elections (create, edit, delete)
- Full CRUD for candidates
- Candidate-election association
- Bulk candidate import from CSV files
- Date validation (end date must be after start date)
- Election statuses: Draft, Active, Finished

## API REST

### Authentication
- `POST /api/auth/register` - New user registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password

### Elections
- `GET /api/elections` - List all elections
- `POST /api/elections` - Create election
- `GET /api/elections/active` - List active elections
- `GET /api/elections/:id` - Get election details
- `PUT /api/elections/:id` - Update election
- `DELETE /api/elections/:id` - Delete election
- `GET /api/elections/:id/results` - Get election results

### Candidates
- `GET /api/candidates` - List all candidates
- `POST /api/candidates` - Create candidate
- `GET /api/candidates/:id` - Get candidate details
- `PUT /api/candidates/:id` - Update candidate
- `DELETE /api/candidates/:id` - Delete candidate
- `POST /api/candidates/import` - Import candidates from CSV

### Votes
- `POST /api/votes` - Register a vote
- `GET /api/votes/status` - Get user vote status

## Security

- **Passwords**: Hashing with bcrypt (10 salt rounds)
- **Authentication**: JWT tokens in HTTP-only sessions
- **Rate Limiting**: Brute force attack prevention on login
- **SQL Injection**: Prevention via Drizzle ORM (parameterized queries)
- **RBAC**: Role verification on each protected endpoint
- **CSRF**: Integrated Nuxt protection

## Quick Start

```bash
git clone https://github.com/csparedes/electronic-vote.git
cd electronic-vote
pnpm install
docker compose up -d
pnpm db:generate
pnpm db:push
pnpm dev
```

## Repository

[GitHub Repository](https://github.com/csparedes/electronic-vote.git)
