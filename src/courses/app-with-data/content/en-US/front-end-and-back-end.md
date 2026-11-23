---
minutes: 20
outcome: "You will tell apart the part of an app you see in the browser from the part that runs on a server, and say what a port is for."
terms: [front-end, back-end, port]
---

Most web apps have two halves. The [front end](../../../glossary/#app-with-data-front-end) is the part you see and click in the browser: the form where you type a message, the button that saves it, and the list of entries under the form. The [back end](../../../glossary/#app-with-data-back-end) runs on a server, which is a computer that waits for requests. It does the work that the browser cannot do by itself, such as saving an entry so that it is still there tomorrow.

You do not need to know how either half works inside. This lesson only asks you to recognise each one and to know what it is for. The rest of the course puts the pieces together.

## The front end

The front end is the code that runs in your browser. It decides how the page looks and what happens when you press a button. MDN's guide to server-side programming notes that the code for a page is often built from [HTML and JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction), and that the browser displays it for the person using the page.

When you add an entry, the front end does not save it itself. It sends the new entry to the back end, and then it shows whatever the back end answers.

## The back end

The back end is the program that runs on the server. It receives requests from the browser, reads or saves data, and sends back a reply. MDN describes the same exchange in plain terms: a browser sends an HTTP request to a web server, the server processes it, and then replies with an HTTP response. MDN also notes that most of the code that supports a dynamic website has to run on the server. That code is sometimes called "back-end scripting".

In this course, the back end is written with [Node.js](https://nodejs.org/en/about). Node.js describes itself as an asynchronous, event-driven JavaScript runtime. For a beginner, the useful meaning is simple: Node.js lets a program written in JavaScript run on a computer without needing a browser. The AI chooses this for you, and you do not need to write it yourself.

## A port is a numbered door

A program that accepts connections listens on a [port](../../../glossary/#app-with-data-port), a number that identifies one door on a computer. In many setups the front end and the back end each listen on their own port. Your browser sends its request to the right door, and the program behind that door answers.

Docker makes this visible when it runs an app. Docker's port publishing guide gives the example `-p 8080:80`, which maps port 8080 on the Docker host to port 80 inside a container. The number on the left is the door on your computer, and the number on the right is the door inside the container. You will see the same idea in the address that the AI gives you for your app, which ends with a colon and a number.

## How the parts talk to each other

When you click save, four things happen in order. The front end builds a request that contains the new entry. The browser sends that request to the back end. The back end saves the entry and builds a reply. The browser receives the reply and the front end shows the updated list. Keep this order in mind, because most problems you meet later come from one of these four steps failing.

## What you will do

1. Open the finished example from the previous lesson. Make a two-column list on paper. In the left column, write what you can see and click on the page. In the right column, write what you think happens behind the scenes when you press save.
2. Add an entry in the example. Note what changes on the page right away and what seems to take a moment longer. You do not need to be exact. Your guess is useful.
3. Read the address in the browser's address bar. Find the number after the colon, if there is one, and write it down. This is the port number of the door you are using.
4. Compare your two columns with the four steps above. Correct any box that is in the wrong column.

This lesson has no commands to type, so Windows and Mac users follow the same steps. Only the browser's address bar might look different on each system.

## Check yourself

- You can name which parts of an app run in the browser and which run on the server.
- You can say what a port is in one sentence.
- You can describe the path of a save: the request goes to the back end, and the back end sends back a reply.
- You know that a port number tells the browser which door to knock on.

## What comes next

Go on to **The database and the API**, where you see how the back end keeps data and how the front end asks for it.
