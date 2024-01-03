sequenceDiagram
    participant browser
    participant serverSPA

    Note right of browser: Similar sequence of https://studies.cs.helsinki.fi/exampleapp/notes

    browser->>serverSPA: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate serverSPA
    serverSPA-->>browser: HTML document
    deactivate serverSPA

    browser->>serverSPA: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate serverSPA
    serverSPA-->>browser: the css file
    deactivate serverSPA

    browser->>serverSPA: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate serverSPA
    serverSPA-->>browser: the JavaScript file
    deactivate serverSPA

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>serverSPA: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate serverSPA
    serverSPA-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate serverSPA

    Note right of browser: The browser executes the callback function that renders the notes