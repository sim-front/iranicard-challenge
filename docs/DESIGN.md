# Design of Ticket Panel

This project is running on Next.js' Page Router architecture.

## State Management

The `_App` component is wrapped by a project level Context located at `@/helpers/_AppContext/`, which holds frequently used states and functions.

## Components

The components reside under `@/components`.

## Misc

Components that are used in multiple pages are placed under `@/components/_shared/` for easy access.
