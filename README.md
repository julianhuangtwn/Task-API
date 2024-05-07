
# Task API

This is an API that uses simple CRUD operations on tasks and logs. 
      The API uses JWT tokens for authentication, hence Users must first register their info, then login to get their token. 
      The token is to be provided in the header of every request, then can perform the CRUD operations.
      Users that don't have a token will be met with the error message: "No token provided".
      Each User can only view their own tasks and logs



## View API

The API is hosted through Render and interacted via Swagger.


- Visit the site [https://task-api-6o4j.onrender.com](https://task-api-6o4j.onrender.com)
  - Note: The website may take a minute to load

**User**

      1. Register an account 

      2. Login with your email and password

      3. If successful, a token will be returned in the response body. Copy the token

      4. On the top right in "Authorization", paste the token and confirm authentication



**Tasks**
      
      Create some Tasks. Each Task body will require at least the fields: 
            - "Title": Title of the task
            - "Description": Description of the task details
            - "dueDate": Due date of the task. No input restrictions
            - "Priority": The level of task priority, such as Low or High

            Optional:
            - "Notes": Additional Notes
            - "itemsNeeded": List/Array of items required

      Once a Task is created, a unique ID will be generated. This ID is used to filter by that specific Task to be viewed or edited etc.

      Most other requests require a specific taskID. Use the "id" of each Task to perform a request.


**Logs**

      Each operation on a Task will generate a Log. Use the "id" of the Task to view the logs.
