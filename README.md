##Use of commitlint utility
Commitlint is used to check commit messages in Node.js (or any Git) projects.
#Why we use Commitlint: 1. To make sure all commit messages follow the same style (like a rule). 2. Helps keep the Git history clean and easy to read. 3. Good for teams working together.

Example rule:
feat: add login button
fix: correct typo in navbar

##ESLint Setup
--ESLint is a tool used in Node.js projects to maintain code quality and consistency. It analyzes code for syntax errors, stylistic issues, and potential bugs, helping developers adhere to coding standards and best practices. By enforcing rules defined in its configuration, ESLint ensures a uniform codebase, making it more readable, maintainable, and less prone to errors.

    --It can be customized with plugins and configurations to fit specific project needs, and it integrates well with code editors and build processes for real-time feedback and automated checks

#Winston set-up for logging
Winston is a versatile logging library for Node.js applications, offering structured logging with multiple output options (transports) and flexible formatting. It enables developers to categorize log messages by severity levels (e.g., error, warn, info, debug) and direct them to various destinations such as the console, files, databases, or external services. Winston facilitates debugging, monitoring, and maintaining applications by providing detailed insights into their runtime behavior. Its features include:
Multiple Transports: Supports various storage options for logs, including console, files, databases, and external services.

1.Log Levels: Categorizes log messages based on severity, allowing for filtering and prioritization.
2.Formats: Enables customization of log message output, including JSON and plain text.
3.Profiling: Includes built-in profiling tools for tracking performance.
4.Extensibility: Allows for custom transports and formats to meet specific needs.
5.Integration: Can be combined with other tools like Morgan for HTTP request logging.
6.Rotation: Supports log file rotation based on date or size, with automatic deletion of older logs.

##winstone-mongodb
winston-mongodb is a Node.js library that enables logging to MongoDB within applications using the popular winston logging library. It functions as a transport for winston, allowing log messages to be stored as documents within a specified MongoDB collection. This centralized storage provides features like querying, indexing, and analysis of logs, useful for debugging, monitoring, and understanding application behavior.
A helpful way to think about it is that winston-mongodb acts as a bridge, connecting your winston logger to your MongoDB database, making it easy to store logs in a structured, searchable format.
