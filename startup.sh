#!/bin/bash
set -euo pipefail

PROJECT_ROOT=$(pwd)
LOG_FILE="${PROJECT_ROOT}/startup.log"
FRONTEND_PID_FILE="${PROJECT_ROOT}/frontend.pid"
BACKEND_PID_FILE="${PROJECT_ROOT}/backend.pid"
HEALTH_CHECK_INTERVAL=10
FRONTEND_HEALTH_URL="http://localhost:5173"
BACKEND_HEALTH_URL="http://localhost:3000/api/health"

export $(grep -v '^#' .env | xargs)

log_info() {
  date +"%Y-%m-%d %H:%M:%S" "$@" | tee -a "$LOG_FILE"
}

log_error() {
  date +"%Y-%m-%d %H:%M:%S" "$@" | tee -a "$LOG_FILE" >&2
}

cleanup() {
  log_info "Cleaning up processes..."
  if [ -f "$FRONTEND_PID_FILE" ]; then
    kill "$(cat "$FRONTEND_PID_FILE")"
    rm "$FRONTEND_PID_FILE"
  fi
  if [ -f "$BACKEND_PID_FILE" ]; then
    kill "$(cat "$BACKEND_PID_FILE")"
    rm "$BACKEND_PID_FILE"
  fi
  log_info "Cleanup complete."
}

check_dependencies() {
  if ! command -v npm &> /dev/null; then
    log_error "Error: npm is not installed. Please install Node.js and npm."
    exit 1
  fi
  if ! command -v node &> /dev/null; then
    log_error "Error: node is not installed. Please install Node.js."
    exit 1
  fi
}

check_port() {
  local port="$1"
  if nc -z localhost "$port"; then
    log_error "Error: Port ${port} is already in use."
    exit 1
  fi
}

wait_for_service() {
  local url="$1"
  local timeout="$2"
  local start_time=$(date +%s)
  while true; do
    if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "200"; then
       log_info "Service at ${url} is ready."
      return 0
    fi
    local elapsed_time=$(( $(date +%s) - start_time ))
    if [ "$elapsed_time" -ge "$timeout" ]; then
      log_error "Error: Service at ${url} timed out after ${timeout} seconds."
      return 1
    fi
    sleep "$HEALTH_CHECK_INTERVAL"
  done
}


store_pid() {
  local pid="$1"
  local pid_file="$2"
  echo "$pid" > "$pid_file"
}

verify_service() {
  local url="$1"
    if ! curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "200"; then
        log_error "Error: Health check failed for service at $url."
       return 1
    fi
}


start_frontend() {
  log_info "Starting frontend..."
  cd "$PROJECT_ROOT"
  npm install
  npm run dev &
  FRONTEND_PID=$!
  store_pid "$FRONTEND_PID" "$FRONTEND_PID_FILE"
  log_info "Frontend started with PID: $FRONTEND_PID"

  if wait_for_service "$FRONTEND_HEALTH_URL" 60; then
     log_info "Frontend service is ready."
  else
      log_error "Error: Frontend failed to start."
     cleanup
      exit 1
  fi
}

