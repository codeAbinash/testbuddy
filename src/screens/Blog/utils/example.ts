import { extractHeadings } from './extractHeadings'

export const htmlInput = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learning Python</title>
</head>
<body>
    <h1>Learning Python</h1>
    <p>Python is a popular programming language known for its simplicity and readability. This guide will help you get started with Python and cover some basic and advanced concepts.</p>

    <h2>Getting Started</h2>
    <p>Before you can start writing Python code, you need to install Python and set up your development environment.</p>

    <h3>Installation</h3>
    <p>To install Python, visit the official Python website and download the latest version for your operating system. Follow the installation instructions provided.</p>

    <h3>Setting Up the Environment</h3>
    <p>After installing Python, you may want to set up a virtual environment to manage your projects. You can use tools like venv or conda for this purpose.</p>

    <h3>Hello World Program</h3>
    <p>Once your environment is set up, you can write your first Python program. Open a text editor, type print("Hello, World!"), and save the file with a .py extension. Run the program using the Python interpreter.</p>

    <h2>Basic Concepts</h2>
    <p>In this section, we will cover the fundamental concepts of Python programming.</p>

    <h3>Variables</h3>
    <p>Variables are used to store data in Python. You can assign a value to a variable using the assignment operator (=). For example: x = 5</p>

    <h3>Data Types</h3>
    <p>Python has several built-in data types, including numbers, strings, lists, tuples, and dictionaries.</p>

    <h4>Numbers</h4>
    <p>Numbers in Python can be integers, floats, or complex numbers. You can perform arithmetic operations on them using operators like +, -, *, /, etc.</p>

    <h4>Strings</h4>
    <p>Strings are sequences of characters enclosed in quotes. You can manipulate strings using various string methods.</p>

    <h4>Lists</h4>
    <p>Lists are ordered collections of items. They are mutable, meaning you can change their contents.</p>

    <h5>Creating Lists</h5>
    <p>You can create a list by enclosing items in square brackets, separated by commas. For example: my_list = [1, 2, 3]</p>

    <h5>Accessing Elements</h5>
    <p>You can access elements in a list using their index, starting from 0. For example: my_list[0] returns 1</p>

    <h5>List Methods</h5>
    <p>Lists have various methods to manipulate them, such as append(), extend(), insert(), remove(), etc.</p>

    <h6>append()</h6>
    <p>The append() method adds an item to the end of the list. For example: my_list.append(4)</p>

    <h6>extend()</h6>
    <p>The extend() method adds multiple items to the end of the list. For example: my_list.extend([5, 6])</p>

    <h6>insert()</h6>
    <p>The insert() method adds an item at a specific position in the list. For example: my_list.insert(1, 'a')</p>

    <h4>Tuples</h4>
    <p>Tuples are similar to lists but are immutable, meaning their contents cannot be changed after creation.</p>

    <h3>Control Structures</h3>
    <p>Control structures allow you to control the flow of your program. They include conditional statements like if-else and loops like for and while.</p>

    <h2>Advanced Topics</h2>
    <p>Once you are comfortable with the basics, you can explore more advanced concepts in Python.</p>

    <h3>Functions</h3>
    <p>Functions are reusable blocks of code that perform a specific task. You can define your own functions using the def keyword.</p>

    <h3>Classes and Objects</h3>
    <p>Python supports object-oriented programming. You can define classes to create objects with attributes and methods.</p>

    <h3>Modules and Packages</h3>
    <p>Modules are files containing Python code, and packages are directories containing multiple modules. You can import modules and packages to use their functionality in your programs.</p>
</body>
</html>`

const headings = extractHeadings(htmlInput)
console.log(headings)
