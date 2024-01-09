# Olvy API Documentation

## Overview
This document outlines the API endpoints for Olvy, a cap table management software. The API is RESTful and uses JSON for request and response bodies. Authentication is performed via JWT tokens.

## Base URL
`https://api.olvy.co`

## Authentication
### POST /api/auth/login
Authenticates a user and returns a JWT token.

- **Request Body:**
  - `email` (string): User's email
  - `password` (string): User's password

- **Response:**
  - `token` (string): JWT token for authenticated sessions
  - `user` (object): User details

### POST /api/auth/register
Registers a new user.

- **Request Body:**
  - `name` (string): User's full name
  - `email` (string): User's email
  - `password` (string): User's password

- **Response:**
  - `message` (string): Success message
  - `user` (object): Newly created user details

## Cap Table
### GET /api/captable
Retrieves the cap table for the authenticated user's company.

- **Headers:**
  - `Authorization`: Bearer `<JWT_TOKEN>`

- **Response:**
  - `capTable` (array): List of cap table entries

### PUT /api/captable/:id
Updates a specific cap table entry.

- **Headers:**
  - `Authorization`: Bearer `<JWT_TOKEN>`

- **Request Body:**
  - `shares` (number): Number of shares
  - `shareholderId` (string): ID of the shareholder

- **Response:**
  - `message` (string): Success message
  - `capTableEntry` (object): Updated cap table entry

## Shareholders
### GET /api/shareholders
Lists all shareholders associated with the authenticated user's company.

- **Headers:**
  - `Authorization`: Bearer `<JWT_TOKEN>`

- **Response:**
  - `shareholders` (array): List of shareholders

### POST /api/shareholders
Adds a new shareholder to the company.

- **Headers:**
  - `Authorization`: Bearer `<JWT_TOKEN>`

- **Request Body:**
  - `name` (string): Shareholder's name
  - `email` (string): Shareholder's email

- **Response:**
  - `message` (string): Success message
  - `shareholder` (object): Newly added shareholder details

## Equity Grants
### GET /api/equitygrants
Retrieves all equity grants for the authenticated user's company.

- **Headers:**
  - `Authorization`: Bearer `<JWT_TOKEN>`

- **Response:**
  - `equityGrants` (array): List of equity grants

### POST /api/equitygrants
Issues a new equity grant to a shareholder.

- **Headers:**
  - `Authorization`: Bearer `<JWT_TOKEN>`

- **Request Body:**
  - `shareholderId` (string): ID of the shareholder
  - `amount` (number): Number of shares granted
  - `vestingSchedule` (string): Description of the vesting schedule

- **Response:**
  - `message` (string): Success message
  - `equityGrant` (object): Details of the newly issued equity grant

## Users
### GET /api/users
Retrieves all users associated with the authenticated user's company.

- **Headers:**
  - `Authorization`: Bearer `<JWT_TOKEN>`

- **Response:**
  - `users` (array): List of users

### GET /api/users/:id
Retrieves details of a specific user.

- **Headers:**
  - `Authorization`: Bearer `<JWT_TOKEN>`

- **Response:**
  - `user` (object): User details

## Error Handling
All endpoints return the following error structure when an error occurs:

- **Response:**
  - `error` (string): Error message

## Status Codes
The following status codes are used in the API:

- `200 OK`: The request was successful.
- `201 Created`: A new resource was successfully created.
- `400 Bad Request`: The request was invalid or cannot be served.
- `401 Unauthorized`: The request requires user authentication.
- `403 Forbidden`: The server understood the request but refuses to authorize it.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: The server encountered an unexpected condition.