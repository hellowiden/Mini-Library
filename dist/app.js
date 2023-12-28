"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Define constants for element IDs and classes
const SEARCH_BUTTON_ID = "searchButton";
const SEARCH_INPUT_ID = "searchInput";
const BOOKS_CONTAINER_ID = "booksContainer";
const OVERLAY_ID = "overlay";
const OVERLAY_CONTENT_ID = "overlay-content-inner";
const OVERLAY_CLOSE_ID = "overlay-close";
// Initialize the books array with type annotation
const books = [];
// Function to initialize the books array by fetching data from a JSON API
function initializeBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
            books.length = 0;
            books.push(...yield response.json());
            yield displayBooks("");
        }
        catch (error) {
            console.error("Error fetching books: ", error);
        }
    });
}
// Function to display books based on a search query
function displayBooks(searchQuery) {
    return __awaiter(this, void 0, void 0, function* () {
        const booksContainer = document.getElementById(BOOKS_CONTAINER_ID);
        if (!booksContainer)
            return;
        booksContainer.innerHTML = '';
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));
        for (const book of filteredBooks) {
            const bookCard = createBookCard(book);
            booksContainer.appendChild(bookCard);
        }
    });
}
// Function to create a book card element
function createBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    if (book.color) {
        bookCard.style.backgroundColor = book.color;
    }
    bookCard.innerHTML = `
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
    `;
    bookCard.addEventListener("click", () => showBookDetails(book));
    return bookCard;
}
// Function to display book details in an overlay
function showBookDetails(book) {
    const overlay = document.getElementById(OVERLAY_ID);
    const overlayContentInner = document.getElementById(OVERLAY_CONTENT_ID);
    if (overlay && overlayContentInner) {
        overlayContentInner.innerHTML = `
            <div class="book-display">
                <div class="book" style="background-color: ${book.color || '#fff'}">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                </div>
            </div>

            <div class="details-header">
                <div class="details-group1">
                    <h1>${book.title}</h1>
                    <p>${book.author}</p>
                </div>

                <div class="details-group2">
                    <p>${book.plot || 'Not available'}</p>
                </div>

                <div class="details-container">
                    <p><strong>Audience:</strong> ${book.audience || 'Not available'}</p>
                    <p><strong>Pages:</strong> ${book.pages || 'Not available'}</p>
                    <p><strong>Year:</strong> ${book.year || 'Not available'}</p>
                    <p><strong>Publisher:</strong> ${book.publisher || 'Not available'}</p>
                </div>
            </div>
        `;
        overlay.style.display = "flex";
        const overlayClose = document.getElementById(OVERLAY_CLOSE_ID);
        if (overlayClose) {
            overlayClose.addEventListener("click", () => {
                overlay.style.display = "none";
            });
        }
        window.addEventListener("click", (event) => {
            if (event.target === overlay) {
                overlay.style.display = "none";
            }
        });
    }
}
// Event listener to initialize the application
document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById(SEARCH_BUTTON_ID);
    const searchInput = document.getElementById(SEARCH_INPUT_ID);
    if (searchButton && searchInput) {
        searchButton.addEventListener("click", () => {
            displayBooks(searchInput.value);
        });
    }
    initializeBooks();
});
