---
title: Health Tracker App
description: Flutter mobile app for personal health data tracking - record and monitor glucose levels, waist diameter, and body weight over time
image: /projects/health-tracker-app/health-tracker-app-1.png
author: Cristian Paredes
status: deployed
category: Mobile App
date: 2025-03-15
tags:
  - flutter
  - dart
  - sqlite
  - bloc
  - mobile
  - clean-architecture
---

# Health Tracker App

A Flutter mobile application for personal health data tracking. Allows users to record and monitor glucose levels, waist diameter, and body weight over time.

## Key Features

- **Health Metrics Registration**: Capture glucose (mg/dL), waist diameter (cm), and body weight (kg)
- **Local Storage**: SQLite database for privacy and offline access
- **Complete History**: View all measurements ordered by date
- **Smart Filtering**: Organization by metric type and temporal grouping
- **Offline Functionality**: Complete features without internet connection
- **Intuitive Interface**: Clean design with tab navigation and quick data entry

## Architecture

### Layered Architecture

```
┌─────────────────────────────────────┐
│     Presentation Layer (UI)         │  ← Screens, Widgets
├─────────────────────────────────────┤
│   Business Logic Layer (BLoC)      │  ← State Management
├─────────────────────────────────────┤
│   Data Access Layer (Repository)   │  ← Data Abstraction
├─────────────────────────────────────┤
│   Data Storage Layer (SQLite)       │  ← Local Database
└─────────────────────────────────────┘
```

### Design Patterns

| Pattern | Purpose | Implementation |
|---------|---------|----------------|
| Repository | Abstract data access | `HealthRepository` interface |
| BLoC | Reactive state management | `HealthTrackingBloc` with typed events/states |
| Dependency Injection | Decoupling | Manual injection via constructors |

## Technical Decisions

### SQLite as Local Database
- **Reason**: Data privacy, offline functionality, performance
- **Implementation**: Transactions for integrity, indexes for performance
- **Schema**: Single `health_records` table with typed fields and timestamps

### Robust Data Validation
- **Glucose**: 0-1000 mg/dL
- **Waist**: 10-300 cm
- **Weight**: 1-1000 kg
- **Validation at multiple layers**: UI, Repository, and Database

## Project Structure

```
lib/
├── blocs/                    # State and business logic
├── database/                 # Data access layer
├── models/                   # Data models
├── repositories/            # Data abstraction
├── screens/                  # User interfaces
├── services/                 # Auxiliary services
├── widgets/                  # Reusable components
└── main.dart                 # Entry point
```

## Testing Strategy

### Comprehensive Test Coverage (130+ test cases)

- **Unit Tests**: Models, Database, Repository, BLoC
- **Widget Tests**: Screens, Navigation, Components
- **Integration Tests**: End-to-end flows, Persistence, Offline mode

### Code Coverage

| Component | Coverage |
|-----------|----------|
| Models | 100% |
| Database | 100% |
| Repository | 100% |
| BLoC | 95% |
| Screens | 85% |
| **Overall** | **>90%** |

## Installation

```bash
git clone https://github.com/csparedes/health-tracker-app.git
cd health-tracker-app
flutter pub get
flutter run
```

## Repository

[GitHub Repository](https://github.com/csparedes/health-tracker-app)
