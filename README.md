# **echo.tv**

A simple Twitch clone for exploring live streaming with **NGINX, RTMP, and HLS**. Users can stream via OBS or other software and watch other streams.

## **Features**

- Low-latency streaming
- Stream & user authentication
- Watch other users' live streams

---

## **Setup Guide**

### **1. Client (Frontend)**

```bash
cd client
npm install
npm run dev  # Starts the frontend at http://localhost:5173
```

### **2. Server (Backend)**

```bash
cd ../server
npm install
npm run dev  # Starts the backend at http://localhost:5174
```

### **3. Database (MySQL + Prisma)**

```bash
npm run prisma:migrate:dev  # Creates schema to MySQL
npm run prisma:generate:dev  # Generates Prisma client (for intellisense)
```

### **4. NGINX for RTMP & HLS**

**Install NGINX with RTMP Module**

```bash
sudo apt install nginx libnginx-mod-rtmp -y
```

**Configure NGINX Server**

Append the RTMP block from `/configs/nginx/nginx.conf` to `nginx.conf`

```bash
sudo nano /etc/nginx/nginx.conf  # Add RTMP settings
```

Create an HTTP configuration for HLS and STAT

```bash
cp configs/nginx/echo.conf /etc/nginx/sites-available/echo.conf
```

Apply changes

```bash
systemctl restart nginx
```

---

## **How Streaming Works**

1. **RTMP (Real-Time Messaging Protocol)**
   - Used by streaming software (e.g., OBS) to send live video to a media server.
   - Ensures a stable and low-latency connection between the broadcaster and the server.
2. **HLS (HTTP Live Streaming)**
   - Converts the RTMP stream into smaller video segments (.ts files).
   - Creates a playlist (.m3u8) that allows adaptive playback on web browsers and mobile devices.

Together, **RTMP handles video ingestion**, while **HLS makes it playable for viewers**.

---

## **What is STAT in RTMP?**

**STAT** is an **RTMP status report** that provides real-time information about active streams on the RTMP server. It helps monitor stream activity, including:

- **Current live streams**
- **Bitrate and bandwidth usage**
- **Connected viewers**
- **Stream key details**

📌 In our setup, it was used to track stream heartbeats. These heartbeats help detect streams that appear LIVE but are no longer active, ensuring they are correctly marked as OFFLINE. To check the RTMP status:

```bash
curl http://172.23.238.4:5175/stat
```

📌 This is useful for debugging and monitoring stream performance.

---

## **Connecting OBS to RTMP Server**

1. **RTMP URL:** `rtmp://172.23.238.4:1935/live`
2. **OBS Settings:**
   - Go to **Settings > Stream**
   - Set **Service: Custom**
   - Enter **RTMP URL** + **`Your Stream Key`**
3. **Start Streaming**

📌 **Watch via HLS:** `http://172.23.238.4:5175/hls/Your Stream Key/index.m3u8`
