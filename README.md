# heart-disease-chatbot
A chatbot available to answer questions about heart diseases and how to perfom cpr in case of cardial arrest.  

## Development
### Prepare the Python environment
The python version must be one of those: `3.8`, `3.9`, `3.10`.  
This repository comes with a a `requirements.txt` files to install the python dependencies.  
It is highly recommended to use a python virtual environment to install the dependencies:  
```sh
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Chatbot development
Before starting developing the chatbot, please read the [official Rasa documentation](https://rasa.com/docs/rasa/).  

## Deployment
- Train the chatbot with the current training data: `rasa train`
- Start the container with: `docker compose up -d`

### Nginx example configuration
The following is a simple nginx block configuration:
```
server {
    listen 80;
    server_name rasa.your_domain.com;

    location / {
        proxy_pass http://localhost:5005;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400;
    }
}
```

### Widget configuration
Set the `data-websocket-url` attribute to the correct URL.  
Example: `http://rasa.your_domain.com/socket.io`