start_backend() {
    log_info "Starting backend..."
  
    if !  command -v node &> /dev/null; then
        log_error "Error: Node.js not found, please install node"
       cleanup
       exit 1
      fi

      node -e '
        const http = require("http");
        const port = 3000;
         const server = http.createServer((req, res) => {
           if (req.url === "/api/health") {
                res.writeHead(200, { "Content-Type": "text/plain" });
               res.end("OK");
           } else if (req.url === "/api/auth/register" && req.method === "POST") {
                  let body = "";
                     req.on("data", (chunk) => {
                          body += chunk;
                        });
                     req.on("end", () => {
                         try {
                           const parsedBody = JSON.parse(body);
                           console.log("Registration requested:", parsedBody);
                           res.writeHead(201, { "Content-Type": "application/json" });
                              res.end(JSON.stringify({
                                "id": "user123",
                                "username": parsedBody.username,
                                "email": parsedBody.email,
                                "token": "mocked_jwt_token",
                              }));
                         } catch (error) {
                           res.writeHead(400, { "Content-Type": "application/json" });
                             res.end(JSON.stringify({ error: "Invalid JSON" }));
                             console.error("Error parsing JSON:", error);
                          }
                        });
          } else if (req.url === "/api/auth/login" && req.method === "POST") {
                let body = "";
                req.on("data", (chunk) => {
                     body += chunk;
                 });
                req.on("end", () => {
                  try {
                     const parsedBody = JSON.parse(body);
                       console.log("Login requested:", parsedBody);
                       res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                            "token": "mocked_jwt_token",
                             "user": {
                                "username": "user",
                                "email": parsedBody.email,
                             }
                          }));
                   } catch (error) {
                       res.writeHead(400, { "Content-Type": "application/json" });
                         res.end(JSON.stringify({ error: "Invalid JSON" }));
                         console.error("Error parsing JSON:", error);
                   }
                 });
             }else if (req.url === "/api/goals" && req.method === "POST") {
                  let body = "";
                     req.on("data", (chunk) => {
                       body += chunk;
                    });
                     req.on("end", () => {
                        try {
                           const parsedBody = JSON.parse(body);
                             console.log("Goal Creation requested:", parsedBody);
                           res.writeHead(201, { "Content-Type": "application/json" });
                             res.end(JSON.stringify({
                               "id": 1,
                              "name": parsedBody.name,
                                "description": parsedBody.description,
                                "startDate": parsedBody.startDate,
                                "endDate": parsedBody.endDate,
                                "targetValue": parsedBody.targetValue,
                              }));
                           } catch (error) {
                           res.writeHead(400, { "Content-Type": "application/json" });
                                res.end(JSON.stringify({ error: "Invalid JSON" }));
                                console.error("Error parsing JSON:", error);
                           }
                       });
           } else if (req.url === "/api/goals" && req.method === "GET") {
               console.log("Get all goals requested");
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify([{
                   "id": 1,
                    "name": "Run 5k",
                   "description": "Complete 5 kilometers",
                    "startDate": null,
                     "endDate": null,
                    "targetValue": 5,
                  },
                   {
                    "id": 2,
                     "name": "Eat healthy",
                    "description": "Avoid fast food",
                    "startDate": null,
                     "endDate": null,
                    "targetValue": 30,
                  }]));
           }else if (req.url === "/api/goals/1" && req.method === "PUT") {
                  let body = "";
                     req.on("data", (chunk) => {
                       body += chunk;
                    });
                     req.on("end", () => {
                        try {
                           const parsedBody = JSON.parse(body);
                            console.log("Update goal requested:", parsedBody);
                           res.writeHead(200, { "Content-Type": "application/json" });
                             res.end(JSON.stringify({
                              "id": 1,
                              "name": parsedBody.name,
                              "description": parsedBody.description,
                              "startDate": parsedBody.startDate,
                              "endDate": parsedBody.endDate,
                             "targetValue": parsedBody.targetValue,
                            }));
                        } catch (error) {
                         res.writeHead(400, { "Content-Type": "application/json" });
                           res.end(JSON.stringify({ error: "Invalid JSON" }));
                          console.error("Error parsing JSON:", error);
                        }
                    });
                } else if (req.url === "/api/profile" && req.method === "GET") {
                    console.log("Get profile requested");
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                      "username": "user",
                        "email": "user@example.com",
                      }));
              } else if (req.url === "/api/dashboard" && req.method === "GET") {
                    console.log("Get Dashboard data requested");
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                      "totalWorkouts": 5,
                      "totalCaloriesBurned": 1200,
                      "averageWorkoutTime": 45,
                       "bestWorkoutTime": 60,
                      }));
                 }
             else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Not Found");
              }
           });
         server.listen(port, () => {
           console.log(\`Mock backend server is running on http://localhost:\${port}\`);
        });
      ' &
    
  BACKEND_PID=$!
    store_pid "$BACKEND_PID" "$BACKEND_PID_FILE"
    log_info "Backend started with PID: $BACKEND_PID"

    if wait_for_service "$BACKEND_HEALTH_URL" 60; then
        log_info "Backend service is ready."
    else
        log_error "Error: Backend failed to start."
        cleanup
        exit 1
    fi
}

trap cleanup EXIT ERR INT TERM

check_dependencies

log_info "Starting application..."

start_frontend
start_backend


verify_service "$FRONTEND_HEALTH_URL"
verify_service "$BACKEND_HEALTH_URL"

log_info "Application started successfully."