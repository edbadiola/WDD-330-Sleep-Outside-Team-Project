import { getParam, loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

// ------------------------
// Product Details
// ------------------------
const dataSource = new ExternalServices("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

// ------------------------
// Comments Functionality
// ------------------------
const commentForm = document.getElementById("comment-form");
const commentsList = document.getElementById("comments-list");

// Get comments from localStorage
function getComments() {
    return getLocalStorage(`comments_${productID}`) || [];
}

// Save comments to localStorage
function saveComments(comments) {
    setLocalStorage(`comments_${productID}`, comments);
}

// Render comments
function renderComments() {
    const comments = getComments();
    if (!comments || comments.length === 0) {
        commentsList.innerHTML = "<p>No comments yet. Be the first!</p>";
        return;
    }

    commentsList.innerHTML = comments
        .map(c => `
            <div class="comment">
                <p><strong>${c.username}</strong> (${new Date(c.created_at).toLocaleString()}):</p>
                <p>${c.comment}</p>
            </div>
        `)
        .join("");
}

// Handle new comment submission
commentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("user_name").value.trim();
    const commentText = document.getElementById("comment_text").value.trim();

    if (!username || !commentText) {
        alert("Please enter both name and comment.");
        return;
    }

    const comments = getComments();
    comments.push({
        username,
        comment: commentText,
        created_at: new Date().toISOString()
    });
    saveComments(comments);

    commentForm.reset();
    renderComments();
});

// Initial render
renderComments();
