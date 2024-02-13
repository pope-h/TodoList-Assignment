// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TodoList {
    struct Todo {
        string title;
        string[5] text;
        bool completed;
    }

    Todo[] public todoArray;

    function createTodo(string memory _title) external {
        for (uint i = 0; i < todoArray.length; i++) {
            require(keccak256(bytes(todoArray[i].title)) != keccak256(bytes(_title)), "Title already exists");
        }

        Todo memory todo;
        todo.title = _title;
        todoArray.push(todo);
    }

    function updateTitle(uint _index, string memory _newTitle) external {
        require(_index < todoArray.length, "Invalid Todo index");

        Todo storage todo = todoArray[_index];
        todo.title = _newTitle;
    }

    function getTitles() external view returns (string[] memory) {
        string[] memory titles = new string[](todoArray.length);
        for (uint i = 0; i < todoArray.length; i++) {
            titles[i] = todoArray[i].title;
        }
        return titles;
    }

    function addItem(uint _index, string memory _text) external {
        require(_index < todoArray.length, "Invalid Todo index");

        Todo storage todo = todoArray[_index];
        for (uint i=0; i < todo.text.length; i++) {
            require(keccak256(bytes(todo.text[i])) != keccak256(bytes(_text)), "Item already in list");
        }

        uint8 emptyIndex = 0;
        while (emptyIndex < todo.text.length && bytes(todo.text[emptyIndex]).length > 0) {
            emptyIndex++;
        }
        require(emptyIndex < todo.text.length, "No space for new text");
        todo.text[emptyIndex] = _text;
    }

    function getList(uint _index) external view returns (string memory, string[5] memory, bool) {
        require(_index < todoArray.length, "Invalid Todo index");
        Todo memory todo = todoArray[_index];
        return (todo.title, todo.text, todo.completed);
    }
}