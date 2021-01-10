const API = 'https://jsonplaceholder.typicode.com/posts'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((reg) => {
      console.log('Registration succeeded - ', reg);
    })
    .catch((error) => {
      console.log('Registration failed with ', error);
    });
}
$(document).ready(() => {

  class Post {
    constructor(title, body) {
      this.title = title
      this.body = body
    }

    template(title = this.title, body = this.body) {
      return `
        <li class="posts__item">
          <h5 class="posts__item_title">${title}</h5>
          <p class="posts__item_content">${body}</p>
        </li>`
    }

  }

  class Posts extends Post {
    constructor(listSelector) {
      super()
      this.listSelector = listSelector
      this.loading = true
      this.responseData = null
    }

    init() {
      this.fetchData()
    }

    fetchData(limit = 20) {
      return $.ajax({
        method: 'get',
        url: `${API}?_limit=${limit}`,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).done(res => {
        this.responseData = res
        this.render()
      }).fail(error => {
        console.log(JSON.stringify(error));
        throw error
      }).always(() => {
        this.loading = false
      })
    }

    render() {
      const list = []
      this.responseData.forEach(e => {
        const {title, body} = e
        list.push(this.template(title, body))
      })
      this.listSelector.html(list.join(''))
    }
  }

  const posts = new Posts($('.posts__list'))
  posts.init()
})
