sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Type new name's note
    user->>browser: Click on Button "Save"
    activate browser

    Note right of browser: Javascript's code add new note in list of Browser's memory to show it to User
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    deactivate browser
    activate server
    Note left of server: Send Form Data {content:note's name, date: "2024-01..."} and save in Server's list of notes
    server-->>browser: Response {"message":"note created"}
    deactivate server
    Note right of browser: Browser don't show the response in the screen