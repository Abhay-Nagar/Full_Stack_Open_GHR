```mermaid
sequenceDiagram

    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    server activate
    server-->>browser: HTML doc
    server deactivate

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server activate
    server-->>browser: main.css
    server deactivate

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server activate
    server-->>browser: spa.js
    server deactivate

     Note right of browser: browser start running spa.js which fetches JSON data from server using GET

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server activate
    server-->>browser: data.json
    server deactivate

    Note right of browser: browser executes the callback function that renders the notes from the JSON file to the page
```