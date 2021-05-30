# react-form-sample

This is a proof of concept implementation of Clean Architecture applied to a React application.

## Layers

### UI layer

This layer is where the React plays main role.

- Views: contains React components.

### Application layer

- UseCases: contains interactions working with repositories.
- ViewModels: contains data models bound to views.

### (Domain layer)

Usually domain logic encapsulated in server side API. if frontend application has to have domain logic,
the design might be failed.

- Entities: contains entities.

### Infrastructure layer

- Repositories: contains persister to backend API.
- Drivers: contains drivers access to the detailed infrastructure.
