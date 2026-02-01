#!/bin/bash

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting SenWork Portfolio...${NC}"

# Check if backend is running
if lsof -i:8080 > /dev/null 2>&1; then
    echo -e "${YELLOW}Backend is already running on port 8080${NC}"
else
    echo -e "${GREEN}Starting backend server...${NC}"
    cd backend && go run main.go &
    BACKEND_PID=$!
    echo -e "${GREEN}Backend started (PID: $BACKEND_PID)${NC}"
fi

# Start frontend
echo -e "${GREEN}Starting frontend dev server...${NC}"
cd frontend && npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}Frontend started (PID: $FRONTEND_PID)${NC}"

echo ""
echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}  SenWork Portfolio${NC}"
echo -e "${BLUE}======================================${NC}"
echo -e "${GREEN}Frontend:${NC} http://localhost:3000"
echo -e "${GREEN}Backend:${NC}  http://localhost:8080"
echo -e "${GREEN}API:${NC}      http://localhost:8080/api"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"

# Wait for Ctrl+C
wait
``