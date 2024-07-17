const Book = require("../modals/book.schema"); 
const apiResponse = require("../helper/apiResponse");

exports.addBook = async (req, res) => {
    const { title, author, genre, year } = req.body;
  
    try {
      if (!title || !author || !genre || !year) {
        return apiResponse.validationError(res, "All fields are required.");
      }
  
      const existingBook = await Book.findOne({ title });
  
      if (existingBook) {
        return apiResponse.ErrorResponse(res, "Book with this title already exists.");
      }

      const newBook = await Book.create({ title, author, genre, year });
  
      return apiResponse.successResponseWithData(
        res,
        "Book added successfully",
        newBook
      );
    } catch (error) {
      console.error("Error adding book:", error);
      return apiResponse.ErrorResponse(res, "Error adding book: " + error.message);
    }
  };
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return apiResponse.successResponseWithData(
      res,
      "Books retrieved successfully",
      books,
      books.length
    );
  } catch (err) {
    return apiResponse.ErrorResponse(res, "Error retrieving books");
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return apiResponse.notFoundResponse(res, "Book not found");
    }
    return apiResponse.successResponseWithData(
      res,
      "Book retrieved successfully",
      book
    );
  } catch (err) {
    return apiResponse.ErrorResponse(res, "Error retrieving book");
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author, genre, year } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, year },
      { new: true }
    );
    if (!updatedBook) {
      return apiResponse.notFoundResponse(res, "Book not found");
    }
    return apiResponse.successResponseWithData(
      res,
      "Book updated successfully",
      updatedBook
    );
  } catch (err) {
    return apiResponse.validationErrorWithData(res, "Error updating book", err);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return apiResponse.notFoundResponse(res, "Book not found");
    }
    return apiResponse.successResponse(res, "Book deleted successfully");
  } catch (err) {
    return apiResponse.ErrorResponse(res, "Error deleting book");
  }
};
