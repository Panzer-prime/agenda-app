import {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
} from "sequelize";

export const handleSequelizeError = (error: any) => {
  if (error instanceof UniqueConstraintError) {
    throw new Error("Data already exists in the database.");
  } else if (error instanceof ForeignKeyConstraintError) {
    throw new Error("Invalid foreign key reference. Related data is missing.");
  } else if (error.name === "SequelizeValidationError") {
    throw new Error(
      `"Validation error: some data fields are invalid." ${error.message}`
    );
  } else if (error.name === "SequelizeDatabaseError") {
    throw new Error(
      "Database error: An issue occurred with the database operation."
    );
  } else if (error.name === "SequelizeEmptyResultError") {
    throw new Error("No record found ");
  } else {
    console.error("Unhandled Sequelize Error:", error.message);
    throw new Error(error.message);
  }
};
