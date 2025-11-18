export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Recurso não encontrado') {
    super(404, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Não autorizado') {
    super(401, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Acesso negado') {
    super(403, message);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Dados inválidos') {
    super(400, message);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflito de dados') {
    super(409, message);
  }
}
