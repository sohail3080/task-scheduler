# Production-Grade Task Orchestration & Job Scheduling System

## Overview

This project is a **backend-focused task orchestration and job scheduling system**.

The goal is to build a **reliable background task execution engine** that can:
- accept tasks from clients or other services
- schedule tasks to run immediately or in the future
- execute tasks safely using workers
- retry tasks intelligently on failure
- track task state throughout its lifecycle

This system is intentionally designed to focus on **real-world backend problems**, not simple CRUD operations.

---

## Motivation

Modern backend systems rely heavily on **background jobs**, such as:
- sending emails
- processing payments
- calling webhooks
- generating reports
- running delayed or scheduled tasks

These operations should **not block user requests** and must be executed **reliably**, even when failures occur.

This project exists to deeply understand:
- how background job systems work internally
- how tasks are scheduled and executed
- how failures and retries are handled
- how backend systems scale safely

---

## Core Idea

The system separates **task orchestration** from **task logic**.

- The system does **not** decide what to do.
- It only manages **when** and **how** tasks are executed.
- The actual task behavior is implemented through **task handlers**.

Each task is treated as:

> **Instructions + data + execution time**

---

## High-Level Architecture

The system is composed of the following parts:

- **API Layer**
  - Accepts task creation requests
  - Validates and persists task instructions

- **Scheduler**
  - Periodically checks for tasks ready to run
  - Moves tasks into an executable state

- **Workers**
  - Fetch ready tasks
  - Execute the appropriate task handler
  - Update task state based on execution result

- **Persistent Storage**
  - Stores task state
  - Tracks retries and errors
  - Enables recovery after crashes

---

## Task Lifecycle

Each task moves through a defined lifecycle:

PENDING → READY → RUNNING → SUCCESS
↘ FAILED → RETRY → DEAD


- **PENDING**: Task is stored but not ready to run
- **READY**: Task is eligible for execution
- **RUNNING**: Task is currently being processed
- **SUCCESS**: Task completed successfully
- **FAILED**: Task execution failed
- **RETRY**: Task will be retried after a delay
- **DEAD**: Task exceeded max retries and will not be retried again

Task state is persisted to ensure reliability and recoverability.

---

## Initial Scope

The initial scope of this project is **deliberately minimal**, focusing on correctness and system design rather than feature breadth.

### Supported Task Types

#### 1. SEND_EMAIL
- Simulates sending an email
- Used to demonstrate asynchronous task execution
- Email delivery is mocked or logged (no real email provider)

#### 2. DELAYED_MESSAGE
- Logs a message after a specified delay
- Used to validate scheduling and timing logic

#### 3. FAIL_SOMETIMES
- Randomly fails based on a configured probability
- Used to test retry logic and backoff strategies

#### 4. WEBHOOK_CALL
- Sends an HTTP POST request to an external endpoint
- Retries on non-success responses or network failures

These task types are examples and not limitations.  
New task types can be added without modifying the core system.

## Task Payload Example

```json
{
  "type": "SEND_EMAIL",
  "payload": {
    "to": "user@example.com",
    "subject": "Welcome to Our Platform!",
    "content": "<h1>Hello John!</h1><p>Welcome to our platform. Please click the link below to activate your account:</p><a href='https://example.com/activate?token=abc123'>Activate Account</a>",
    "from": "no-reply@example.com"
  },
  "runAt": "2026-02-01T10:00:00.000Z",
  "availableAt": "2026-02-01T10:00:00.000Z"
}

```
---

## What This Project Is Not

- Not a frontend application
- Not a cron replacement
- Not a business-logic decision engine
- Not a framework-specific demo

This project focuses purely on **backend system design and reliability**.

---

## Engineering Concepts Explored

- Background task execution
- Job scheduling and delayed tasks
- Task state machines
- Retry strategies and exponential backoff
- Idempotency and duplicate execution safety
- Worker isolation and scalability
- Failure handling and recovery
- Observability through logging and metrics

---

## Documentation Approach

Every major design decision is documented, including:
- database schema design
- scheduling strategy
- worker coordination
- retry and failure handling
- trade-offs and alternatives considered

The goal is not just to build the system, but to **understand and explain it clearly**.

---

## Current Status

🚧 **Project initialization and system design**

Upcoming steps:
- database schema design
- API contract definition
- scheduler implementation
- worker execution logic
