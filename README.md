# **echo.tv**

A basic Twitch clone for practice aimed to explore live streaming technologies using NGINX, RTMP, and HLS.

Users can use OBS or other streaming software to start their streams by connecting to the Echo platform.

## Features

- Low-Latency Streaming
- Stream Authentication
- User Authentication
- Watch Other Users' Streams

---

# **Full Setup Guide**

This guide walks you through setting up the client, server, database, and NGINX for streaming. Follow the steps carefully to ensure everything is configured correctly.

---

## **1. Client Setup (Frontend)**

The client is responsible for displaying the user interface and interacting with the backend. This step installs dependencies and starts the development server.

```bash
cd client
npm install  # Installs all necessary frontend dependencies
npm run dev  # Starts the client development server at a local address
```

---

## **2. Server Setup (Backend)**

The server handles business logic, API requests, and database operations. This step installs backend dependencies and starts the server.

```bash
cd ../server
npm install  # Installs all backend dependencies required for the API
npm run dev  # Starts the backend development server to process requests
```

---

## **3. MySQL Database Setup**

### **Push the Prisma Schema to the Database**

Prisma is used as the ORM (Object-Relational Mapping) tool to interact with MySQL. This command ensures the database schema is correctly structured based on the defined models.

```bash
npm run prisma:migrate:dev
```

✅ **What this does:**

- Creates the database if it doesn’t exist.
- Generates tables and columns based on the Prisma schema.
- Applies any pending migrations.

### **Generate Prisma Client**

The Prisma client is a JavaScript/TypeScript library that provides an intuitive way to query the database.

```bash
npm run prisma:generate:dev
```

✅ **What this does:**

- Creates an optimized Prisma client for querying the database.
- Improves developer experience with autocompletion and type safety.

---

## **4. NGINX Setup for RTMP & HLS Streaming**

NGINX is used as a media server to handle live streaming. The RTMP (Real-Time Messaging Protocol) module allows streaming video, and HLS (HTTP Live Streaming) enables adaptive playback.

### **Install NGINX with RTMP Module**

This step installs NGINX along with the RTMP module, which is required for handling live video streams.

```bash
sudo apt install nginx libnginx-mod-rtmp -y
```

### **Modify the NGINX Configuration**

NGINX needs to be configured to support RTMP streaming. This command opens the main configuration file for editing.

```bash
sudo nano /etc/nginx/nginx.conf
```

✅ **What to do next:**

- Append the RTMP settings from `configs/nginx/nginx.conf` into this file.
- Save and exit the editor.

### **Enable HLS Configuration**

HLS is required for smooth and adaptive streaming. This step copies the necessary configuration file to the correct location.

```bash
cp configs/nginx/echo.conf /etc/nginx/sites-available/echo.conf
```

✅ **What this does:**

- Adds HLS streaming support to the NGINX server.
- Ensures video playback works across various devices and network conditions.

### **Restart NGINX to Apply Changes**

Once the configurations are in place, restarting NGINX ensures that the settings take effect.

```bash
systemctl restart nginx
```

✅ **What this does:**

- Reloads the updated NGINX configuration.
- Starts handling RTMP and HLS streams immediately.

---

# **Learning Section: Understanding RTMP and HLS Streaming**

Live streaming involves capturing video from a source (such as a webcam or screen recording), encoding it, and transmitting it over the internet for playback. Two key technologies that make this possible are **RTMP (Real-Time Messaging Protocol)** and **HLS (HTTP Live Streaming)**.

---

## **1. What is RTMP?**

RTMP (Real-Time Messaging Protocol) is a low-latency streaming protocol designed to efficiently transmit audio, video, and data over the internet. Originally developed by Macromedia (now Adobe), RTMP was widely used for live streaming before transitioning into a protocol mainly for delivering content to media servers.

### **How RTMP Works**

1. A live streaming software (e.g., OBS Studio, vMix, Wirecast) **captures** video and audio from a source.
2. The software **encodes** the video using a codec like H.264 and compresses the audio (e.g., AAC).
3. The encoded stream is sent via RTMP to an **RTMP server** (e.g., NGINX with RTMP module).
4. The RTMP server **distributes** the stream to viewers or converts it into another format like HLS for broader compatibility.

✅ **Why RTMP?**

- Low latency (~2-5 seconds delay)
- Stable, persistent connection
- Compatible with various streaming software

🚨 **Limitations**

- Not natively supported on most modern browsers (requires conversion to HLS or DASH)

---

## **2. What is HLS?**

HLS (HTTP Live Streaming) is a streaming protocol developed by Apple that is optimized for playback across different devices, including web browsers, smartphones, and smart TVs. It is widely used today for live and on-demand streaming.

### **How HLS Works**

1. The RTMP stream from the broadcaster is received by the **RTMP server** (e.g., NGINX with the RTMP module).
2. The RTMP server **transcodes** and segments the video into small chunks (usually 2-10 seconds each).
3. These chunks are stored as `.ts` (Transport Stream) files, and an `.m3u8` playlist file is created.
4. The `.m3u8` file is served over HTTP, allowing users to stream the video via web browsers and media players.

✅ **Why HLS?**

- Works on almost all devices and browsers
- Supports adaptive bitrate streaming (automatically adjusts video quality based on internet speed)
- More scalable for larger audiences

🚨 **Limitations**

- Higher latency (~10-30 seconds delay) compared to RTMP
- Requires additional processing power for conversion

---

## **3. How Streaming Software Connects to an RTMP Server**

Streaming software like OBS Studio, vMix, or Wirecast is used to send live video streams to an RTMP server.

### **Steps to Connect OBS Studio to an RTMP Server**

1. **Get the RTMP Server URL**
   - Typically in the format:
     ```
     rtmp://your-server-ip/live
     ```
2. **Configure OBS Studio**
   - Open **OBS Studio**
   - Go to **Settings > Stream**
   - Select **Custom** as the service
   - Enter the RTMP server URL
   - Set a **Stream Key** (e.g., `stream1`)
3. **Start Streaming**
   - Click **Start Streaming** in OBS
   - The RTMP server will now receive the video feed

📌 **Example RTMP URL and Stream Key in OBS:**

```
rtmp://your-server-ip/live
Stream Key: stream1
```

Once the RTMP server receives the stream, it can either distribute it directly to RTMP-compatible players or convert it into HLS for broader compatibility.

---

## **4. How RTMP Converts to HLS for Web Playback**

To make the stream playable in web browsers, the RTMP stream is converted into HLS:

1. **NGINX with RTMP Module receives the RTMP stream**

   - It listens for incoming streams and processes them.

2. **NGINX segments the RTMP stream into small `.ts` files**

   - These are typically 2-10 seconds long.

3. **An `.m3u8` playlist file is generated**

   - This file contains a list of `.ts` video segments and tells the media player how to play them.

4. **Users watch the stream via an HLS-compatible player**
   - Most web browsers, mobile devices, and video players (like VLC) support HLS.

📌 **Example HLS URL:**

```
http://your-server-ip/hls/stream1.m3u8
```

A web-based video player (like Video.js) can then be used to play the stream.

---

## **5. Key Takeaways**

- **RTMP** is great for low-latency streaming and is used to send video to media servers.
- **HLS** is better for compatibility and scalability but has higher latency.
- Streaming software like **OBS Studio** connects to an RTMP server, which then converts the stream to HLS for web playback.
- **NGINX with RTMP module** is commonly used for handling RTMP and converting it to HLS.
