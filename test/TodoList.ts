const { expect } = require("chai");
const { ethers } = require("hardhat");
import { Contract } from 'ethers';

describe("TodoList", function () {
  let todoList: Contract;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const TodoList = await ethers.getContractFactory("TodoList");
    todoList = await TodoList.deploy();
  });

  it("should create a todo", async function () {
    await todoList.createTodo("My first todo");
    const todo = await todoList.todoArray(0);
    expect(todo.title).to.equal("My first todo");
  });

  it("should update a todo's title", async function () {
    await todoList.createTodo("My todo");
    await todoList.updateTitle(0, "Updated todo");
    const todo = await todoList.todoArray(0);
    expect(todo.title).to.equal("Updated todo");
  });

  it("should get titles", async function () {
    await todoList.createTodo("Todo 1");
    await todoList.createTodo("Todo 2");
    const titles = await todoList.getTitles();
    expect(titles).to.deep.equal(["Todo 1", "Todo 2"]);
  });

  it("should add an item to a todo", async function () {
  await todoList.createTodo("My todo");
  console.log("Todo created:", await todoList.todoArray(0));
  await todoList.addItem(0, "First item");
  const todo = await todoList.todoArray(0);
  console.log("Todo after adding item:", todo);
  expect(todo.text[0]).to.equal("First item");
  });

  it("should update an item in a todo", async function () {
    await todoList.createTodo("My todo");
    console.log("Todo created:", await todoList.todoArray(0));
    await todoList.addItem(0, "First item");
    console.log("Todo after adding item:", await todoList.todoArray(0));
    await todoList.updateItem(0, 0, "Updated item");
    const todo = await todoList.todoArray(0);
    console.log("Todo after updating item:", todo);
    expect(todo.text[0]).to.equal("Updated item");
  });

});