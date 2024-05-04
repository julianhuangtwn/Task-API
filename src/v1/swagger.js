const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Basic Meta Information about the API
// Includes all routes and database files
// All schemas are defined here
const options = {
  definition: {
    openapi: "3.0.1",
    info: { 
      version: "1.3.0",
      title: "Task Scheduling API", 
      description: `This is an API that uses simple CRUD operations on tasks and logs. 
      The API uses JWT tokens for authentication, hence Users must first register their info, then login to get their token. 
      The token is to be provided in the header of every request, then can perform the CRUD operations.
      Users that don't have a token will be met with the error message: "No token provided".
      Each User can only view their own tasks and logs.`,
    },
    components: {
      schemas: {
        Task: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Title of the task",
              example: "Buy groceries"
            },
            description: {
              type: "string",
              description: "Description of the task",
              example: "Buy groceries for the next 2 weeks"
            },
            dueDate: {
              type: "string",
              format: "date-time",
              description: "Due date and time for the task"
            },
            priority: {
              type: "string",
              //enum: ["Low", "Medium", "High"],
              description: "Priority level of the task",
              example: "Medium"
            },
            notes: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Additional notes about the task",
              example: ["Milk, Eggs, Veggies, Bread, Cheese", "Ask Dan if he wants anything"]
            },
            itemsNeeded: {
              type: "array",
              items: {
                type: "string"
              },
              description: "List of items needed to complete the task",
              example: ["Shopping bag", "Bus pass", "Cash"]
            }
          },
          required: ["title", "description", "dueDate", "priority"]
        },
        TaskReturn: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Title of the task",
              example: "Buy groceries"
            },
            description: {
              type: "string",
              description: "Description of the task",
              example: "Buy groceries for the next 2 weeks"
            },
            dueDate: {
              type: "string",
              format: "date-time",
              description: "Due date and time for the task"
            },
            priority: {
              type: "string",
              //enum: ["Low", "Medium", "High"],
              description: "Priority level of the task",
              example: "Medium"
            },
            notes: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Additional notes about the task",
              example: ["Milk, Eggs, Veggies, Bread, Cheese", "Ask Dan if he wants anything"]
            },
            itemsNeeded: {
              type: "array",
              items: {
                type: "string"
              },
              description: "List of items needed to complete the task",
              example: ["Shopping bag", "Bus pass", "Cash"]
            },
            id: {
              type: "string",
              format: "uuid",
              description: "Unique identifier for the task"
            },
            userID: {
              type: "string",
              format: "uuid",
              description: "ID of the user that created the task"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Date and time the task was created"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Date and time the task was last updated"
            }
          } 
        },
        UserRegister: {
          allOf: [
            {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "User's name",
                  example: "John Doe"
                }
              },
              required: ["name", "email", "password"]
            },
            {
              $ref: "#/components/schemas/UserLogin"
            } 
          ]
        },
        UserLogin: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "User's email address",
              example: "johndoe@example.com"
            },
            password: {
              type: "string",
              description: "User's password",
              example: "password123"
            }
          },
          required: ["email", "password"]
        },
        Log: {
          type: "object",
          properties: {
            taskID: {
              type: "string",
              format: "uuid",
              description: "Unique identifier for the task"
            },
            timestamp: {
              type: "string",
              format: "date-time",
              description: "Date and time when the log was created"
            },
            action: {
              type: "string",
              description: "Action performed on the task",
              example: "Task 'Buy groceries' created"
            }
          }
        },
        Error: {
          type: "object",
          properties: {
            status: {
              type: "string"
            },
            message: {
              type: "string"
            }
          }
        }        
      },
      parameters: {
        taskID: {
          in: "path",
          name: "taskID",
          schema:{
            type: "string",
            format: "uuid", 
          },
          required: true,
          description: "ID of the task"
        }
      },
      responses: {
        Unauthorized: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: "Error",
                message: "No token provided"
              }
            }
          }
        },
        Forbidden: {
          description: "Forbidden",
          content: {
            "application/json": {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: "Error",
                message: "Invalid token"
              }
            }
          }
        },
        NoTasksFound: {
          description: "No Tasks Found",
          content: {
            "application/json": {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: "Error",
                message: "No tasks found"
              }
            }
          }
        },
        TaskNotFound: {
          description: "Task with taskID is Not Found",
          content: {
            "application/json": {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: "Error",
                message: "Task: 3fa85f64-5717-4562-b3fc-2c963f66afa6 not found"
              }
            }
          }
        },
       EmptyBody: {
          description: "Bad Request",
          content: {
            "application/json": {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                status: "Error",
                message: "Body cannot be empty"
              }
            }
          }
        },
        MissingKey: {
          description: "Bad Request",
          content: {
            "application/json": {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                status: "Error",
                message: "title, description, dueDate, priority fields are required"
              }
            }
          }
        },
        BadRequestUser: {
          description: "Bad Request",
          content: {
            "application/json": {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                status: "Error",
                message: "Email and Password are required"
              }
            }
          }
        },
        BadLogin: {
          description: "Email or Password is invalid",
          content: {
            "application/json": {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                status: "Error",
                message: "Invalid email or password"
              }
            }
          }
        },
        ServerError: {
          description: "Server Error",
          content: {
            "application/json": {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: "Error",
                message: "Internal server error"
              }
            }
          }
        }
      },
      securitySchemes : {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      } 
    }
  },
  apis: ["./src/v1/routes/*.js", "./src/database/*.js"],
};



const swaggerSpec = swaggerJSDoc(options);

/**
 * Generates Swagger documentation for the API.
 *
 * @param {Object} app - Express application instance
 * @param {integer} port - Port number for the server
 */
const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  
  console.log(`Documentation is available on http://localhost:${port}/api/v1/docs`);
};

module.exports = { swaggerDocs };