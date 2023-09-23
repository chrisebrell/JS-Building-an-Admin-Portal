let books = []
// Your Code Here
let api_base_url = 'http://localhost:3001'
async function main() {
    let response = await fetch(api_base_url + '/listBooks')
    books = await response.json()
    console.log(books)
    books.forEach(renderBook)
}

function renderBook(book) {
    console.log(book)
    let bookContainer = document.querySelector('.book-container ul')
    bookContainer.innerHTML += `
    <li> ${book.title} <input id="book-${book.id}" type="number" value="${book.quantity}"/>
    <button onclick="updateQuantity(${book.id})">Save</button>
    </li>
    `
}

async function updateQuantity(bookId) {
    let input = document.querySelector(`#book-${bookId}`)
    let quantity = input.value;
    const data = {
        id: bookId, 
        quantity,
    }
    let response = await fetch(api_base_url + '/updateBook', {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    console.log(response)
}
main()

