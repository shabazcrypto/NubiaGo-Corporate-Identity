#!/bin/sh
cd "C:/Users/5S Otomotiv/Desktop/CascadeProjects/NubiaGo-Corporate-Identity"
npx vite > /tmp/vite-output.txt 2>&1 &
echo $! > /tmp/vite.pid
sleep 5
cat /tmp/vite-output.txt
